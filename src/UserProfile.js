import React, {useEffect} from 'react';
import './App.css';

const UserProfile = (props) => {

  return (
    <div>
      <main className="bg-primary container row justify-content-around mx-auto">
        <img className="col-4 border" alt="Loading..." src={props.favoriteMovieImg}/>
        <div className='col-4 border'>
          <span>{props.userName}</span>
          <span>{props.favoriteMovieTitle}</span>
          <span>{props.favoriteMovieDate}</span>
        </div>
      </main>
      <form onSubmit={props.onSubmit}>
        <input type="text" id='search' onChange={props.onChange}></input>
        <input type="submit"></input>
      </form>
      <section>
        <ul>
          <li>
            <img src={props.addMovieImg} />
            {props.addMovieTitle}
            {props.addMovieDate}
          </li>
        </ul>
      </section>
    </div>
  );
}

export default UserProfile;
