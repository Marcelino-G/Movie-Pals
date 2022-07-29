import './App.css';
import default_user_pic from './default_user_pic.png'

const HomePage = (props) => {

  return (
    <div className='border row justify-content-around mx-auto bg-success py-3 gy-3'>


      <div className='border col-10 row justify-content-between mt-3'>
        <h1 className='fst-italic bg-primary col-6'>Movie Pals</h1>
        <nav className='col-3 border bg-danger'>
          <ul className='border bg-primary row justify-content-between text-center fs-5'>
            <li className='border col-5 ' onClick={props.onClickProfile}>Home</li>
            <li className='border col-6' onClick={props.onClickLogOut}>Log Out</li>
          </ul>
        </nav>
      </div>

      

      <section className='border col-6 row justify-content-evenly bg-primary my-3 gy-3 py-3 text-center'>

        <div id='userInfoContainer' className='row justify-content-center col-6 border bg-warning'>
          <h2 className='border row bg-danger '>
            <span className='border bg-primary text-capitalize fst-italic fw-semibold'>{props.userName}</span>
          </h2>
          <img id='profile_picDisplayed' className='border img-fluid pb-2' alt="Loading.." src={props.profilePicture === undefined? default_user_pic : props.profilePicture}/>
        </div>

        <section className='border col-4 row justify-content-start bg-danger p-4 fw-semibold'>
          <p className='border col-8 ' >Favorite Movie</p>
          <img id = "userFavoriteMovieDisplayed" className='col-8 img-fluid border' alt="Loading..." src={props.favoriteMovieImg}/>
          <span className='col-8'>{props.favoriteMovieTitle} </span>
          <span className='col-8'>{props.favoriteMovieDate}</span>
        </section>

        
        <form className='border col-5 bg-danger' onSubmit={props.onSubmitProfilePic}>
          <label className='border mb-1' htmlFor="profile_picture" >Change Profile Picture?</label>
          <input className='border col-8 ' accept='image/*' type="file" id="profile_picture" onChange={props.onChangeProfilePic}></input>
          <input className='border col-3 offset-1' type="submit"></input>
        </form>

        <form className='col-5 border bg-primary ' onSubmit={props.onChangeFavSubmit}>
          <label className='col-12 mb-1'>Change Favorite Movie?</label>
          <input className='col-8' type="search" id="favorite_movie" required></input>
          <input className='col-3 offset-1' type="submit"></input>
        </form>
        
      </section>




      
      <section className='col-4 border bg-warning text-center py-3' >
        <h2 className='border'>Friends List</h2>
        <section className=''>
          <ul className='border row justify-content-evenly mx-auto'>
            <li className= {`border col-4 row justify-content-center friendClick ${props.friendId}`} onClick={props.onClickFriend} id={props.friendId} key={props.friendId}>
              <img className={`img-fluid ${props.friendId}`} alt="loading..." src={props.friendPic} />
              <span className={`text-capitalize fst-italic fw-semibold ${props.friendId}`}>{props.friendName}</span>
            </li>
          </ul>
        </section>
      </section>
        

      <section id="search_section" className='col-4 row justify-content-center border text-center bg-danger my-3'>
        <h2 className='border my-2 fw-bold fs-5' >Search Movies</h2>
        <form className="row justify-content-between border " onSubmit={props.onSearchSubmit}>
          <input id='search' className='col-8' type="search"  onChange={props.onChangeSearchMovie} required></input>
          <input className='col-3' type="submit" value="Search"></input>
        </form>
        <section className="bg-primary row justify-content-center border py-2 my-1 fw-semibold" id="searchContainer">
          <button id='add_button' className='col-6 mb-2' onClick={props.onClickAddMovie}>ADD</button>
          <img id='searched_movie' className='col-7 img-fluid' src={props.searchedMovieImg} alt="" />
          <span className=' ' >{props.searchedMovieTitle}</span>
          <span className='' >{props.searchedMovieDate}</span>
        </section>
      </section>

      

      

      <section id='recSection' className="col-7 border text-center bg-primary py-3">

        <h2 className='fw-bold mb-2'>
          <span className='text-capitalize'>{`${props.userName}'s`} </span>
          <span>recommended movies</span>
        </h2>
        
        <section className='border'>
          <ul className='row mx-auto justify-content-evenly fw-semibold bg-warning' id='addContainer'>
            {props.addMovieArray.map((item) => (
              
              <li  onPointerEnter={props.onPointerEnter} onPointerLeave={props.onPointerLeave} className='col-3 row gy-1 justify-content-center text-center border border-danger ' key={item["movie_id"]}>
                <button onClick={props.onClickRemove} className='removeBtn col-6' id={item["movie_id"]} >Remove</button>
                <img className='col-9 img-fluid border recImg' src={item['movie_img']}/>
                <span className=' border ' >{item['movie_title']}</span>
                <span className=' border'>{item['movie_date']}</span>
              </li>)
            )}
          </ul>
        </section>
      </section>

    </div>
  );
}

export default HomePage;
