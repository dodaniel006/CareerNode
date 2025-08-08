import { useState } from 'react'
import willy1 from './assets/willy1.png';
import willy2 from './assets/willy2.png';
import willy3 from './assets/willy3.png';
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
              {/* <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
                <img src={viteLogo} className="logo" alt="Vite logo" style={{ width: '64px' }} />
              </a>
              <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" className="logo" alt="React logo" style={{ width: '64px' }} />
              </a> */}
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
                    {/* <img src={willy1} className="logo" alt="React logo" style={{ width: '32px', height: '32px', position: 'absolute', top: '80px', left: '45%', transform: 'translate(-50%, -50%)' }} />
                    <input type="radio" name="postType" className="mb-3" value="obj1" id="obj1" />
                    <label htmlFor="obj1">obj1</label>
                    <br></br>
                    <img src={willy2} className="logo" alt="React logo" style={{ width: '32px', height: '32px', position: 'absolute', top: '115px', left: '44%', transform: 'translate(-50%, -50%)' }} />
                    <input type="radio" name="postType" className="mb-3" value="obj2" id="obj2" />
                    <label htmlFor="obj2">obj2</label>
                    <br></br>
                    <img src={willy3} className="logo" alt="React logo" style={{ width: '32px', height: '32px', position: 'absolute', top: '150px', left: '44%', transform: 'translate(-50%, -50%)' }} />
                    <input type="radio" name="postType" className="mb-3" value="obj3" id="obj3" />
                    <label htmlFor="obj3">obj3</label>
                    <br></br> */}

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
