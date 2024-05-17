"use client"
import React, { useEffect, useState } from 'react';
import UsuariosLayout from '../../user_layout';
import GoogleMapComponent from '../../../../components/mapa';
import { Avatar, Box, Button, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
// import { Uint } from 'web3';
// import {limpiarSocio} from '../../../component/limpiarSocio'


// limpiarMovimiento();
// limpiarSocio();

const currencies = [
  {
    value: 'USD',
    label: 'Ethereum Mainnet',
    simbol: 'E',
  },
  {
    value: 'EUR',
    label: 'Arbitrum Sepolia',
    simbol: 'A',
  },
  {
    value: 'BTC',
    label: 'Sepolia',
    simbol: 'S',    
  },
  {
    value: 'JPY',
    label: 'Moonbase Alpha',
    simbol: 'M',
  },
];

const Page = () => {
  const [amount, setAmount] = useState(1); // Estado para almacenar el monto
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [selectedMarker, setSelectedMarker] = useState<any | null>(null); // Cambiado a any
  
  const handleSelectMarker = (marker: any) => {
    setSelectedMarker(marker);
    localStorage.setItem('selectedStore', JSON.stringify(marker));
    console.log("buyicons"+selectedMarker);
  };

//    // Función para manejar el cambio en el monto
//    const handleAmountChange = (event: { target: { value: Uint; }; }, montoMaximo: number) => {
//     let newValue = parseInt(event.target.value, 10);
//     if (newValue > montoMaximo) {
//       newValue = montoMaximo;
//     }
//     setAmount(newValue);
//   };

  const handleSend = () => {
    const selectedStore = localStorage.getItem('selectedStore');
    const movimientoData = {
      movimiento: 'Buy Coins',
      monto: amount,

      // Otros datos que quieras guardar
    };
    localStorage.setItem('movimiento', JSON.stringify(movimientoData));
  
    // Imprimir los datos guardados en la consola
    console.log('Datos guardados en localStorage:', movimientoData);
    console.log('Datos guardados en localStorage:', selectedStore);
  
    // Redirigir a la página de confirmación
    if (selectedStore && movimientoData) {
      // Si están llenos, redirigir a la página de confirmación
      window.location.href = '/Confirmation';
    } 
  };

  useEffect(() => {
    const storedMarker = localStorage.getItem('selectedStore');
    if (storedMarker) {
      setSelectedMarker(JSON.parse(storedMarker));
    }
  }, []);



  return (

    <UsuariosLayout>
    <Grid container spacing={1}>
      <Grid item xs={9} sm={7}>
        <div>
          {/* <h2>Buy Coins</h2>
          <div>
            <p>Affiliate partner: {selectedMarker && selectedMarker.nombre}</p>
            <p>Partner descriptions: {selectedMarker && selectedMarker.descripcion}</p>
            <p>Partner location: {selectedMarker && selectedMarker.direccion}</p>
            <p>Maximum allowable amount: {selectedMarker && selectedMarker.monto}</p>
          </div> */}
          <GoogleMapComponent onSelectMarker={handleSelectMarker}/>
        </div>
      </Grid>
      <Grid item xs={3} sm={5}>
        <div>
          <h3>Purchase Data</h3>
          {/* <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
              type="number"
              value={amount}
            //   onChange={(event) => handleAmountChange(event, selectedMarker && selectedMarker.monto)}
              inputProps={{
                min: 1, // Cambia 1 al valor mínimo deseado
                max: 100, // Cambia 100 al valor máximo deseado
              }}
            />
          </FormControl> */}
          {/* <div>
          <TextField
              sx={{ m: 1 }}
              id="outlined-select-currency-native"
              select
              label="Coin"
              value={selectedCurrency}
              onChange={(event) => setSelectedCurrency(event.target.value)}
              SelectProps={{
                native: true,
              }}
              helperText="Please select your currency"
            >
              {currencies.map((option) => (
                <>
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
                </>
              ))}
            </TextField>
            </div> */}
          <Button variant="contained" endIcon={<SendIcon />} sx={{ ml: 4 }} onClick={handleSend}>
            Send
          </Button>
        </div>
      </Grid>
    </Grid>
  </UsuariosLayout>

  );
}

export default Page;