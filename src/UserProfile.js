import React, {useEffect} from 'react';
import './App.css';

const UserProfile = (props) => {

  return (
    <div className='row justify-content-around border border-info '>

      <section className='col-4 row border'>
        <span className='border col-12 fs-3'>{props.userName}</span>
        <img className='border col-10 img-fluid' src={props.profilePicture}/>
        <input type="file"></input>
      </section>
        
      <section className='col-4  row justify-content-center border'>
        <span className='col-12 text-center border' >Favorite Movie</span>
        <img className="col-6 img-fluid border" alt="Loading..." src={props.favoriteMovieImg}/>
        <span className='col-12 text-center border '>{props.favoriteMovieTitle}</span>
        <span className='col-12 text-center border'>{props.favoriteMovieDate}</span>
      </section>

      <section className='col-4 border'>
        <span>Search Movies</span>
        <form className="row border" onSubmit={props.onSubmit}>
          <input className='col-8' type="search" id='search' onChange={props.onChangeSearchInfo}></input>
          <input className='col-4' type="submit" value="Search"></input>
        </form>
        <div className="row border" id="searchContainer">
          <img className='col-6 img-fluid' src={props.searchedMovieImg} alt="" />
          <span>{props.searchedMovieTitle}</span>
          <span>{props.searchedMovieDate}</span>
          <button onClick={props.onClick}>ADD</button>
        </div>
      </section>

      

      

      {/* <section className="col">
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
      </section> */}

    </div>
  );
}

export default UserProfile;
