"use client"
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { School, Star } from 'lucide-react'
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import React, { use, useEffect, useState } from 'react';
import Slider from '@/components/slider'
import NearbyPlaces from '@/components/nearby'
import VideoPlayer from '@/components/videoPlayer'
import GooglesDetails from '@/components/detailPlace'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

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
    const [isLoading, setIsLoading] = useState(true);
    const [showLoginPopup, setShowLoginPopup] = useState(false); // For showing login modal


    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const { user } = useUser()

    const params = useParams()

    const { detail } = params

    const property = useSelector((state: any) => state.property.properties.find((property: any) => property.id === detail))

    useEffect(() => {
        if (property) {
            setIsLoading(false);
        }
    }, [property]);

    const handleWhatsAppChat = () => {
        if (!user) {
          setShowLoginPopup(true); 
        } else {
          const phoneNumber = parseInt(property.user.phone.slice(1));
          window.open(`https://wa.me/${phoneNumber}`, '_blank'); 
        }
      };
    

    return (
        <section className="flex w-full flex-col min-h-screen items-center justify-between pt-26">
            <Navbar />


            {
                isLoading ? ( <div className="flex justify-center items-center h-screen">Loading...</div>) : (
                    <main className="w-full mt-60 max-w-[1350px] mb-10 md:mb-20 flex flex-col p-4 md:p-4 items-center justify-center">
                    <div className='flex flex-row h-4 items-end justify-between gap-4 w-full'>
                        <div className='flex flex-col justify-end gap-2'>
                            <p className='p-3 bg-primaryColor text-white rounded-md'>{property.category.name.charAt(0).toUpperCase()+property.category.name.slice(1)}</p>
                            <h1 className='text-xl md:text-2xl text-customBlack'>{property.title.charAt(0).toUpperCase()  + property.title.slice(1)}</h1>
                            <p className='text-customGrey'>{property.address}</p>
                        </div>
    
                        <div className='flex flex-col items-end justify-end gap-2'>
                            <Star />
                            <h1 className='text-xl md:text-xl text-primaryColor'>{property.price} CFA</h1>
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
                                    {property.images.map((image: string, index: number) => (
                                        <CarouselItem className='w-full flex justify-center items-center' key={index}>
                                            <div className="p-1 w-full">
                                                <Image src={image} className="brightness-75 w-full" width={1000} height={350} alt="imageojck" />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className='left-5' />
                                <CarouselNext className='right-5 text-xl' />
                            </Carousel>
    
                        </div>
                    </div>
    
                    <div className='w-full h-[800px] hidden lg:flex flex-row items-center justify-between gap-4 mt-10'>
                        <Slider images={property.images} />
                    </div>
    
                    <div className='flex flex-col lg:flex-row w-full mt-10 gap-4 md:gap-10'>
                        <div className='w-full lg:w-[65%]'>

                            {
                                property.category.name === 'apartment'? (
                                    <ul className="flex bg-secondaryColor items-end p-4 justify-start gap-4 md:gap-10 w-full ">
                                    <li>
                                        <p className='text-base text-customBlack'>{property.bedrooms}</p>
                                        <p className="text-customGrey text-sm mt-2" >Bedroom</p>
                                    </li>
                                    <li>
                                        <p className='text-base text-customBlack'>{property.bathrooms}</p>
                                        <p className="text-customGrey text-sm mt-2">Bathroom</p>
                                    </li>
                                    <li>
                                        <p className='text-base text-customBlack'>{property.kitchen}</p>
                                        <p className="text-customGrey text-sm mt-2">Kitchen</p>
                                    </li>
                                    <li>
                                        <p className='text-base text-customBlack'>{property.hasStorage ? 'Yes' : 'No'}</p>
                                        <p className="text-customGrey text-sm mt-2">Storage</p>
                                    </li>
                                    <li>
                                        <p className='text-base text-customBlack'>{property.gate ? 'Yes' : 'No'}</p>
                                        <p className="text-customGrey text-sm mt-2">Gate</p>
                                    </li>
                                    <li>
                                        <p className='text-base text-customBlack'>{property.gateman ? 'Yes' : 'No'}</p>
                                        <p className="text-customGrey text-sm mt-2">Gate man</p>
                                    </li>
                                </ul>
                                ) : (
                                    <div></div>
                                )
                            }
    
                            <div className='flex flex-col gap-4 mt-10 '>
                                <h2 className='font-comfortaa text-xl'>Description</h2>
                                <p className='font-muli text-sm  text-customGrey leading-7'>{property.description}</p>
                            </div>
    
    
                            <div className="flex flex-col gap-4 md:gap-8 mt-10">
                                <h2 className="font-comfortaa text-xl">Property Summary</h2>
                                <div className="overflow-x-auto w-full">
                                    <table className="min-w-full divide-y divide-gray-200">
    
                                        <tbody className="bg-white text-sm ">
                                            <tr className="bg-secondaryColor ">
                                                <td className="px-6 py-4 whitespace-nowrap">Property type:</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-customGrey">{property.category.name.charAt(0).toUpperCase()+property.category.name.slice(1)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">Property title:</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-customGrey">{property.title.charAt(0).toUpperCase()  + property.title.slice(1)}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">water source:</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-customGrey">{property.water}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">Electricity:</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-customGrey">{property.electricity}</td>
                                            </tr>
                                            <tr className="bg-secondaryColor ">
                                                <td className="px-6 py-4 whitespace-nowrap">Fence Present?</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-customGrey">{property.gate ? 'Yes' : 'No'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">Gate man</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-customGrey">{property.gateman ? 'Yes' : 'No'}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">Price:</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-customGrey">{property.price}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">No property available:</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-customGrey">{property.propertyNumber}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
    
                            <div className="flex flex-col gap-4 md:gap-8 mt-10">
                                <NearbyPlaces placesData={ {
                Hospital: property.hospitals,
                School: property.schools,
                Market: property.markets,
            } } />
                            </div>
    
    
                            <div className="flex flex-col gap-4 md:gap-8 mt-10">
                                <VideoPlayer image={property.images[0]} video={property.video} />
                            </div>
    
    
                        </div>
                        <div className='w-full md:flex-row flex flex-col gap-5 lg:flex-col justify-start items-start lg:w-[35%]'>
    
                            <div className="w-full  mx-auto p-6 bg-white rounded-lg shadow-lg">
                                <h2 className='font-comfortaa text-xl mb-6'>Property Owner</h2>
                                <div className="flex flex-row gap-3   items-start  mb-6">
                                    <img
                                        className="w-10 h-10 bg-black rounded-full object-cover mb-4"
                                        src={property.user.image} // Replace with your profile image path
                                        alt="Profile"
                                    />
                                    <div className='flex flex-col gap-1'>
                                        <h2 className="text-customBlack text-base font-semibold">{property.user.firstName.charAt(0).toUpperCase()+ property.user.firstName.slice(1)}  {property.user.lastName.charAt(0).toUpperCase() + property.user.lastName.slice(1)}
                                        </h2>
                                        <button
                  onClick={handleWhatsAppChat}
                  className="text-green-500 text-sm hover:underline"
                >
                  Chat via WhatsApp
                </button>
                                    </div>
    
                                </div>
                            </div>
    
    
                            <div className='w-full mt-6'>
                                <h2 className='font-comfortaa text-xl mb-6'>Property location</h2>
                                <div className="flex flex-col gap-4 md:gap-8 mt-10 w-full">
                                    <GooglesDetails service={{
                                        position: {
                                            lat: property.lat,
                                            lng: property.lng,
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
                )
            }

{showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Please Login/Sign Up</h2>
            <p className="mb-4 text-customGrey">You need to login or register to chat with the property owner via WhatsApp.</p>
            <div className='flex w-full justify-between'>
            <Link href="/sign-in">
              <button className="bg-primaryColor text-white px-4 py-2 rounded hover:bg-green-600">
                Login/Signup
              </button>
            </Link>
            <button
              onClick={() => setShowLoginPopup(false)}
              className="mt-4 text-gray-500 hover:underline"
            >
              Close
            </button>
            </div>
          </div>
        </div>
      )}

            <Footer />

        </section>
    )
}
