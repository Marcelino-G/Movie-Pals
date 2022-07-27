import React, {useEffect} from 'react';
import './App.css';
import friend_pic from './friend_pic.png'
import friendsData from './FriendsData';

const UserProfile = (props) => {

  return (
    <div className='border row justify-content-around mx-auto bg-success'>

      <nav className='border bg-danger'>
        <ul className='border d-flex justify-content-end bg-success'>
          <li className='border' onClick={props.onClickProfile}>Home</li>
          <li className='border' onClick={props.onClickLogOut}>Log Out</li>
        </ul>
      </nav>

      <section className='border col-6 row justify-content-evenly bg-primary'>

        <div className='row col-6 border bg-warning'>
          <span className='border text-center'>{props.userName}</span>
          <img className='border img-fluid' src={props.profilePicture === undefined? friend_pic : props.profilePicture}/>
        </div>

        <section className='border col-4 row justify-content-start text-center bg-danger p-4'>
          <span className='border col-8' >Favorite Movie</span>
          <img className='col-8 img-fluid border' alt="Loading..." src={props.favoriteMovieImg}/>
          <span className='col-8'>{props.favoriteMovieTitle} </span>
          <span className='col-8'>{props.favoriteMovieDate}</span>
        </section>

        
        <form className='border col-5 bg-danger' onSubmit={props.onSubmitProfilePic}>
          <label className='border' htmlFor="profile_picture" >Change Profile Picture?</label>
          <input className='border col-8 ' accept='image/*' type="file" id="profile_picture" onChange={props.onChangeProfilePic}></input>
          <input className='border col-3 offset-1' type="submit"></input>
        </form>

        <form className='col-5 border bg-primary' onSubmit={props.onChangeFavSubmit}>
          <label className='col-12'>Change Favorite Movie</label>
          <input className='col-8' type="search" id="favorite_movie" required></input>
          <input className='col-3 offset-1' type="submit"></input>
        </form>
        
        
      </section>





      <section className='col-4 border bg-warning text-center' >
        <h1 className='border'>Friends List</h1>
        <section className='border row justify-content-evenly mx-auto'>
          {friendsData.map((friend) => (
            <div className='border col-4 row justify-content-center' onClick={props.onClickFriend} id={friend.id} key={friend.id}>
              <img className='back img-fluid' alt="loading..." src='#' />
              <span className='back'>{friend['user_name']}</span>
            </div>
          ))}
        </section>
      </section>
        

      <section id="search_section" className='col-4 row justify-content-center border text-center bg-danger'>
        <span className='border' >Search Movies</span>
        <form className="row justify-content-between border" onSubmit={props.onSubmit}>
          <input className='col-8' type="search" id='search' onChange={props.onChangeSearchInfo} required></input>
          <input className='col-3' type="submit" value="Search"></input>
        </form>
        <div className="bg-primary row justify-content-center border" id="searchContainer">
          <button id='add_button' className='col-6' onClick={props.onClick}>ADD</button>
          <img id='searched_movie' className='col-7 img-fluid' src={props.searchedMovieImg} alt="" />
          <span className=' ' >{props.searchedMovieTitle}</span>
          <span className='' >{props.searchedMovieDate}</span>
        </div>
      </section>

      

      

      <section id='recList' className="col-7 border text-center bg-primary">
        <p className=' border' >{props.userName}'s Recommended movies</p>
        <ul className='row mx-auto justify-content-evenly border bg-warning' id='addContainer'>
          {props.addMovie.map((item) => (
            
            <li  onPointerEnter={props.onPointerEnter} onPointerLeave={props.onPointerLeave} className='col-3 row justify-content-center text-center border border-danger listt overflow-auto' key={item["movie_id"]}>
              <button onClick={props.onClickRemove} className='removeBtn col-6' id={item["movie_id"]} >Remove</button>
              <img className='col-9 img-fluid border movie_list' src={item['movie_img']}/>
              <span className=' border ' >{item['movie_title']}</span>
              <span className=' border'>{item['movie_date']}</span>
            </li>)
          )}
        </ul>
      </section>

    </div>
  );
}

export default UserProfile;
