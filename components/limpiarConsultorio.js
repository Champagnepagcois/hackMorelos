export const limpiarMovimiento = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('consultorio');
    }
  };