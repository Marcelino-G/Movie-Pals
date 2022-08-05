import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './HomePage';
import LoadingPage from './LoadingPage';
import FormPage from './FormPage'
import FriendsPage from './FriendsPage';
import startingUserData from './StartingUserData';
import {Routes, Route, useNavigate, BrowserRouter as Router} from 'react-router-dom'
import default_user_pic from './default_user_pic.png'

const main = ReactDOM.createRoot(document.getElementById('main'));

const Parent = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)

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
  const [userData, setUserData] = useState(startingUserData)

  const [searchTrigger, setSearchTrigger] = useState(false)
  const [searchMovie, setSearchMovie] = useState("#")
  const [searchedMovie, setSearchedMovie] = useState({
    movie_title: "",
    movie_date: "",
    movie_img: "#",
    movie_id: ""
  })
  const [addMovie, setAddMovie] = useState([])

  const [viewingUser, setViewingUser] = useState("")
  const [viewingUserFavoriteMovie, setViewingUserFavoriteMovie] = useState({
    movie_title: "",
    movie_date: "",
    movie_img: "#"
  })
  const [viewingUsersFriends, setViewingUsersFriends] = useState()
  const [viewingUserRecommends, setViewingUserRecommends] = useState([])
  const dialog = document.getElementById("dialog")

  useEffect(() => {

    setUserInfo(JSON.parse(window.localStorage.getItem('userInfo')))
    setFavoriteMovie(JSON.parse(window.localStorage.getItem('favoriteMovie')))
    setAddMovie(JSON.parse(window.localStorage.getItem('addedMovies')))
    setUserData(JSON.parse(window.localStorage.getItem('userData')))
    // setViewingUserRecommends(JSON.parse(window.localStorage.getItem('viewingUserRecommends')))
    // setViewingUserFavoriteMovie(JSON.parse(window.localStorage.getItem('viewingUserFavoriteMovie')))
    // setViewingUser(JSON.parse(window.localStorage.getItem('viewingUser')))
    // setViewingUsersFriends(JSON.parse(window.localStorage.getItem('viewingUsersFriends')))

  }, [])

  useEffect(() => {

    window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
    window.localStorage.setItem('favoriteMovie', JSON.stringify(favoriteMovie))
    window.localStorage.setItem('addedMovies', JSON.stringify(addMovie))
    window.localStorage.setItem('userData', JSON.stringify(userData))
    // window.localStorage.setItem('viewingUserRecommends', JSON.stringify(viewingUserRecommends))
    // window.localStorage.setItem('viewingUserFavoriteMovie', JSON.stringify(viewingUserFavoriteMovie))
    // window.localStorage.setItem('viewingUser', JSON.stringify(viewingUser))
    // window.localStorage.setItem('viewingUsersFriends', JSON.stringify(viewingUsersFriends))
    
    
    
    
  }, [userInfo, favoriteMovie, addMovie, userData , viewingUserRecommends, viewingUserFavoriteMovie, viewingUser])

  

  const fetchh = async (x) => {

    try {
      let response = await fetch(`https://imdb-api.com/en/API/SearchMovie/${userInfo.api_key}/${x}`) 
      let json = await response.json()

      if (json['results'] === null){

        if(json['errorMessage'] === 'Invalid API Key'){
          throw new Error(json['errorMessage'])

        } else if(json['errorMessage'] === 'Server busy'){
          navigate("./home")
          throw new Error(`${json['errorMessage']}. Try again in a few minutes.`)

        } else if(json['expression'] === null){
          throw new Error(json['errorMessage'])

        } else {
          throw new Error(`${json['errorMessage']}. Try again tomorrow.`)
        }
        
      } else if (json['results'].length === 0 ) {
          throw new Error('Film could not be found. Please check spelling for "Favorite Movie".')
        } else {

            return {
              movie_title: json['results'][0]['title'],
              movie_date: json['results'][0]['description'],
              movie_img: json['results'][0]['image'],
              movie_id: json['results'][0]["id"]
            }
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dialog.showModal()

    if (userInfo['api_key'] !== userInfo['id']){
      setFavoriteMovie({});
      setSearchedMovie({})
      setAddMovie([])

      if(userInfo['profile_picture'] === undefined){

        setUserInfo({...userInfo, 
          id: userInfo['api_key'],
          friends: ['2'],
          profile_picture: default_user_pic
        })

      } else {
        setUserInfo({...userInfo, 
          id: userInfo['api_key'],
          friends: ['2'],
        })
      }
    }
  }

  const handleOnClickDeny = () => {
    setUserInfo({})

    const formInputs = document.getElementsByTagName('input')
    for(let i = 0; 4 > i; i++){
      formInputs[i].value = ""
    }

    dialog.close();
  }


  const handleOnClickConfirm = async () => {
    // console.log(userInfo)
    // console.log(userData)

    

    try {
      setLoading(true)
      dialog.close();
      
      if(userData[2]['id'] === userInfo['id']){

        navigate('/home')
        setLoading(false)
      } else {
  
        setUserData(prev => [
          prev[0], {
            user_name: prev[1]['user_name'], 
          favorite_movie: prev[1]['favorite_movie'], 
          profile_picture: prev[1]['profile_picture'], 
          id: prev[1]['id'],
          recommended_movies: prev[1]['recommended_movies'],
          friends: [prev[1]['friends'][0], userInfo['id']]
        },
          userInfo
        ])
      }

        let fetchedFavMovie = await fetchh(userInfo['favorite_movie']);
        setFavoriteMovie(fetchedFavMovie)
        document.getElementById('componentDiv').style.border = 'solid rgb(69, 129, 182) 3px'
        navigate('/home')
        setLoading(false)

    } catch (error) {
      setLoading(false)
      alert(error)
      console.log(error)
    }
  }

  const handleOnClickLogOut = () => {
    setUserInfo({})
    setFavoriteMovie({})
    setUserData(startingUserData)
    setSearchedMovie({})
    setAddMovie([])
    setViewingUsersFriends()
    document.getElementById('componentDiv').style.border = 'none'
    navigate("/Movie-Pals")
  }

  const handleClickHome = () => {

    navigate("/home")
  }

  const handleChangeSearchMovie = (e) => {

    setSearchMovie(e.target.value)
  }

  const handleChangeFavSubmit = async (e) => {
    e.preventDefault();
    
    let fetchedFavMovie = await fetchh(document.getElementById('favorite_movie').value);
    setFavoriteMovie(fetchedFavMovie)
    setUserInfo({
      user_name: userInfo['user_name'],
      favorite_movie: document.getElementById('favorite_movie').value,
      api_key: userInfo['api_key'],
      id: userInfo['id'],
      friends: userInfo['friends'],
      profile_picture: userInfo['profile_picture']
    }) 

    setUserData(prev => [
      prev[0], prev[1], 
      {
        user_name: prev[2]['user_name'],
        favorite_movie: document.getElementById('favorite_movie').value,
        api_key: prev[2]['api_key'],
        id: prev[2]['id'],
        friends: prev[2]['friends'],
        profile_picture: prev[2]['profile_picture']
      }
    ])
  }

  const handleOnChangeProfilePic = () => {

    const pictureFile = URL.createObjectURL(document.getElementById('profile_picture').files[0])

    setUserInfo({
      user_name: userInfo['user_name'],
      favorite_movie: userInfo['favorite_movie'],
      api_key: userInfo['api_key'],
      id: userInfo['id'],
      friends: userInfo['friends'],
      profile_picture: pictureFile
    })

    
  }

  const handleOnSubmitProfilePic = (e) => {
    e.preventDefault();
    setUserData(prev => [
      prev[0], prev[1], 
      {
        user_name: prev[2]['user_name'],
        favorite_movie: prev[2]['favorite_movie'], 
        profile_picture : userInfo['profile_picture'], 
        id: prev[2]['id'],
        recommended_movies: prev[2]['recommended_movies'],
        friends: prev[2]['friends']
      }
    ])
  }

  useEffect(() => {

    const searchMovieUseEffect = async() => {
      try {
        if (searchTrigger === true){
          setLoading(true)
          let fetchedSearchedMovie = await fetchh(searchMovie)
          setSearchedMovie(fetchedSearchedMovie)
          setSearchTrigger(false)
          setLoading(false)
          document.getElementById("searchContainer").style.visibility = "visible"
        }
      } catch (error) {
        alert(error)
        loading(false)
      }
    }
    searchMovieUseEffect();

  }, [searchTrigger])

  const handleSearchSubmit = (e) => {

    e.preventDefault();
    setSearchTrigger(true)
  }

  const handleClickAdd = (e) => {   
    try {
      if(addMovie.length === 8){
        throw new Error("Max recommended movies reached")

      } else if(addMovie.length === 0){

        setAddMovie([{
          movie_title: searchedMovie['movie_title'],
          movie_date: searchedMovie['movie_date'],
          movie_img: searchedMovie['movie_img'], 
          movie_id: searchedMovie['movie_id']  
        }])
        document.getElementById("searchContainer").style.visibility = "hidden"
        return
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
          document.getElementById("searchContainer").style.visibility = "hidden"
        } 

    } catch (error) {
      alert(error.message)
    }
  }
// fix the errors here
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




  

  // const viewingUserRecommendedFetch = async (x) => {
  //   try{
  //     let response = await fetch(`https://imdb-api.com/en/API/SearchMovie/${userInfo['api_key']}/${x}`) 
  //     let json = await response.json()

  //     return {
  //       movie_title: json.results[0].title,
  //       movie_date: json.results[0].description,
  //       movie_img: json.results[0].image,
  //       movie_id: json.results[0].id
  //     }

  //   } catch(error){
  //     console.log(error) 
  //   }
  // }

















  const handleOnClickFriend = async (e) => {
    try {


      setLoading(true)
    
      // if(e.target.classList[e.target.classList.length - 1] === viewingUser['id']){

      //   // our latest problem... if cleanup didnt already fix... pic updating on home but not when supposed to be
      //   // seen on friends list with the first visit.
      //   // let k = friendFriend.find((userMain) => userMain[0].id === userInfo['id'])
      //   // console.log(k)

      //   navigate('/friend')
      //   setLoading(false)
      //   return
      // }

      let clickedUser = userData.find((user) => user.id === e.target.classList[e.target.classList.length - 1])
      
      let friends = clickedUser.friends.map((friend) => {
        return userData.filter((user) => user['id'] === friend)
        });

      setViewingUsersFriends(friends)

      setViewingUser({
        user_name: clickedUser['user_name'],
        favorite_movie: clickedUser['favorite_movie'],
        profile_picture: clickedUser['profile_picture'],
        id: clickedUser['id'],
        recommended_movies: clickedUser['recommended_movies']
      })

      let fetchedViewingUserFavoriteMovie = await fetchh(clickedUser['favorite_movie'])
      setViewingUserFavoriteMovie(fetchedViewingUserFavoriteMovie)

      if (clickedUser['id'] === userInfo['api_key']){
        
        setViewingUserRecommends(addMovie)
      } else {
        let recommendedMovies = await Promise.all(clickedUser['recommended_movies'].map( (rec) => {
          return fetchh(rec)
        })) 
        setViewingUserRecommends(recommendedMovies)
      }

      navigate('/friend')
      setLoading(false)
      
    } catch (error) {
      setLoading(false)
      alert(error)
      console.log(error)
    }
  }

  return (
    <div id='componentDiv' className='mx-auto bg-white rounded'>
      {loading === true? <LoadingPage/> : null}
      <Routes >
        <Route   path='/home' element={<HomePage 
      profilePicture={userInfo['profile_picture']}
      userName={userInfo["user_name"]} 
      favoriteMovieTitle={favoriteMovie['movie_title']} 
      favoriteMovieImg={favoriteMovie['movie_img']} 
      favoriteMovieDate={favoriteMovie['movie_date']}
      
      searchedMovieImg={searchedMovie['movie_img']}
      searchedMovieTitle={searchedMovie['movie_title']}
      searchedMovieDate={searchedMovie['movie_date']}
      onClickAddMovie={handleClickAdd}
      addMovieArray={addMovie}
      onChangeSearchMovie={handleChangeSearchMovie}
      onSearchSubmit={handleSearchSubmit}
      // onChangeUserInfo={handleChangeUserInfo}
      onChangeProfilePic={handleOnChangeProfilePic}
      onSubmitProfilePic={handleOnSubmitProfilePic}
      onChangeFavSubmit={handleChangeFavSubmit}
      onPointerEnter={handleOnPointerEnter}
      onPointerLeave={handleOnPointerLeave}
      onClickRemove={handleClickRemove}
      onClickLogOut={handleOnClickLogOut}
      onClickHome={handleClickHome}
      onClickFriend={handleOnClickFriend}
      friendId={startingUserData[1].id}
      friendPic={startingUserData[1].profile_picture}
      friendName={startingUserData[1].user_name}
      // friendFriend={friendFriend}
      /> } />
        <Route path='/Movie-Pals' element={<FormPage 
      onChangeUserInfo={handleChangeUserInfo} 
      value={userInfo} 
      onFormSubmit={handleFormSubmit}
      userName={userInfo['user_name']}
      favoriteMovie={userInfo['favorite_movie']}
      onClickConfirm={handleOnClickConfirm}
      onClickDeny={handleOnClickDeny}
      /> }/>
        <Route path='/friend' element={<FriendsPage 
        viewingUserName={viewingUser['user_name']} 
        viewingUserImg={viewingUser['profile_picture']}
        viewingUserFavoriteMovieImage={viewingUserFavoriteMovie['movie_img']}
        onClickLogOut={handleOnClickLogOut}
        viewingUserRecommends={viewingUserRecommends}
        onClickHome={handleClickHome}
        viewingUserFavoriteMovieTitle={viewingUserFavoriteMovie['movie_title']}
        viewingUserFavoriteMovieDate={viewingUserFavoriteMovie['movie_date']}
        viewingUsersFriends={viewingUsersFriends}
        onClickFriend={handleOnClickFriend}
        />} />
      </Routes>
    </div>
  )  
}

main.render(
<Router >
  <Parent/>
</Router>)



