import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const RegisterPage = () => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1); // Adım durumu (ilk adım 1)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    birthDate: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2); // 1. adımdan sonra 2. adıma geç
    } else {
      // Formu göndermek ya da başka işlemler burada yapılacak
      console.log('Kayıt işlemi:', formData);

      // Başarılı kayıt sonrası kullanıcıyı login sayfasına yönlendir
      navigate('/login'); // Başarılı işlem sonrası login sayfasına yönlendirilir
    }
  };

  return (
    <div className="register-page">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit} className="register-form">
        {step === 1 && (
          <div className="step-1">
            <input
              type="text"
              name="name"
              placeholder="İsim"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="text"
              name="phone"
              placeholder="Telefon"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="date"
              name="birthDate"
              placeholder="Doğum Tarihi"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
            <br />
            <button type="submit">İleri</button>
          </div>
        )}

        {step === 2 && (
          <div className="step-2">
            <input
              type="email"
              name="email"
              placeholder="E-posta"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Şifre"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br />
            <button type="submit">Kayıt Ol</button>
          </div>
        )}
      </form>

      {/* Giriş sayfasına yönlendiren bağlantı */}
      <p>Hesabınız var mı? <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => navigate('/login')}>Giriş Yap</span></p>
    </div>
  );
};

export default RegisterPage;
