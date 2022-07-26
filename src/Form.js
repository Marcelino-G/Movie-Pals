import React, {useState} from 'react';
import './App.css';
import Logo from './Logo.png'

const Form = (props) => {

    return (
        <div className='position-absolute top-50 start-50 translate-middle bg-success row p-3'>
            
            <div className='col row justify-content-center mx-auto bg-warning p-1'>
                <h1 className=' bg-primary'>Movie Pals</h1>

                <form onSubmit={props.onFormSubmit} className=" row bg-danger justify-content-center">
                    <div className=' row my-1'>
                        <label className=''>User Name</label>
                        <input className='' type="text" id="user_name" required onChange={props.onChangeUserInfo}></input>
                    </div>

                    <div className=' row my-1'>
                        <label className=''>Favorite Movie</label>
                        <input className='' type="text" id="favorite_movie" required onChange={props.onChangeUserInfo}></input>
                    </div>
            
                    <div className=' row my-1'>
                        <label className=' col'>IMDb-API Key</label>
                        <details className='col-2 border '>
                            <summary >?</summary>
                            <span className='position-absolute end-50'>
                                <ul className='bg-secondary'>
                                    <li>Register for an IMDb-API Key <a href='https://imdb-api.com/Identity/Account/Register'>here</a>.</li>
                                    <li>Once logged in, head over to "Profile".</li>
                                    <li>Copy and paste your own personal API Key.</li>
                                </ul>
                            </span>
                        </details>
                        <input className='' type="password" id="api_key" required onChange={props.onChangeUserInfo}></input>
                    </div>

                    <div className=' row my-1'>
                        <label className='' htmlFor="profile_picture" >Profile Picture?</label>
                        <input className='' accept='image/*' type="file" id="profile_picture" onChange={props.onChangeUserInfo}></input>
                    </div>

                    <input className=' col-5 my-1' type="submit"></input>
                </form>
                
            </div>
            <img id="logo" className=' col-5 img-fluid' src={Logo} />

            
            <dialog className=' w-25 bg-warning text-center' id="confirm" >
                <p className=' '>is this correct?</p>
                <ul className=' bg-danger row mx-auto '>
                    <li className=' col-11'>{props.userName}</li>
                    <li className=' col-11'>{props.favoriteMovie}</li>
                </ul>
                <div className=' row justify-content-center bg-danger mx-auto'>
                    <button className='mx-1 col-3' onClick={props.onClickConfirm}>yes</button>
                    <button className='mx-1 col-3' onClick={props.onClickConfirm}>no</button>
                </div>
                
            </dialog>
        </div>
    )
}

export default Form;
