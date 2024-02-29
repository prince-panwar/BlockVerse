"use client"
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import VideoCard from '../../components/Cards/VideoCard';
import axios from 'axios';
import Nav from '@/app/components/Navbar/Navbar';
export default function Page({params}) {
  const [list, setList] = useState();

 
  useEffect(()=>{
    async function getList(params) {
      console.log(params.more);
      const type = params.more;
      console.log(type);
      try{
        const res= await axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
        setList(res.data.results);
      }
      catch(err){
        console.log(err);
      }
    }
     getList(params);
    console.log(list);
  },[])

function capitalizeFirstLetter(string) {
    string = string.replace(/[^\w\s]|_/g, ' ');
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let str = params.more;
str = capitalizeFirstLetter(str);


  return (
    <>
    <Nav/>
    <div className="flex flex-col items-center mt-24">
    <div className="heading mb-4">
      <h2 className="text-2xl mt-8 font-bold">{str}</h2>
    </div>
    <div className="flex justify-center mt-8 flex-wrap">
    {list?.map(card => (
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
  );
}
