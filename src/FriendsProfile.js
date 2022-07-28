import './App.css';

const FriendsProfile = (props) => {

  return (
    <div className='border row justify-content-around mx-auto bg-success py-3 gy-3'>

      <div className='border col-10 row justify-content-between mt-3'>
        <h1 className='fst-italic bg-primary col-6'>Movie Pals</h1>
        <nav className='col-3 border bg-danger'>
          <ul className='border bg-primary row justify-content-between text-center fs-5'>
            <li className='border col-5' onClick={props.onClickProfile}>Home</li>
            <li className='border col-6' onClick={props.onClickLogOut}>Log Out</li>
          </ul>
        </nav>
      </div>

      <section className='border col-6 row justify-content-evenly bg-primary my-3 gy-3 py-3 text-center'>

        <div id='userInfoContainer' className='row justify-content-center col-6 border bg-warning'>
          <h2 className='border row bg-danger '>
            <span className='border bg-primary text-capitalize fst-italic fw-semibold'>{props.friendName}</span>
          </h2>
          <img id='profile_picDisplayed' className='border img-fluid pb-2' alt="loading..." src={props.friendImg}/>
        </div>

        <section className='border col-4 row justify-content-start bg-danger p-4 fw-semibold'>
          <p className='border col-8' >Favorite Movie</p>
          <img id = "userFavoriteMovieDisplayed" className="col-8 img-fluid border" alt="Loading..." src={props.friendFavoriteMovieImage} />
          <span className='col-8 '>{props.friendFavoriteMovieTitle}</span>
          <span className='col-8'>{props.friendFavoriteMovieDate}</span>
        </section>
      </section>

      <section className='col-4 border bg-warning text-center py-3' >
        <h2 className='border'>Friends List</h2>
        <section>
          <ul className='border row justify-content-evenly mx-auto'>
            {props.friendFriend.map((friend) => {
              
              
              return (
                <li className='border col-4 row justify-content-center friendClick' onClick={props.onClickFriend} id={friend[0].id} key={friend[0].id}>
                  <img className='back img-fluid friendListImg' alt="loading..." src={friend[0]['profile_picture']} />
                  <span className='back text-capitalize fst-italic fw-semibold' >{friend[0]['user_name']}</span>
                </li>
              )})}
          </ul>
        </section>
      </section>

      <section id='recSection' className="col-7 border text-center bg-primary py-3">
        
        <h2 className='fw-bold mb-2'>
          <span className='text-capitalize'>{`${props.friendName}'s`} </span>
          <span>recommended movies</span>
        </h2>
        
        <section>
          <ul className='row mx-auto justify-content-evenly fw-semibold bg-warning' id='addContainer'>
            {props.recommended.map((item) => (
              
              <li className='col-3 row gy-1 justify-content-center text-center border border-danger' key={item["movie_id"]}>
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

export default FriendsProfile;