import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Acount from './pages/Acount';
import CreateAnEntry from './pages/CreateAnEntry'; // Импортируйте новый компонент
import Bookmarks from './pages/Bookmarks';
import PostPage from './pages/PostPage';
import { AuthProvider } from './components/AufContext';
import Authorization from './pages/Authorization';
import Registration from './pages/Registration';

function App() {
  return (
    <AuthProvider>
    <div>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/acount" element={<Acount />} />
        <Route path="/create+an+entry" element={<CreateAnEntry />} /> 
        <Route path="/bookmarks" element={<Bookmarks />} /> 
        <Route path="/postpage/:id" element={<PostPage />} /> 
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;