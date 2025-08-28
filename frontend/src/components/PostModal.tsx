import { useState } from "react";

interface PostModalProps {
    posts: { _id: string, title: string, companyName: string, applicationDate: string, lastUpdatedDate: string, status: string }[];
    setPosts: React.Dispatch<React.SetStateAction<{ _id: string, title: string, companyName: string, applicationDate: string, lastUpdatedDate: string, status: string }[]>>;
    editingPostId: string | null;
    setEditingPostId: React.Dispatch<React.SetStateAction<string | null>>;
}

function PostModal({ posts, setPosts, editingPostId, setEditingPostId }: PostModalProps) {

    const [title, setTitle] = useState<string>("");
    const [companyName, setCompanyName] = useState<string>("");
    const [status, setStatus] = useState<string>("Not Applied");
    const [applicationDate, setApplicationDate] = useState<string>(
        new Date().toISOString().slice(0, 10)
    );

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (title !== "" && companyName !== "") {
            const url = editingPostId
                ? `/api/editPost/${editingPostId}`
                : '/api/submitPost';
            const method = editingPostId ? 'PUT' : 'POST';

            fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title,
                    companyName,
                    applicationDate,
                    lastUpdatedDate: applicationDate,
                    status
                })
            })
                .then(res => {
                    if (res.ok) return res.json();
                    throw new Error(editingPostId ? 'Failed to edit post' : 'Failed to submit post');
                })
                .then(newPost => {
                    if (editingPostId) {
                        setPosts(posts =>
                            posts.map(post =>
                                post._id === editingPostId ? newPost : post
                            )
                        );
                    } else {
                        setPosts(posts => [...posts, newPost]);
                    }
                    setTitle("");
                    setCompanyName("");
                    setApplicationDate(new Date().toISOString().slice(0, 10));
                    setStatus("Not Applied");
                    setEditingPostId(null);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

    return (
        <div
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
                                value={title}
                                required
                            />

                            <label htmlFor="companyName">Company Name</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Enter Company Name"
                                id="companyName"
                                onChange={(event) => setCompanyName(event.target.value)}
                                value={companyName}
                                required
                            />

                            <label htmlFor="applicationDate">Application Date</label>
                            <input
                                type="date"
                                className="form-control mb-3"
                                placeholder="Enter Application Date"
                                id="applicationDate"
                                onChange={(event) => setApplicationDate(event.target.value)}
                                value={applicationDate}
                                required
                            />

                            <label htmlFor="status">Application Status</label>
                            <select
                                className="form-select mb-3"
                                id="status"
                                onChange={(event) => setStatus(event.target.value)}
                                value={status}
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
    )
}

export default PostModal;