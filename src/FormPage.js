import './App.css';
import logo from './Logo.png'

const FormPage = (props) => {

    return (
        <div className='position-absolute top-50 start-50 translate-middle bg-success row p-3'>
            <div className='col row justify-content-center mx-auto bg-warning p-2'>
                <h1 className='fst-italic bg-primary'>Movie Pals</h1>

                <form onSubmit={props.onFormSubmit} className=" row bg-danger justify-content-center p-2">
                    <div className=' row my-1'>
                        <label className=''>User Name</label>
                        <input className='' type="text" id="user_name" required onChange={props.onChangeUserInfo}></input>
                    </div>

                    <div className=' row my-1'>
                        <label className=''>Favorite Movie</label>
                        <input className='' type="text" id="favorite_movie" required onChange={props.onChangeUserInfo}></input>
                    </div>
            
                    <div className='row my-1'>
                        <label className=' col'>IMDb-API Key</label>
                        <details className='col-2 border '>
                            <summary className='border col-6'>?</summary>
                            <div className='position-absolute end-50 bg-secondary border border-4 p-4'>
                                <p className="fw-semibold">How to get your API key</p>
                                <ul className='p-2'>
                                    <li>- Register for an IMDb-API Key <a className='text-reset' href='https://imdb-api.com/Identity/Account/Register'>here</a>.</li>
                                    <li>- Once logged in, head over to "Profile".</li>
                                    <li>- Copy and paste your own personal API Key.</li>
                                </ul>
                            </div>
                        </details>
                        <input className='' type="password" id="api_key" required onChange={props.onChangeUserInfo}></input>
                    </div>

                    <div className='row my-1'>
                        <label className='' htmlFor="profile_picture" >Profile Picture?</label>
                        <input className='' accept='image/*' type="file" id="profile_picture" onChange={props.onChangeUserInfo}></input>
                    </div>

                    <input className=' col-5 my-1' type="submit"></input>
                </form>
                
            </div>
            <img id="logo" className=' col-5 img-fluid' src={logo} />

            
            <dialog className=' w-25 bg-warning' id="confirm" >
                <p className='fw-semibold '>Is this correct?</p>
                <ul className=' bg-danger row mx-auto '>
                    <li className=' col-5 border ms-2 text-center'>
                        <p className='border'>User Name:</p>
                        <span className='text-capitalize fw-semibold fst-italic border'>{props.userName}</span>
                    </li>
                    <li className=' col-5 border ms-4 text-center'>
                        <p className='border'>Favorite Movie:</p>
                        <span className='text-capitalize fw-semibold fst-italic'>{props.favoriteMovie}</span>
                    </li>
                </ul>
                <div className=' row justify-content-center bg-danger mx-auto'>
                    <button className='mx-1 col-3' onClick={props.onClickConfirm}>Yes</button>
                    <button className='mx-1 col-3' onClick={props.onClickDeny}>No</button>
                </div>  
            </dialog>
        </div>
    )
}

export default FormPage;
