import React from "react";
import SimpleSlider from './SimpleSlider';
import CarouselComponent from "./CarouselComponent";

export default function Features() {
    return (

<section className="hero-section hero-4 overflow-hidden" id="home">
         <div className="shapes">
          {/* <div className="shape shape-1"><img src="assets/img/shapes/hero-shape-16.png" alt="shape" /></div>  */}
          {/* <div className="shape shape-2"><img src="assets/img/shapes/hero-shape-17-1.png" alt="shape" /></div> */}
           {/* <div className="shape shape-3"><img src="assets/img/shapes/hero-shape-18-1.png" alt="shape" /></div>  */}
          {/* <div className="shape shape-4"><img src="assets/img/shapes/hero-shape-19-1.png" alt="shape" /></div>  */}
        </div> 
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="hero-content hero-content-3 hero-content-4">
                <div className="section-heading mb-0">
                  <h4 className="sub-heading wow fade-in-bottom" data-wow-delay="200ms"><span className="heading-icon"><i className="fa-sharp fa-solid fa-bolt" /></span>Welcome to Online Visa Interview</h4>
                  <h2 className="wow fade-in-bottom" data-wow-delay="400ms">Let AI train your VISA Interview</h2>
                </div>
                <h4 className="bottom-title">Ace Visa interviews with our AI-powered Mock Visa interview Assessment Platform</h4>
                <div className="hero-btn-wrap">
                  <a href="contact.html" className="ed-primary-btn active">Try For Free <span><i className="fa-solid fa-plus" /></span></a>
                  {/* <a href="contact.html" className="ed-primary-btn">Download  Brochure <span><i className="fa-solid fa-plus" /></span></a> */}
                </div>
                <div className="hero-author">
                  <ul>
                    <li><img src="assets/img/images/hero-author-1.png" alt="img" /></li>
                    <li><img src="assets/img/images/hero-author-2.png" alt="img" /></li>
                    <li><img src="assets/img/images/hero-author-3.png" alt="img" /></li>
                    <li><img src="assets/img/images/hero-author-4.png" alt="img" /></li>
                  </ul>
                  <h5><span className="txtcolor">Used by 1000s of people!</span></h5>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              
                <SimpleSlider />
              
            </div>
          </div>
        </div>
      </section>

                );
            }