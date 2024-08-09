import { Autoplay, Navigation } from 'swiper/modules';

export const swiperConfig = {
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
  },
  loop: true,
  navigation: true,
  modules: [Autoplay, Navigation],
  breakpoints: {
    768: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  },
};
