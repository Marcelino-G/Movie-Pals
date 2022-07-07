import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import UserProfile from './UserProfile';
import Form from './Form'

const main = ReactDOM.createRoot(document.getElementById('main'));

const Parent = () => {

  const [userInfo, setUserInfo] = useState({
    user_name: "",
    favorite_movie: "",
    api_key: "",
    profile_picture: ""
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
  const [formTrigger, setFormTrigger] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState(false)

  useEffect(() => {

    if (searchTrigger === true){
      fetchh(searchMovie, setSearchedMovie)
      return
    }  
  }, [formTrigger, searchTrigger])

  const fetchh = async (x, y) => {

    try {

      let response = await fetch(`https://imdb-api.com/en/API/SearchMovie/${userInfo['api_key']}/${x}`) 
      let json = await response.json()
      console.log(json)

      if (json['results'] === null){
        throw new Error(`${json['errorMessage']}. Try again tomorrow.`)
      } else if (json['results'].length === 0 ) {
          throw new Error('Film could not be found. Please check spelling for "Favorite Movie".')
        } else {

            y(() => ({
              movie_title: json['results'][0]['title'],
              movie_date: json['results'][0]['description'],
              movie_img: json['results'][0]['image'],
              movie_id: json['results'][0]["id"]
            }))
            setSearchTrigger(false)
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
      await fetchh(userInfo['favorite_movie'], setFavoriteMovie);
      setFormTrigger(true)
    } catch (error) {
      alert(error)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTrigger(true)
  }

  const handleClickAdd = () => {    

    try {

      if(addMovie.length === 0){

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

  return (
    <div className='container border border-3 border-danger h-100'>
      {formTrigger === true ? 
      <UserProfile 
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
      /> 
      : 
      <Form 
      onChangeUserInfo={handleChangeUserInfo} 
      value={userInfo} 
      onSubmit={handleFormSubmit}
      /> 
      }
    </div>
  )
}

main.render(<Parent/>)


