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

  // Ping backend on startup to wake it up
  useEffect(() => {
    fetch(`${API_URL}/api/hello`)
      .catch(() => console.log('Backend waking up...'));
  }, []); // Empty dependency array = runs once on mount

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
