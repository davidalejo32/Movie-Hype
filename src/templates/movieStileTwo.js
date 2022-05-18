import app from "../utils/axios.js";

const linkImg = "https://image.tmdb.org/t/p/w500";


// style two es el estilo de popular

function loadMoviesStyleTwo(data, section) {

   // limpio el html
   section.innerHTML = "" ;

   data.forEach( async (element) => {
      const popularMovie = document.createElement('div');
      popularMovie.className = "popular__movie";

      popularMovie.addEventListener("click", () => {
         location.hash = `#movie=${element.id}`;
      });

      const popularImg = document.createElement('img');
      popularImg.className = "popular__img";
      popularImg.setAttribute("src", `${linkImg}${element.poster_path}`);
      popularImg.setAttribute("alt", element.title);

      const popularName = document.createElement('h2');
      popularName.className = "popular__name";
      popularName.textContent = element.title;

      const popularCategory =  document.createElement('p');
      popularCategory.className = "popular__category";

      const { data, status } = await app.get(`/movie/${element.id}`);
      popularCategory.innerText = data.genres[0].name;

      
      popularMovie.appendChild(popularImg);
      popularMovie.appendChild(popularName);
      popularMovie.appendChild(popularCategory);

      section.appendChild(popularMovie);

   });
};

export default loadMoviesStyleTwo;