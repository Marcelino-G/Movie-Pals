import React, {useEffect} from 'react';
import './App.css';


const UserProfile = (props) => {

  
  return (
      
      <div className="bg-primary container row justify-content-around mx-auto">
        <img className="col-4 border" alt="Loading..." src={props.favoriteMovieIMG}/>
        <div className='col-4 border'>
          <span >{props.userName}</span>
          <p>{props.favoriteMovie}</p>
        </div>
      </div>
  );
}

export default UserProfile;
