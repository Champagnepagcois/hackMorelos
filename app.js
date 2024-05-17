const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.topdoctors.mx/puebla/medicina-general-especialidad/';

let doctorNamesGlobal = []; // Paso 1: Declara la variable fuera del ámbito de axios

axios.get(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        const doctorNames = [];
        $('h2 > a.has-text-info').each((index, element) => {
            doctorNames.push($(element).text().trim());
        });

        doctorNamesGlobal = doctorNames; // Paso 2: Asigna los nombres a la variable global
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    })
    .finally(() => {
        console.log(doctorNamesGlobal); // Paso 3: Imprime la variable fuera del bloque .then()
    });