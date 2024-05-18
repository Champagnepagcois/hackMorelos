import React from 'react';
import ChatInterface from '../../michat/page'; // Ajusta la ruta según la ubicación real del archivo
import ResponsiveAppBar from '../../../components/navbar_user';

const App = () => {
  return (
    <div style={{ padding: '100px' }}> {/* Agregamos un padding de 20px */}
      <ResponsiveAppBar />
      <h1>Chat Interface</h1>
      <ChatInterface />
    </div>
  );
};

export default App;