import reactLogo from '../assets/react.svg'

function Header() {

    function fetchHelloMessage() {
        fetch('/api/test')
            .then(response => response.json())
            .then(data => alert(data.email))
            .catch(error => console.error('Error fetching API:', error));
    }

    return (

        <div className="mx-3">

            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <img
                        src={reactLogo}
                        onClick={() => window.location.href = '/'}
                        className="logo react"
                        alt="React logo"
                    />
                </a>

                {/* <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0"> */}
                <button onClick={fetchHelloMessage} className="btn btn-outline-success px-3">Hear from Server</button>
                {/* </ul> */}

                <div className="col-md-3 text-end">
                    <button
                        type="button"
                        onClick={() => window.location.href = '/login'}
                        className="btn btn-outline-primary me-2"
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => window.location.href = '/signup'}
                        className="btn btn-primary">Sign-up</button>
                </div>
            </header>
        </div>
    )
}

export default Header;