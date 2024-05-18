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

    document.body.appendChild(script);

    // Cleanup function to remove the elements when the component unmounts
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button id="calendar-scheduling-button">Programar una cita</button>
    </div>
  );
};

export default Page;