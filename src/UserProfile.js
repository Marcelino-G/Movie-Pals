import React, {useEffect} from 'react';
import './App.css';
import friend_pic from './friend_pic.png'
import friendsData from './FriendsData';

const UserProfile = (props) => {

  return (
    <div className='row justify-content-around border border-info'>

      <nav>
        <ul>
          <li onClick={props.onClickLogOut}>Log Out</li>
          <li onClick={props.onClickProfile}>Home</li>
        </ul>
      </nav>

      <section className='col-7 row justify-content-start border my-1'>
        <span className='border col-12 fs-3'>{props.userName}</span>
        <img className='border col-7 img-fluid' src={props.profilePicture === undefined? friend_pic : props.profilePicture}/>
        <section className='col-5 row justify-content-center border'>
          <span className='col-12 text-center border mt-4' >Favorite Movie</span>
          <img className="col-8 img-fluid border" alt="Loading..." src={props.favoriteMovieImg}/>
          <span className='col-12 text-center border '>{props.favoriteMovieTitle}</span>
          <span className='col-12 text-center border mb-4'>{props.favoriteMovieDate}</span>
        </section>
        <form className='col-6 border' onSubmit={props.onSubmitProfilePic}>
          <label className='col-12 border' htmlFor="profile_picture" >Change Profile Picture?</label>
          <input className='col-12 ' accept='image/*' type="file" id="profile_picture" onChange={props.onChangeProfilePic}></input>
          <input className='col-3 offset-1 mt-2 border' type="submit"></input>
        </form>
        <form className=' col-6 border' onSubmit={props.onChangeFavSubmit}>
          <label className='col-12 text-center border'>Change Favorite Movie</label>
          <input className='col-8 border' type="search" id="favorite_movie" required></input>
          <input className='col-3 offset-1 mt-2 border' type="submit"></input>
        </form>
      </section>

      <section className='col-4 border my-1' >
        <h1>Friends List</h1>
        <section>
          {friendsData.map((friend) => (
            <div className='border' onClick={props.onClickFriend} id={friend.id} key={friend.id}>
              <img className='back' alt="loading..." src='#' />
              <span className='back'>{friend['user_name']}</span>
            </div>
          ))}
        </section>
      </section>
        

      <section id="search_section" className='col-4 row justify-content-center border my-1'>
        <span className='col-12 border text-center' >Search Movies</span>
        <form className="col-12 row border" onSubmit={props.onSubmit}>
          <input className='col-9' type="search" id='search' onChange={props.onChangeSearchInfo} required></input>
          <input className='col-3' type="submit" value="Search"></input>
        </form>
        <div className="col-12 row justify-content-center border" id="searchContainer">
          <button id='add_button' className='col-6' onClick={props.onClick}>ADD</button>
          <img id='searched_movie' className='col-7 img-fluid' src={props.searchedMovieImg} alt="" />
          <span className='border text-center' >{props.searchedMovieTitle}</span>
          <span className='border text-center' >{props.searchedMovieDate}</span>
        </div>
      </section>

      

      

      <section className="col-7 row justify-content-center border my-1">
        <p className='col-12 border' >{props.userName}'s Recommended movies</p>
        <ul className='row justify-content-evenly border border-warning' id='addContainer'>
          {props.addMovie.map((item) => (
            
            <li  onPointerEnter={props.onPointerEnter} onPointerLeave={props.onPointerLeave} className='col-3 row no-gutters justify-content-center border border-danger listt overflow-auto' key={item["movie_id"]}>
              <button onClick={props.onClickRemove} className='removeBtn' id={item["movie_id"]} >Remove</button>
              <img className='col-9 img-fluid border p-0 movie_list' src={item['movie_img']}/>
              <span className=' border text-center' >{item['movie_title']}</span>
              <span className=' border text-center'>{item['movie_date']}</span>
            </li>)
          )}
        </ul>
      </section>

    </div>
  );
}

export default UserProfile;
