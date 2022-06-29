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
        <input type="search" id='search' onChange={props.onChangeSearchInfo}></input>
        <input type="submit"></input>
      </form>
      <div id="searchContainer" className=''>
        <button onClick={props.onClick}>ADD</button>
        <img src={props.searchedMovieImg} />
          {props.searchedMovieTitle}
          {props.searchedMovieDate}
      </div>
      <section>
        <ul id='addContainer'>
          {props.addMovie.map((item) => (
            <li key={item["movie_id"]}>
              <img src={item['movie_img']}/>
              <span>{item['movie_title']}</span>
              <span>{item['movie_date']}</span>
              </li>
          )
          )}
        </ul>
      </section>
    </div>
  );
}

export default UserProfile;
