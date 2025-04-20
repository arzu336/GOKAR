// src/components/AddCommentForm.js
import React, { useState } from 'react';

const AddCommentForm = ({ tweetId, onCommentAdded }) => {
  const [comment, setComment] = useState(''); // Yorumun metnini tutacak state
  const [isSubmitting, setIsSubmitting] = useState(false); // Yorum gönderme durumu

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment) return; // Yorum boşsa gönderme

    setIsSubmitting(true); // Gönderme işlemi başladı

    // Yorum ekleme işlemi simülasyonu (bu kısmı backend API'nizle değiştirebilirsiniz)
    setTimeout(() => {
      onCommentAdded({
        id: Date.now(), // Yorumun benzersiz ID'si
        content: comment,
        tweetId,
      });

      setComment(''); // Yorum metnini sıfırla
      setIsSubmitting(false); // Gönderme işlemini bitir
    }, 1000); // Simülasyon süresi
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)} // Yorum metni değiştikçe state güncellenir
        placeholder="Yorum yap..."
        rows="4"
        cols="50"
      />
      <div>
        <button type="submit" disabled={isSubmitting || !comment}>
          {isSubmitting ? 'Gönderiliyor...' : 'Yorum Gönder'}
        </button>
      </div>
    </form>
  );
};

export default AddCommentForm;
