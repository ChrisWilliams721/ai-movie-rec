"use client";
import React, { useEffect, useState } from "react";

import md5 from "md5";
import { useParams, useRouter } from "next/navigation";

export default function Info() {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!comicId) return;

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

    fetchComic();
  }, [comicId]);

  const handleClick = () => {
    router.push("/blog");
  };

  if (loading) return <p>Loading comic details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    
    <div className="max-w-4xl mx-auto p-4">
      <h1 className=" text-3xl font-bold text-white mb-4">{comic.title}</h1>
      <div className="flex space-x-4">
        {comic.thumbnail && (
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
            className=" rounded-lg mb-4 size-[500px] "
          />
        )}
        <div className="flex flex-col">
          <p className="text-white text-lg">
            {comic.description || "No description available."}
          </p>
          <p className="text-gray-400 mt-4">Page Count: {comic.pageCount}</p>
          <p className="text-gray-400 mt-4">
            Published:{" "}
            {new Date(
              comic.dates.find((d) => d.type === "onsaleDate")?.date
            ).toLocaleDateString()}
          </p>
          <p className="text-gray-400 mt-1">
            Price: $
            {comic.prices.find((p) => p.type === "printPrice")?.price || "N/A"}
          </p>
        </div>
      </div>
      <div className="flex  justify-start space-x-4 mt-4 align-middle">
      <img src="../../like.png"  className="w-8 h-8 b cursor-pointer "/>
          <img src="../../bookmark-white.png"  className="w-6 h-6 b cursor-pointer mt-1"/>
          <img src="../../blog.png"  className="w-7 h-7 b cursor-pointer" onClick={handleClick}/>
        </div>
    </div>
  );
}