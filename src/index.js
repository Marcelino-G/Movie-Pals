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
  })
  const [favoriteMovie, setFavoriteMovie] = useState({
    movie_title: "",
    movie_date: "",
    movie_img: "#"
  });
  const [addMovie, setAddMovie] = useState({
    movie_title: "",
    movie_date: "",
    movie_img: "#"
  })

  const [searchMovie, setSearchMovie] = useState("#")
  const [movieDisplay, setMovieDisplay] = useState("#")

  useEffect(() => {

    const fetchh = async (x, y, z) => {
      let response = await fetch(`https://imdb-api.com/en/API/SearchMovie/${userInfo['api_key']}/${x}`) 
      let json = await response.json()
      console.log(json)
      y(() => ({
        ...z, 
        movie_title: json['results'][0]['title'],
        movie_date: json['results'][0]['description'],
        movie_img: json['results'][0]['image']
      }))
    }

    if(userInfo['favorite_movie'] !== ""){
      fetchh(userInfo['favorite_movie'], setFavoriteMovie, favoriteMovie);
    }

    if (searchMovie !== "#"){
      fetchh(searchMovie, setAddMovie, addMovie)
    }
  }, [userInfo['favorite_movie'], searchMovie])

  const handleChange = (e) => {

    if (e.target.id === "user_name"){
       return setUserInfo({
          ...userInfo,
          user_name: e.target.value
      })
    } else if (e.target.id === "api_key"){
        setUserInfo({
          ...userInfo,
          api_key: e.target.value
      })
    }
  }

  const handleFormSubmit = (e) => {

    e.preventDefault();
    const favMovie = document.getElementById("favorite_movie").value
      setUserInfo({
          ...userInfo,
          favorite_movie: favMovie
    })
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const search = document.getElementById("search").value
    setSearchMovie(search)
  }

  


  return (
    <div>
      {
      userInfo['favorite_movie'] !== "" ? 
      <UserProfile 
      userName={userInfo["user_name"]} 
      favoriteMovieTitle={favoriteMovie['movie_title']} 
      favoriteMovieImg={favoriteMovie['movie_img']} 
      favoriteMovieDate={favoriteMovie['movie_date']}
      onSubmit={handleSearchSubmit}
      addMovieImg={addMovie['movie_img']}
      addMovieTitle={addMovie['movie_title']}
      addMovieDate={addMovie['movie_date']}
      /> 
      : 
      <Form 
      onChange={handleChange} 
      value={userInfo} 
      onSubmit={handleFormSubmit}
      /> 
      }
    </div>
  )
}

main.render(<Parent/>)


