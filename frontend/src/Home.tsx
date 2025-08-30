import { useState, useEffect } from 'react'

import PostModal from './components/PostModal.tsx';

function Home() {

    const [posts, setPosts] = useState<{ _id: string, title: string, companyName: string, applicationDate: string, lastUpdatedDate: string, status: string }[]>([]);
    const [editingPostId, setEditingPostId] = useState<string | null>(null);

    useEffect(() => {
        if (posts.length > 0) {
            document.getElementById("postList")?.classList.remove("d-none");
        }
    }, [posts]);

    useEffect(() => {
        if (localStorage.getItem('token') == null) return;
        fetch('/api/getPosts', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setPosts(data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    function handleDelete(id: string) {
        fetch(`/api/deletePost/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.ok) {
                    setPosts(posts => posts.filter(post => post._id !== id));
                } else {
                    throw new Error('Failed to delete post');
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <>
            <div className="container mt-5 col-12 col-md-8 mx-auto">
                {/* Button to open modal */}
                <div className="d-flex justify-content-center mb-4">
                    <button
                        type="button"
                        className="btn btn-lg btn-primary shadow"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        style={{ minWidth: '140px' }} // Remove this inline style
                    >
                        <i className="bi bi-plus-lg me-2"></i>
                        Add Post
                    </button>
                </div>

                {/* Bootstrap Modal */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <PostModal setPosts={setPosts} />
                </div>

                {/* Post List Container */}
                <div className="card shadow-lg mb-4 border-0">

                    <div className="card-header bg-gradient bg-primary text-white d-flex align-items-center justify-content-between">
                        <h5 className="mb-0 fw-semibold">
                            <i className="bi bi-briefcase-fill me-2"></i>
                            Your Applications
                        </h5>
                        <span className="badge bg-light text-primary fs-6">{posts.length}</span>
                    </div>
                    <ul id="postList" className="list-group list-group-flush d-none">
                        {posts.map((post) => (
                            <li key={post._id} className="list-group-item py-3">
                                <div className="row align-items-center">
                                    <div className="col-md-7">
                                        <h5 className="mb-1 fw-bold text-dark">{post.title}</h5>
                                        <p className="mb-1">
                                            <span className="fw-semibold text-secondary">Company:</span> {post.companyName}
                                        </p>
                                        <span
                                            className={`badge px-2 py-1 ${post.status === 'Accepted' ? 'bg-success' : post.status === 'Rejected' ? 'bg-danger' : 'bg-secondary'}`}
                                            style={{ fontSize: '0.75rem', lineHeight: '1.2' }}
                                        >
                                            {post.status}
                                        </span>
                                    </div>
                                    <div className="col-md-3 text-md-end">
                                        <p className="mb-1">
                                            <span className="fw-semibold text-secondary">Applied:</span> <span className="text-dark">{post.applicationDate}</span>
                                        </p>
                                        <p className="mb-1">
                                            <span className="fw-semibold text-secondary">Updated:</span> <span className="text-dark">{post.lastUpdatedDate}</span>
                                        </p>
                                    </div>
                                    <div className="col-md-2 text-md-end mt-3 mt-md-0">
                                        <button
                                            className="btn btn-outline-danger btn-sm me-2"
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this post?')) {
                                                    handleDelete(post._id);
                                                }
                                            }}
                                        >
                                            <i className="bi bi-trash"></i> Delete
                                        </button>
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target="#editModal"
                                            onClick={() => setEditingPostId(post._id)}
                                        >
                                            <i className="bi bi-pencil"></i> Edit
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {posts.length === 0 && (
                        <div className="card-body text-center text-muted">
                            <p className="mb-0 fs-5">No applications yet. Click <span className="fw-semibold text-primary">"Add Post"</span> to get started!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Post Modal */}
            <div
                className="modal fade"
                id="editModal"
                tabIndex={-1}
                aria-labelledby="editModalLabel"
                aria-hidden="true"
            >
                <PostModal
                    setPosts={setPosts}
                    editingPostId={editingPostId}
                    setEditingPostId={setEditingPostId}
                    editingPost={posts.find(post => post._id === editingPostId) || null}
                />
            </div>

            <p className="text-muted text-center">
                Daniel Do © 2025
            </p>

            {/* </div> */}
        </>
    );
}

export default Home;