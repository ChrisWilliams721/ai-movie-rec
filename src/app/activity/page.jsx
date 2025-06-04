"use client";
import React, { useEffect, useState } from 'react'
import Nav from '../components/navbar'
import { useUserAuth } from '../_utils/auth-context';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../_utils/firebase';

export default function Activity() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUserAuth();
  const [comic, setComic] = useState(null);
  const [comicId, setComicId] = useState(""); // Example comic ID, replace with actual logic to get comic ID

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users", user.uid, "posts"));
      const postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsArray);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchComic = async () => {
      const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
      const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY;
      const ts = new Date().getTime();
      const hash = md5(ts + privateKey + publicKey);

      const endpoint = `https://gateway.marvel.com/v1/public/comics/${comicId}`;
      const params = new URLSearchParams({
        ts: ts,
        apikey: publicKey,
        hash: hash,
      });

      try {
        const response = await fetch(`${endpoint}?${params}`);
        if (!response.ok) {
          throw new Error("Failed to fetch comic details");
        }
        const data = await response.json();
        setComic(data.data.results[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (comicId) {
      fetchComic();
    }
  }, [comicId]);

  useEffect(() => {
    if (user) fetchPosts();
  }, [user]);

  return (
    <div>
      <Nav/>
      <div className="flex flex-col mx-auto w-11/12 mt-10">
        <h1 className="text-xl mb-4 text-white font-bold ml-5">Activity</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div className='flex space-x-4 p-4 rounded-lg'>
          {posts.map((post) => (
            <div key={post.id} className="flex bg-gray-800 p-4 rounded-lg w-1/3">
              {post.comicThumbnailUrl && (
                <img
                  src={post.comicThumbnailUrl}
                  alt={post.title}
                  className="h-60 object-cover rounded mb-2"
                />
              )}
              <div className="ml-4 flex flex-col justify-between">
                <h2 className="text-lg font-bold text-white">{post.title}</h2>
                <p className="text-gray-300">{post.review}</p>
                <p className="text-gray-500">Rating: {post.rating}</p>
                <p className="text-gray-500">Comic ID: {post.comicId}</p>
                
              </div>
            </div>
          ))}
        </div>
        
        
      </div>
    </div>
  )
}
