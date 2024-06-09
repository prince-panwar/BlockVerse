import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigationavigation';
import { Spinner } from "@nextui-org/react";
import VideoCard from "../Cards/VideoCard";

function Middle({ searchQuery }) {
  const router = useRouter();
  const [topRatedList, setTopRatedList] = useState([]);
  const [popularList, setPopularList] = useState([]);
  const [upcomingList, setUpcomingList] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    async function fetchData() {
      try {
        //toprated
        const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API}`);
        setTopRatedList(response.data.results);

        //popular
        const response2 = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API}`);
        setPopularList(response2.data.results);

        //upcoming
        const response3 = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API}`);
        setUpcomingList(response3.data.results);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  const handleClick = async (type) => {
    router.push(`/More/${type}`);
  };

  useEffect(() => {
    const fetchSearchData = async () => {
      if (searchQuery) {
        setLoading(true);
        try {
          const searchResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API}`, {
            params: {
              query: searchQuery,
              include_adult: false,
              language: 'en-US',
              page: 1,
              
              
            }
          });
          setSearchData(searchResponse.data.results);
          console.log(searchResponse.data.results);
        } catch (error) {
          console.error('Error fetching search data:', error);
          // Handle error, e.g., set state for error handling
        }
        setLoading(false);
      }
    };
  
    fetchSearchData();
  }, [searchQuery]);
  

  return (
    <>
      {/* Render spinner if searchQuery is present and searchResponse is pending */}
      {searchQuery && loading && <div className='flex items-center justify-center mt-8'><Spinner  /></div>}

      {/* Render search results if searchQuery is present and searchResponse is available */}
      {searchQuery && !loading && searchData.length > 0 && (
        <div className="flex justify-center mt-8 flex-wrap">
          {searchData.map(card => (
            <VideoCard
              key={card.id}
              id={card.id}
              title={card.title}
              price={card.price}
              des={card.overview}
              imageUrl={"https://image.tmdb.org/t/p/original" + card.poster_path}
            />
          ))}
        </div>
      )}

      {/* Render default sections */}
      {!searchQuery && (
        <>
          {/* Top Rated Section */}
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
                  imageUrl={"https://image.tmdb.org/t/p/original" + card.poster_path}
                />
              ))}
            </div>
          </div>

          {/* Popular Section */}
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
                  imageUrl={"https://image.tmdb.org/t/p/original" + card.poster_path}
                />
              ))}
            </div>
          </div>

          {/* Upcoming Section */}
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
                  imageUrl={"https://image.tmdb.org/t/p/original" + card.poster_path}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Middle;
