import app from '../utils/axios.js';

const linkImg = "https://image.tmdb.org/t/p/w500";

// style one es el estilo del serarch
function loadMovieStyleOne (data, section, title="", clean) {
   
   if(clean === true) {
      section.innerHTML = "";
      const searchTitleP = document.createElement("h3");
      searchTitleP.className = "search__title-p";
      searchTitleP.innerText = title;
      section.appendChild(searchTitleP);
   };
   
   
   data.forEach(async (element) => {

      // div
      const searchMovieContainer = document.createElement("div");
      searchMovieContainer.className = "search__movie-container";
   
      searchMovieContainer.addEventListener("click", () => {
         location.hash = `#movie=${element.id}`;
      });

      // div
      const searchImgContainer = document.createElement("div");
      searchImgContainer.className = "search__img-container";
      
      // img
      const searchImg = document.createElement("img");
      searchImg.className = "search__img";
      searchImg.setAttribute("alt", element.title);
      
      if(element.poster_path !== null) {
         searchImg.setAttribute("src", `${linkImg}${element.poster_path}`);
         
      }else if(element.backdrop_path !== null) {
         searchImg.setAttribute("src", `${linkImg}${element.backdrop_path}`);
      }else {
         searchImg.setAttribute("src", ``);
      }
   
      // div
      const searchVoteContainer = document.createElement("div");
      searchVoteContainer.classList = "searhc__vote-container";
   
      // i
      const searchIcon = document.createElement("i");
      searchIcon.className = "bx bxs-star search__icon";
      
      // p
      const searchVote = document.createElement("p");
      searchVote.className = "search__vote";
      searchVote.textContent = element.vote_average;
      
      // div
      const searchInfo = document.createElement("div");
      searchInfo.className = "search__info"
      
      // h3
      const searchTitle = document.createElement("h3");
      searchTitle.className = "search__title";
      searchTitle.textContent = element.title;
      
      // span
      const searchDateContainer = document.createElement("span");
      searchDateContainer.className = "search__date-container";
      
      // i
      const searchDateIcon = document.createElement("i");
      searchDateIcon.className = "bx bxs-calendar-event search__date-icon";
      
      // p
      const searchDateTitle = document.createElement("p");
      searchDateTitle.className = "search__date-title";
      searchDateTitle.textContent = element.release_date;

      // span
      const searchGenreContainer = document.createElement("span");
      searchGenreContainer.className = "search__genre-container";
      
      // i
      const searchGenreIcon = document.createElement("i");
      searchGenreIcon.className = "bx bxs-movie-play search__genre-icon";
      
      // p
      const searchGenreTitle = document.createElement("p");
      searchGenreTitle.className = "search__genre-title";


      searchMovieContainer.appendChild(searchImgContainer);
      searchMovieContainer.appendChild(searchInfo);
   
      searchImgContainer.appendChild(searchImg);
      searchImgContainer.appendChild(searchVoteContainer);
   
      searchVoteContainer.appendChild(searchIcon);
      searchVoteContainer.appendChild(searchVote);
   
      searchInfo.appendChild(searchTitle);
      searchInfo.appendChild(searchDateContainer);
   
      searchDateContainer.appendChild(searchDateIcon);
      searchDateContainer.appendChild(searchDateTitle);
      
      searchInfo.appendChild(searchGenreContainer);
      searchGenreContainer.appendChild(searchGenreIcon);
      searchGenreContainer.appendChild(searchGenreTitle);

      // peticion para traer el nombre de los generos
      const { data, status } = await app.get(`/movie/${element.id}`);

      // almaceno los nombre de los generos ej: action | terror
      let genresConcatent = "";

      if (data.genres.length > 0) {
         for(let i = 0; i < data.genres.length; i++) {
            if(i === (data.genres.length - 1)){
               genresConcatent += `${data.genres[i].name}`;
            }else {
               genresConcatent += `${data.genres[i].name} | `;
            }
         };
         // agrego los generos 
         searchGenreTitle.textContent = genresConcatent;
      }else {
         // si no hay generos que no me ponga nada
         searchGenreTitle.textContent = ""
      };

      section.appendChild(searchMovieContainer);
   })
};

export default loadMovieStyleOne;