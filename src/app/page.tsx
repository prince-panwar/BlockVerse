
import React from 'react'
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import Nav from './components/Navbar/Navbar'
// import Carousel from './components/Carousal/Carousal'
import MyCarousel from './components/Carousel'
export default function Home() {
  return (
    <>
  <ThemeSwitcher /> 
  <MyCarousel/>

  </>
  )
}
