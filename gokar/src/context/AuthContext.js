import React, { createContext, useContext, useState, useEffect } from 'react';

// AuthContext'i oluştur
const AuthContext = createContext();

// AuthProvider, AuthContext'i sağlayacak
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Kullanıcı giriş durumu ve diğer auth işlemleri burada yapılabilir
  useEffect(() => {
    // localStorage'dan kullanıcıyı al
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Kullanıcı bilgisi güncellendiğinde, localStorage'ı da güncelle
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user'); // Eğer kullanıcı çıkış yaparsa, localStorage'dan silinir
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth Hook, AuthContext'e kolay erişim için
export const useAuth = () => {
  return useContext(AuthContext);
};
