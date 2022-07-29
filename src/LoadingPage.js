import logo from './Logo.png'

const LoadingPage = () => {

    return (
    <div id="loading" className='position-absolute top-50 start-50 w-75 translate-middle border text-center bg-primary'>
        <p className='fs-1'>Loading...</p>
        <img id='logo' className='border' src={logo} />
    </div>
    )







}

export default LoadingPage;