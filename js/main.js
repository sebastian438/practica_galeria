//LLAMAR ELEMENTOS DEL DOM
const sectionResultados = document.querySelector("#section-resultados");
const sectionImagenes = document.querySelector("#section-imagenes");
const fragment = document.createDocumentFragment();

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

const pintarFotos = async () => {
    try {

        const data = await llamarApi("search?query=people");
        console.log(data);

        data.photos.forEach(element => {
            const articleImagen = document.createElement("ARTICLE");
            articleImagen.classList.add("imagen-card");

            const imgContainer = document.createElement("DIV");
            imgContainer.classList.add("imgContainer");

            const imagen = document.createElement("IMG");
            imagen.setAttribute("src", element.src.medium);
            imagen.setAttribute("alt", element.alt);

            const parrafoAutor = document.createElement("P");
            parrafoAutor.textContent = element.photographer;

            const btnFavoritosAdd = document.createElement("BUTTON");
            btnFavoritosAdd.classList.add("btnFavoritosAdd");
            btnFavoritosAdd.textContent = "Agregar a favoritos";

            imgContainer.append(imagen);
            articleImagen.append(imgContainer);
            articleImagen.append(parrafoAutor);
            articleImagen.append(btnFavoritosAdd);
            fragment.append(articleImagen);


        });
        sectionImagenes.append(fragment);
        const boxBtnPaginacion = document.createElement("ARTICLE");
        boxBtnPaginacion.classList.add("btn-paginacion");
        boxBtnPaginacion.classList.add("display-flex");

        const prevPagBtn = document.createElement("BUTTON");
        prevPagBtn.setAttribute("id", "prevPage");
        prevPagBtn.textContent = "<<";

        const paginaActualBtn = document.createElement("BUTTON");
        paginaActualBtn.setAttribute("id", "currentPage");
        paginaActualBtn.textContent = data.page;

        const nextPagBtn = document.createElement("BUTTON");
        nextPagBtn.setAttribute("id", "prevPage");
        nextPagBtn.textContent = ">>";

        boxBtnPaginacion.append(prevPagBtn);
        boxBtnPaginacion.append(paginaActualBtn);
        boxBtnPaginacion.append(nextPagBtn);
        fragment.append(boxBtnPaginacion);
        sectionResultados.append(fragment);


    } catch (error) {
        const parrafoErrorImage = document.createElement("P");
        parrafoErrorImage.textContent = error;

        sectionResultados.append(parrafoErrorImage);
    }

    //Acceder al DOM, crear los elementos, acceder a la URL de las fotos y pintarlas 
    // Enlazar botones con prev_page y next_page
}

const validacion = (valida) => {
    const regExp = /^[a-zA-Z\s]{3,}$/;
    return regExp.test(valida);
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

const eliminarFotoFavoritos = () => {
    // Modificar array, si el id de la foto coincide con el id del botón eliminar, se filtra y no se añade
}

//INVOCAR FUNCIONES

// llamarApi("search?query=people");
pintarFotos();