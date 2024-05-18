"use client"
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Redirige a la página de inicio de sesión cuando se carga la página principal
    window.location.href = '/login';
  }, []); // La dependencia vacía asegura que este efecto solo se ejecute una vez, cuando se monta el componente

  return null; // No es necesario devolver ningún contenido en la página principal si se va a redirigir automáticamente
}