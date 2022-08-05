import './App.css';
import default_user_pic from './default_user_pic.png'

const HomePage = (props) => {

  return (
    <div className='row justify-content-around mx-auto py-3 gy-3'>


      <div id='moviePals' className='col-11 col-lg-10 row justify-content-between mt-3 rounded-top'>
        <h1 className='col-lg-6 fst-italic text-light'>Movie Pals</h1>
        <nav className='col-lg-5 col-xl-4'>
          <ul className='row justify-content-end justify-content-lg-between text-center fs-5 position-relative'>
            <li className='col-4 mx-3 mx-lg-0 col-lg-5 row' >
              <button onClick={props.onClickHome}>Home</button>
            </li>
            <li className='col-5 col-lg-6 row' >
              <button onClick={props.onClickLogOut}>Log Out</button>
            </li>
          </ul>
        </nav>
      </div>

      

      <section id='userSection' className='col-11 col-lg-6 row justify-content-evenly my-3 gy-3 py-3 text-center rounded bg-white'>

        <div id='userNameImgContainer' className='col-8 col-md-7 col-xxl-8 row justify-content-center rounded'>
          <h2 className='row'>
            <span className='text-capitalize fst-italic fw-semibold'>{props.userName}</span>
          </h2>
          <img id='profile_picDisplayed' className='border border-2 img-fluid pb-2 rounded-circle' alt="Loading.." src={props.profilePicture}/>
        </div>

        <section className='col-4 col-md-5 col-lg-5 col-xxl-4 row justify-content-start p-4 fw-semibold border-0 bg-white'>
          <p className='col-8 ' >Favorite Movie</p>
          <img id = "userFavoriteMovieDisplayed" className='col-8 img-fluid' alt="Loading..." src={props.favoriteMovieImg}/>
          <span className='col-8'>{props.favoriteMovieTitle} </span>
          <span className='col-8'>{props.favoriteMovieDate}</span>
        </section>

        
        <form className='col-5 rounded' onSubmit={props.onSubmitProfilePic}>
          <label className=' mb-1' htmlFor="profile_picture" >Change Profile Picture?</label>
          <input className='col-12 col-lg-12 ' accept='image/*' type="file" id="profile_picture" onChange={props.onChangeProfilePic}></input>
          <input className='col-lg-8 col-xxl-6 my-2 ' type="submit"></input>
        </form>

        <form className='col-5 rounded' onSubmit={props.onChangeFavSubmit}>
          <label className='mb-1'>Change Favorite Movie?</label>
          <input className='col-12' type="search" id="favorite_movie" required></input>
          <input className='col-lg-8 col-xxl-6 my-2' type="submit"></input>
        </form>
        
      </section>




      
      <section className='col-11 col-lg-4 text-center py-3 rounded' >
        <h2 className=''>Friends List</h2>
        <section className='border-0'>
          <ul className='row justify-content-evenly mx-auto'>
            <li className= {`col-6 col-md-5 col-xl-4 row justify-content-center rounded rounded-4 bg-white friendClick ${props.friendId}`} onClick={props.onClickFriend} id={props.friendId} key={props.friendId}>
              <img className={`img-fluid ${props.friendId}`} alt="loading..." src={props.friendPic} />
              <span className={`text-capitalize fst-italic fw-semibold ${props.friendId}`}>{props.friendName}</span>
            </li>
          </ul>
        </section>
      </section>
        

      <section id="search_section" className='col-4 col-lg-4 row justify-content-center text-center my-3 rounded'>
        <h2 className='my-2 fw-bold fs-5' >Search Movies</h2>
        <form className="row justify-content-between" onSubmit={props.onSearchSubmit}>
          <input id='search' className='col-12 col-lg-8' type="search"  onChange={props.onChangeSearchMovie} required></input>
          <input className='col-10 mx-auto mt-2 mt-lg-0 col-lg-4 col-xl-3' type="submit" value="Search"></input>
        </form>
        <section className="row justify-content-center py-2 my-1 fw-semibold" id="searchContainer">
          <button id='add_button' className='col-8 mb-2' onClick={props.onClickAddMovie}>ADD</button>
          <img id='searched_movie' className='col-12 col-lg-7 img-fluid' src={props.searchedMovieImg} alt={props.searchedMovieTitle} />
          <span className=' ' >{props.searchedMovieTitle}</span>
          <span className='' >{props.searchedMovieDate}</span>
        </section>
      </section>

      

      

      <section id='recSection' className="col-7 text-center py-3 rounded">

        <h2 className='fw-bold mb-2'>
          <span className='text-capitalize'>{`${props.userName}'s`} </span>
          <span>recommended movies</span>
        </h2>
        
        <section className=''>
          <ul className='row mx-auto justify-content-evenly fw-semibold' id='addContainer'>
            {props.addMovieArray.map((item) => (
              
              <li  onPointerEnter={props.onPointerEnter} onPointerLeave={props.onPointerLeave} className='col-6 col-lg-4 col-xxl-3 row gy-1 justify-content-center text-center' key={item["movie_id"]}>
                <button onClick={props.onClickRemove} className='removeBtn col-lg-6' id={item["movie_id"]} >Remove</button>
                <img className='col-9 img-fluid recImg' src={item['movie_img']}/>
                <span className='' >{item['movie_title']}</span>
                <span className=''>{item['movie_date']}</span>
              </li>)
            )}
          </ul>
        </section>
      </section>

    </div>
  );
}

export default HomePage;
