function Landing() {
    return (
        <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center bg-gradient" style={{ background: "linear-gradient(135deg, #e3f2fd 0%, #f8bbd0 100%)" }}>
            <div className="row w-100">
                <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3 text-center bg-white rounded-4 shadow-lg p-5">
                    <div className="mb-4">
                        <h1 className="display-2 fw-bold text-primary mb-3">CareerNode</h1>
                        <p className="lead text-secondary mb-2">
                            Track your job applications and stay organized on your career journey.
                        </p>
                    </div>
                    <p className="lead mb-4 text-dark">
                        Your one-stop solution for managing job applications.
                    </p>
                    <a href="/signup" className="btn btn-primary btn-lg shadow px-5 py-3 fw-semibold">
                        Get Started
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Landing;
