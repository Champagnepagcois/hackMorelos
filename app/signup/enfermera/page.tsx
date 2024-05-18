"use client"
import React, { useEffect } from 'react';

const Page = () => {
 useEffect(() => {
  // Crear y añadir la etiqueta <link> para el CSS
  const link = document.createElement('link');
  link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  // Crear y añadir la etiqueta <script> para el JavaScript
  const script = document.createElement('script');
  script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
  script.async = true;

  script.onload = () => {
    if (window.calendar && window.calendar.schedulingButton) {
      const buttonElement = document.getElementById('calendar-scheduling-button');
      window.calendar.schedulingButton.load({
        url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0Fg7KaJnvI3BOD4AplFjr7VI4wyHsrFcg6gmNuHF-aOmkZeLzW2xD2Bh3pEe0wE_FaXsW0Sr2H?gv=true%027',
        color: '#039BE5',
        label: 'Programar una cita',
        target: buttonElement || undefined,  // Asegura que target no sea null
      });
    }
  };

  // document.body.appendChild(script);

  // Cleanup function to remove the elements when the component unmounts
  return () => {
    document.head.removeChild(link);
    document.body.removeChild(script);
  };
}, []); // <-- Array vacío como segundo argumento para que se ejecute solo una vez

return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <button
      id="calendar-scheduling-button"
      style={{
        padding: '10px 20px', // Ajusta el espaciado interno del botón
        fontSize: '1.5rem', // Ajusta el tamaño del texto del botón
        borderRadius: '8px', // Ajusta el radio de borde del botón
        backgroundColor: '#4caf50', // Establece el color de fondo del botón
        color: '#fff', // Establece el color del texto del botón
        border: 'none', // Quita el borde del botón
        cursor: 'pointer', // Cambia el cursor al pasar sobre el botón
        transition: 'background-color 0.3s ease', // Transición suave al cambiar el color de fondo
      }}
    >
      Programar una cita
    </button>
  </div>
);
};

export default Page;