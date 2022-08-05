import logo from './Logo.png'

const LoadingPage = () => {

    return (
    <div id="loading" className='position-absolute top-50 start-50 w-75 translate-middle text-center bg-white'>
        <p className='fs-1 fw-bold'>Loading...</p>
        <img id='logo' className='col-8 col-md-6' src={logo} />
    </div>
    )
}

export default LoadingPage;