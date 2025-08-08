import { useState } from 'react'
import Header from './components/Header.tsx';

function App() {
  const [posts, setPosts] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");

  if (posts.length > 0) {
    document.getElementById("postList")?.classList.remove("d-none");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("postTitle") as HTMLInputElement | null;

    if (title !== "") {
      setPosts((posts) => [...posts, title]);
      setTitle("");
      if (input) {
        input.value = "";
      }
    }
  }

  return (
    <>
      <Header />
      <div className="container mt-4 row justify-content-center col-12 col-md-8 text-center mx-auto">

        <h1 className="display-4 mb-3">CareerNode</h1>
        <p className="text">Track your job applications and stay organized on your career journey.</p>

        <div className="card shadow-sm mb-3" style={{ maxHeight: '500px' }}>
          <div className="card-body">

            {/* Button to open modal */}
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
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

                    <form className="mb-3" onSubmit={handleSubmit}>
                        <input
                          type="text"
                          className="form-control mb-3"
                          placeholder="Enter Job Title"
                          name="postTitle"
                          onChange={
                            (event) => { if (event) { setTitle(event.target.value) } }} //Update the title state
                        />

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
                <li key={index} className="border py-2 mt-2">
                  {posts}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-muted">
          Daniel Do © 2025
        </p>

      </div>
    </>
  )
}

export default App
