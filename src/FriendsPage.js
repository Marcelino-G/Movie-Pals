import './App.css';

const FriendsPage = (props) => {

  return (
    <div className='row justify-content-around mx-auto py-3 gy-3'>

      <div id='moviePals' className='col-10 row justify-content-between mt-3 rounded-top'>
        <h1 className='fst-italic col-6 text-light'>Movie Pals</h1>
        <nav className='col-3'>
          <ul className='row justify-content-between text-center fs-5 position-relative'>
            <li className='col-5 row' >
              <button onClick={props.onClickHome}>Home</button>
            </li>
            <li className='col-6 row ' >
              <button onClick={props.onClickLogOut}>Log Out</button>
            </li>
          </ul>
        </nav>
      </div>

      <section id='userSection' className='col-6 row justify-content-evenly my-3 gy-3 py-3 text-center rounded bg-white'>

        <div id='userNameImgContainer' className='row justify-content-center col-6 rounded'>
          <h2 className='row'>
            <span className='text-capitalize fst-italic fw-semibold'>{props.viewingUserName}</span>
          </h2>
          <img id='profile_picDisplayed' className='border img-fluid pb-2 rounded-circle' alt="loading..." src={props.viewingUserImg}/>
        </div>

        <section className='col-4 row justify-content-start p-4 fw-semibold border-0 bg-white'>
          <p className='border col-8' >Favorite Movie</p>
          <img id = "userFavoriteMovieDisplayed" className="col-8 img-fluid border" alt="Loading..." src={props.viewingUserFavoriteMovieImage} />
          <span className='col-8 '>{props.viewingUserFavoriteMovieTitle}</span>
          <span className='col-8'>{props.viewingUserFavoriteMovieDate}</span>
        </section>
      </section>

      <section className='col-4 text-center py-3 rounded' >
        <h2 className=''>Friends List</h2>
        <section className='border-0'>
          <ul className='row justify-content-evenly mx-auto'>
            {/* {props.viewingUsersFriends.map((friend) => {
              
              
              return (
                <li className={`border col-4 row justify-content-center friendClick rounded rounded-4 bg-white ${props.friendId}`} onClick={props.onClickFriend} id={friend[0].id} key={friend[0].id}>
                  <img className={`img-fluid ${props.friendId}`} alt="loading..." src={friend[0]['profile_picture']} />
                  <span className={`text-capitalize fst-italic fw-semibold ${props.friendId}`} >{friend[0]['user_name']}</span>
                </li>
              )})} */}
          </ul>
        </section>
      </section>

      <section id='recSection' className="col-7 text-center py-3 rounded">
        
        <h2 className='fw-bold mb-2'>
          <span className='text-capitalize'>{`${props.viewingUserName}'s`} </span>
          <span>recommended movies</span>
        </h2>
        
        <section>
          <ul className='row mx-auto justify-content-evenly fw-semibold' id='addContainer'>
            {/* {props.viewingUserRecommends.map((item) => (
              
              <li className='col-3 row gy-1 justify-content-center text-center bg-white rounded' key={item["movie_id"]}>
                <img className='col-9 img-fluid recImg' src={item['movie_img']}/>
                <span className='' >{item['movie_title']}</span>
                <span className=''>{item['movie_date']}</span>
              </li>)
            )} */}
          </ul>
        </section>
      </section>

    </div>
  );
}

export default FriendsPage;