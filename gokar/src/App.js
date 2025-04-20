// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import TweetDetailPage from './pages/TweetDetailPage';
import AddTweetForm from './components/AddTweetForm';
const App = () => {
  const { setUser, setToken } = useAuth();
  const [loading, setLoading] = useState(true);

  // Oturum kontrolü ve kullanıcı verilerini alma
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Eğer token varsa, kullanıcıyı yükle
      setToken(token);
      const fetchUserData = async () => {
        try {
          // Token ile kullanıcıyı API'den alabilirsiniz
          // Kullanıcı API'den alınabilir (örnek bir kullanıcı API'si eklenebilir)
          const userData = { id: 1, name: 'User Example' }; // Demo verisi
          setUser(userData);
        } catch (err) {
          console.error('Kullanıcı bilgileri alınamadı', err);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [setUser, setToken]);

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tweet/:id" element={<TweetDetailPage />} />
          <Route path="/add-tweet" element={<AddTweetForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
