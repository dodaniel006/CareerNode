import { useState } from 'react'

import Header from './components/Header.tsx';

function Home({ posts, setPosts }: { posts: { title: string, companyName: string, applicationDate: string, lastUpdatedDate: string, status: string }[], setPosts: React.Dispatch<React.SetStateAction<{ title: string, companyName: string, applicationDate: string, lastUpdatedDate: string, status: string }[]>> }) {
    const [title, setTitle] = useState<string>("");
    const [companyName, setCompanyName] = useState<string>("");
    const [applicationDate, setApplicationDate] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    if (posts.length > 0) {
        document.getElementById("postList")?.classList.remove("d-none");
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();
        const form = e.currentTarget;
        const titleInput = form.elements.namedItem("postTitle") as HTMLInputElement | null;
        const companyInput = form.elements.namedItem("companyName") as HTMLInputElement | null;
        const dateInput = form.elements.namedItem("applicationDate") as HTMLInputElement | null;
        const statusInput = form.elements.namedItem("status") as HTMLSelectElement | null;

        if (title !== "") {
            setPosts((posts) => [...posts, { title: title, companyName: companyName, applicationDate: applicationDate, lastUpdatedDate: applicationDate, status: status }]);
            if (titleInput) {
                titleInput.value = "";
            }
            if (companyInput) {
                companyInput.value = "";
            }
            if (dateInput) {
                dateInput.value = "";
            }
            if (statusInput) {
                statusInput.value = "NA";
            }
        }
    }

    return (
        <>
            <Header />
            <div className="container mt-4 row justify-content-center col-12 col-md-8 text-center mx-auto">

                <h1 className="display-4 mb-3">CareerNode</h1>
                <p className="text">Track your job applications and stay organized on your career journey.</p>

                <div className="card shadow-sm mb-3 d-flex justify-content-center align-items-center flex-column" style={{ minHeight: '500px' }}>
                    {/* <div className="card-body d-flex justify-content-center align-items-center flex-column"> */}

                    {/* Button to open modal */}
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        style={{ maxWidth: '100px' }}
                    >
                        Add Post
                    </button>

                    {/* Bootstrap Modal */}
                    <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Modal Title</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>

                                <div className="modal-body">

                                    <form className="mb-3" autoComplete="off" onSubmit={handleSubmit}>

                                        <label htmlFor="postTitle">Job Title</label>
                                        <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="Enter Job Title"
                                            id="postTitle"
                                            onChange={(event) => setTitle(event.target.value)}
                                            required
                                        />

                                        <label htmlFor="companyName">Company Name</label>
                                        <input
                                            type="text"
                                            className="form-control mb-3"
                                            placeholder="Enter Company Name"
                                            id="companyName"
                                            onChange={(event) => setCompanyName(event.target.value)}
                                            required
                                        />

                                        <label htmlFor="applicationDate">Application Date</label>
                                        <input
                                            type="date"
                                            className="form-control mb-3"
                                            placeholder="Enter Application Date"
                                            id="applicationDate"
                                            onChange={(event) => setApplicationDate(event.target.value)}
                                            required
                                        />

                                        <label htmlFor="status">Application Status</label>
                                        <select
                                            className="form-select mb-3"
                                            id="status"
                                            onChange={(event) => setStatus(event.target.value)}
                                            defaultValue=""
                                            required
                                        >
                                            <option value="NA">Not Applied</option>
                                            <option value="applied">Applied</option>
                                            <option value="interview">Interview</option>
                                            <option value="offer">Offer</option>
                                            <option value="rejected">Rejected</option>
                                        </select>

                                        <button
                                            type="submit"
                                            className="btn btn-primary mt-3"
                                        >
                                            Add Post
                                        </button>
                                    </form>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul id="postList" className="list-unstyled d-none mt-3 mb-1">
                        {posts.map((posts, index) => (
                            <li key={index} className="card mb-3">
                                <div className="card-body text-start">
                                    <h5 className="card-title">{posts.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{posts.companyName}</h6>
                                    <p className="card-text mb-1">
                                        <strong>Application Date:</strong> {posts.applicationDate}
                                    </p>
                                    <p className="card-text mb-0">
                                        <strong>Status:</strong> {posts.status}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <p className="text-muted">
                Daniel Do © 2025
            </p>

            {/* </div> */}
        </>
    );
}

export default Home;