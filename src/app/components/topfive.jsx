"use client";
import React, { useEffect, useState } from "react";
import md5 from "md5";

export default function MarvelComics() {
  const [comics, setComics] = useState([null]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarvelComics = async () => {
      const publicKey = "947a33af67fce0d0d7dc0c15c5b11536";
      const privateKey = "bfe54bdbd10aa381de5cca8f09763ba3d636e79c";
      const ts = new Date().getTime();
      const hash = md5(ts + privateKey + publicKey);

      const today = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);

      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
        };

      const endpoint = "https://gateway.marvel.com/v1/public/comics";
      const params = new URLSearchParams({
        ts: ts,
        apikey: publicKey,
        hash: hash,
        limit: 5,
        dateRange: `${formatDate(lastWeek)},${formatDate(today)}`,
      });
      try {
        const response = await fetch(`${endpoint}?${params}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setComics(data.data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchMarvelComics();
    console.log("Fetching comics..." + comics);
  }, []);

  if (loading) return <p>Loading comics...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div class="flex-1 mx-auto w-11/12 h-20 items-center mr-7 mt-10">
      <h1 className="text-xl">Top 5 Marvel Comics this week </h1>
      <ul className="space-y-4 flex flex-wrap">
        {comics.map((comic) => (
          <li key={comic.id} className="border-b py-2 ">
            {comic.thumbnail && (
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
                className="w-full h-48"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
