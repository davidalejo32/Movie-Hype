import Swiper, {EffectCoverflow} from "swiper";
// swiper css
import 'swiper/css';

export function swiperEjec() {

  const swiper = new Swiper('.swiper', {
    modules:[EffectCoverflow],
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
     effect: 'coverflow',
     grabCursor:true,
     centeredSlides: true,
     slidesPerView: 'auto',
  
     coverflowEffect: {
        rotate: 0,
        // stretch: 0,
        depth: 60,
        modifier: 5,
        slideShadows: false, 
     },
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
  //   // Navigation arrows
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  
  });
}