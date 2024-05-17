if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(
            ({ coords: {latitude, longitude}}) => {
                const coords = {
                    lat: latitude,
                    lng: longitude,
                };
                console.log(coords);
            },
            ()=> {
                alert ("Tu navegador esta bien, pero ocurrio un error un error");
            }
        );
    } else {
        alert("Tu navegador no dispone de la geolocalizacion, actualizalo");
    }
