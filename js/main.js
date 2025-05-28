//LLAMAR ELEMENTOS DEL DOM


//VARIABLES
const urlApiBase = "https://api.pexels.com/v1";
const keyApi = "Oh6U5BGqs7r2Tfa2fTErGZUPAZA0XeC6z1iNLtx6Aiq1S9GiWJ3F8fpc";


//EVENTOS



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


const aniadirAfavoritos = () => {
    //Capturar la URL de la foto seleccionada. Guardar en LocalStorage. 
}

const getFavoritos = () => {
    //Recogemos fotos guardadas en localStorage. 
}

const pintarFotosFavoritos = () => {
    // Recoger el array del localstorage
    // pintar foto + botón eliminar
}

const eliminarFoto = () => {
    // Modificar array, si el id de la foto coincide con el id del botón eliminar, se filtra y no se añade
}

const pintarFotos = () => {
    //Acceder al DOM, crear los elementos, acceder a la URL de las fotos y pintarlas 
    // Enlazar botones con prev_page y next_page
}










/////FUNCION CREAR IMAGENES PARA LOS BOTONES NATURALEZA, TECNO Y PERSONAS.

//crear los selectores necesarios
const sectionBotones = document.querySelector("#sectionBotones");
const idNaturaleza = document.querySelector("#idNaturaleza");
const idTecnologia = document.querySelector("#idTecnologia");
const idPersonas = document.querySelector("#idPersonas");

//evento esto es para su uso despues .
sectionBotones.addEventListener("click", (ev) => {

});

//funcion buscar url de imagen relacionada llamarApi.

const imgenesNaturaleza = async () => await llamarApi("search?query=nature");
const dataNaturaleza = async () => await imgenesNaturaleza.json();
const imgenesTecnologia = llamarApi("search?query=technology");
const imgenesPersonas = llamarApi("search?query=people");
////////////////////////////////////////
// import { createClient } from 'https://api.pexels.com/v1';

// const client = createClient("Oh6U5BGqs7r2Tfa2fTErGZUPAZA0XeC6z1iNLtx6Aiq1S9GiWJ3F8fpc");
// const query = 'Nature';

// const uno = client.photos.search({ query, per_page: 1 }).then(photos => {...});
// console.log(uno);
///////////////////////////////////
console.log(imgenesNaturaleza);
console.log(dataNaturaleza);
console.log(imgenesTecnologia);
console.log(imgenesPersonas);




// const imagenBoton = async () => {
//     try {
//         const imagen = await llamarApi("search?query=nature");
//         return imagen;
//     } catch (error) {
//         console.error("Error obteniendo imagen:", error);
//         return null;
//     }
// };
// console.log(imagenBoton);


//pintar imagen en la








//INVOCAR FUNCIONES








