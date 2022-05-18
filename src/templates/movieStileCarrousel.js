const linkImg = "https://image.tmdb.org/t/p/w500";

const movieStileCarrousel = (data, container) => {
   
   data.results.forEach(element => {
      
      // creando los elementos para agregar toda la informacion
      const swiperSlide = document.createElement("div");
      swiperSlide.className = "swiper-slide";

      const recommendationsContainer = document.createElement("div");
      recommendationsContainer.className = "recommendations__container";

      // evento al contenedor, pone el hash y el id
      recommendationsContainer.addEventListener("click", () => {
         location.hash = `#movie=${element.id}`;
      });

      const recommendationsImg = document.createElement("img");
      recommendationsImg.className = "recommendations__img";
      recommendationsImg.setAttribute("src", `${linkImg}${element.poster_path}`);
      recommendationsImg.setAttribute("alt", `${element.title}`);

      const recommendationsTitle = document.createElement("h4");
      recommendationsTitle.className = "recommendations__title";
      recommendationsTitle.textContent = `${element.title}`;

      const recommendationsDesc = document.createElement("p");
      recommendationsDesc.className = "recommendations__description";
      recommendationsDesc.textContent = `${element.release_date}`;

      recommendationsContainer.appendChild(recommendationsImg);
      recommendationsContainer.appendChild(recommendationsTitle);
      recommendationsContainer.appendChild(recommendationsDesc);

      swiperSlide.appendChild(recommendationsContainer);
      container.appendChild(swiperSlide);
      
   });
}

export default movieStileCarrousel;