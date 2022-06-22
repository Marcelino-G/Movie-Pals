import React from 'react';
import './App.css';

const Form = (props) => {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <label>User Name:</label>
                <input type="text" id="user_name" onChange={props.onChange}></input>

                <label>Favorite Movie:</label>
                <input type="text" id="favorite_movie" onChange={props.onChange}></input>

                <label>IMDb-API Key:</label>
                <input type="password" id="api_key" onChange={props.onChange}></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default Form;