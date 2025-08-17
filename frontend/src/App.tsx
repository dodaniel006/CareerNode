import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import Home from './Home.tsx';
import Login from './Login.tsx';
import Signup from './Signup.tsx';
import Header from './components/Header.tsx';

function App() {
  const [posts, setPosts] = useState<{ title: string, companyName: string, applicationDate: string, lastUpdatedDate: string, status: string }[]>([]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home posts={posts} setPosts={setPosts} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
