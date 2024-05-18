"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { db } from '@/firebase/firebase';

export default function SignUp() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username') as string;
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    guardarDatosUsuario(username, email, password); // Llama a la función para guardar datos
  };

  const contarCaracteresSinEspacios = (cadena: string) => {
    // Eliminar los espacios de la cadena usando la función replace
    const cadenaSinEspacios = cadena.replace(/\s/g, '');
    // Contar el número de caracteres en la cadena sin espacios
    const numeroCaracteres = cadenaSinEspacios.length;
    return numeroCaracteres;
  };

  const guardarDatosUsuario = (username: string, email: string, password: string) => {
    if (username && contarCaracteresSinEspacios(username)>3 && email && password) {
      // Referencia a la colección "usuarios" y el documento con el ID del nombre de usuario
      const usuarioRef = db.collection('usuarios').doc(username);

      // Datos a guardar
      const datosUsuario = {
        email: email,
        password: password
      };
      usuarioRef.set(datosUsuario)
        .then(() => {
          console.log('Datos del usuario guardados correctamente.');
        })
        .catch((error) => {
          console.error('Error al guardar los datos del usuario:', error);
        });
        localStorage.setItem('username', username);
        console.log("username: " + username);
        window.location.href = '/signup/enfermera';
      
    }
    else
    {
      alert('Rellene todos los campos co su formato solicitado, correo para Email y el username debe ser mayor a 3 caracteres y unico en el sistema');
      return false;
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ backgroundColor: 'white' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
