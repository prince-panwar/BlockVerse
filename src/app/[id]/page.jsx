"use client"
import React,{useState,useEffect} from 'react'
import {Image} from "@nextui-org/react";


function InfoPage({params}) {
 const [movie, setMovie] = useState({});
  useEffect(()=>{
    const movieId = params.id;
    async function getMovie(_movieId) {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${_movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      setMovie(await res.json());
     
     }
     getMovie(movieId);
  },[])
 
   
  return (
     <div >
 <div className="w-full mt-20 ">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row items-center content-center max-w-6xl mx-auto md:space-x-6">
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            movie.backdrop_path || movie.poster_path
          }`}
          width={1000}
          height={1000}
          className="rounded-lg"
          
          placeholder="blur"
          blurDataURL="/spinner.svg"
          alt="Movie poster"
        ></Image>
        <div className="p-2">
          <h2 className="text-lg mb-3 font-bold">
            {movie.title || movie.name}
          </h2>
          <p className="text-lg mb-3">
            <span className="font-semibold mr-1">Overview:</span>
            {movie.overview}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Date Released:</span>
            {movie.release_date || movie.first_air_date}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Rating:</span>
            {movie.vote_count}
          </p>
        </div>
      </div>
    </div>


     
     
     </div>
  )
}

export default InfoPage;