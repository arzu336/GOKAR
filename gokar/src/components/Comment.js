// components/Comment.js
import React, { useState } from 'react';
import { deleteComment, updateComment } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Comment = ({ comment, onDelete, onUpdate }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleDelete = async () => {
    try {
      await deleteComment(comment._id, user.token);
      onDelete(comment._id);
    } catch (err) {
      console.error('Yorum silinirken hata:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateComment(comment._id, editedContent, user.token);
      onUpdate(comment._id, editedContent);
      setIsEditing(false);
    } catch (err) {
      console.error('Yorum güncellenirken hata:', err);
    }
  };

  return (
    <div className="comment-box">
      <p><strong>{comment.author.username}</strong></p>

      {isEditing ? (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Kaydet</button>
          <button onClick={() => setIsEditing(false)}>İptal</button>
        </div>
      ) : (
        <p>{comment.content}</p>
      )}

      {user._id === comment.author._id && (
        <div>
          <button onClick={() => setIsEditing(true)}>Düzenle</button>
          <button onClick={handleDelete}>Sil</button>
        </div>
      )}
    </div>
  );
};

export default Comment;
