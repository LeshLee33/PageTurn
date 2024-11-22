import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Acount from './pages/Acount';
import CreateAnEntry from './pages/CreateAnEntry';
import Bookmarks from './pages/Bookmarks';
import PostPage from './pages/PostPage';
import { AuthProvider, useAuth } from './components/AufContext';
import Authorization from './pages/Authorization';
import Registration from './pages/Registration';
import Admin_acount from './pages/Admin_acount';
import { check_token } from './API/Users';
import Chat from './components/Chat';

function App() {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/postpage/:book_id" element={<PostPage />} />
          <Route path="/acount" element={<RequireAuth><Acount /></RequireAuth>} />
          <Route path="/create_an_entry/:id" element={<RequireAuth><CreateAnEntry /></RequireAuth>} />
          <Route path="/bookmarks" element={<RequireAuth><Bookmarks /></RequireAuth>} />
          <Route path="/admin_acount" element={<RequireAuth><Admin_acount /></RequireAuth>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}



const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { aufToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (!aufToken) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      try {
        const result = await check_token(aufToken);
        if (result.status_code === 200) {
          setIsAuthorized(true);
        } else if (result.status_code === 404) {
          localStorage.removeItem('nickname');
          localStorage.removeItem('auf_token');
          setIsAuthorized(false);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Ошибка при проверке токена:', error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [aufToken]);

  if (isLoading) {
    return <div>Загрузка...</div>; // Вы можете заменить это на индикатор загрузки или что-то подобное
  }

  if (!isAuthorized) {
    return <Navigate to="/authorization" replace />;
  }

  return <><Chat />{children}</>;
};

export default App;