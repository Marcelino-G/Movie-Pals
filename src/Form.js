import React, {useState} from 'react';
import './App.css';

const Form = (props) => {

    return (
        <div className='row justify-content-center w-50 position-relative top-50 start-50 translate-middle py-2 border border-warning border-2 bg-success'>
            
            <div className='row'>
                <h1 className='col-6 offset-2'>Movie Pals</h1>
                <img className='col-2 img-fluid' src='#' />
            </div>

            <form onSubmit={props.onSubmit} className="col-8 row justify-content-center">
                <div className='col-12 row my-1'>
                    <label className='col-12'>User Name</label>
                    <input className='col-12' type="text" id="user_name" required onChange={props.onChangeUserInfo}></input>
                </div>

                <div className='col-12 row my-1'>
                    <label className=''>Favorite Movie</label>
                    <input className='' type="text" id="favorite_movie" required onChange={props.onChangeUserInfo}></input>
                </div>
            
                <div className='col-12 row my-1'>
                    <label className=''>IMDb-API Key</label>
                    <input className='' type="password" id="api_key" required onChange={props.onChangeUserInfo}></input>
                </div>

                <div className='col- row my-1'>
                    <label className='col-12' htmlFor="profile_picture" >Profile Picture?</label>
                    <input className='col-12' accept='image/*' type="file" id="profile_picture" onChange={props.onChangeUserInfo}></input>
                </div>
            
                <input className='col-8 mt-2' type="submit"></input>
            </form>

        </div>
    )
}

export default Form;
