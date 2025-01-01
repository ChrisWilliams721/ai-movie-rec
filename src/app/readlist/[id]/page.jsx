"use client";
import React from 'react'
import Nav from '../../components/navbar'
import { getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../_utils/firebase';
import { useState } from 'react';
import { useEffect } from 'react';
import { useUserAuth } from '../../_utils/auth-context';

export default function Readlist() {
  const [posts, setPosts] = useState([]);
  const {user} = useUserAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!user) {
    return <div>Loading...</div>;
  }
  if (!user.emailVerified) {
    return <div>Verify your email to access this page.</div>;
  }

  useEffect(() => {
    
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() });
        });
        setPosts(posts);
      } catch (e) {
        console.error("Error getting documents: ", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [user]);
    
  return (
    <div>
        <Nav/>
        <div>Readlist</div>
        {loading && <p>Loading posts...</p>}
        {error && <p>Error: {error}</p>}
        {posts.map((post) => (
          <div key={post.id}>{post.review}</div>
        ))}
        
    </div>
  )
}
