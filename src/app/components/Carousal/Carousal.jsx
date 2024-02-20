// Carousel.jsx
"use client"
import React, { useEffect, useRef } from 'react';

export default function MyCarousel() {
  const carouselRef = useRef(null);

  const goToNextSlide = () => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const totalSlides = carousel.children.length;
      const currentSlide = Array.from(carousel.children).findIndex(child => child.classList.contains('active'));
      const nextSlide = (currentSlide + 1) % totalSlides;
      carousel.style.transform = `translateX(-${nextSlide * 100}%)`;
      Array.from(carousel.children).forEach((child, index) => {
        child.classList.remove('active');
        if (index === nextSlide) {
          child.classList.add('active');
        }
      });
    }
  };

  const goToPrevSlide = () => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const totalSlides = carousel.children.length;
      const currentSlide = Array.from(carousel.children).findIndex(child => child.classList.contains('active'));
      const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      carousel.style.transform = `translateX(-${prevSlide * 100}%)`;
      Array.from(carousel.children).forEach((child, index) => {
        child.classList.remove('active');
        if (index === prevSlide) {
          child.classList.add('active');
        }
      });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative overflow-hidden w-full min-h-[400px] bg-white rounded-lg">
    <div className="carousel-body absolute top-0 bottom-0 start-0 flex flex-row transition-transform duration-700 opacity-100" ref={carouselRef}>
      <div className="carousel-slide w-full h-full object-scale-down flex-none active relative">
        <img className="w-full h-full object-cover object-top" src="https://blogs-images.forbes.com/erikkain/files/2017/11/justice-league.jpg" alt="First slide" />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="carousel-slide w-full h-full object-scale-down flex-none relative">
        <img className="w-full h-full object-cover object-top" src="https://m.media-amazon.com/images/S/pv-target-images/189420c3dbf235953dbb719a513f845fe8422135b1008eadc67b8356ee4d2751.jpg" alt="Second slide" />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="carousel-slide w-full h-full object-scale-down flex-none relative">
        <img className="w-full h-full object-cover object-top" src="https://static.tnn.in/thumb/msid-104879191,thumbsize-74204,width-1280,height-720,resizemode-75/104879191.jpg" alt="Third slide" />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
    </div>
    <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-transparent p-2 rounded-r-lg" onClick={goToPrevSlide}>&lt;</button>
    <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent p-2 rounded-l-lg" onClick={goToNextSlide}>&gt;</button>
  </div>
);
}
 
