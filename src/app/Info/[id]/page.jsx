"use client"
import React, { useState, useEffect } from 'react';
import { useContract } from '@/app/Context/ContractContext';

function InfoPage({ params }) {
  const [movie, setMovie] = useState({});
  const { connectWallet, currentUser, contractInstance, tokenInstance } = useContract();
  const [error, setError] = useState(false);
  const CONTRACT_ADDRESS = "0x5BBE5E74BcE3bE1B4D8D5848bfa1A89724b1A719";
  const [movieTrailer, setMovieTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const movieId = params.id;

  useEffect(() => {
    async function getMovie(_movieId) {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${_movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      setMovie(await res.json());
    }
    getMovie(movieId);
  }, []);

  async function watch(_movieId) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${_movieId}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const data = await res.json();
    console.log(data);
    if (data.results && data.results.length > 0) {
      setMovieTrailer(data.results[1].key);
      setShowTrailer(true);
    }
  }

  const contract = useContract();
  const [isConnected, setIsConnected] = useState(false);

  const Buy = async () => {
    if (currentUser && currentUser.length > 0) {
      try {
        let hasPurchased = await contractInstance?.hasPurchasedMovie(currentUser, movieId);
        if (!hasPurchased) {
          let requiredPayment = movieId * 1e18 / 1000000; // Calculating required payment
          // Approve contract to spend tokens
          const tx = await tokenInstance.approve(CONTRACT_ADDRESS, requiredPayment);
          await tx.wait(); // Wait for the transaction to be mined
          // Buy movie
          let buy = await contractInstance?.watchMovie(movieId);
          console.log("Claim Successful");
        } else {
           watch(movieId);
        }
      } catch (e) {
        setError(e.message);
        console.log(e);
      }
    } else {
      connectWallet();
    }
  }

  return (
    <div className="relative h-screen overflow-hidden font-serif">
      <img src={`https://image.tmdb.org/t/p/original/${
        movie.backdrop_path || movie.poster_path
      }`} alt="" className={`w-full h-full object-cover filter brightness-50 ${showTrailer ? 'hidden' : ''}`} />
      <div className={`absolute top-0 w-full h-full ${showTrailer ? 'bg-black bg-opacity-80' : ''}`}>
        <div className="p-4 md:pt-8 flex justify-center items-center h-full">
          {!showTrailer && (
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center content-center space-y-6 md:space-y-0 md:space-x-6">
                <div className="p-2 text-center">
                  <h2 className="text-2xl mb-3 font-bold text-red-600">
                    {movie.title || movie.name}
                  </h2>
                  <p className="text-xl mb-3 text-slate-200">
                    <span className="font-semibold mr-1">Overview:</span>
                    {movie.overview}
                  </p>
                  <p className="mb-3 text-yellow-100 text-medium">
                    <span className="font-semibold mr-1">Date Released:</span>
                    {movie.release_date || movie.first_air_date}
                  </p>
                  <p className="mb-3 text-yellow-100 text-medium">
                    <span className="font-semibold mr-1">Rating:</span>
                    {movie.vote_count}
                  </p>
                  <p className="mb-3 text-yellow-100 text-medium">
                    <span className="font-semibold mr-1">Price:</span>
                    {movie.vote_count}
                  </p>
                  <button onClick={Buy}>Watch</button>
                </div>
              </div>
            </div>
          )}
          {showTrailer && (
            <div className="w-full max-w-6xl">
              <div className="relative" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${movieTrailer}`}
                  title="Movie Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InfoPage;
