import './App.css';

const FriendsPage = (props) => {

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
            <span className='text-capitalize fst-italic fw-semibold'>{props.viewingUserName}</span>
          </h2>
          <img id='profile_picDisplayed' className='border border-2 img-fluid pb-2 rounded-circle' alt="loading..." src={props.viewingUserImg}/>
        </div>

        <section className='col-4 col-md-5 col-lg-5 col-xxl-4 row justify-content-start p-4 fw-semibold border-0 bg-white'>
          <p className='col-8' >Favorite Movie</p>
          <img id = "userFavoriteMovieDisplayed" className="col-8 img-fluid" alt="Loading..." src={props.viewingUserFavoriteMovieImage} />
          <span className='col-8 '>{props.viewingUserFavoriteMovieTitle}</span>
          <span className='col-8'>{props.viewingUserFavoriteMovieDate}</span>
        </section>
      </section>

      <section className='col-4 col-lg-4 text-center py-3 rounded' >
        <h2 className=''>Friends List</h2>
        <section className='border-0'>
          <ul className='row justify-content-evenly mx-auto'>
            {props.viewingUsersFriends.map((friend) => (

                <li className={`col-6 col-md-5 col-xl-4 row justify-content-center rounded rounded-4 bg-white friendClick ${friend[0].id}`} onClick={props.onClickFriend} id={friend[0].id} key={friend[0].id}>
                  <img className={`img-fluid ${friend[0].id}`} alt="loading..." src={friend[0]['profile_picture']} />
                  <span className={`text-capitalize fst-italic fw-semibold ${friend[0].id}`} >{friend[0]['user_name']}</span>
                </li>)
              )}
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
            {props.viewingUserRecommends.map((item) => (
              
              <li className='col-6 col-lg-4 col-xxl-3 row gy-1 justify-content-center text-center' key={item["movie_id"]}>
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

export default FriendsPage;