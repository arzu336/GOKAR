import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTweetDetails, addCommentToTweet } from '../services/api'; // API'ye yorum ekleme fonksiyonu ekledik
import { useAuth } from '../context/AuthContext';
import Comment from '../components/Comment';

const TweetDetailPage = () => {
  const { id } = useParams(); // Tweetin ID'si URL'den alınacak
  const { user } = useAuth();
  const [tweet, setTweet] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); // Yorum eklerken loading durumu

  useEffect(() => {
    const fetchTweetDetails = async () => {
      try {
        const fetchedTweet = await getTweetDetails(id);
        setTweet(fetchedTweet);
        setComments(fetchedTweet.comments); // Tweetle birlikte gelen yorumları al
      } catch (err) {
        setError('Tweet detayları yüklenirken bir hata oluştu.');
      }
    };

    fetchTweetDetails();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setLoading(true); // Yorum ekleme işlemi başlatıldı

    try {
      // Yeni yorumu API'ye ekleyelim
      const addedComment = await addCommentToTweet(id, {
        userId: user.id,
        username: user.name,
        text: newComment,
      });

      // Başarıyla yorum eklenince, yorumları tekrar güncelle
      setComments((prevComments) => [...prevComments, addedComment]);
      setNewComment('');
      setSuccessMessage('Yorum başarıyla eklendi!');
      setError('');
    } catch (err) {
      setError('Yorum eklerken bir hata oluştu.');
      setSuccessMessage('');
    } finally {
      setLoading(false); // Yorum ekleme işlemi bitti
    }
  };

  return (
    <div className="tweet-detail-page">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      {tweet ? (
        <div>
          <h2>{tweet.username} tarafından gönderilen tweet</h2>
          <p>{tweet.text}</p>

          {/* Yorum ekleme */}
          <div className="add-comment">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Yorum yapın..."
            />
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim() || loading} // Yorum kutusu boşsa buton devre dışı kalsın
            >
              {loading ? 'Yorum ekleniyor...' : 'Yorum Ekle'}
            </button>
          </div>

          {/* Yorumlar */}
          <div className="comments-section">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <Comment key={index} comment={comment} tweetId={id} />
              ))
            ) : (
              <p>Bu tweet için henüz yorum yapılmamış.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Tweet yükleniyor...</p>
      )}
    </div>
  );
};

export default TweetDetailPage;
