"use client"
import React ,{useEffect, useState}from 'react'
import axios from 'axios';
import  VideoCard  from "../Cards/VideoCard"
import 'dotenv/config';


function Middle() {
      const [topRatedList,setTopRatedList] = useState([]);
      const [popularList,setPopularList] = useState([]);
      const [upcomingList,setUpcomingList] = useState([]);
      
      const API = process.env.NEXT_PUBLIC_API_KEY;
      console.log(API);
       useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API}`);
            setTopRatedList(response.data.results);
            console.log(response.data.results);
          } catch (error) {
            console.error('Error:', error);
          }
        }
    
        fetchData();
      }, []);
  return (
    <>
   <div className="content-center">
  <div className="flex flex-col items-center">
    <div className="heading mb-4">
      <h2 className="text-2xl mt-8 font-bold">Trending</h2>
    </div>
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
    <div>
      
    </div>
  </div>
</div>

    </>
  )
}

export default Middle