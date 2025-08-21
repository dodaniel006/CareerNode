import { useState } from "react";

function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function submitSignup(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // Handle signup logic here
        const response = await fetch('/api/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("User signed up successfully:", data);
        } else {
            const errorData = await response.json();
            alert(`Error signing up: ${errorData.error}`);
        }
    }

    return (
        <main className="d-flex align-items-center justify-content-center" style={{ minHeight: '85vh' }}>
            <div className="card shadow-sm p-4" style={{ maxWidth: 400, width: '100%' }}>
                <form onSubmit={submitSignup}>
                    <h1 className="h3 mb-4 fw-bold text-center">Sign Up</h1>
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
                    <button className="btn btn-primary w-100 py-2" type="submit">
                        Sign Up
                    </button>
                    <div className="mt-3 text-center">
                    </div>
                    <p className="mt-4 mb-2 text-body-secondary text-center">© 2025-2025</p>
                </form>
            </div>
        </main>
    );
}

export default Signup;