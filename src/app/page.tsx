
import React from 'react'
import ThemeSwitcher from './components/ThemeSwitcherButton'
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import Nav from './components/Navbar/Navbar'
import Carousel from './components/Carousal/Carousal'
export default function Home() {
  return (
    <>
  <ThemeSwitcher /> 
      <Nav/>
    <Carousel/>
    </>
  )
}
