"use client"
import React, { useState } from 'react';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { MdLocationPin, MdStar, MdStarBorder } from "react-icons/md";
// import AwesomeSlider from 'react-awesome-slider';
// import { useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { googleApiKey } from '@/lib/secret';
// import school from '../../assets/school.png';
// import cutlery from '../../assets/cutlery.png';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 3.8480,
  lng: 11.5021
};

function GooglesMap() {
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

//   const service = useSelector((state: any) => state.data.data);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    >
      {/* {service.map((marker: any) => (
        <Marker
          key={marker.id}
          position={marker.location.position}
          title={marker.title}
          onClick={() => handleMarkerClick(marker)}
          options={{
            icon: {
              url: (marker.category === "Schools") ? school : cutlery,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(25, 50)
            }
          }} */}
        {/* />
      ))} */}
      {/* {selectedMarker && (
        <InfoWindow
          position={selectedMarker.location.position}
          onCloseClick={handleCloseInfoWindow}
          className="maps"
        >
          <div className='w-56 '>
            <AwesomeSlider
              organicArrows={false}
              buttonContentRight={<p className='buttonStyle'>{">"}</p>}
              buttonContentLeft={<p className='buttonStyle '>{"<"}</p>}
              bullets={false}
              className=' awesomeHigh'
            >
              {
                selectedMarker.images?.map((image: string) => (
                  <div key={image}>
                    <img
                      className='bgImg'
                      alt="Wow"
                      src={image}
                    />
                  </div>
                ))
              }
            </AwesomeSlider>
            <div className='flex flex-col gap-1 mb-1'>
              <h1 onClick={() => handleTitleClick(selectedMarker)} className='pt-1 pl-1 text-sm font-[900] font-comfortaa hover:text-primaryColor cursor-pointer hover:transition-colors hover:duration-300 transition-colors duration-300 truncates-location'> {selectedMarker.title}</h1>
              <p className='pl-1 text-xs flex items-center'><MdLocationPin style={{ fontSize: '1rem' }} className='text-primaryColor' /><span className='truncates-title'>{selectedMarker.location.description}</span></p>
              <div className='self-end mt-2 mb-2 flex pr-2'>
                <MdStar style={{ fontSize: '1rem' }} className='text-primaryColor' />
                <MdStar style={{ fontSize: '1rem' }} className='text-primaryColor'/>
                <MdStar style={{ fontSize: '1rem' }} className='text-primaryColor'/>
                <MdStarBorder style={{ fontSize: '1rem' }} className='text-primaryColor' />
                <MdStarBorder style={{ fontSize: '1rem' }} className='text-primaryColor'/>
              </div>
            </div>
          </div>
        </InfoWindow>
      )}

      <div style={{ display: open ? 'flex' : 'none', transition: 'all ease-in 0.2s' }} className='justify-center items-center py-4 w-full h-screen fixed z-50 top-0 left-0 right-0 bottom-0 bg-opacity-90 bg-black '>
        <div className=' w-80 bg-white relative rounded-2xl pt-6 p-4 flex flex-col justify-between items-center gap-2 '>
          <XCircle className='absolute top-1 right-1 cursor-pointer' onClick={handleClose} />
          <h1 className='text-4xl font-comfortaa font-[900]'>Sign Up today!</h1>
          <p className='font-muli text-center pr-8 pl-8 text-opacity-50 text-black leading-tight'>Sign up today in other to see all the services in details</p>
          <Link to={'/sign-in'} className='bg-primaryColor w-full p-4 text-center text-white rounded-2xl leading-tight mt-2 hover:bg-white'>Sign Up</Link>
        </div>
      </div> */}

    </GoogleMap>
  ) : (
    <div className='w-full h-[600px]'>

    </div>
  );
}

export default React.memo(GooglesMap);
