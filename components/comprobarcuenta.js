// Conectar a Firestore
import { db } from '../firebase/firebase';
// import { AuthContext } from './AuthContext';

// Función para verificar si la dirección de la billetera está registrada
export async function verificarDireccionBilletera(email) {
    try {

        // Consultar Firestore para ver si la dirección de la billetera existe
        const usuariosRef = await db.collection('usuarios').get();
        // Iterar sobre cada documento de usuario
        let encontrada = false;
        usuariosRef.forEach(usuarioDoc => {
            const usuarioData = usuarioDoc.data();
            
            // Verificar si la dirección de la billetera está presente en el usuario actual
            if (usuarioData && usuarioData.email === email) {
                encontrada = true;
                // Si se encuentra la dirección de la billetera, guardarla en el almacenamiento local
                localStorage.setItem("idUsuario", usuarioDoc.id);
                localStorage.setItem("wallet", email);
                console.log("desde comprobarsocio: "+ usuarioDoc.id);
            }
            
        });

        // Devolver true si se encontró la dirección de la billetera, de lo contrario, false
        return encontrada;
    } catch (error) {
        console.error('Error al verificar la dirección de la billetera:', error);
        return null;
    }
}
