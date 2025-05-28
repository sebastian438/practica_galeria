//LLAMAR ELEMENTOS DEL DOM
const sectionResultados = document.querySelector("#section-resultados");
const sectionImagenes = document.querySelector("#section-imagenes");
const fragment = document.createDocumentFragment();

//VARIABLES
const urlApiBase = "https://api.pexels.com/v1";
const keyApi = "Oh6U5BGqs7r2Tfa2fTErGZUPAZA0XeC6z1iNLtx6Aiq1S9GiWJ3F8fpc";
let listaFotos;

//EVENTOS
/*
    eventoCategoria -getDataApi(categoria)

    paginaLocal - getLocal
*/

sectionImagenes.addEventListener('click', (ev) => {
    
    // Pasar url id con otra llamada a api
    // o acceder al elemento padre y recoger la información de ahí parentElement, querySelector.value, crear objeto con el valor ese
    if (ev.target.matches('.btnFavoritosAdd')) {
        const id = ev.target.id;
        buscarIdFavoritos(id);
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

const pintarFotos = (data, page, localStorage = false) => {
    try {

        // const data = await llamarApi("search?query=people");
        // console.log({ data });

        // data=getStorage
        console.log(data);

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
            } else {

                btnFavoritos.classList.add("btnFavoritosRemove");
                btnFavoritos.textContent = "Eliminar de favoritos";
            }


            imgContainer.append(imagen);
            articleImagen.append(imgContainer);
            articleImagen.append(parrafoAutor);
            articleImagen.append(btnFavoritos);
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
        paginaActualBtn.textContent = page;

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

    //Acceder al DOM, crear los elementos, acceder a la URL de las fotos y pintarlas 
    // Enlazar botones con prev_page y next_page
}

const validacion = (valida) => {
    const regExp = /^[a-zA-Z\s]{3,}$/;
    return regExp.test(valida);
    //validar palabra introducida por input(con regular expresions)
    //Letras mayúsculas, mínusculas, tíldes.
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

const buscarIdFavoritos = async (id) => {
    const imagen = await llamarApi(`photos/${id}`);
    console.log(imagen)
    aniadirAFavoritos(imagen);
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

const eliminarFotoFavoritos = (id) => {
    const arrayFotos = getLocal();
    const fotosActualizadas = arrayFotos.filter((foto) => id !== foto.id);
    localStorage.setItem('listaFotos', JSON.stringify(fotosActualizadas));
    // Modificar array, si el id de la foto coincide con el id del botón eliminar, se filtra y no se añade, mantener el resto
}

const getData = async (categoria, orientation = null) => {
    const { photos, page } = await llamarApi(`search?query=${categoria}&orientation=${orientation}`);

    pintarFotos(photos, page)
}
/*
getdataLocal => (){
    const data = llamar local

    pintarFotos(data)
}
*/

/////FUNCION CREAR IMAGENES PARA LOS BOTONES NATURALEZA, TECNO Y PERSONAS.

//crear los selectores necesarios
const sectionBotones = document.querySelector("#sectionBotones");
const idNaturaleza = document.querySelector("#idNaturaleza");
const idTecnologia = document.querySelector("#idTecnologia");
const idPersonas = document.querySelector("#idPersonas");

//evento esto es para su uso despues .

sectionBotones.addEventListener("click", (ev) => {
    const categoriaSelecion = ev.target.alt;
    console.log(`Crear imagenes de ${ev.target.alt}`);  
});

//funcion buscar url de imagen relacionada llamarApi.

const imagenBoton = async (item) => { 
    try {
        const imagen = await llamarApi(`search?query=${item.alt}&&per_page=1`);
        const imgClick = imagen.photos[0].src.small;
        console.log(imagen);
        item.src = imgClick;
    } catch (error) {
        console.error("Error obteniendo imagen:", error);
        return null;
    }
};

imagenBoton(idNaturaleza);
imagenBoton(idTecnologia);
imagenBoton(idPersonas);

//INVOCAR FUNCIONES
