"use client"
import React, { useRef, useState, useCallback } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Slider: React.FC = ({images}: any) => {
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  console.log(images)

  // Handler for autoplay progress
  const onAutoplayTimeLeft = useCallback(
    (s: any, time: number, progress: number) => {
      if (progressCircle.current && progressContent.current) {
        progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
      }
    },
    []
  );

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="min-h-[500px] h-auto"
      >
        {images.map((image: any) => (
          <SwiperSlide key={image}>
            <img src={image} className='h-auto w-[auto]' alt="slide" />
          </SwiperSlide>
        ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
};

export default Slider;
