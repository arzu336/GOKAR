import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  console.log('Register sayfası yüklendi'); // Debug amacıyla

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError('Tüm alanları doldurun.');
      return;
    }

    console.log('Kayıt bilgileri:', formData);
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h2>Kayıt Ol</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Kullanıcı adı"
          value={formData.username}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '10px 0' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '10px 0' }}
        />
        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={formData.password}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '10px 0' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Kayıt Ol
        </button>
      </form>
    </div>
  );
};

export default Register;
