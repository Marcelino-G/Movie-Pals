import React, {useEffect} from 'react';
import './App.css';

const UserProfile = (props) => {

  return (
    <div className='row justify-content-around border border-info'>

      <section className='col-7 row justify-content-start border my-1'>
        <span className='border col-12 fs-3'>{props.userName}</span>
        <img className='border col-7 img-fluid' src={props.profilePicture}/>
        <section className='col-5 row justify-content-center border'>
          <span className='col-12 text-center border mt-4' >Favorite Movie</span>
          <img className="col-8 img-fluid border" alt="Loading..." src={props.favoriteMovieImg}/>
          <span className='col-12 text-center border '>{props.favoriteMovieTitle}</span>
          <span className='col-12 text-center border mb-4'>{props.favoriteMovieDate}</span>
        </section>
        <input type="file"></input>
      </section>

      <section className='col-4 border my-1' >
        <h1>Friends List</h1>
      </section>
        

      <section className='col-4 row justify-content-center border my-1'>
        <span className='col-12 border text-center' >Search Movies</span>
        <form className="col-12 row border" onSubmit={props.onSubmit}>
          <input className='col-9' type="search" id='search' onChange={props.onChangeSearchInfo}></input>
          <input className='col-3' type="submit" value="Search"></input>
        </form>
        <div className="col-12 row justify-content-center border" id="searchContainer">
          <button className='col-6' onClick={props.onClick}>ADD</button>
          <img className='col-7 img-fluid' src={props.searchedMovieImg} alt="" />
          <span className='border text-center' >{props.searchedMovieTitle}</span>
          <span className='border text-center' >{props.searchedMovieDate}</span>
        </div>
      </section>

      

      

      <section className="col-7 row justify-content-center border my-1">
        <p className='col-12 border' >{props.userName}'s Recommended movies</p>
        <ul className='row justify-content-evenly border border-warning' id='addContainer'>
          {props.addMovie.map((item) => (
            <li className='col-3 row justify-content-center border border-danger' key={item["movie_id"]}>
              <img className='col-9 img-fluid border' src={item['movie_img']}/>
              <span className='text-center' >{item['movie_title']}</span>
              <span className='text-center'>{item['movie_date']}</span>
              </li>
          )
          )}
        </ul>
      </section>

    </div>
  );
}

export default UserProfile;
