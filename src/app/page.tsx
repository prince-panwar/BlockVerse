"use client"
import React,{useState} from 'react'
import Middle from  "./components/Middle/Middle"
import Nav from './components/Navbar/Navbar';
import MyCarousel from './components/Carousal/Carousal';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  function handleSearch(Q:string) {
    //console.log(Q);
    setSearchQuery(Q);
  }
  return (
    <>
     <Nav  handleSearch={handleSearch}/>
     <MyCarousel />
     <Middle searchQuery={searchQuery}/>
    </>
  )
}
