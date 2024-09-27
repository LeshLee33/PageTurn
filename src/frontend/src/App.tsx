import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Acount from './pages/Acount';
import CreateAnEntry from './pages/CreateAnEntry'; // Импортируйте новый компонент
import Bookmarks from './pages/Bookmarks';
import PostPage from './pages/PostPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acount" element={<Acount />} />
        <Route path="/create+an+entry" element={<CreateAnEntry />} /> 
        <Route path="/bookmarks" element={<Bookmarks />} /> 
        <Route path="/postpage/:id" element={<PostPage />} /> 
      </Routes>
    </div>
  );
}

export default App;