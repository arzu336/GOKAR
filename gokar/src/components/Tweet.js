// src/components/Tweet.js
import React, { useState } from 'react';
import { likeTweet, deleteTweet,  updateTweet } from '../services/api'; 
import { useAuth } from '../context/AuthContext';
import Comment from './Comment';
import AddCommentForm from './AddCommentForm';

const Tweet = ({ tweet, onDelete, onUpdate }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(tweet.content);
  const [comments, setComments] = useState(tweet.comments || []);
  const [likes, setLikes] = useState(tweet.likes.length);
  const [isLiked, setIsLiked] = useState(false); // Beğenme durumunu kontrol eden state

  const handleLike = async () => {
    try {
      await likeTweet(tweet._id, user.token); // tweet id ve kullanıcı token'ını kullanarak beğenme
      setLikes(likes + 1); // Beğenilen tweet sayısını artır
      setIsLiked(!isLiked); // Beğenme durumu toggle işlemi
    } catch (err) {
      console.error('Beğenme hatası:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTweet(tweet._id, user.token);
      onDelete(tweet._id); // Tweet silindiğinde üst bileşene haber ver
    } catch (err) {
      console.error('Tweet silinemedi:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateTweet(tweet._id, editedContent, user.token);
      onUpdate(tweet._id, editedContent);
      setIsEditing(false);
    } catch (err) {
      console.error('Tweet güncellenemedi:', err);
    }
  };

  const handleRetweet = async () => {
    try {
      await retweet(tweet._id, user.token);
      alert('Retweet yapıldı!');
    } catch (err) {
      console.error('Retweet hatası:', err);
    }
  };

  const handleCommentAdd = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleCommentDelete = (commentId) => {
    setComments(comments.filter(c => c._id !== commentId));
  };

  const handleCommentUpdate = (commentId, newContent) => {
    setComments(comments.map(c => 
      c._id === commentId ? { ...c, content: newContent } : c
    ));
  };
  const API_URL = 'https://your-api-url.com';  // API URL'nizi buraya koyun

  // api.js dosyasına retweet fonksiyonunu ekleyin
const retweet = async (tweetId, userId) => {
     try {
       const response = await fetch(`${API_URL}/tweets/${tweetId}/retweet`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ userId }), // kullanıcı ID'sini içeren veri
       });
   
       if (!response.ok) throw new Error('Retweet işlemi başarısız');
       const data = await response.json();
       return data; // Başarılı retweet yanıtı
     } catch (error) {
       throw error; // Hata durumu
     }
   };
   
  return (
    <div className="tweet-box">
      <p><strong>{tweet.author.username}</strong></p>

      {isEditing ? (
        <>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Kaydet</button>
          <button onClick={() => setIsEditing(false)}>İptal</button>
        </>
      ) : (
        <p>{tweet.content}</p>
      )}

      {tweet.image && <img src={tweet.image} alt="tweet görseli" width="200" />}
      {tweet.gif && <img src={tweet.gif} alt="tweet gif" width="200" />}

      <div>
        <button onClick={handleLike}>{isLiked ? 'Beğenmekten Vazgeç' : 'Beğen'} ({likes})</button>
        <button onClick={handleRetweet}>Retweet</button>
        {user._id === tweet.author._id && (
          <>
            <button onClick={() => setIsEditing(true)}>Düzenle</button>
            <button onClick={handleDelete}>Sil</button>
          </>
        )}
      </div>

      <h4>Yorumlar</h4>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          onDelete={handleCommentDelete}
          onUpdate={handleCommentUpdate}
        />
      ))}

      <AddCommentForm tweetId={tweet._id} onAdd={handleCommentAdd} />
    </div>
  );
};

export default Tweet;
