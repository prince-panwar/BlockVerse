"use client"
import React ,{useEffect, useState}from 'react'
import axios from 'axios';
import 'dotenv/config';
import  VideoCard  from "../Cards/VideoCard"
import { useRouter } from 'next/Navigation';

function Middle() {
      const router = useRouter();
      const [topRatedList,setTopRatedList] = useState([]);
      const [popularList,setPopularList] = useState([]);
      const [upcomingList,setUpcomingList] = useState([]);
      
      const API = process.env.NEXT_PUBLIC_API_KEY;
      console.log(API);
       useEffect(() => {
        async function fetchData() {
          try {

            //toprated
           const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API}`);
            setTopRatedList(response.data.results);

           //popular
           const response2 = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API}`);
           setPopularList(response2.data.results);

            
           //up coming
            const response3 = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API}`);
            setUpcomingList(response3.data.results);

          } catch (error) {
            console.error('Error:', error);
          }
        }
    
        fetchData();
      }, []);

      const handleClick = async(type) => {
        console.log(type);
        router.push(`/More/${type}`);
      };
      
  return (
    <>
  
    {/* toprated section */}
    <div className="flex flex-col items-center">
    <div className="heading mb-4">
      <h2 className="text-2xl mt-8 font-bold">Top Rated</h2>
    </div>
    <button className="text-blue-500" onClick={() => handleClick('top_rated')}>View More</button>
    <div className="flex justify-center mt-8 flex-wrap">
      {topRatedList.slice(0, 4).map(card => (
        <VideoCard
          key={card.id}
          id={card.id}
          title={card.title}
          price={card.price}
          des={card.overview}
          imageUrl={"https://image.tmdb.org/t/p/original"+card.poster_path}
        />
      ))}
    </div>
    </div>
    {/* popular section */}
    <div className="flex flex-col items-center">
    <div className="heading mb-4">
      <h2 className="text-2xl mt-8 font-bold">Popular</h2>
    </div>
    <button className="text-blue-500" onClick={() => handleClick('popular')}>View More</button>
    <div className="flex justify-center mt-8 flex-wrap">
      {popularList.slice(0, 4).map(card => (
        <VideoCard
          key={card.id}
          id={card.id}
          title={card.title}
          price={card.price}
          des={card.overview}
          imageUrl={"https://image.tmdb.org/t/p/original"+card.poster_path}
        />
      ))}
    </div>
    </div>
    {/* upcoming section */}
    <div className="flex flex-col items-center">
    <div className="heading mb-4">
      <h2 className="text-2xl mt-8 font-bold">Upcoming</h2>
    </div>
    <button className="text-blue-500" onClick={() => handleClick('upcoming')}>View More</button>
    <div className="flex justify-center mt-8 flex-wrap">
      {upcomingList.slice(0, 4).map(card => (
        <VideoCard
          key={card.id}
          id={card.id}
          title={card.title}
          price={card.price}
          des={card.overview}
          imageUrl={"https://image.tmdb.org/t/p/original"+card.poster_path}
        />
      ))}
    </div>
    </div>


    </>
  )
}

export default Middle