// services/api.js
import axios from 'axios';

// Kullanıcı kaydı
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Kayıt başarısız');
    return data; // Başarılı yanıtla gelen kullanıcı bilgileri
  } catch (error) {
    throw error;
  }
};

// Kullanıcı girişi
export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Giriş başarısız');
    return data; // Başarılı girişle dönen kullanıcı bilgileri ve token
  } catch (error) {
    throw error;
  }
};

// Tweet ekleme
export const addTweet = async (token, tweetData) => {
  try {
    const response = await fetch(`${API_URL}/tweets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tweetData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Tweet eklenemedi');
    return data; // Başarılı tweet yanıtı
  } catch (error) {
    throw error;
  }
};

// Tweet güncelleme
export const updateTweet = async (token, tweetId, tweetData) => {
  try {
    const response = await fetch(`${API_URL}/tweets/${tweetId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tweetData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Tweet güncellenemedi');
    return data; // Güncellenen tweet yanıtı
  } catch (error) {
    throw error;
  }
};

// Tweet silme
export const deleteTweet = async (token, tweetId) => {
  try {
    const response = await fetch(`${API_URL}/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Tweet silinemedi');
    return data; // Silinen tweet yanıtı
  } catch (error) {
    throw error;
  }
};

// Tweet detayları alma
export const getTweetDetails = async (tweetId) => {
  try {
    const response = await fetch(`${API_URL}/tweets/${tweetId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Tweet detayları alınamadı');
    return data; // Tweetin detayları
  } catch (error) {
    throw error;
  }
};

// Yorum ekleme
export const addComment = async (token, tweetId, commentData) => {
  try {
    const response = await fetch(`${API_URL}/tweets/${tweetId}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Yorum eklenemedi');
    return data; // Başarılı yorum ekleme yanıtı
  } catch (error) {
    throw error;
  }
};

// Yorum silme
export const deleteComment = async (token, tweetId, commentId) => {
  try {
    const response = await fetch(`${API_URL}/tweets/${tweetId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Yorum silinemedi');
    return data; // Silinen yorum yanıtı
  } catch (error) {
    throw error;
  }
};

// Yorum güncelleme
export const updateComment = async (token, tweetId, commentId, commentData) => {
  try {
    const response = await fetch(`${API_URL}/tweets/${tweetId}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Yorum güncellenemedi');
    return data; // Güncellenen yorum yanıtı
  } catch (error) {
    throw error;
  }
};

// Profil güncelleme
export const updateProfile = async (token, profileData) => {
  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Profil güncellenemedi');
    return data; // Güncellenmiş profil yanıtı
  } catch (error) {
    throw error;
  }
};
// services/api.js
export const addCommentToTweet = async (tweetId, commentData) => {
  try {
    const response = await fetch(`/api/tweets/${tweetId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error('Yorum eklenemedi.');
    }

    const addedComment = await response.json();
    return addedComment; // Yeni eklenen yorumu döndürüyoruz
  } catch (error) {
    throw error;
  }
};




const API_URL = 'https://your-api-url.com';  // API URL'nizi buraya koyun

// Tweet beğenme fonksiyonu
export const likeTweet = async (tweetId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/tweets/${tweetId}/like`, { userId });
    return response.data;
  } catch (error) {
    console.error('Tweet beğenirken hata oluştu:', error);
    throw error;
  }
};

// api.js dosyasına getAllTweets fonksiyonunu ekleyin
export const getAllTweets = async () => {
     try {
       const response = await fetch(`${API_URL}/tweets`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
         },
       });
   
       if (!response.ok) throw new Error('Tweetler alınamadı');
       const data = await response.json();
       return data; // Başarılı yanıt
     } catch (error) {
       throw error; // Hata durumu
     }
   };
   

// Other API functions...

