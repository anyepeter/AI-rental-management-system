"use client"
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { Star } from 'lucide-react'
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import React, { useState } from 'react';
import Slider from '@/components/slider'
import '../globals.css'
import NearbyPlaces from '@/components/nearby'
import VideoPlayer from '@/components/videoPlayer'
import GooglesDetails from '@/components/detailPlace'

const images = [
    "/images/01.jpg",
    "/images/images.jpeg",
    "/images/01.jpg",
    "/images/01.jpg",
    "/images/01.jpg",
];

export default function page() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    const [selectedImage, setSelectedImage] = useState<string>(images[0]);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    return (
        <section className="flex w-full flex-col min-h-screen items-center justify-between pt-26">
            <Navbar />
            <main className="w-full mt-60 max-w-[1350px] mb-10 md:mb-20 flex flex-col p-4 md:p-4 items-center justify-center">
                <div className='flex flex-row h-4 items-end justify-between gap-4 w-full'>
                    <div className='flex flex-col justify-end gap-2'>
                        <p className='p-3 bg-primaryColor text-white rounded-md'>Apartment</p>
                        <h1 className='text-xl md:text-2xl text-customBlack'>Title</h1>
                        <p className='text-customGrey'>Location</p>
                    </div>

                    <div className='flex flex-col justify-end gap-2'>
                        <Star />
                        <h1 className='text-xl md:text-2xl text-primaryColor'>3000 CFA</h1>
                    </div>
                </div>

                <div className=' flex flex-row items-center justify-between gap-4 lg:hidden mt-10'>
                    <div className=' flex pl-4 pr-4 items-center justify-center'>
                        <Carousel
                            plugins={[plugin.current]}
                            className=" flex items-center justify-center"
                            onMouseEnter={plugin.current.stop}
                            onMouseLeave={plugin.current.reset}
                        >
                            <CarouselContent className=''>
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <CarouselItem className='w-full flex justify-center items-center' key={index}>
                                        <div className="p-1 w-full">
                                            <Image src="/images/01.jpg" className="brightness-75 w-full" width={1000} height={350} alt="imageojck" />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className='left-5' />
                            <CarouselNext className='right-5 text-2xl' />
                        </Carousel>

                    </div>
                </div>

                <div className='w-full h-[600px] hidden lg:flex flex-row items-center justify-between gap-4 mt-10'>
                    <Slider />
                </div>

                <div className='flex flex-col lg:flex-row w-full mt-10 gap-4'>
                    <div className='w-full lg:w-[65%]'>

                        <ul className="flex bg-secondaryColor items-end p-4 justify-start gap-10 w-full ">
                            <li>
                                <p>2</p>
                                <p className="text-customGrey text-sm mt-2" >Bedroom</p>
                            </li>
                            <li>
                                <p>0</p>
                                <p className="text-customGrey text-sm mt-2">Bathroom</p>
                            </li>
                            <li>
                                <p>4</p>
                                <p className="text-customGrey text-sm mt-2">Storage</p>
                            </li>

                            <li>
                                <p className="text-primaryColor text-sm">More+</p>
                            </li>
                        </ul>

                        <div className='flex flex-col gap-4 mt-10 '>
                            <h2 className='font-comfortaa text-2xl'>Description</h2>
                            <p className='font-muli text-md text-customGrey leading-7'>Bibendum purus aenean mus aenean eu interdum nonummy ipsum ad consequat. Dui eros donec faucibus convallis tempus rutrum id donec mus hymenaeos placerat congue curae mauris turpis gravida viverra consequat consequat gravida luctus.
                                Consectetuer aliquet. Libero porttitor curabitur vivamus accumsan placerat mattis, in lobortis auctor dolor mus, morbi. Dictumst dictumst. Faucibus. Est mollis. Turpis tortor. In vivamus venenatis neque hendrerit risus amet auctor cras, varius augue nullam morbi posuere lacus porttitor dictumst tincidunt curabitur ilisis torquent magnis cras maecenas vel. Odio proin, aptent tristique urna, nibh iaculis auctor Arcu faucibus sollicitudin donec inceptos dapibus viverra. Lorem consequat. Ac viverra torquent.</p>
                        </div>


                        <div className="flex flex-col gap-4 md:gap-8 mt-10">
                            <h2 className="font-comfortaa text-2xl">Property Summary</h2>
                            <div className="overflow-x-auto w-full">
                                <table className="min-w-full divide-y divide-gray-200">

                                    <tbody className="bg-white text-customGrey text-sm ">
                                        <tr className="bg-secondaryColor ">
                                            <td className="px-6 py-4 whitespace-nowrap">Property</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Apartment</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Property</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Apartment</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">Property</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Apartment</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Property</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Apartment</td>
                                        </tr>
                                        <tr className="bg-secondaryColor ">
                                            <td className="px-6 py-4 whitespace-nowrap">Property</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Apartment</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Property</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Apartment</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 md:gap-8 mt-10">
                            <NearbyPlaces />
                        </div>


                        <div className="flex flex-col gap-4 md:gap-8 mt-10">
                            <VideoPlayer />
                        </div>


                    </div>
                    <div className='w-full md:flex-row flex flex-col gap-5 lg:flex-col justify-start items-start lg:w-[35%]'>

                        <div className="w-full  mx-auto p-6 bg-white rounded-lg shadow-lg">
                            <h2 className='font-comfortaa text-2xl mb-6'>Property Owner</h2>
                            <div className="flex flex-row gap-3  items-center  mb-6">
                                <img
                                    className="w-20 h-20 bg-black rounded-full object-cover mb-4"
                                    src="/profile.jpg" // Replace with your profile image path
                                    alt="Profile"
                                />
                                <div className='flex flex-col gap-3'>
                                    <h2 className="text-green-500 text-xl font-semibold">Josephine Pacheco</h2>
                                    <p className="text-gray-500">+(81) 84 538 231</p>
                                </div>

                            </div>
                        </div>


                        <div className='w-full mt-6'>
                            <h2 className='font-comfortaa text-2xl mb-6'>Property location</h2>
                            <div className="flex flex-col gap-4 md:gap-8 mt-10 w-full">
                                <GooglesDetails service={{
                                    position: {
                                        lat: 3.8480,
                                        lng: 11.5021
                                    }
                                }} />

                            </div>
                        </div>


                    </div>


                </div>

                <div className='mt-20 w-full max-w-[850px] self-start'>
                    <div>
                        <h2 className="font-comfortaa text-2xl mb-4">Give Your Review</h2>
                        <hr className='mt-6 h-[2px] border-none bg-primaryColor w-24' />

                        <hr className='mb-4 mt-2 h-[2px] border-none bg-primaryColor w-12' />
                    </div>
                    <div className='mt-10'>
                        <form className="space-y-4 mt-6">

                            <div>
                                <textarea
                                    placeholder="Comments"
                                    rows={4}
                                    className="w-full px-4 py-2 bg-secondaryColor border focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="px-4 bg-primaryColor text-white py-2 hover:bg-green-600 transition-colors"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className='mt-10 w-full max-w-[850px] self-start'>
                    <h2 className="font-comfortaa text-customBlack text-2xl mb-4">User Review(0)</h2>

                    <div>
                    <div className="flex flex-col sm:flex-row bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      {/* Profile Picture */}
      <div className="flex-shrink-0">
        <img
          src="/profile.jpg" // Replace with the profile image path
          alt="User Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>

      {/* Review Content */}
      <div className="sm:ml-4 mt-4 sm:mt-0">
        <div className="flex items-center justify-between">
          {/* Name and Stars */}
          <div>
            <h3 className="font-semibold text-lg text-gray-800">Rebecca D. Nagy</h3>

          </div>
          {/* Date and Reply */}
          <div className="text-right">
            <p className="text-sm text-gray-500">27 February, 2018 at 3:27 pm</p>
          </div>
        </div>

        {/* Review Text */}
        <p className="mt-4 text-gray-500">
          Fermentum mus porttitor tempor arcu posuere. Nibh consectetuer condimentum ultricies
          pulvinar eget pede litora interdum magna aenean ullamcorper nisi dis. Viverra. Vulputate.
          Quisque neque luctus quis rhoncus.
        </p>
      </div>
    </div>
                    </div>
                </div>

            </main>

            <Footer />

        </section>
    )
}
