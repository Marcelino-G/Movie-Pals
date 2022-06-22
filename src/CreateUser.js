import React from 'react';
import './App.css';


const CreateUser = (props) => {



  return (
      
      <div className="bg-primary container row justify-content-around mx-auto">
        <img className="col-4 border" alt="Loading..."/>
        <div className='col-4 border'>
          <span >{props.userName}</span>
          <p>{props.favoriteMovie}</p>
        </div>
      </div>
  );
}

export default CreateUser;
