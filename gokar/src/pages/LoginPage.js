import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // Form state'ini kontrol etmek için gerekli state'ler
  const [step, setStep] = useState(1); // Hangi adımdasınız
  const [formData, setFormData] = useState({ emailOrPhone: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setError('');

    // Eğer adım 1 (email, phone veya kullanıcı adı) doldurulmuşsa, şifre adımına geç
    if (formData.emailOrPhone) {
      setStep(2); // Şifreyi sormak için ikinci adıma geçiyoruz
    } else {
      setError('Lütfen bir e-posta veya telefon numarası girin.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginUser(formData); // API üzerinden login işlemi yapılacak
      login(data); // Giriş yapıldıktan sonra login fonksiyonu çağrılır
      navigate('/'); // Giriş başarılıysa ana sayfaya yönlendirilir
    } catch (err) {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <div className="login-page">
      <h2 className="login-title">Giriş Yap</h2>
      <form onSubmit={step === 1 ? handleNextStep : handleSubmit}>
        {step === 1 ? (
          <>
            <input
              type="text"
              name="emailOrPhone"
              placeholder="E-posta veya Telefon Numarası"
              value={formData.emailOrPhone}
              onChange={handleChange}
              required
            />
            <br />
            <button type="submit">İleri</button>
          </>
        ) : (
          <>
            <input
              type="password"
              name="password"
              placeholder="Şifre"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br />
            <button type="submit">Giriş Yap</button>
          </>
        )}
      </form>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Kayıt Ol bağlantısı */}
      <p>Hesabınız yok mu? <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => navigate('/register')}>Kayıt Ol</span></p>
    </div>
  );
};

export default LoginPage;
