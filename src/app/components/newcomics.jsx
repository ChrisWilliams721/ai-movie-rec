"use client";
import React, { useEffect, useState } from "react";
import md5 from "md5";
import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";

export default function MarvelComics() {
  const [newComics, setNewComics] = useState([]);
  const [popularComics, setPopularComics] = useState([]);
  const [popularEvents, setPopularEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useUserAuth();

  useEffect(() => {
    const fetchMarvelComics = async () => {
      const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
      const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY;
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

      const baseParams = {
        ts,
        apikey: publicKey,
        hash,
        limit: 8,
      };

      const endpoints = [
        {
          name: "new",
          url: `https://gateway.marvel.com/v1/public/comics?${new URLSearchParams(
            {
              ...baseParams,
              dateRange: `${formatDate(lastWeek)},${formatDate(today)}`,
            }
          )}`,
        },
        {
          name: "popular",
          url: `https://gateway.marvel.com/v1/public/comics?${new URLSearchParams(
            {
              ...baseParams,
              orderBy: "modified", // Use "modified" to simulate popularity
            }
          )}`,
        },
        {
          name: "events",
          url: `https://gateway.marvel.com/v1/public/events?${new URLSearchParams(
            {
              ...baseParams,
              orderBy: "modified", // Use "modified" to simulate popularity
            }
          )}`,
        },
      ];

      try {
        const results = await Promise.all(
          endpoints.map(async (endpoint) => {
            const response = await fetch(endpoint.url);
            if (!response.ok) {
              throw new Error(`Failed to fetch ${endpoint.name} comics`);
            }
            return response.json();
          })
        );

        setNewComics(results[0].data.results || []);
        setPopularComics(results[1].data.results || []);
        setPopularEvents(results[2].data.results || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarvelComics();
  }, []);

  if (loading)
    return <p className="text-white text-center mt-9">Loading comics...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col mx-auto w-11/12 mt-10">
      {/* New Comics Section */}
      <h1 className="text-xl mb-4 text-white font-bold ml-5">
        New Marvel Comics This Week
      </h1>
      <div className="flex space-x-4 p-4 rounded-lg">
        {newComics.map((comic) => (
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

      {/* Popular Comics Section */}
      <h1 className="text-xl mt-10 mb-4 text-white font-bold ml-5">
        Popular This Week
      </h1>
      <div className="flex space-x-4 p-4 rounded-lg">
        {popularComics.map((comic) => (
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

      {/*Popular Events */}
      <h1 className="text-xl mt-10 mb-4 text-white font-bold ml-5">
        Popular Events This Week
      </h1>
      <div className="flex space-x-4 p-4 rounded-lg">
        {popularEvents.map((comic) => (
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
  );
}
