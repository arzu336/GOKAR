import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';  
import Login from './pages/Login';        

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Eğer anasayfa yönlendirmesi yapmak isterseniz: */}
        <Route path="/" element={<Register />} /> {/* Anasayfa */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
