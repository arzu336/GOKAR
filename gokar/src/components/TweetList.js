// components/TweetList.js
import React, { useEffect, useState } from 'react';
import Tweet from './Tweet';
import { getAllTweets } from '../services/api';
import { useAuth } from '../context/AuthContext';

const TweetList = () => {
  const { user } = useAuth();
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const data = await getAllTweets(user.token);
        setTweets(data);
      } catch (err) {
        console.error('Tweetler alınamadı:', err);
      }
    };

    if (user) {
      fetchTweets();
    }
  }, [user]);

  const handleDelete = (id) => {
    setTweets(tweets.filter((tweet) => tweet._id !== id));
  };

  const handleUpdate = (id, newContent) => {
    setTweets(tweets.map((tweet) =>
      tweet._id === id ? { ...tweet, content: newContent } : tweet
    ));
  };

  return (
    <div className="tweet-list">
      {tweets.length === 0 ? (
        <p>Henüz tweet yok.</p>
      ) : (
        tweets.map((tweet) => (
          <Tweet
            key={tweet._id}
            tweet={tweet}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))
      )}
    </div>
  );
};

export default TweetList;
