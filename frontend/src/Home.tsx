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
            <div className="container mt-4 row justify-content-center col-12 col-md-8 text-center mx-auto">

                <h1 className="display-4 mb-3">CareerNode</h1>
                <p className="text">Track your job applications and stay organized on your career journey.</p>

                {/* Button to open modal */}
                <button
                    type="button"
                    className="btn btn-primary mb-2"
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
                    <PostModal setPosts={setPosts} />
                </div>

                {/* Post List Container */}
                <div className="card shadow-sm mb-3 d-flex justify-content-center align-items-center flex-column" style={{ minHeight: '500px' }}>

                    {/* Post List */}
                    <ul id="postList" className="list-unstyled d-none mt-3 mb-1">
                        {posts.map((post, index) => (
                            <li key={index} className="card mb-3">
                                <div className="card-body text-start">
                                    <h5 className="card-title">{post.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{post.companyName}</h6>
                                    <p className="card-text mb-1">
                                        <strong>Application Date:</strong> {post.applicationDate}
                                    </p>
                                    <p className="card-text mb-0">
                                        <strong>Status:</strong> {post.status}
                                    </p>
                                    <button
                                        className="btn btn-danger btn-sm mt-2 me-2"
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this post?')) {
                                                handleDelete(post._id);
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-secondary btn-sm mt-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editModal"
                                        onClick={() => setEditingPostId(post._id)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
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