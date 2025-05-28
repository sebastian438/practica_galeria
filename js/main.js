//LLAMAR ELEMENTOS DEL DOM
const sectionImagenes = document.querySelector('#sectionImagenes');

//VARIABLES
const urlApiBase = "https://api.pexels.com/v1";
const keyApi = "Oh6U5BGqs7r2Tfa2fTErGZUPAZA0XeC6z1iNLtx6Aiq1S9GiWJ3F8fpc";
let listaFotos;


//EVENTOS

sectionImagenes.addEventListener('click', (ev) => {
    if (ev.target.matches('.btnFavoritosAdd')) {
        // obtener objeto de la imagen asociada al botón añadir a favoritos
        // crear función en pintarFoto que guarde el objeto?
        aniadirAFavoritos(imagen)
        console.log('Entra en evento');
    }
})

sectionImagenes.addEventListener('click', (ev) => {
    if (ev.target.matches('.btnEliminar')) {
        // Obtener id del objeto/botón
        eliminarFotoFavoritos()
        console.log('Entra evento eliminar');
    }
})

//FUNCIONES
/**
 * 
 * @param {String} endpoint Son las palabras claves, o los filtros de búsqueda que se quieren aplicar en la API.
 * @returns {Object} Es la coleccion de imágenes que cumplen con las característica de la llamada realizada.
 */

const llamarApi = async (endpoint) => {
    try {
        const response = await fetch(`${urlApiBase}/${endpoint}`, {
            headers: {
                "Authorization": keyApi
            }
        });
        let data;
        if (response.ok) {
            data = await response.json();
            return data;
        } else {
            throw ("Error con la data");
        }

    } catch (error) {
        throw error
    }
}

llamarApi("search?query=people");

const validacion = () => {
    // const RegExp = / /[a-zA-ZÀ-ÿ\s]//;
    //const imagen = (photoinput.valu);
    // var mifotos;
    /* if (imagen.search(RegExp) != -1) {
      mifotos= " contains ";
    } else {
      mifotos = " does not contain ";
    }
    console.log(imagen + midstring + RegExp); */
    //validar palabra introducida por input(con regular expresions)
    //Letras mayúsculas, mínusculas, tíldes.
}



const filtrarBusqueda = () => {

    //Llamamos a funcion validar, le pasamos la palabra, si es correcta, agregamos esa palabra en la URL de la api. Llamaríamos a funcion pintarFotos.
}


const filtrarOrientacion = () => {
    //Llamamos a funcion Api, le pasamos la URL con la orientación seleccionada. Llamamos a funcion pintarFotos.
}

/**
 * Guarda el array de las imágenes en localStorage
 * @param {Array} imagenes 
 * @returns 
 */
const setLocal = (imagenes) => {
    if (!imagenes) return;

    // localStorage.setItem('listaFotos', JSON.stringify([...array, imagenes]));
    localStorage.setItem('listaFotos', JSON.stringify(imagenes));
}

const aniadirAFavoritos = (imagen) => {
    const arrayFavoritos = getLocal();
    setLocal([...arrayFavoritos, imagen])
    //Capturar la URL de la foto seleccionada. Guardar en LocalStorage. 
}

const getLocal = () => {
    listaFotos = JSON.parse(localStorage.getItem('listaFotos')) || [];
    return listaFotos;
    //Recogemos fotos guardadas en localStorage. 
}

const pintarFotosFavoritos = () => {
    // Recoger el array del localstorage
    // pintar foto + botón eliminar
}

const eliminarFotoFavoritos = (id) => {
    const arrayFotos = getLocal();
    const fotosActualizadas = arrayFotos.filter((foto) => id !== foto.id);
    localStorage.setItem('listaFotos', JSON.stringify(fotosActualizadas));
    // Modificar array, si el id de la foto coincide con el id del botón eliminar, se filtra y no se añade, mantener el resto
}

const pintarFotos = () => {
    //Acceder al DOM, crear los elementos, acceder a la URL de las fotos y pintarlas 
    // Enlazar botones con prev_page y next_page
}

//INVOCAR FUNCIONES