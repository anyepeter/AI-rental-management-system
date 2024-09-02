"use client"
import { useState, useRef } from 'react';

const VideoPlayer: React.FC = ({image, video}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openModal = () => {
    setIsOpen(true);
    videoRef.current?.play();
  };

  const closeModal = () => {
    setIsOpen(false);
    videoRef.current?.pause();
    videoRef.current!.currentTime = 0; 
  };

  return (
    <div className="flex flex-col mt-5">
      <h2 className="font-comfortaa text-xl mb-4">Property Video</h2>

      {/* Video Preview Section */}
      <div className="relative mt-5">
        <img
          src={image}
          alt="Video Thumbnail"
          className="w-full h-auto"
        />
        <button
          className="absolute inset-0 flex items-center justify-center"
          onClick={openModal}
        >
          <span className="bg-primaryColor text-white p-2 rounded-full text-4xl">
            &#9658;
          </span>
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative w-full max-w-4xl">
            <button
              className="absolute z-10 -top-40 right-6 p-2 py-1 bg-black rounded-[50%] text-white text-3xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <video
              ref={videoRef}
              controls
              className="w-full  h-[500px]"
              src={video}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
