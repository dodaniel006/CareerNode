function Landing() {
    return (
        <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
            <div className="text-center">
                <h1 className="display-4 mb-3">Welcome to the CareerNode Application Tracker</h1>
                <p className="lead mb-4">
                    Your one-stop solution for managing job applications.
                </p>
                <a href="/signup" className="btn btn-primary btn-lg">
                    Get Started
                </a>
            </div>
        </div>
    );
}

export default Landing;
