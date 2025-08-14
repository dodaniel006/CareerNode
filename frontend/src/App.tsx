import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';

import Home from './Home.tsx';
import Login from './Login.tsx';

function App() {
  const [posts, setPosts] = useState<{ title: string, companyName: string, applicationDate: string, lastUpdatedDate: string, status: string }[]>([]);

  return (
    <Routes>
      <Route path="/" element={
        <Home
          posts={posts}
          setPosts={setPosts}
        />
      } />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
