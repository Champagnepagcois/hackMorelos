import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { db } from '../firebase/firebase';

const center = {
  lat: 19.41578309476789,
  lng: -99.12977336211651
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radio de la Tierra en kilómetros
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distancia en kilómetros
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function MyComponent({ onSelectMarker, coords , setFilteredMarkers}) {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBoZG9YZPAuaQnRYfUMjYXR8-NmMlO-pZA"
  });

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  

  useEffect(() => {
    // Obtener datos de Firestore
    const fetchData = async () => {
      try {
        const markersRef = await db.collection('doctores').get();
        const markersArray = markersRef.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // console.log('Datos recuperados de Firestore:', markersArray);
        setMarkers(markersArray);
        // console.log("fetchData", markersArray);
      } catch (error) {
        console.error('Error fetching markers from Firestore:', error);
      }
    };

    fetchData();
  }, []);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleSelectStore = () => {
    if (selectedMarker) {
      onSelectMarker(selectedMarker);
      setSelectedMarker(null);
      console.log('Tienda seleccionada guardada en el local storage');
    }
  };

  // Obtener los valores de distancia y dinero desde el localStorage
  const distanceLimit = parseFloat(localStorage.getItem('consultorio')) || 0;
  const moneyLimit = parseFloat(localStorage.getItem('dinero')) || 0;

  // Verificar los valores obtenidos del localStorage
  console.log('Distance Limit:', distanceLimit);
  console.log('Money Limit:', moneyLimit);
  console.log('Coords:', coords);

  // Filtrar las marcas basadas en la distancia y el dinero
  const filteredMarkers = markers.map(marker => {
    const distance = getDistanceFromLatLonInKm(coords.lat, coords.lng, marker.lat, marker.lng);
    // console.log(`Marker: ${marker.id}, Distance: ${distance}, Monto: ${marker.precio}`);
    return {
    ...marker,
    distance: distance
  };
}).filter(marker => {
  // Filtrar los marcadores por distancia y dinero
  return marker.distance <= distanceLimit && marker.precio <= moneyLimit;
});

  // Verificar los marcadores filtrados
  console.log('Filtered Markers:', filteredMarkers);
  const filteredMarkersJSON = JSON.stringify(filteredMarkers);

  // Almacenar los marcadores filtrados en el localStorage
  localStorage.setItem('filteredMarkers', filteredMarkersJSON);
  // console.log("segundapruba: " + filteredMarkersJSON);

// Establecer los marcadores filtrados en el estado del componente padre


  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: '70%',
        height: '60vh',
        borderRadius: '15px',
      }}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false,
        mapTypeControl: false
      }}
    >
      <Marker
        position={{ lat: coords.lat, lng: coords.lng }}
        icon={{
          path: "M10 0a10 10 0 1 0 0.001 0",
          fillColor: "blue",
          fillOpacity: 1,
          strokeColor: "blue",
          strokeOpacity: 1,
          strokeWeight: 1,
          scale: 1
        }}
      />
      {filteredMarkers.map((marker, i) => (
        <Marker
          key={i}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => setSelectedMarker(marker)}
        />
      ))}

      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>
            <h2>{selectedMarker.id}</h2>
            <p>{selectedMarker.nombreCompleto}</p>
            <p>{selectedMarker.especialidad}</p>
            <p>Monto: $ {selectedMarker.precio}</p>
            <button
              onClick={handleSelectStore}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#ffffff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Seleccionar
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : <></>;
}

export default React.memo(MyComponent);
