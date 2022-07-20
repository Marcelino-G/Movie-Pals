import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import UserProfile from './UserProfile';
import Form from './Form'
import friendsData from './FriendsData';
import FriendsProfile from './FriendsProfile';
import {Routes, Route, useNavigate, BrowserRouter as Router} from 'react-router-dom'

const main = ReactDOM.createRoot(document.getElementById('main'));

const Parent = () => {

  // console.log(friendsData)
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    user_name: "",
    favorite_movie: "",
    api_key: "",
    profile_picture: undefined,
    id: ""
  })
  const [favoriteMovie, setFavoriteMovie] = useState({
    movie_title: "",
    movie_date: "",
    movie_img: "#"
  });
  const [searchedMovie, setSearchedMovie] = useState({
    movie_title: "",
    movie_date: "",
    movie_img: "#",
    movie_id: ""
  })
  const [addMovie, setAddMovie] = useState([])

  
  
  const [searchMovie, setSearchMovie] = useState("#")
  const [searchTrigger, setSearchTrigger] = useState(false)
  

  useEffect(() => {

    const searchUseEffect = async() => {
    
      try {
        
        if (searchTrigger === true){
          await fetchh(searchMovie, setSearchedMovie)
          setSearchTrigger(false)
        }

      } catch (error) {
        alert(error)
      }
    }

    searchUseEffect();

  }, [searchTrigger])

  const fetchh = async (x, y) => {

    try {

      let response = await fetch(`https://imdb-api.com/en/API/SearchMovie/${userInfo['api_key']}/${x}`) 
      // console.log(response['status'])
      let json = await response.json()
      // console.log(json['results'])

      if (json['results'] === null){

        if(json['errorMessage'] === 'Invalid API Key'){
          throw new Error(json['errorMessage'])
        } else if(json['errorMessage'] === 'Server busy'){
          throw new Error(`${json['errorMessage']}. Try again in a few minutes.`)
        } else if(json['expression'] === null){
          throw new Error(json['errorMessage'])
        }
        
        throw new Error(`${json['errorMessage']}. Try again tomorrow.`)
      } else if (json['results'].length === 0 ) {
          throw new Error('Film could not be found. Please check spelling for "Favorite Movie".')
        } else {

            await y(() => ({
              movie_title: json['results'][0]['title'],
              movie_date: json['results'][0]['description'],
              movie_img: json['results'][0]['image'],
              movie_id: json['results'][0]["id"]
            }))
          }

    } catch (error) {
      
      throw error;
    }
  }

  const handleChangeUserInfo = (e) => {

    if (e.target.id === "user_name"){
        setUserInfo({
          ...userInfo,
          user_name: e.target.value
      })
    } else if (e.target.id === "api_key"){
        setUserInfo({
          ...userInfo,
          api_key: e.target.value
      })
    } else if (e.target.id === "favorite_movie"){
        setUserInfo({
          ...userInfo,
          favorite_movie: e.target.value
        })
    } else if (e.target.id === "profile_picture"){
      const pictureFile = URL.createObjectURL(e.target.files[0])
      setUserInfo({
        ...userInfo,
        profile_picture: pictureFile
      })
    }
  }

  const handleChangeSearchInfo = (e) => {
    setSearchMovie(e.target.value)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userInfo['api_key'] !== userInfo['id']){
        alert('new user')
        setAddMovie([])
        setFavoriteMovie({})
        setSearchedMovie({})
        setUserInfo({
          ...userInfo,
          id: userInfo['api_key']
        })
      }
      await fetchh(userInfo['favorite_movie'], setFavoriteMovie);
      navigate('/profile')

    } catch (error) {
      alert(error)
    }
  }

  const handleSearchSubmit = (e) => {

    e.preventDefault();
    setSearchTrigger(true)
  }

  const handleClickAdd = (e) => {    

    try {

      if(addMovie.length === 8){
        // console.log(addMovie)
        throw new Error("Max recommended movies reached")

      } else if(addMovie.length === 0){

        setAddMovie([{
          movie_title: searchedMovie['movie_title'],
          movie_date: searchedMovie['movie_date'],
          movie_img: searchedMovie['movie_img'], 
          movie_id: searchedMovie['movie_id']  
        }])
      } else if(addMovie.length > 0){
          
          if(addMovie.find(array => array['movie_id'] === searchedMovie['movie_id'])){
            throw new Error("Movie already added to the recommended movie list")
          }

          setAddMovie(prev => {
            return [...prev,
              {
              movie_title: searchedMovie['movie_title'],
              movie_date: searchedMovie['movie_date'],
              movie_img: searchedMovie['movie_img'], 
              movie_id: searchedMovie['movie_id']      
            }]
          })
        } 
      
    } catch (error) {
      
      alert(error.message)
    }
  }

  const handleOnPointerEnter = (e) => {
    let z = e.target.firstChild
    z.style.visibility = "visible"
  }

  const handleOnPointerLeave = (e) => {
    let z = e.target.firstChild
    z.style.visibility = "hidden"
  }

  const handleClickRemove = (e) => {

    setAddMovie(addMovie.filter((movie) => movie['movie_id'] !== e.target.id))
  }

  const handleOnClickLogOut = () => {
    setUserInfo({})
    setFavoriteMovie({})
    setSearchedMovie({})
    setAddMovie([])
    setSearchMovie()
    navigate("/")
  }

  const [recommended, setRecommended] = useState()
  const [friendSwitch, setFriendSwitch] = useState(false)
  const [friend, setFriend] = useState("")
  const [friendRecommends, setFriendRecommends] = useState();
  const [friendFavoriteMovie, setFriendFavoriteMovie] = useState({
    movie_title: "",
    movie_date: "",
    movie_img: "#"
  })

  const handleOnClickFriend = async (e) => {

    let found = friendsData.find((friend) => friend.id === e.target.id)
    
    setFriend({
      user_name: found['user_name'],
      favorite_movie: found['favorite_movie'],
      profile_pic: found['profile_pic'],
      id: found['id']
    }
    )

    setFriendRecommends(
      found['recommended_movies']
    )

    
    
    setFriendSwitch(true)
  }

  

  

  const friendRecommendedFetch = async (x, y, z) => {

    try{

      let response = await fetch(`https://imdb-api.com/en/API/SearchMovie/${userInfo['api_key']}/${x}`) 
      // console.log(response['status'])
      let json = await response.json()
      console.log(json['results'])

      if (z.length === 0){
        await y([{
          movie_title: searchedMovie['movie_title'],
          movie_date: searchedMovie['movie_date'],
          movie_img: searchedMovie['movie_img'], 
          movie_id: searchedMovie['movie_id']}])
      } else {
        await y(prev => {
          return [...prev, {
            movie_title: searchedMovie['movie_title'],
            movie_date: searchedMovie['movie_date'],
            movie_img: searchedMovie['movie_img'], 
            movie_id: searchedMovie['movie_id']
          }]
        })
      }

      console.log(recommended)

    } catch(error){

      console.log(error) 

    }


  }

  useEffect(() => {
    
    const fetchFriendAll = async () => {

      if (friendSwitch){
        await fetchh(friend['favorite_movie'], setFriendFavoriteMovie)
        await friendRecommends.map((recommends) => {
          friendRecommendedFetch(recommends, setRecommended, recommended)
        })
        navigate("/friend")
        
      }

    }

    fetchFriendAll();

  }, [friendSwitch])


  
  



  

  

  

 useEffect(() => {
  setUserInfo(JSON.parse(window.localStorage.getItem('info')))
  setFavoriteMovie(JSON.parse(window.localStorage.getItem('fav')))
  setAddMovie(JSON.parse(window.localStorage.getItem('movies')))
  // console.log(window.localStorage.getItem('info'))
  // console.log(window.localStorage.getItem('fav'))
  // console.log(window.localStorage.getItem('movies'))
  
 }, [])

 useEffect(() => {
  
  window.localStorage.setItem('info', JSON.stringify(userInfo))
  window.localStorage.setItem('fav', JSON.stringify(favoriteMovie))
  window.localStorage.setItem('movies', JSON.stringify(addMovie))

 }, [userInfo, favoriteMovie, addMovie])

