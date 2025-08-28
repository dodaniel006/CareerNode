import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from './Landing.tsx';
import Home from './Home.tsx';
import Login from './Login.tsx';
import Signup from './Signup.tsx';
import Header from './components/Header.tsx';

function App() {
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
            <Route path="/" element={loggedIn ? <Home /> : <Landing />} />
            <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={loggedIn ? <Navigate to="/" /> : <Signup />} />
            <Route path="/landing" element={<Landing />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
