import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from './Landing.tsx';
import Home from './Home.tsx';
import Login from './Login.tsx';
import Signup from './Signup.tsx';
import Header from './components/Header.tsx';

const API_URL = import.meta.env.VITE_API_URL || '';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

// Initial ping to wake up backend
  useEffect(() => {
    fetch(`${API_URL}/api/hello`).catch(() => {});
  }, []);

  // Keep backend alive while user is on the site
  useEffect(() => {
    // Ping every 10 minutes (600000ms) while site is open
    const keepAliveInterval = setInterval(() => {
      fetch(`${API_URL}/api/hello`)
        .then(() => console.log('Keep-alive ping sent'))
        .catch(() => console.log('Keep-alive ping failed'));
    }, 10 * 60 * 1000); // 10 minutes

    // Cleanup: Stop pinging when component unmounts (user leaves site)
    return () => clearInterval(keepAliveInterval);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${API_URL}/api/me`, {
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
            <Route path="/" element={loggedIn ? <Home /> : <Landing />} />
            <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login setLoggedIn={setLoggedIn} />} />
            <Route path="/signup" element={loggedIn ? <Navigate to="/" /> : <Signup setLoggedIn={setLoggedIn} />} />
            <Route path="/landing" element={<Landing />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
