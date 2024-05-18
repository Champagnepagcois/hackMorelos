import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';

export const DataTable = () => {
    const [mark, setMark] = useState([]);

    const updateMarkers = () => {
        const markString = localStorage.getItem('filteredMarkers');
        const markArray = markString ? JSON.parse(markString) : [];
        setMark(markArray);
    };

    useEffect(() => {
        updateMarkers(); // Actualizar marcadores al cargar el componente

        // Función para suscribirse a cambios en el almacenamiento local
        const handleStorageChange = (event) => {
            if (event.key === 'filteredMarkers') {
                updateMarkers();
            }
        };

        // Suscribirse al evento de cambio en el almacenamiento local
        window.addEventListener('storage', handleStorageChange);

        // Limpiar la suscripción al desmontar el componente
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []); // El efecto se ejecuta solo una vez al montar el componente

    useEffect(() => {
        // Este efecto se ejecutará cada vez que se detecte un cambio en el almacenamiento local
        const intervalId = setInterval(() => {
            const markString = localStorage.getItem('filteredMarkers');
            const markArray = markString ? JSON.parse(markString) : [];
            setMark((prevMark) => {
                if (JSON.stringify(prevMark) !== JSON.stringify(markArray)) {
                    return markArray;
                }
                return prevMark;
            });
        }, 500); // Revisa el almacenamiento local cada 500ms

        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, []); // El efecto se ejecuta solo una vez al montar el componente

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Marker</TableCell>
                        <TableCell align="right">Distance</TableCell>
                        <TableCell align="right">Monto</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {Array.isArray(mark) && mark.map((dato, index) => (
                    <TableRow key={index}>
                        <TableCell component="th" scope="row">
                            {dato.nombreCompleto}
                        </TableCell>
                        <TableCell align="right">{dato.distance}</TableCell>
                        <TableCell align="right">{dato.precio}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
