import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';

import Home from './Home.tsx';
import Login from './Login.tsx';
import Signup from './Signup.tsx';
import Header from './components/Header.tsx';

function App() {
  const [posts, setPosts] = useState<{ title: string, companyName: string, applicationDate: string, lastUpdatedDate: string, status: string }[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (res.ok) {
            // Token is valid, show logged-in view
            setLoggedIn(true);
            console.log("Logged in");
          } else {
            // Token invalid/expired, remove and show login
            localStorage.removeItem('token');
            if (loggedIn) {
              setLoggedIn(false);
            }
            console.log("Logged out");
          }
        });
    }
  }, []);

  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home posts={posts} setPosts={setPosts} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
