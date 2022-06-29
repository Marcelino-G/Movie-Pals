import React, {useState} from 'react';
import './App.css';

const Form = (props) => {

    return (
        <form onSubmit={props.onSubmit}>
            <label>User Name:</label>
            <input type="text" id="user_name" onChange={props.onChangeUserInfo}></input>

            <label>Favorite Movie:</label>
            <input type="text" id="favorite_movie" onChange={props.onChangeUserInfo}></input>

            <label>IMDb-API Key:</label>
            <input type="password" id="api_key" onChange={props.onChangeUserInfo}></input>
            <input type="submit"></input>
        </form>
    )
}

export default Form;
