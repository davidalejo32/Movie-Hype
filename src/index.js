// styles
import "./sass/app.scss";
import 'swiper/css';

import { 
   loadGenres, 
   loadSearchs,
   loadMovie,
   loadGenresByName,
} from "./utils/loadMovies.js";


import {
   header, formSearch, recommendations,
   categories, popular, search, seeAllPopular,
   movie, genreByName, navHome, navSearch, formSearchButton,
   formSearchInput, movieArrow,genreByNameArrow, popularArrow
} from "./utils/nodes.js";



// cuando el documento cargue me va a ejecutar la funcion de navigator
window.addEventListener('DOMContentLoaded', navigator, false);
   
// cuando cambie el hash tambien ejecuta la funcion de navigatos
window.addEventListener('hashchange', navigator, false);


// guarda el historial de la flecha hacia atras
movieArrow.addEventListener("click", () => {
   history.back();
});

// guarda el historial de la flecha hacia atras
genreByNameArrow.addEventListener("click", () => {
   history.back();
});

// guarda el historial de la flecha hacia atras
popularArrow.addEventListener("click", () => {
   history.back();
});


// almacena el valor que se busco en el search Input
let searchInputValue = "";


// dependiendo del hash ejecuto una funcion o otra
function navigator () {

   if (location.hash.startsWith('#popular')) {
      AllPopular();
   } else if (location.hash.startsWith('#search')) {
      searchPage();
   } else if (location.hash.startsWith('#movie=')) {
      movieDetailsPage();
   } else if (location.hash.startsWith('#category=')) {
      categoriesPage();

   } else {
      homePage();
   };

   // el scroll esta arriba cuando cambio de pagina
   document.documentElement.scrollTop = 0;
};


// navegacion del home oculto y muestro secciones
function homePage () {
   header.removeAttribute("id", "inactive");
   formSearch.removeAttribute("id", "inactive");
   recommendations.removeAttribute("id", "inactive");
   categories.removeAttribute("id", "inactive");
   popular.removeAttribute("id", "inactive");
   search.setAttribute("id", "inactive")
   movie.setAttribute("id", "inactive");
   genreByName.setAttribute("id", "inactive")
   seeAllPopular.setAttribute("id", "inactive");
   navHome.classList.add("nav__active");
   navSearch.classList.remove("nav__active");
   formSearchInput.value = "";

};


// navegacion  de la pagina de categorias
function categoriesPage () {
   header.setAttribute("id", "inactive");
   formSearch.setAttribute("id", "inactive");
   recommendations.setAttribute("id", "inactive");
   categories.setAttribute("id", "inactive");
   popular.setAttribute("id", "inactive");
   search.setAttribute("id", "inactive");
   seeAllPopular.setAttribute("id", "inactive");
   movie.setAttribute("id", "inactive");
   genreByName.removeAttribute("id", "inactive");

};


// navegacion del detalle de la pelicula
function movieDetailsPage () {
   header.setAttribute("id", "inactive");
   formSearch.setAttribute("id", "inactive");
   recommendations.setAttribute("id", "inactive");
   categories.setAttribute("id", "inactive");
   popular.setAttribute("id", "inactive");
   genreByName.setAttribute("id", "inactive");
   seeAllPopular.setAttribute("id", "inactive");
   search.setAttribute("id", "inactive");
   movie.removeAttribute("id", "inactive"); 
   
   // saco el hash y separo el id ej: movie=1854 y se lo paso a la funcion de loadMovie
   let [_, idMovie] = location.hash.split('=');

   loadMovie(idMovie);

};


//  navegacion de las busquedas
function searchPage () {
   header.removeAttribute("id", "inactive");
   formSearch.removeAttribute("id", "inactive");
   recommendations.setAttribute("id", "inactive");
   categories.removeAttribute("id", "inactive");
   popular.setAttribute("id", "inactive");
   movie.setAttribute("id", "inactive");
   search.removeAttribute("id", "inactive")
   seeAllPopular.setAttribute("id", "inactive");
   genreByName.setAttribute("id", "inactive");
   navHome.classList.remove("nav__active");
   navSearch.classList.add("nav__active");

   loadGenres();

   formSearchInput.value = searchInputValue ;
};


// navegacion de todas las peliculas populares
function AllPopular () {
   header.setAttribute("id", "inactive");
   formSearch.setAttribute("id", "inactive");
   recommendations.setAttribute("id", "inactive");
   categories.setAttribute("id", "inactive");
   popular.setAttribute("id", "inactive");
   genreByName.setAttribute("id", "inactive");
   search.setAttribute("id", "inactive");
   movie.setAttribute("id", "inactive"); 
   seeAllPopular.removeAttribute("id", "inactive");
   
   
};


// accion del boton de busqueda del form search y logica

formSearchButton.addEventListener("click", () => {
   
   console.log(formSearchInput.value)
   if(formSearchInput.value === "") {
      formSearchInput.setAttribute("placeholder", "Please enter text...");

   }else {
      formSearchInput.setAttribute("placeholder", "Search a title...");
      location.hash = `#search=${formSearchInput.value}`;
      loadSearchs(formSearchInput.value);

      searchInputValue = formSearchInput.value;
   }
});

// accion de pulsar enter
formSearchInput.addEventListener("keydown", (evento) => {
   if(evento.key === "Enter"){
      if(formSearchInput.value === "") {
         formSearchInput.setAttribute("placeholder", "Please enter text...");
      }else {
         formSearchInput.setAttribute("placeholder", "Search a title...");
         location.hash = `#search=${formSearchInput.value}`;
         loadSearchs(formSearchInput.value);
         searchInputValue = formSearchInput.value;
      }
   }
})



