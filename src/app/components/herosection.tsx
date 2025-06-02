"use client";

import React from "react";
import Image from "next/image"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HeaderCarousel: React.FC = () => {
  return (
    <div className="w-full">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        showArrows={true}
        className="relative"
      >
        {/* Slide 1 */}
        <div className="relative">

          <div className=" w-full h-[100vh]">
            <Image
              src="/carouselimg2.jpg"
              alt="Discover the World"
              fill
              className="object-cover"
              priority 
            />
          </div>
          <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center">
            <div className="max-w-3xl text-center p-4">
              <h4 className="text-white uppercase mb-3 text-sm md:text-lg">Tours & Travel</h4>
              <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">Let Discover The World Together</h1>

            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative">
           <div className=" w-full h-[100vh]">
            <Image
              src="/carouselimg1.jpg"
              alt="Discover the World"
              fill
              className="object-cover"
              priority 
            />
          </div>
          <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center">
            <div className="max-w-3xl text-center p-4">
              <h4 className="text-white uppercase mb-3 text-sm md:text-lg">Tours & Travel</h4>
              <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">Discover Amazing Places With Us</h1>

            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HeaderCarousel;
