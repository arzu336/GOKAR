import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import AddTweetForm from '../components/AddTweetForm';
import TweetList from '../components/TweetList';
import { getAllTweets, addTweet, deleteTweet } from '../services/api';
import '../App.css';

import homeIcon from '../post/home.png';
import notificationIcon from '../post/notification.png';
import messageIcon from '../post/letter.png';
import xLogo from '../post/x.png';
import profileIcon from '../post/profile.png';

const HomePage = () => {
  const { user, logout } = useAuth(); // Logout fonksiyonunu alıyoruz
  const navigate = useNavigate(); // Yönlendirme için useNavigate kullanıyoruz
  const [tweets, setTweets] = useState([]);
  const [showMenu, setShowMenu] = useState(false); // Profil menüsünü açma/kapatma durumu

  // Tweetleri yüklemek için
  useEffect(() => {
    const loadTweets = async () => {
      try {
        const data = await getAllTweets();
        setTweets(data);
      } catch (err) {
        console.error('Tweetler alınırken hata:', err);
      }
    };

    if (user) {
      loadTweets();
    }
  }, [user]);

  // Yeni tweet eklemek için
  const handleNewTweet = async (newTweet) => {
    try {
      const addedTweet = await addTweet(newTweet);
      setTweets((prevTweets) => [addedTweet, ...prevTweets]); // Tweeti state'e ekle
    } catch (err) {
      console.error('Tweet eklenirken hata:', err);
    }
  };

  // Tweet silmek için
  const handleDeleteTweet = async (tweetId) => {
    try {
      const deletedTweetId = await deleteTweet(tweetId);
      setTweets((prevTweets) => prevTweets.filter(tweet => tweet.id !== deletedTweetId)); // Silinen tweeti state'ten kaldır
    } catch (err) {
      console.error('Tweet silinirken hata:', err);
    }
  };

  // Çıkış yapma fonksiyonu
  const handleLogout = () => {
    logout();  // AuthContext'deki logout fonksiyonunu çağırıyoruz
    navigate('/login'); // Çıkış yaptıktan sonra kullanıcıyı giriş sayfasına yönlendiriyoruz
  };

  return (
    <div className="container">
      {/* Sol Çubuk */}
      <aside className="sidebar">
        <div className="logo" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src={xLogo} alt="Logo" width={40} height={40} />
        </div>

        {/* X logosunun altına ikonlar */}
        <div className="icon-list" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <Link to="/">
            <img src={homeIcon} alt="Ana Sayfa" width={30} height={30} />
          </Link>
          <Link to="/notifications">
            <img src={notificationIcon} alt="Bildirimler" width={30} height={30} />
          </Link>
          <Link to="/messages">
            <img src={messageIcon} alt="Mesajlar" width={30} height={30} />
          </Link>
          <Link to="/profile">
            <img src={profileIcon} alt="Profil" width={30} height={30} onClick={() => setShowMenu(!showMenu)} />
          </Link>
        </div>

        {/* Profil menüsü */}
        {showMenu && (
          <div className="profile-menu">
            <button onClick={handleLogout}>Çıkış Yap</button>  {/* Çıkış yap butonunu burada ekliyoruz */}
          </div>
        )}
      </aside>

      {/* Ana İçerik */}
      <main className="main-content">
        <div className="tweet-box">
          <img src={homeIcon} alt="Ana Sayfa Başlık" width={40} height={40} style={{ marginBottom: '1rem' }} />

          {user ? (
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <h3 className="text-lg font-semibold text-gray-700">Tweetinizi paylaşın</h3>
              <AddTweetForm onTweetAdded={handleNewTweet} />
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl text-center">
              <p className="text-lg text-gray-600">Lütfen tweetleri görmek ve paylaşmak için giriş yapın.</p>
            </div>
          )}

          {/* Tweet listesi */}
          <TweetList tweets={tweets} onDeleteTweet={handleDeleteTweet} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
