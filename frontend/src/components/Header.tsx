import reactLogo from '../assets/react.svg'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || '';

function Header({ loggedIn, setLoggedIn }: { loggedIn: boolean, setLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {

    const navigate = useNavigate();

    useEffect(() => {
        console.log(loggedIn ? "Logged in" : "Not logged in");
    }, [loggedIn]);

    function fetchHelloMessage() {
        fetch(`${API_URL}/api/hello`)
            .then(response => response.json())
            .then(data => { if (data.email) alert("Hello from the Server!"); else { console.log("Hello")}})
            .catch(error => console.error('Error fetching API:', error));
    }

    function handleLogout() {
        setLoggedIn(false);
        localStorage.removeItem('token');
        navigate('/login'); // Redirect to login page after logout
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
                                onClick={() => navigate('/login')}
                                className="btn btn-outline-primary me-2 px-4"
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/signup')}
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