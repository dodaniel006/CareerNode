import { useState } from 'react'
import Header from './components/Header.tsx';

function App() {
  const [posts, setPosts] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");

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
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 text-center">
            <div className="d-flex justify-content-center gap-4 mb-3">
            </div>
            <h1 className="display-4 mb-3">CareerNode</h1>
            <p className="text">Track your job applications and stay organized on your career journey.</p>
            <div className="card shadow-sm mb-3">
              <div className="card-body">
                <form className="mb-3" onSubmit={handleSubmit}>
                  <div className="">
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Enter post title"
                      name="postTitle"
                      onChange={
                        (event) => { if (event) { setTitle(event.target.value) } } } //Update the title state
                    />

                    <button
                      type="submit"
                      className="btn btn-primary mt-3"
                    >
                      Add Post
                    </button>
                  </div>

                </form>

                <ul className="list-unstyled">
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
        </div>
      </div>
    </>
  )
}

export default App
