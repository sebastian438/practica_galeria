//LLAMAR ELEMENTOS DEL DOM
const btnBusqueda = document.querySelector("btnbusqueda")


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


/**
 * 
 * @param {*} valida 
 * @returns 
 */
const validacion = (imagen) => {

        const regExp = /^[a-zA-Z\s]{3,}$/;
        return regExp.test(imagen);
    //validar palabra introducida por input(con regular expresions)
    //Letras mayúsculas, mínusculas, tíldes.
}



const filtrarBusqueda = () => {
    btnBusqueda.addEventListener("submit" ,(Event) => {
        Event.preventDefault();
        const imagen = Event.target.imagen.value // llamarApi
        const noesImagen = document.getElementById("error")
        if (validacion(imagen)) {


        }else {
          noesImagen.textContent=`escribi un nombre de imagen`
        }
    })


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

//INVOCAR FUNCIONES