import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/api';
import '../App.css';

const ProfilePage = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const updatedUser = await updateProfile(user.token, formData);
      login(updatedUser); // Güncellenmiş kullanıcıyı tekrar set et
      setSuccessMessage('Profil başarıyla güncellendi.');
    } catch (err) {
      setError('Profil güncellenemedi.');
    }
  };

  // Eğer kullanıcı yoksa, sayfayı engelleme veya yönlendirme ekleyebilirsiniz.
  if (!user) {
    return <div>Lütfen giriş yapın.</div>; // Kullanıcı yoksa, mesaj göster
  }

  return (
    <div className="profile-page">
      <h2 className="profile-heading">Profil</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="text"
          name="name"
          placeholder="İsim"
          value={formData.name}
          onChange={handleChange}
          className="input-field"
        /><br />
        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={formData.email}
          onChange={handleChange}
          className="input-field"
        /><br />
        <button type="submit" className="submit-button">Profili Güncelle</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ProfilePage;
