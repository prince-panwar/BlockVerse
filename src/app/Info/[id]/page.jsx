"use client"
import React,{useState,useEffect} from 'react'
import {Image} from "@nextui-org/react";
import { useContract } from '@/app/Context/ContractContext';

function InfoPage({params}) {
 const [movie, setMovie] = useState({});
 const {connectWallet, currentUser, contractInstance} = useContract();
 const [error,setError]=useState(false);
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
  const contract=useContract();
  const[isConnected, setIsConnected] = useState(false);
  

  const Buy = async() =>{
    if(currentUser &&currentUser.length > 0){
      console.log("insideif")
      console.log(contractInstance)
      try{
        let buy = await contractInstance?.watchMovie(params.id);
        setMessage("Claim Successfull")
       }
       catch(e){
       setError(e.message);
      
       console.log(e);
     }
    }else{
      connectWallet();
    }
  
  }
  
   
  return (
    <div className="relative h-screen overflow-hidden font-serif">
    <img src={`https://image.tmdb.org/t/p/original/${
          movie.backdrop_path || movie.poster_path
        }`} alt="" className='w-full h-full object-cover filter brightness-50'/>
    <div className="absolute top-0 w-full mt-20">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row items-center content-center max-w-6xl mx-auto md:space-x-6">
        <div className="p-2">
          <h2 className="text-2xl mb-3 font-bold text-red-600">
            {movie.title || movie.name}
          </h2>
          <p className="text-xl mb-3  text-slate-200">
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
         <button onClick={Buy}> Buy</button>
        </div>
      </div>
    </div>
  </div>
  )
}
export default InfoPage;