"use client"
import React from 'react'
import ThemeSwitcher from './components/ThemeSwitcherButton'
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
export default function Home() {
  return (
    <>
   
  <div className=' flex items-center justify-center h-screen'>
  <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://wrapime.com/wp-content/uploads/2023/10/10-choses-savoir-roronoa-zoro-boutique-one-piece-11.jpeg"
          width={270}
        />
      </CardBody>
    </Card>
  </div>
  </>
  )
}
