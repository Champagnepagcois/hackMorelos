"use client"
import React, { useEffect, useState } from 'react';
import UsuariosLayout from '../../user_layout';
import GoogleMapComponent from '../../../../components/mapa';
import { Avatar, Box, Button, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Slider, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AlignItemsList from '../../../../components/lista'
import styled from '@emotion/styled';


const StyledSliderContainer = styled.div`
  width: 100%; /* Ancho predeterminado */

  @media (max-width: 768px) {
    width: 500px; /* Ancho para pantallas pequeñas */
  }

  @media (min-width: 769px) and (max-width: 1200px) {
    width: 850px; /* Ancho para pantallas medianas */
  }

  @media (min-width: 1201px) {
    width: 1000px; /* Ancho para pantallas grandes */
  }
`;

const Page = () => {
  const [amount, setAmount] = useState(1); // Estado para almacenar el monto
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [selectedMarker, setSelectedMarker] = useState<any | null>(null); // Cambiado a any
  const [coords, setCoords] = useState<{ lat: number | null, lng: number | null }>({ lat: null, lng: null });
  const [error, setError] = useState<string | null>(null);
  const [distanceSliderValue, setDistanceSliderValue] = useState(30);
  const [moneySliderValue, setMoneySliderValue] = useState(2000);

  const handleSelectMarker = (marker: any) => {
    setSelectedMarker(marker);
    localStorage.setItem('selectedStore', JSON.stringify(marker));
    console.log("buyicons" + selectedMarker);
  };

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
  }

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
  }

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
  }

  const handleSend = () => {
    const selectedStore = localStorage.getItem('selectedStore');
    const movimientoData = {
      movimiento: 'Buy Coins',
      monto: amount,
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
  }, []);

    return (
      <UsuariosLayout>
        <Grid container spacing={3}>
          {/* Primer elemento: AlignItemsList */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
              <AlignItemsList />
            </Box>
          </Grid>
          {/* Segundo elemento: GoogleMapComponent */}
          <Grid item xs={12} sm={8}>
            <div>
              <GoogleMapComponent onSelectMarker={handleSelectMarker} coords={coords} />
            </div>
          </Grid>
          {/* Tercer elemento: Sliders y botón */}
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
