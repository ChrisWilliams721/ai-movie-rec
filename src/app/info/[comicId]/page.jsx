"use client";
import React, { useEffect, useState } from "react";
import md5 from "md5";
import { useParams, useRouter } from "next/navigation";
import { saveComic, addPost } from "../../_services/posts-services";
import { useUserAuth } from "../../_utils/auth-context";
import Modal from "../../components/modal";


export default function Info() {
  const { comicId } = useParams();
  const [review, setReview] = useState("");
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUserAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleBlog = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  const handleSaveBlog = async (title, review, rating) => {
    const comicThumbnailUrl = comic?.thumbnail
      ? `${comic.thumbnail.path}.${comic.thumbnail.extension}`
      : "";
    try {
      await addPost(title, review, user.uid, comicId, comicThumbnailUrl, rating);
      console.log("Blog content saved:", title, review, comicId, comicThumbnailUrl, rating);
    } catch (error) {
      console.error("Error saving blog content:", error);
    }
    setIsModalOpen(false);
  };
  const handleAddToReadlist = async (e) => {
      e.preventDefault();
      try {
        await saveComic(comicId, user.uid); 
        console.log("Comic added to readlist successfully!");
      } catch (error) {
        console.error("Error adding comic to readlist: ", error);
      }
    };

  if (loading) return <p>Loading comic details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div>
        <img src="../../back.png" alt="" className="w-9 h-9 cursor-pointer" onClick={() => router.back()} />
      </div>
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
          <img src="../../bookmark-white.png"  className="w-6 h-6 b cursor-pointer mt-1" onClick={handleAddToReadlist}/>
          <img src="../../blog.png"  className="w-7 h-7 b cursor-pointer" onClick={handleBlog}/>
          <Modal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveBlog}/>
        </div>
    </div>
  );
}
