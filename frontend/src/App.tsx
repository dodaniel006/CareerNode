import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';

import Home from './Home.tsx';
import Login from './Login.tsx';
import Signup from './Signup.tsx';
import Header from './components/Header.tsx';

function App() {
  const [posts, setPosts] = useState<{ _id: string, title: string, companyName: string, applicationDate: string, lastUpdatedDate: string, status: string }[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          setCheckingAuth(false);
          if (res.ok) {
            setLoggedIn(true);
          } else {
            localStorage.removeItem('token');
            setLoggedIn(false);
          }
        });
    } else {
      setCheckingAuth(false);
      setLoggedIn(false);
    }
  }, []);

  return (
    <>
      {!checkingAuth && (
        <>
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Routes>
            <Route path="/" element={<Home posts={posts} setPosts={setPosts} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
