import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import '../styles/SimpleSlider.css'; 

const SliderWithAutoplay = () => {
  return (
    <div className="slider-container">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]} // Import necessary Swiper modules
        autoplay={{
          delay: 2000, // Slide delay in milliseconds
          disableOnInteraction: false, // Keeps autoplay active after user interaction
        }}
        navigation // Enable navigation arrows
        pagination={{ clickable: true }} // Enable pagination dots
        loop={true} // Infinite loop
        slidesPerView={1} // Number of slides visible
        spaceBetween={20} // Space between slides
      >
        <SwiperSlide>
          <img src="assets/img/slides/slide1.jpg" alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/img/slides/slide2.jpg" alt="Slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/img/slides/slide3.jpg" alt="Slide 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/img/slides/slide4.jpg" alt="Slide 4" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/img/slides/slide5.jpg" alt="Slide 5" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/img/slides/slide6.jpg" alt="Slide 6" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/img/slides/slide7.jpg" alt="Slide 7" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderWithAutoplay;


// const SimpleSlider = () => {
//   return (
//     <div className="swiper-slide">
//       <Swiper
//         spaceBetween={10} // Space between slides
//         slidesPerView={1} // Show one slide at a time
//       >
//         <SwiperSlide>
//           <img
//             src="assets/img/slides/slide1.jpg"
//             alt="Slide 1"
//             style={{ width: "100%", height: "auto" }}
//           />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img
//             src="assets/img/slides/slide2.jpg"
//             alt="Slide 2"
//             style={{ width: "100%", height: "auto" }}
//           />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img
//             src="assets/img/slides/slide3.jpg"
//             alt="Slide 3"
//             style={{ width: "100%", height: "auto" }}
//           />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img
//             src="assets/img/slides/slide4.jpg"
//             alt="Slide 3"
//             style={{ width: "100%", height: "auto" }}
//           />
//         </SwiperSlide>
//       </Swiper>
//     </div>
//   );
// };

// export default SimpleSlider;