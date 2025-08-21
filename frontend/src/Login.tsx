import { useState } from "react";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function attemptLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Handle login logic here
        const response = await fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            console.log("User logged in successfully:", data);
            window.location.href = '/'; // Redirect to home page after login
        } else {
            const errorData = await response.json();
            console.error("Error logging in:", errorData);
        }
    }

    return (
        <main className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card shadow-sm p-4" style={{ maxWidth: 400, width: '100%' }}>
                <form onSubmit={attemptLogin}>
                    <h1 className="h3 mb-4 fw-bold text-center">Sign In</h1>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                            required
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            onChange={(event) => setPassword(event.target.value)}
                            value={password}
                            required
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-check mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value="remember-me"
                            id="checkDefault"
                        />
                        <label className="form-check-label" htmlFor="checkDefault">
                            Remember me
                        </label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">
                        Sign in
                    </button>
                    <div className="mt-3 text-center">
                        <a href="#" className="link-secondary small">Forgot password?</a>
                    </div>
                    <p className="mt-4 mb-2 text-body-secondary text-center">© 2025-2025</p>
                </form>
            </div>
        </main>
    );
}

export default Login;