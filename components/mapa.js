import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
import { db } from '../firebase/firebase';

const center = {
  lat: 19.41578309476789,
  lng: -99.12977336211651
};

// descripcion
// "Description for Marker 1"
// (cadena)

// direccion
// "Direccion 1"
// (cadena)

// lat
// 19.415
// (número)
// number

// lng
// -99.129
// (número)
// number

// monto
// 300
// (número)
// number

// nombre
// "Marker 1"
// (cadena)

// wallet
// "0x1234567890abcdef1234567890abcdef12345678"

function MyComponent({onSelectMarker, coords}) {
    

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "" // AIzaSyBoZG9YZPAuaQnRYfUMjYXR8-NmMlO-pZA
  });

  const [map, setMap] = useState(null);
//   const [searchText, setSearchText] = useState('');
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
        console.log('Datos recuperados de Firestore:', markersArray); 
        setMarkers(markersArray);
        console.log("fetchData" + markersArray)
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
        {markers.map((marker, i) => (
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
            <h2>{selectedMarker.nombre}</h2>
            <p>{selectedMarker.descripcion}</p>
            <p>{selectedMarker.direccion}</p>
            <p>Monto: $ {selectedMarker.monto}</p>
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
