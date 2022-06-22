import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import CreateUser from './CreateUser';
import Form from './UserForm'
// import CreateUser from './CreateUser';

const root = ReactDOM.createRoot(document.getElementById('main'));
// let favoriteMovieIMG = ""

const Parent = () => {

  const [userInfo, setUserInfo] = useState({
    user_name: "",
    favorite_movie: "",
    api_key: "",
  })

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

  // const handleFavImgChange = () => {



  // }


  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(`https://imdb-api.com/en/API/SearchMovie/${userInfo['api_key']}/${userInfo['favorite_movie']}`)
    if (response.ok === true && response.results !== null){
      let json = await response.json()
      console.log(json)
      // favoriteMovieIMG = json['results'][0]['image']
    } else {
      console.log(response.ok)
      console.log(response.status)
      console.log(response.statusText)
    } 
}

  return (
    <div>
      <Form onChange={handleChange} value={userInfo} onSubmit={handleSubmit}/>
      <CreateUser userName={userInfo["user_name"]} favoriteMovie={userInfo["favorite_movie"]}/>
    </div>
  )
}

root.render(<Parent/>)



