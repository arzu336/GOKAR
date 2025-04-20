import React, { useState, useRef } from 'react';
import { addTweet, deleteTweet } from '../services/api';
import '../App.css';

const AddTweetForm = ({ onTweetAdded, onTweetDeleted }) => {
  const [tweetContent, setTweetContent] = useState('');
  const [image, setImage] = useState(null);
  const [gif, setGif] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // input dosyalarını temizlemek için referanslar
  const imageInputRef = useRef(null);
  const gifInputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!tweetContent.trim()) {
      setError('Tweet içeriğini boş bırakmayın.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('content', tweetContent);
      if (image) formData.append('image', image);
      if (gif) formData.append('gif', gif);

      const addedTweet = await addTweet(formData); // backend'e gönder
      
      // Üst bileşene yeni tweet bilgisini bildir
      if (onTweetAdded) onTweetAdded(addedTweet);

      // Form temizliği
      setTweetContent('');
      setImage(null);
      setGif(null);
      setError(null);
      imageInputRef.current.value = '';
      gifInputRef.current.value = '';
    } catch (err) {
      setError('Tweet eklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTweet = async (tweetId) => {
    try {
      await deleteTweet(tweetId); // Tweeti backend'den sil
      if (onTweetDeleted) onTweetDeleted(tweetId); // Silinen tweetin ID'sini üst bileşene bildir
    } catch (err) {
      setError('Tweet silinirken bir hata oluştu.');
    }
  };

  return (
    <div className="add-tweet-form">
      <h3>Yeni Tweet</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={tweetContent}
          onChange={(e) => setTweetContent(e.target.value)}
          placeholder="Ne oluyor?"
          rows="3"
        />
        
        <div className="media-upload">
          <label>
            Resim:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              ref={imageInputRef}
            />
          </label>

          <label>
            GIF:
            <input
              type="file"
              accept="image/gif"
              onChange={(e) => setGif(e.target.files[0])}
              ref={gifInputRef}
            />
          </label>
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Gönderiliyor...' : 'Tweetle'}
        </button>
      </form>

      {/* Tweetleri silmek için bir buton */}
      <div className="tweet-actions">
        <button onClick={() => handleDeleteTweet(1)}>Tweeti Sil</button> {/* Tweet ID'yi dinamik yapmalısınız */}
      </div>
    </div>
  );
};

export default AddTweetForm;
