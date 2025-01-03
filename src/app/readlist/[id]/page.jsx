"use client";
import React from 'react'
import Nav from '../../components/navbar'
import { db } from '../../_utils/firebase';
import { useState } from 'react';
import { useEffect } from 'react';
import { useUserAuth } from '../../_utils/auth-context';
import { getDoc, doc } from 'firebase/firestore';
import md5 from 'md5';
import Link from 'next/link';



export default function Readlist() {
  const [posts, setPosts] = useState([]);
  const [readlist, setReadlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUserAuth();

  useEffect(() => {
    if (!user) {
      return;
    }
    
    const fetchReadlist = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const readlist = [...new Set(userData.readlist || [])];
          setReadlist(readlist);

          for (const comicId of readlist) {
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

            const response = await fetch(`${endpoint}?${params}`);
            if (!response.ok) {
              throw new Error("Failed to fetch comic details");
            }
            const data = await response.json();
            const comic = data.data.results[0];
            posts.push({ id: comic.id, ...comic });
          }
          setPosts(posts);
        } else {
          setError("User document does not exist");
        }
      } catch (e) {
        console.error("Error getting documents: ", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReadlist();
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }
  if (!user.emailVerified) {
    return <div>Verify your email to access this page.</div>;
  }

  return (
    <div>
      <Nav />
      <div className="flex flex-col mx-auto w-11/12 mt-10">
      {/* New Comics Section */}
      <h1 className="text-xl mb-4 text-white font-bold ml-5">
        New Marvel Comics This Week
      </h1>
      <div className="flex space-x-4 p-4 rounded-lg">
        {posts.map((comic) => (
          <Link
            href={`/info/${comic.id}`}
            key={comic.id}
            className="min-w-[200px] max-w-[200px] rounded shadow-md bg-gray-800 text-white hover:shadow-lg transform hover:scale-105 transition"
          >
            {comic.thumbnail && (
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
                className="w-full h-auto rounded-t"
              />
            )}
            <p className="text-center text-sm mt-2 font-semibold px-2">
              {comic.title}
            </p>
          </Link>
        ))}
      </div>
      </div>
    </div>
  )
}
