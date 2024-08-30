"use client"
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

interface Address {
  latitude: number;
  longitude: number;
}

interface LocationNProps {
  address: Address;
  onMapClick: (lat: number, lng: number) => void;
}

function LocationN({ address, onMapClick }: LocationNProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAY_wThFJrTUXyi5KYsXTtWDzTBdPE3FQ8",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  useEffect(() => {
    if (map && address) {
      const newCenter = { lat: address.latitude, lng: address.longitude };
      map.panTo(newCenter);
    }
  }, [map, address]);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      const bounds = new google.maps.LatLngBounds({
        lat: address.latitude,
        lng: address.longitude,
      });
      map.fitBounds(bounds);
      setMap(map);
  
      map.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
  
          onMapClick(lat, lng);
  
          const newCenter = { lat, lng };
          map.panTo(newCenter);
  
          if (marker) {
            marker.setPosition(newCenter);
          } else {
            const newMarker = new google.maps.Marker({
              position: newCenter,
              map,
              icon: {
                url: 'https://img.freepik.com/premium-vector/house-real-estate-logo_7169-95.jpg',
                size: new google.maps.Size(40, 40),
              },
            });
            setMarker(newMarker);
          }
        }
      });
    },
    [map, marker, onMapClick, address]
  );
  

  const onUnmount = useCallback(() => {
    if (marker) {
      marker.setMap(null);
    }
    setMap(null);
  }, [marker]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: address.latitude, lng: address.longitude }}
      zoom={20}
      mapTypeId="hybrid"
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(LocationN);
