"use client"
import React, { useEffect, useState } from 'react';
import UsuariosLayout from '../../user_layout';
import GoogleMapComponent from '../../../../components/mapa';
import { Box, Button, Grid, Slider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {DataTable} from '../../../../components/lista'
import styled from '@emotion/styled';

const StyledSliderContainer = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    width: 500px;
  }

  @media (min-width: 769px) and (max-width: 1200px) {
    width: 850px;
  }

  @media (min-width: 1201px) {
    width: 1000px;
  }
`;

const Page = () => {
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState<any | null>(null);
  const [coords, setCoords] = useState<{ lat: number | null, lng: number | null }>({ lat: null, lng: null });
  const [error, setError] = useState<string | null>(null);
  const [distanceSliderValue, setDistanceSliderValue] = useState(0);
  const [moneySliderValue, setMoneySliderValue] = useState(0);
  const distanceLimit = 0;
  const moneyLimit = 4000;

  const handlegeo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCoords({ lat: latitude, lng: longitude });
          console.log("Latitud:", latitude);
          console.log("Longitud:", longitude);
        },
        () => {
          setError("Tu navegador está bien, pero ocurrió un error.");
        }
      );
    } else {
      setError("Tu navegador no dispone de la geolocalización, actualízalo.");
    }
  };

  const handleslide = (newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setDistanceSliderValue(newValue);
      localStorage.setItem('consultorio', String(newValue));
    } else {
      const firstValue = newValue[0];
      setDistanceSliderValue(firstValue);
      localStorage.setItem('consultorio', String(firstValue));
    }
    const consultorioValue = localStorage.getItem('consultorio');
    console.log('Valor del consultorio:', consultorioValue);
  };

  const handlemoney = (newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setMoneySliderValue(newValue);
      localStorage.setItem('dinero', String(newValue));
    } else {
      const firstValue = newValue[0];
      setMoneySliderValue(firstValue);
      localStorage.setItem('dinero', String(firstValue));
    }
    const dineroValue = localStorage.getItem('dinero');
    console.log('Valor del dinero:', dineroValue);
  };

  const handleSend = () => {
    const selectedStore = localStorage.getItem('selectedStore');
    const movimientoData = {
      // Otros datos que quieras guardar
    };
    localStorage.setItem('movimiento', JSON.stringify(movimientoData));

    console.log('Datos guardados en localStorage:', movimientoData);
    console.log('Datos guardados en localStorage:', selectedStore);

    if (selectedStore && movimientoData) {
      window.location.href = '/Confirmation';
    }
  };

  useEffect(() => {
    handlegeo();

    const storedMarker = localStorage.getItem('selectedStore');
    if (storedMarker) {
      setSelectedMarker(JSON.parse(storedMarker));
    }

    const storedConsultorio = localStorage.getItem('consultorio');
    if (storedConsultorio) {
      setDistanceSliderValue(parseFloat(storedConsultorio));
    }

    const storedDinero = localStorage.getItem('dinero');
    if (storedDinero) {
      setMoneySliderValue(parseFloat(storedDinero));
    }

    console.log("filteredMarkers después de useEffect:", filteredMarkers);
  }, []);

  const handleSelectMarker = (marker: any) => {
    console.log('Selected Marker:', marker);
  };

  return (
    <UsuariosLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <div>
            <DataTable/>
          </div>
        </Grid>
        <Grid item xs={12} sm={8}>
          <div>
            {coords.lat !== null && coords.lng !== null ? (
              <GoogleMapComponent onSelectMarker={handleSelectMarker} coords={coords} setFilteredMarkers={undefined}  />
            ) : (
              <p>Cargando mapa...</p>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box sx={{ ml: 2, mt: 2 }}>
            <h3>Distancia (KM)</h3>
            <StyledSliderContainer>
              <Slider
                aria-label="Distance"
                value={distanceSliderValue}
                onChange={(event, newValue) => handleslide(newValue)}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={110}
              />
            </StyledSliderContainer>
            <h3>Precio (MXN)</h3>
            <StyledSliderContainer>
              <Slider
                aria-label="Money"
                value={moneySliderValue}
                onChange={(event, newValue) => handlemoney(newValue)}
                valueLabelDisplay="auto"
                step={1000}
                marks
                min={1000}
                max={4000}
              />
            </StyledSliderContainer>
            <Button variant="contained" endIcon={<SendIcon />} sx={{ ml: 4 }} onClick={handleSend}>
              Send
            </Button>
          </Box>
        </Grid>
      </Grid>
    </UsuariosLayout>
  );
};

export default Page;
