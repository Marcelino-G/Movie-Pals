import React, {useState, useEffect} from 'react';
import './App.css';

const Form = () => {

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

    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userInfo)
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>User Name:</label>
                <input type="text" id="user_name" onChange={handleChange}></input>

                <label>Favorite Movie:</label>
                <input type="text" id="favorite_movie" onChange={handleChange}></input>

                <label>IMDb-API Key:</label>
                <input type="password" id="api_key" onChange={handleChange}></input>
                <input type="submit"></input>
            </form>
        </div>
    )

    


}

export default Form;