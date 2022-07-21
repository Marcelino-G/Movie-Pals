import './App.css';

const FriendsProfile = (props) => {

  return (
    <div className='row justify-content-around border border-info'>

      <nav>
        <ul>
          <li onClick={props.onClickLogOut}>Log Out</li>
          <li onClick={props.onClickProfile}>Home</li>
        </ul>
      </nav>

      <section className='col-7 row justify-content-start border my-1'>
        <span className='border col-12 fs-3'>{props.friendName}</span>
        <img className='border col-7 img-fluid' />
        <section className='col-5 row justify-content-center border'>
          <span className='col-12 text-center border mt-4' >Favorite Movie</span>
          <img className="col-8 img-fluid border" alt="Loading..." src={props.friendFavoriteMovieImage} />
          <span className='col-12 text-center border '>{props.friendFavoriteMovieTitle}</span>
          <span className='col-12 text-center border mb-4'>{props.friendFavoriteMovieDate}</span>
        </section>
      </section>

      <section className='col-4 border my-1' >
        <h1>Friends List</h1>
      </section>

      <section className="col-7 row justify-content-center border my-1">
        <p className='col-12 border' >{props.userName}'s Recommended movies</p>
        <ul className='row justify-content-evenly border border-warning' id='addContainer'>
          {props.recommended.map((item) => (
            
            <li className='col-3 row no-gutters justify-content-center border border-danger listt overflow-auto' key={item["movie_id"]}>
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

export default FriendsProfile;