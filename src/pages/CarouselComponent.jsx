import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CarouselComponent = () => {
    const settings = {
        dots: true, // Enables navigation dots
        infinite: true, // Enables infinite scrolling
        speed: 500, // Transition speed in milliseconds
        slidesToShow: 1, // Number of slides to show at a time
        slidesToScroll: 1, // Number of slides to scroll on navigation
        autoplay: true, // Enables autoplay
        autoplaySpeed: 2000, // Autoplay interval in milliseconds
      };

  return (
    <div className="slider">
      <Slider {...settings}>
        <div>
        <img
            src="assets/img/slides/slide1.jpg"
            alt="Slide 1"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div>
        <img
            src="assets/img/slides/slide2.jpg"
            alt="Slide 2"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div>
        <img
            src="assets/img/slides/slide3.jpg"
            alt="Slide 3"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </Slider>
    </div>
  );
};

export default CarouselComponent;
