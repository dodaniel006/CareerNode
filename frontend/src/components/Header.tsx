import reactLogo from '../assets/react.svg'
import { useEffect } from 'react';

function Header({ loggedIn, setLoggedIn }: { loggedIn: boolean, setLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {

    useEffect(() => {
        console.log(loggedIn ? "Logged in" : "Not logged in");
    }, [loggedIn]);

    function fetchHelloMessage() {
        fetch('/api/test')
            .then(response => response.json())
            .then(data => alert(data.email))
            .catch(error => console.error('Error fetching API:', error));
    }

    function handleLogout() {
        setLoggedIn(false);
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login page after logout
    }

    return (
        <header className="container-fluid py-3 mb-4 border-bottom bg-light">
            <div className="row align-items-center">
                <div className="col-md-3 d-flex align-items-center mb-2 mb-md-0">
                    <a href="/" className="text-dark text-decoration-none">
                        <img
                            src={reactLogo}
                            onClick={() => window.location.href = '/'}
                            className="logo react me-2"
                            alt="React logo"
                            style={{ height: '40px', cursor: 'pointer' }}
                        />
                        <span className="fs-4 fw-bold">CareerNode</span>
                    </a>
                </div>
                <div className="col-md-6 d-flex justify-content-center">
                    <button onClick={fetchHelloMessage} className="btn btn-outline-success px-4 mx-2">
                        Hear from Server
                    </button>
                </div>
                <div className="col-md-3 d-flex justify-content-end">
                    {loggedIn ? (
                        <>
                            <button onClick={handleLogout} className="btn btn-outline-danger px-4">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={() => window.location.href = '/login'}
                                className="btn btn-outline-primary me-2 px-4"
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={() => window.location.href = '/signup'}
                                className="btn btn-primary px-4"
                            >
                                Sign-up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;