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


    const searchUseEffect = async() => {

      try {
        
        if (searchTrigger === true){
          await fetchh(searchMovie, setSearchedMovie)
          // if(returned[0] === 200 && returned[1] !== null){
          //   const add_button = document.getElementById("add_button")
          //   add_button.removeAttribute('disabled')
          // } else {
          //   const add_button = document.getElementById("add_button")
          //   add_button.setAttribute('disabled', '')
          // }



        }

        console.log(addMovie)

        // console.log(addMovie)

        // if(formTrigger === true){
        //   if(searchedMovie['movie_title'] === ""){
        //     const addButton = document.getElementById("add_button")
        //     addButton.setAttribute('disabled', '')
        //   } else{
        //     const addButton = document.getElementById("add_button")
        //     addButton.removeAttribute('disabled')
        //   }
        // }
        

      } catch (error) {
        alert(error)
      }


    }

    
    
    searchUseEffect();

    // try {

    //   if (searchTrigger === true){
    //     fetchh(searchMovie, setSearchedMovie)
    //   }  
    // } catch (error) {
    //   alert(error)
    // }

    

    
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
            setSearchTrigger(false)
            // return ([response['status'], json['results']])
            
            
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
      // console.log(e.target.files)
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
      // setFormTrigger(true)
      // console.log(returned[0])

      // if(returned[0] === 200 && returned[1] !== null){
      //   console.log("asa")
      //   console.log(formTrigger)
      //     if(formTrigger === true){

      //       console.log("aslasla")
      //     }
      //   }

      // if(response.status === 200 && json['results'] !== null){
        
      //   if(formTrigger === true){

      //     console.log("aslasla")
      //   }
      // }

      
    } catch (error) {
      alert(error)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTrigger(true)
    
  }

  const hoverRemove =  (e) => {
    e.target.style.display = "none"
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

  const handleClickRemoveList = (e) => {

    const removeItem = e.target.id
    // console.log(removeItem)
    setAddMovie(addMovie.filter(movie => movie['movie_id'] !== removeItem))
    // console.log(addMovie)




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
      onChangeUserInfo={handleChangeUserInfo}
      onFormSubmit={handleFormSubmit}
      onClickRemove={handleClickRemoveList}
      onHover={hoverRemove}
      /> 
      : 
      <Form 
      onChangeUserInfo={handleChangeUserInfo} 
      value={userInfo} 
      onFormSubmit={handleFormSubmit}
      /> 
      }
    </div>
  )
}

main.render(<Parent/>)


