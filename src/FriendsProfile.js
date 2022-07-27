import './App.css';

const FriendsProfile = (props) => {

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
          <span className='border text-center'>{props.friendName}</span>
          <img className='border img-fluid' alt="loading..." src={props.friendImg}/>
        </div>

        
        <section className='border col-4 row justify-content-start text-center bg-danger p-4'>
          <span className='border col-8' >Favorite Movie</span>
          <img className="col-8 img-fluid border" alt="Loading..." src={props.friendFavoriteMovieImage} />
          <span className='col-8 '>{props.friendFavoriteMovieTitle}</span>
          <span className='col-8'>{props.friendFavoriteMovieDate}</span>
        </section>
      </section>

      <section className='col-4 border bg-warning text-center' >
        <h1>Friends List</h1>

        <ul className='border row justify-content-evenly mx-auto'>
          {props.friendFriend.map((friend) => {
            
            
            return (
              <li className='border col-4 row justify-content-center' onClick={props.onClickFriend} id={friend[0].id} key={friend[0].id}>
                <img className='back img-fluid' alt="loading..." src={friend[0]['profile_picture']} />
                <span className='back' >{friend[0]['user_name']}</span>
              </li>
            )})}
        </ul>

        
      </section>

      <section id='recList' className="col-7 border text-center bg-primary">
        <p className=' border' >{props.userName}'s Recommended movies</p>
        <ul className='row mx-auto justify-content-evenly border bg-warning' id='addContainer'>
          {props.recommended.map((item) => (
            
            <li className='col-3 row justify-content-center text-center border border-danger listt overflow-auto' key={item["movie_id"]}>
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

export default FriendsProfile;