import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import UserProfile from './UserProfile';
import Form from './Form'

const main = ReactDOM.createRoot(document.getElementById('main'));

const Parent = (props) => {

  const [userInfo, setUserInfo] = useState({
    user_name: "",
    favorite_movie: "",
    api_key: "",
  })

  const [submitButton, setSubmitButton] = useState(false)
  const [favoriteMovieIMG, setFavoriteMovieIMG] = useState("#")

  useEffect(() => {
    
    const fetchh = async () => {
      let response = await fetch(`https://imdb-api.com/en/API/SearchMovie/${userInfo['api_key']}/${userInfo['favorite_movie']}`) 
      let json = await response.json()
      setFavoriteMovieIMG(json['results'][0]['image'])
      console.log(json)
    }
    if(submitButton === true){
      fetchh();
    }
  }, [submitButton])

  const handleChange = (e) => {

    if (e.target.id === "user_name"){
        setUserInfo({
          ...userInfo,
          user_name: e.target.value
      })
    } else if (e.target.id === "favorite_movie"){
        setUserInfo({
          ...userInfo,
          favorite_movie: e.target.value
      })
    } else if (e.target.id === "api_key"){
        setUserInfo({
          ...userInfo,
          api_key: e.target.value
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitButton(!submitButton)
    // let response = await fetch(`https://imdb-api.com/en/API/SearchMovie/${userInfo['api_key']}/${userInfo['favorite_movie']}`)
    // if (response.ok === true && response.results !== null){
    //   let json = await response.json()
    //   favoriteMovieIMG = await json['results'][0]['image']
    //   console.log(json)
      // root.render(<CreateUser userName={userInfo["user_name"]} favoriteMovie={userInfo["favorite_movie"]} favoriteMovieIMG={favoriteMovieIMG}/>)
      
    // } else {
    //   console.log(response.ok)
    //   console.log(response.status)
    //   console.log(response.statusText)
    // } 
    // console.log(favoriteMovieIMG)
  }

  // const handleFavoriteMovie = async (x) => {
  //   favoriteMovieIMG =  await x['results'][0]['image']
  // }

  return (
    <div>
      <Form onChange={handleChange} value={userInfo} onSubmit={handleSubmit}/>

      <UserProfile userName={userInfo["user_name"]} favoriteMovie={userInfo["favorite_movie"]} favoriteMovieIMG={favoriteMovieIMG}/>
    </div>
  )
}

main.render(<Parent/>)



