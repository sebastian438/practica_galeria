//LLAMAR ELEMENTOS DEL DOM
const sectionResultados = document.querySelector(".section-resultados");
const sectionImagenes = document.querySelector(".section-imagenes");
const fragment = document.createDocumentFragment();
const sectionBotones = document.querySelector("#sectionBotones");
const idNaturaleza = document.querySelector("#idNaturaleza");
const idTecnologia = document.querySelector("#idTecnologia");
const idPersonas = document.querySelector("#idPersonas");
const btnBusqueda = document.querySelector("#btnBusqueda");
const boxBtnPaginacion = document.querySelector("#boxBtnPaginacion");


//VARIABLES
const urlApiBase = "https://api.pexels.com/v1";
const keyApi = "Oh6U5BGqs7r2Tfa2fTErGZUPAZA0XeC6z1iNLtx6Aiq1S9GiWJ3F8fpc";
let listaFotos;


//EVENTOS
/**
 * Eventos 
 */

document.addEventListener("click", (ev) => {
    if (ev.target.matches("#sectionBotones img")) {
        const categoriaSeleccion = ev.target.alt;
        getData(categoriaSeleccion);
    }

    if (ev.target.matches('.btnFavoritosAdd')) {
        const id = ev.target.id;
        buscarIdFavoritos(id);
    }

    if (ev.target.matches('.btnFavoritosRemove')) {
        const id = ev.target.id;
        eliminarFotoFavoritos(id);
    }
});


/**
 * TODO: Filtrar por orientación
 */

document.addEventListener("change", (ev) => {
    if (ev.target.matches("#orientacion")) {
        getData();
    }
})


/**
 * Evento para filtrar por búsqueda.
*/

btnBusqueda.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const entrada = ev.target.palabra.value;
    if (validacion(entrada)) {
        getData(entrada);
    }
})


//FUNCIONES

/**
 * Función que llama a la API
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
            // arrayImagenes.push(data.photos);
            // paginaFoto = data.page;
            return data;
        } else {
            throw ("Error con la data");
        }

    } catch (error) {
        throw error
    }
}


/**
 * Función para pintar las fotos
 * @param {Array} data Array que se utiliza para pintar las imágenes
 * @param {Number} page Número de página
 * @param {Boolean} localStorage Indica si los datos se recogen desde el localStorage o no
 */

const pintarFotos = (data, page, localStorage = false) => {
    sectionImagenes.innerHTML = "";
    boxBtnPaginacion.innerHTML = "";

    try {
        data.forEach(element => {
            const articleImagen = document.createElement("ARTICLE");
            articleImagen.classList.add("imagen-card");

            const imgContainer = document.createElement("DIV");
            imgContainer.classList.add("imgContainer");

            const imagen = document.createElement("IMG");
            imagen.setAttribute("src", element.src.medium);
            imagen.setAttribute("alt", element.alt);

            const parrafoAutor = document.createElement("P");
            parrafoAutor.textContent = element.photographer;
            const btnFavoritos = document.createElement("BUTTON");

            if (!localStorage) {
                btnFavoritos.classList.add("btnFavoritosAdd");
                btnFavoritos.textContent = "Agregar a favoritos";
                btnFavoritos.id = element.id;
            } else {
                btnFavoritos.classList.add("btnFavoritosRemove");
                btnFavoritos.textContent = "Eliminar de favoritos";
                btnFavoritos.id = element.id;
            }
            imgContainer.append(imagen);
            articleImagen.append(imgContainer);
            articleImagen.append(parrafoAutor);
            articleImagen.append(btnFavoritos);
            fragment.append(articleImagen);
        });
        sectionImagenes.append(fragment);

        const prevPagBtn = document.createElement("BUTTON");
        prevPagBtn.setAttribute("id", "prevPage");
        prevPagBtn.textContent = "<<";

        const paginaActualBtn = document.createElement("BUTTON");
        paginaActualBtn.setAttribute("id", "currentPage");
        paginaActualBtn.textContent = page;

        const nextPagBtn = document.createElement("BUTTON");
        nextPagBtn.setAttribute("id", "prevPage");
        nextPagBtn.textContent = ">>";

        fragment.append(prevPagBtn);
        fragment.append(paginaActualBtn);
        fragment.append(nextPagBtn);
        boxBtnPaginacion.append(fragment);

    } catch (error) {
        const parrafoErrorImage = document.createElement("P");
        parrafoErrorImage.textContent = error;

        sectionResultados.append(parrafoErrorImage);
    }
}


/**
 * Función para validar la entrada del campo de búsqueda
 */

const validacion = (valida) => {
    const regExp = /^[a-zA-Z\s]{3,}$/;
    return regExp.test(valida);
}


/**
 * Guarda el array de las imágenes en localStorage
 * @param {Array} imagenes 
 */

const setLocal = (imagenes) => {
    if (!imagenes) return;

    localStorage.setItem('listaFotos', JSON.stringify(imagenes));
}


/**
 * Función para recoger el objeto de la imagen desde su id
 */

const buscarIdFavoritos = async (id) => {
    const imagen = await llamarApi(`photos/${id}`);
    aniadirAFavoritos(imagen);
}


/**
 * Función para añadir el objeto de la imagen a favoritos
 * Busca si la imagen ya está guardada en localStorage, si no lo está, la añade al array
 */

const aniadirAFavoritos = (imagen) => {
    const arrayFavoritos = getLocal();
    const verificarExiste = arrayFavoritos.find((foto) => foto.id === imagen.id);
    if (!verificarExiste) {
        setLocal([...arrayFavoritos, imagen]);
    } else {
        return;
    }
}


/**
 * Función para capturar el array almacenado en localStorage
 */

const getLocal = () => {
    listaFotos = JSON.parse(localStorage.getItem('listaFotos')) || [];
    return listaFotos;
}


/**
 * Función para eliminar las fotos de favoritos
 */

const eliminarFotoFavoritos = (id) => {
    const arrayFotos = getLocal();
    const fotosActualizadas = arrayFotos.filter((foto) => id !== foto.id);
    setLocal(fotosActualizadas);
}


/**
 * Función que llama a la api para recoger el array de las imágenes
 * Una vez obtenido el objeto, llama a la función de pintarFotos()
 */

const getData = async (categoria, orientation = null) => {
    const { photos, page } = await llamarApi(`search?query=${categoria}&orientation=${orientation}`);
    pintarFotos(photos, page);
}


/**
 * Función que captura el array de las imágenes del localStorage y llama a pintarFotos con los datos obtenidos
 */

const getDataLocal = () => {
    const data = getLocal();
    pintarFotos(data, null, localStorage = true);
}


/**
 * Funcion para buscar url de imagen relacionada llamarApi.
 * Devuelva un solo objeto, obtenemos la url de la imagen y pinta.
 */

const imagenBoton = async (item) => {
    try {
        const imagen = await llamarApi(`search?query=${item.alt}&per_page=1`);
        const imgClick = imagen.photos[0].src.small;
        item.src = imgClick;
    } catch (error) {
        console.error("Error obteniendo imagen:", error);
        return null;
    }
};


/**
 * Función para saber en qué página nos encontramos
 */

const init = () => {
    if (location.pathname === '/pages/favoritos.html') {
        getDataLocal()
    } else if (location.pathname === '/' || location.pathname === '/index.html') {
        imagenBoton(idNaturaleza);
        imagenBoton(idTecnologia);
        imagenBoton(idPersonas);
    }
}

init()

