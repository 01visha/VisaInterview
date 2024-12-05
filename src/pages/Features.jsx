import React from "react";


export default function Features() {
    return (
    <section className="feature-section-4 pt-120" id="features">
        <div className="container">
          <div className="section-heading text-center">
            <h4 className="sub-heading wow fade-in-bottom" data-wow-delay="200ms"><span className="heading-icon"><i className="fa-sharp fa-solid fa-bolt" /></span>Our Features</h4>
            <h2 className="wow fade-in-bottom" data-wow-delay="400ms">Digital Art And Design Crafting <br />Art With Technology</h2>
          </div>
          <div className="row gy-lg-0 gy-4 justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="feature-card text-center wow fade-in-bottom" data-wow-delay="400ms">
                <div className="icon"><img src="assets/img/icon/feature-icon-1.png" alt="icon" /></div>
                <div className="content">
                  <h3 className="title">Accessibility &amp; Flexibility</h3>
                  <p>Online Interview should be accessible to learners from diverse backgrounds, offering the flexibility to study anytime.</p>
                  <a href="#" className="ed-primary-btn">Learn More <i className="fa-sharp fa-regular fa-arrow-right" /></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="feature-card text-center wow fade-in-bottom" data-wow-delay="500ms">
                <div className="icon"><img src="assets/img/icon/feature-icon-2.png" alt="icon" /></div>
                <div className="content">
                  <h3 className="title">Personalized Learning </h3>
                  <p>Online Interview should be accessible to learners from diverse backgrounds, offering the flexibility to study anytime.</p>
                  <a href="#" className="ed-primary-btn">Learn More <i className="fa-sharp fa-regular fa-arrow-right" /></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="feature-card text-center wow fade-in-bottom" data-wow-delay="600ms">
                <div className="icon"><img src="assets/img/icon/feature-icon-3.png" alt="icon" /></div>
                <div className="content">
                  <h3 className="title">High-Quality Instruction</h3>
                  <p>Online Interview should be accessible to learners from diverse backgrounds, offering the flexibility to study anytime.</p>
                  <a href="#" className="ed-primary-btn">Learn More <i className="fa-sharp fa-regular fa-arrow-right" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}