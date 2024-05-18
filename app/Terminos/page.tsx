"use client"
import React, { useState } from 'react';
import { Container, Typography, Checkbox, FormControlLabel, Button, Box } from '@mui/material';

const TermsAndConditions: React.FC = () => {
  const [accepted, setAccepted] = useState(false);

  const handleAcceptance = () => {
    setAccepted(!accepted);
  };

  const handleSubmit = () => {
    if (accepted) {
        window.location.href = '/signup';
      // Aquí puedes agregar la lógica para procesar la aceptación de los términos y condiciones
      alert('Términos y condiciones aceptados');
    } else {
      alert('Debes aceptar los términos y condiciones para continuar.');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        Políticas y Términos de Uso de la Aplicación
      </Typography>
      <Box sx={{ maxWidth: '80vh', maxHeight: 'auto', overflowY: 'auto', margin: 'auto', marginBottom: 2, paddingTop: 5 }}>
      <Typography variant="body1" paragraph>
      Bienvenido a nuestra aplicación, diseñada para ayudarte a encontrar al mejor médico de acuerdo a filtros de cercanía y nivel socioeconómico, así como para proporcionarte un diagnóstico preliminar a través de machine learning y ofrecerte beneficios exclusivos a través de suscripciones. Antes de utilizar nuestra plataforma, te pedimos que leas detenidamente nuestras políticas y términos de uso:
      </Typography>


        <Typography variant="h5" paragraph>
        Objetivo de la Aplicación:
        </Typography>
        <Typography variant="body1" paragraph>
            Nuestra aplicación tiene como objetivo principal facilitar el acceso a servicios de salud de calidad al conectar a los usuarios con médicos y especialistas adecuados para sus necesidades
        </Typography>
        <Typography variant="h5" paragraph>
        Diagnóstico Preliminar:
        </Typography>
        <Typography variant="body1" paragraph>
        La función de diagnóstico preliminar utiliza machine learning para analizar los síntomas proporcionados por el usuario y sugerir posibles enfermedades. Es importante tener en cuenta que este diagnóstico es solo una herramienta de referencia y no sustituye la evaluación médica profesional.        </Typography>

        <Typography variant="h5" paragraph>
        Privacidad y Seguridad:
        </Typography>
        <Typography variant="body1" paragraph>
        Nos comprometemos a proteger la privacidad y seguridad de tus datos personales. Toda la información proporcionada será tratada de manera confidencial y solo se compartirá con terceros de acuerdo con nuestra política de privacidad.
        </Typography>

        <Typography variant="h5" paragraph>
        Limitaciones de Responsabilidad: 
        </Typography>
        <Typography variant="body1" paragraph>
        Aunque hacemos todo lo posible por garantizar la precisión y la fiabilidad de la información proporcionada en la aplicación, no podemos hacernos responsables de cualquier daño o perjuicio derivado del uso de la misma.
        </Typography>
        <Typography variant="h5" paragraph>
        Suscripciones y Beneficios:
        </Typography>
        <Typography variant="body1" paragraph>
            Ofrecemos planes de suscripción que incluyen beneficios exclusivos como descuentos en farmacias, ofertas en estudios médicos y consultas a domicilio. Estos beneficios están sujetos a términos y condiciones específicos de cada plan.        </Typography>
        <Typography variant="h5" paragraph>
        Riesgos Sociales y Legales:
        </Typography>
        <Typography variant="body1" paragraph>
        Reconocemos que el acceso desigual a la atención médica puede perpetuar desigualdades sociales. Nos comprometemos a trabajar en colaboración con organizaciones y profesionales de la salud para abordar estos desafíos y promover la equidad en el cuidado de la salud.        </Typography>
        <Typography variant="body1" paragraph>
        Al utilizar nuestra aplicación, aceptas cumplir con estas políticas y términos de uso. Si tienes alguna pregunta o inquietud, no dudes en ponerte en contacto con nuestro equipo de soporte. ¡Gracias por confiar en nosotros para tu cuidado de la salud!
        </Typography>

        
        <Typography variant="h4" paragraph>
        Política de Privacidad
        </Typography>
        <Typography variant="body1" paragraph>
        En nuestra aplicación, la privacidad de tus datos es una prioridad. A continuación, detallamos cómo recopilamos, utilizamos y protegemos tu información personal:
        </Typography>

        <Typography variant="h5" paragraph>
        Información Recopilada:
        </Typography>
        <Typography variant="body1" paragraph>
        Recolectamos información personal como tu nombre, dirección de correo electrónico, edad, sexo y ubicación para brindarte un servicio personalizado y mejorar la experiencia del usuario.        
        </Typography>
        <Typography variant="h5" paragraph>
        Uso de la Información:
        </Typography>
        <Typography variant="body1" paragraph>
        Utilizamos tu información para proporcionarte servicios médicos personalizados, mejorar nuestra aplicación y enviarte comunicaciones relacionadas con tu salud y bienestar.        
        </Typography>
        <Typography variant="h5" paragraph>
        Protección de Datos:
        </Typography>
        <Typography variant="body1" paragraph>
        Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos contra el acceso no autorizado, la pérdida o el uso indebido.        
        </Typography>
        <Typography variant="h5" paragraph>
        Compartir Información:
        </Typography>
        <Typography variant="body1" paragraph>
        No compartiremos tu información personal con terceros sin tu consentimiento, excepto cuando sea necesario para brindarte los servicios solicitados o cuando estemos legalmente obligados a hacerlo.        
        </Typography>
        <Typography variant="h5" paragraph>
        Cookies y Tecnologías Similares:
        </Typography>
        <Typography variant="body1" paragraph>
        Utilizamos cookies y tecnologías similares para recopilar información sobre tu uso de la aplicación y mejorar nuestros servicios. Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador.        
        </Typography>
        <Typography variant="h5" paragraph>
        Derechos del Usuario:        
        </Typography>
        <Typography variant="body1" paragraph>
        Tienes derecho a acceder, corregir o eliminar tu información personal en cualquier momento. También puedes solicitar la limitación del procesamiento de tus datos o presentar una queja ante la autoridad de protección de datos correspondiente.        
        </Typography>
        <Typography variant="body1" paragraph>
        Al utilizar nuestra aplicación, aceptas nuestra política de privacidad y el tratamiento de tus datos personales de acuerdo con lo establecido en la misma. Si tienes alguna pregunta o inquietud sobre nuestra política de privacidad, no dudes en contactarnos.        </Typography>



        




        {/* Aquí irían el resto de los subtítulos y párrafos del texto de los términos y condiciones */}
      </Box>
      <FormControlLabel
        control={<Checkbox checked={accepted} onChange={handleAcceptance} />}
        label="He leído y acepto los términos y condiciones."
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!accepted}>
        Aceptar
      </Button>
    </Container>
  );
};

export default TermsAndConditions;
