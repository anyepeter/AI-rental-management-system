import React from 'react'
import { useRouter } from "next/navigation";

export default function AiFeature() {
    const router = useRouter();
    const aiHandle = () => {
        router.push('/ai')
      }
      
  return (

    <div onClick={aiHandle} className="fixed hover:animate-spin rounded-full h-10 w-10 border-t-2 flex justify-center items-center cursor-pointer border-b-2 bottom-7 right-[10%] z-30 bg-primaryColor text-white animation-delay-[10s] hover:scale-110 transition-transform duration-300"> <p>AI</p></div>
  )}
