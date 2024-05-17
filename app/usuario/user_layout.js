import React from 'react';
import ResponsiveAppBar from '../../components/navbar_user';

const UsuariosLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <ResponsiveAppBar />
      <div style={{ flexGrow: 1, marginTop: '80px' }}>
          {/* Aquí puedes agregar otros componentes comunes para las páginas de usuarios */}
          {children}
      </div>
    </div>
  );
};

export default UsuariosLayout;
