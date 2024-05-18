export const limpiarMovimiento = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('username');
    }
  };