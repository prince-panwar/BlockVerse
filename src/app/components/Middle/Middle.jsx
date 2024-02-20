"use client"
import React from 'react'

import './Middle.css';
import  VideoCard  from "../Cards/VideoCard"
function Middle() {
    const cards = [
        {
          id: 1,
          title: 'One Piece',
          price: '$100',
          des: 'King of the priates',
          imageUrl: 'https://wallpapercave.com/wp/wp8300141.jpg',
        },
        {
          id: 2,
          title: 'Naruto',
          price: '$80',
          des: 'Hokage of Hidden Leaf Village',
          imageUrl: 'https://www.commonsensemedia.org/sites/default/files/styles/ratio_2_3_xlarge/public/product-images/csm-tv/naruto-shippuden-poster.jpg',
        },
        {
            id: 3,
            title: 'Solo Leveling',
            price: '$95',
            des: 'From weakest to strongest',
            imageUrl: 'https://otakukart.com/wp-content/uploads/2022/07/Solo-Leveling.jpg',
          },
          {
            id: 4,
            title: 'Dragon Ball',
            price: '$70',
            des: 'Saiyan Warriors solos animeverse',
            imageUrl: 'https://data1.ibtimes.co.in/en/full/575040/dragon-ball-super.jpg',
          },
        // Add more objects as needed
      ];
  return (
    <>
    <div className="content-center">
      <div className="heading">
          <h2>Menu</h2>
          <h5>Recommended</h5>
      </div>
      <div className="flex justify-center mt-10">
          {cards.map(card => (
            <VideoCard
              key={card.id}
              title={card.title}
              price={card.price}
              des={card.des}
              imageUrl={card.imageUrl}
            />
          ))}
      </div>
    </div>
    </>
  )
}

export default Middle