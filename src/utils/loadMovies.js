// utils
import {swiperEjec} from "./formCarrouse.js";
import app from './axios.js';
import getData from "./getData.js";


// templates
import loadMovieStyleOne from "../templates/movieStileOne.js";
import loadMoviesStyleTwo from "../templates/movieStileTwo.js"
import movieStileCarrousel from "../templates/movieStileCarrousel.js"

// DOM nodes
import { 
   recommendations, categoriesContainer, genreByNameMovies,
   popularMovies, search, movieTitle, movieBackground, movieImg,
   movieDateTitle, movieGenreTitle, movieVote, moviedescription, 
   seeAllPopularContainer, seeAllPopularSee, 
   movieRelatedContainer, genreByNameSeeMore

} from "./nodes.js";


const linkImg = "https://image.tmdb.org/t/p/w500";



// load recomendations, carga todas las recomendaciones en el slider
async function loadRecommendations () {

   const data = await getData('/movie/upcoming')

   // limpia todo el html
   recommendations.innerHTML = "";

   // divs
   const swiper = document.createElement("div");
   swiper.className = "swiper";
   
   const swiperWraper = document.createElement("div");
   swiperWraper.className = "swiper-wrapper";

   const swiperPagination= document.createElement("div");
   swiperPagination.className = "swiper-pagination";

   recommendations.appendChild(swiper);
   swiper.appendChild(swiperWraper);

   movieStileCarrousel(data, swiperWraper);

   // luego de que tenga todo el html cargo la funcion que me ejecuta el codigo del swiper
   swiperEjec();
};     


// variable de paginacion, me alamacena el genero que al cual se le dio clcik
let genreSee;


// load genres, carga todos los nombre de los generos
async function loadGenres () {

   const data = await getData('/genre/movie/list');

   categoriesContainer.innerHTML = "";

   data.genres.forEach(element => {

      const categoriesCategory = document.createElement('a');
      categoriesCategory.className = "categories__category";
      categoriesCategory.textContent = element.name;

      categoriesCategory.addEventListener("click", ()=> {
         location.hash = `category=${element.id}=${element.name}`;
         loadGenresByName(element.id, element.name);
         genreSee = element.id;

      }) 
      categoriesContainer.appendChild(categoriesCategory);
   });


};


// carga las peliculas relacionadas por el genero
async function loadGenresByName (genre, name) {

   const data = await getData('/discover/movie',{
      "with_genres": genre,
   });


   
   // reutilizo la funcion para cargar las pelis
   loadMovieStyleOne(data.results, genreByNameMovies, name, true);

};


// load popular, carga  las peliculas propulares
async function loadPopular () {

   const data = await getData('/movie/popular');

   loadMoviesStyleTwo(data.results, popularMovies);

};


// load searchs, carga las busquedas
async function loadSearchs (query) {
   const data = await getData("/search/movie", {
      "query": query
   });
   // true es para que me limpie todo el html 
   loadMovieStyleOne(data.results, search, "Results", true);
};


// load movie, carga la pelicula al darle click
async function loadMovie (id) {
   
   const data = await getData(`/movie/${id}`);  
   
   movieTitle.textContent = data.title;
   
   // img
   if(data.poster_path !== null) {
      movieImg.src = `${linkImg}${data.poster_path}`;
      movieBackground.style.backgroundImage = `linear-gradient(180deg, rgba(31, 29, 43, 0.25) 0%, #1F1D2B 100%), url(${linkImg}${data.poster_path})`
      
   }else if(data.backdrop_path !== null) {
      movieImg.src =`${linkImg}${data.backdrop_path}`;
      movieBackground.style.backgroundImage = `linear-gradient(180deg, rgba(31, 29, 43, 0.25) 0%, #1F1D2B 100%), url(${linkImg}${data.backdrop_path})`;

   }else {
      movieImg.setAttribute("src", "");
      movieBackground.style.backgroundImage = `linear-gradient(180deg, rgba(31, 29, 43, 0.25) 0%, #1F1D2B 100%), url()`;
      
   };

   movieDateTitle.textContent = data.release_date;


   // genres
   if (data.genres.length > 0) {
      movieGenreTitle.textContent = data.genres[0].name;

   }else {
      movieGenreTitle.textContent = "";
   };

   movieVote.textContent = data.vote_average;
   moviedescription.innerText = data.overview;

   movieSimilar(data.id);
};


// loadAllPopular carga la pagina donde estan todas las peliculas populares
async function loadAllPopular () {
   const data = await getData ('/movie/popular');
   loadMovieStyleOne (data.results, seeAllPopularContainer, "Popular", true);
};


// controla la paginacion de  loadAll Popular
let contSeeMorePopular = 1;


// carga la siguiente pagina donde estan todas las peliculas de popular
async function seeMorePopular () {
   contSeeMorePopular++;

   const data = await getData('/movie/popular', {
      "page": contSeeMorePopular,
   });
   
   loadMovieStyleOne (data.results, seeAllPopularContainer, "Popular", false);
};


// al darle click al seeMore de popular ejecuta la funcion de cargar la siguiente pagina
seeAllPopularSee.addEventListener("click", seeMorePopular); 


// controla la paginacion de seeMoreGenre;
let contSeeGenre = 1;


// carga la siguiente pagina donde estan todas las peliculas relacionadas con el genero al cual se esta buscando 
async function seeMoreGenre (genre) {
   
   contSeeGenre++;

   const data =  await getData("/discover/movie", {
      "with_genres": genre,
      "page": contSeeGenre,
   });
   // carga mas peliculas sin limpiar el html
   loadMovieStyleOne(data.results, genreByNameMovies, "category", false);

};


async function movieSimilar(movieId) {
   const data = await getData(`/movie/${movieId}/similar`);

   loadMoviesStyleTwo(data.results, movieRelatedContainer);
};


// al darle click al voton de ver mas dendro del genero ejecuta la funcion que trae la siguiente pagina
genreByNameSeeMore.addEventListener("click", ()=>{
   seeMoreGenre(genreSee);
});


// ejecuto las funciones por defecto
loadRecommendations ();
loadGenres();
loadPopular ();
loadAllPopular();


export { 
   loadGenres, 
   loadSearchs,
   loadMovie,
   loadGenresByName,
};

