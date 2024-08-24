"use client"
import GoogleMap from "@/components/googleMap";
import Navbar from "@/components/navbar";
import SearchForm from "@/components/searchForm";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { MdAccountCircle } from "react-icons/md";
import { CalendarClock,MapPin, StarIcon } from "lucide-react";
import Footer from "@/components/footer";
import { useParams } from 'next/navigation'


export default function Page() {
  const params = useParams()
  const {category} = params

  console.log(category)
  return (
    <section className="flex w-full flex-col   items-center justify-center pt-26">
    <Navbar />
    <div className="flex flex-col items-center w-full h-[80vh] bg-red-400 justify-center">
      <GoogleMap />
    </div>
    <div className="w-full flex justify-center p-2 pt-6 pb-8 md:p-4 md:pt-8 md:pb-12 items-center bg-[#F5F5F5] ">
      <SearchForm />
    </div>
    <main className="w-full max-w-[1350px] mb-10 md:mb-20 flex flex-col p-2 md:p-4 items-center justify-center">

      <div className="w-full flex flex-col items-center justify-center pt-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-comfortaa   ">
            Recent Apartments
          </h1>

          <hr className='mt-6 h-[2px] border-none bg-primaryColor w-24' />

          <hr className='mb-4 mt-2 h-[2px] border-none bg-primaryColor w-12' />
        </div>

        <div className="w-full pt-8 md:pt-12 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="w-full flex justify-center items-center overflow-hidden shadow-xl md:shadow-2xl">
          <div className="flex flex-col gap-2 items-center justify-center w-full max-w-[450px] transition-transform duration-300 hover:scale-105 shadow-lg ">
            <div>
            <div className="relative w-full h-full bg-black bg-opacity-50">

              <Carousel className="w-full">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="relative">
                        <Image src="/images/01.jpg" className="brightness-75" width={450} height={350} alt="imageojck" />
                        <div className="absolute inset-0 bg-black opacity-20"></div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-3 bg-slate hover:bg-white" />
                <CarouselNext className="right-3 bg-slate  hover:bg-white" />
              </Carousel>
              <h1 className="absolute top-3 right-3 p-2 bg-customBlack rounded text-secondaryColor">Apartment</h1>
              <h1 className="absolute bottom-3 left-3 p-2 text-primaryColor text-2xl">90 000 CFA</h1>
              <p className="absolute bottom-3 right-3 p-2 text-white text-2xl"><StarIcon /></p>
            </div>
            <div className="flex w-full flex-col gap-2 items-center justify-center">
              <div className="flex flex-col p-2 gap-1 w-full ">
                <h1 className="font-comfortaa text-customBlack text-2xl md:text-3xl">Title</h1>
                <div className="flex gap-2 items-center">
                  <MapPin className="text-primaryColor w-4 h-4" />
                <p className="font-muli text-customGrey">Location</p>
                </div>
                
              </div>
              {category === 'apartment' && (
                <div className="w-full">
                  <ul className="flex bg-secondaryColor items-end p-4 justify-evenly w-full ">
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
                </div>
              )}

              <div className="flex p-4  gap-2 items-center justify-between w-full">
              <div className="flex items-center gap-2">
                  <p><MdAccountCircle size={28} className="text-primaryColor" /></p>
                  <p className="text-customGrey text-sm">peter</p>
                </div>
                <div className="flex items-center gap-2" >
                  <p><CalendarClock className="text-primaryColor" /></p>
                  <p className="text-customGrey text-sm">2 Aug 2024</p>
                </div>

              </div>
            </div>
          </div>
        </div>
          </div>

          <div className="w-full flex justify-center items-center overflow-hidden shadow-xl md:shadow-2xl">
          <div className="flex flex-col gap-2 items-center justify-center w-full max-w-[450px] transition-transform duration-300 hover:scale-105 shadow-lg ">
            <div>
            <div className="relative w-full h-full bg-black bg-opacity-50">

              <Carousel className="w-full">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="relative">
                        <Image src="/images/01.jpg" className="brightness-75" width={450} height={350} alt="imageojck" />
                        <div className="absolute inset-0 bg-black opacity-20"></div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-3 bg-slate hover:bg-white" />
                <CarouselNext className="right-3 bg-slate  hover:bg-white" />
              </Carousel>
              <h1 className="absolute top-3 right-3 p-2 bg-customBlack rounded text-secondaryColor">Apartment</h1>
              <h1 className="absolute bottom-3 left-3 p-2 text-primaryColor text-2xl">90 000 CFA</h1>
              <p className="absolute bottom-3 right-3 p-2 text-white text-2xl"><StarIcon /></p>
            </div>
            <div className="flex w-full flex-col gap-2 items-center justify-center">
              <div className="flex flex-col p-2 gap-1 w-full ">
                <h1 className="font-comfortaa text-customBlack text-2xl md:text-3xl">Title</h1>
                <div className="flex gap-2 items-center">
                  <MapPin className="text-primaryColor w-4 h-4" />
                <p className="font-muli text-customGrey">Location</p>
                </div>
                
              </div>
              {category === 'apartment' && (
                <div className="w-full">
                  <ul className="flex bg-secondaryColor items-end p-4 justify-evenly w-full ">
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
                </div>
              )}

              <div className="flex p-4  gap-2 items-center justify-between w-full">
              <div className="flex items-center gap-2">
                  <p><MdAccountCircle size={28} className="text-primaryColor" /></p>
                  <p className="text-customGrey text-sm">peter</p>
                </div>
                <div className="flex items-center gap-2" >
                  <p><CalendarClock className="text-primaryColor" /></p>
                  <p className="text-customGrey text-sm">2 Aug 2024</p>
                </div>

              </div>
            </div>
          </div>
        </div>
          </div>

          <div className="w-full flex justify-center items-center overflow-hidden shadow-xl md:shadow-2xl">
          <div className="flex flex-col gap-2 items-center justify-center w-full max-w-[450px] transition-transform duration-300 hover:scale-105  ">
            <div>
            <div className="relative w-full h-full bg-black bg-opacity-50">

              <Carousel className="w-full">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="relative">
                        <Image src="/images/01.jpg" className="brightness-75" width={450} height={350} alt="imageojck" />
                        <div className="absolute inset-0 bg-black opacity-20"></div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-3 bg-slate hover:bg-white" />
                <CarouselNext className="right-3 bg-slate  hover:bg-white" />
              </Carousel>
              <h1 className="absolute top-3 right-3 p-2 bg-customBlack rounded text-secondaryColor">Apartment</h1>
              <h1 className="absolute bottom-3 left-3 p-2 text-primaryColor text-2xl">90 000 CFA</h1>
              <p className="absolute bottom-3 right-3 p-2 text-white text-2xl"><StarIcon /></p>
            </div>
            <div className="flex w-full flex-col gap-2 items-center justify-center">
              <div className="flex flex-col p-2 gap-1 w-full ">
                <h1 className="font-comfortaa text-customBlack text-2xl md:text-3xl">Title</h1>
                <div className="flex gap-2 items-center">
                  <MapPin className="text-primaryColor w-4 h-4" />
                <p className="font-muli text-customGrey">Location</p>
                </div>
                
              </div>
              {category === 'apartment' && (
                <div className="w-full">
                  <ul className="flex bg-secondaryColor items-end p-4 justify-evenly w-full ">
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
                </div>
              )}

              <div className="flex p-4  gap-2 items-center justify-between w-full">
              <div className="flex items-center gap-2">
                  <p><MdAccountCircle size={28} className="text-primaryColor" /></p>
                  <p className="text-customGrey text-sm">peter</p>
                </div>
                <div className="flex items-center gap-2" >
                  <p><CalendarClock className="text-primaryColor" /></p>
                  <p className="text-customGrey text-sm">2 Aug 2024</p>
                </div>

              </div>
            </div>
          </div>
        </div>
          </div>

          <div className="w-full flex justify-center items-center overflow-hidden shadow-xl md:shadow-2xl">
          <div className="flex flex-col gap-2 items-center justify-center w-full max-w-[450px] transition-transform duration-300 hover:scale-105 shadow-lg ">
            <div>
            <div className="relative w-full h-full bg-black bg-opacity-50">

              <Carousel className="w-full">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="relative">
                        <Image src="/images/01.jpg" className="brightness-75" width={450} height={350} alt="imageojck" />
                        <div className="absolute inset-0 bg-black opacity-20"></div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-3 bg-slate hover:bg-white" />
                <CarouselNext className="right-3 bg-slate  hover:bg-white" />
              </Carousel>
              <h1 className="absolute top-3 right-3 p-2 bg-customBlack rounded text-secondaryColor">Apartment</h1>
              <h1 className="absolute bottom-3 left-3 p-2 text-primaryColor text-2xl">90 000 CFA</h1>
              <p className="absolute bottom-3 right-3 p-2 text-white text-2xl"><StarIcon /></p>
            </div>
            <div className="flex w-full flex-col gap-2 items-center justify-center">
              <div className="flex flex-col p-2 gap-1 w-full ">
                <h1 className="font-comfortaa text-customBlack text-2xl md:text-3xl">Title</h1>
                <div className="flex gap-2 items-center">
                  <MapPin className="text-primaryColor w-4 h-4" />
                <p className="font-muli text-customGrey">Location</p>
                </div>
                
              </div>
              {category === 'apartment' && (
                <div className="w-full">
                  <ul className="flex bg-secondaryColor items-end p-4 justify-evenly w-full ">
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
                </div>
              )}

              <div className="flex p-4  gap-2 items-center justify-between w-full">
              <div className="flex items-center gap-2">
                  <p><MdAccountCircle size={28} className="text-primaryColor" /></p>
                  <p className="text-customGrey text-sm">peter</p>
                </div>
                <div className="flex items-center gap-2" >
                  <p><CalendarClock className="text-primaryColor" /></p>
                  <p className="text-customGrey text-sm">2 Aug 2024</p>
                </div>

              </div>
            </div>
          </div>
        </div>
          </div>

        </div>

      </div>


    </main>

    <Footer />

  </section>
  );
}