//  console.log(friendFavoriteMovie)
 

  return (

    <div>
      <Routes >
        <Route className='container border border-3 border-danger h-100'  path='/profile' element={<UserProfile 
      profilePicture={userInfo['profile_picture']}
      userName={userInfo["user_name"]} 
      favoriteMovieTitle={favoriteMovie['movie_title']} 
      favoriteMovieImg={favoriteMovie['movie_img']} 
      favoriteMovieDate={favoriteMovie['movie_date']}
      onSubmit={handleSearchSubmit}
      searchedMovieImg={searchedMovie['movie_img']}
      searchedMovieTitle={searchedMovie['movie_title']}
      searchedMovieDate={searchedMovie['movie_date']}
      onClick={handleClickAdd}
      addMovie={addMovie}
      onChangeSearchInfo={handleChangeSearchInfo}
      onChangeUserInfo={handleChangeUserInfo}
      onFormSubmit={handleFormSubmit}
      onPointerEnter={handleOnPointerEnter}
      onPointerLeave={handleOnPointerLeave}
      onClickRemove={handleClickRemove}
      onClickLogOut={handleOnClickLogOut}
      onClickFriend={handleOnClickFriend}
      /> } />
        <Route path='/' element={<Form 
      onChangeUserInfo={handleChangeUserInfo} 
      value={userInfo} 
      onFormSubmit={handleFormSubmit}
      /> }/>
        <Route path='/friend' element={<FriendsProfile friendName={friend['user_name']} 
        friendFavoriteMovie={friendFavoriteMovie['movie_img']}
        onClickLogOut={handleOnClickLogOut}
        />} />
      </Routes>
    </div>
)

    // <div className='container border border-3 border-danger h-100'>
    //   {formTrigger === true ? 
    //   <UserProfile 
    //   profilePicture={userInfo['profile_picture']}
    //   userName={userInfo["user_name"]} 
    //   favoriteMovieTitle={favoriteMovie['movie_title']} 
    //   favoriteMovieImg={favoriteMovie['movie_img']} 
    //   favoriteMovieDate={favoriteMovie['movie_date']}
    //   onSubmit={handleSearchSubmit}
    //   searchedMovieImg={searchedMovie['movie_img']}
    //   searchedMovieTitle={searchedMovie['movie_title']}
    //   searchedMovieDate={searchedMovie['movie_date']}
    //   onClick={handleClickAdd}
    //   addMovie={addMovie}
    //   onChangeSearchInfo={handleChangeSearchInfo}
    //   onChangeUserInfo={handleChangeUserInfo}
    //   onFormSubmit={handleFormSubmit}
    //   onClickRemove={handleClickRemoveList}
    //   onHover={hoverRemove}
    //   /> 
    //   : 
    //   <Form 
    //   onChangeUserInfo={handleChangeUserInfo} 
    //   value={userInfo} 
    //   onFormSubmit={handleFormSubmit}
    //   /> 
    //   }
    // </div>

    
}

main.render(
<Router>
  <Parent/>
</Router>)



