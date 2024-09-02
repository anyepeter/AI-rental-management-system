"use client"
import React, { useState } from 'react';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { MdLocationPin, MdStar, MdStarBorder } from "react-icons/md";
import { useUser } from '@clerk/clerk-react';
import { googleApiKey } from '@/lib/secret';
import apartment from '../../public/images/apartment.jpg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';
import { X } from 'lucide-react';
import Link from 'next/link';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 3.8480,
  lng: 11.5021
};

function GooglesMap({ items }: any) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleApiKey
  });

  const [open, setOpen] = useState(false);
  const { user } = useUser();
//   const navigate = useNavigate();

//   const handleTitleClick = (service: any) => {
//     if (user) {
//       navigate(`/${service.title}`, { state: { service } });
//     } else {
//       setOpen(true);
//     }
//   };

console.log(items)
  const handleClose = () => {
    setOpen(false);
  };

  const [selectedMarker, setSelectedMarker] = useState<any>(null);

  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker);
  };

  const handleCloseInfoWindow = () => {
    setSelectedMarker(null);
  };



  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    >
      {items.map((marker: any) => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          title={marker.title}
          onClick={() => handleMarkerClick(marker)}
          options={{
            icon: {
              url: (marker.category.name === "apartment") ? apartment : apartment,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(25, 50)
            }
          }} 
          />
      ))} 
      {selectedMarker && (
        <InfoWindow
          position={{lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={handleCloseInfoWindow}
          
        >
          <div className='w-56 '>
          <Carousel className="w-full">
                    <CarouselContent>
                      {selectedMarker.images.map((image: any, index: number) => (
                        <CarouselItem key={index}>
                          <div className="relative">
                            <Image src={image} className="brightness-75" width={250} height={200} alt="imageojck" />
                            <div className="absolute inset-0 bg-black opacity-20"></div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-3 bg-slate hover:bg-white" />
                    <CarouselNext className="right-3 bg-slate  hover:bg-white" />
                  </Carousel>
                  <div className='flex row w-full justify-between items-start' >
                  <div className='flex flex-col gap-1 mb-1'>
              <h1 onClick={() => handleTitleClick(selectedMarker)} className='pt-1 pl-1 text-sm font-[900] font-comfortaa hover:text-primaryColor cursor-pointer hover:transition-colors hover:duration-300 transition-colors duration-300 truncates-location'> {selectedMarker.title}</h1>
              <p className='pl-1 text-xs flex items-center'><MdLocationPin style={{ fontSize: '1rem' }} className='text-primaryColor' /><span className='truncates-title'>{selectedMarker.address}</span></p>
            </div>
            <p className='text-base text-customBlack'>{selectedMarker.price} CFA</p>
                  </div>

          </div>
        </InfoWindow>
      )}

      <div style={{ display: open ? 'flex' : 'none', transition: 'all ease-in 0.2s' }} className='justify-center items-center py-4 w-full h-screen fixed z-50 top-0 left-0 right-0 bottom-0 bg-opacity-90 bg-black '>
        <div className=' w-80 bg-white relative rounded-2xl pt-6 p-4 flex flex-col justify-between items-center gap-2 '>
          <X className='absolute top-1 right-1 cursor-pointer' onClick={handleClose} />
          <h1 className='text-4xl font-comfortaa font-[900]'>Sign Up today!</h1>
          <p className='font-muli text-center pr-8 pl-8 text-opacity-50 text-black leading-tight'>Sign up today in other to see all the services in details</p>
          <Link href={'/sign-in'} className='bg-primaryColor w-full p-4 text-center text-white rounded-2xl leading-tight mt-2 hover:bg-white'>Sign Up</Link>
        </div>
      </div>

    </GoogleMap>
  ) : (
    <div className='w-full h-[600px]'>

    </div>
  );
}

export default React.memo(GooglesMap);
