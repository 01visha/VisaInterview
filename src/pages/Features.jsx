import React from "react";

export default function Features() {
  return (
    <section className="feature-section-4 pt-120" id="features">
      <div className="container">
        <div className="section-heading text-center">
          <h4 className="sub-heading wow fade-in-bottom" data-wow-delay="200ms">
            <span className="heading-icon">
              <i className="fa-sharp fa-solid fa-bolt" />
            </span>
            Our Features
          </h4>
          <h2 className="wow fade-in-bottom" data-wow-delay="400ms">
            Why Choose Visa Interview?
          </h2>
        </div>
        <div className="row gy-lg-0 gy-4 justify-content-center">
          <div className="col-lg-4 col-md-6">
            <div
              className="feature-card text-center wow fade-in-bottom"
              data-wow-delay="400ms"
            >
              <div className="icon">
                <img src="assets/img/icon/feature-icon-1_1.png" alt="icon" />
              </div>
              <div className="content">
                <h3 className="title">Expertly Curated for Success</h3>
                <p className="palign">
                  Visa Interview is developed with insights from former visa
                  consular officers. By combining their expertise with
                  cutting-edge AI Technology, we offer a platform that delivers
                  result-oriented interview preparation.
                </p>
                <a href="/Feature" className="ed-primary-btn">
                  Learn More{" "}
                  <i className="fa-sharp fa-regular fa-arrow-right" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div
              className="feature-card text-center wow fade-in-bottom"
              data-wow-delay="500ms"
            >
              <div className="icon">
                <img src="assets/img/icon/feature-icon-1-2.png" alt="icon" />
              </div>
              <div className="content">
                <h3 className="title">What We Offer</h3>
                <p className="palign">
                  We replicate real-world visa interviews, moving beyond
                  scripted Q&A to prepare you for the unpredictable nature of
                  actual interviews. Develop critical thinking and spontaneous
                  response skills.
                </p>
                <a href="/Feature" className="ed-primary-btn">
                  Learn More{" "}
                  <i className="fa-sharp fa-regular fa-arrow-right" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div
              className="feature-card text-center wow fade-in-bottom"
              data-wow-delay="600ms"
            >
              <div className="icon">
                <img src="assets/img/icon/feature-icon-1-3.png" alt="icon" />
              </div>
              <div className="content contentht">
                <h3 className="title">What Makes Visa Interview Stand Out?</h3>
                <ul className="palign">
                  <li>
                    Flexible: Prepare anytime, anywhere, at your convenience.
                  </li>
                  <li>
                    Efficient: AI-powered tools maximize productivity, reducing
                    time spent.
                  </li>
                  <li>Fast: Instant feedback.<br /><br /></li>
                </ul>
                <a href="/Feature" className="ed-primary-btn">
                  Learn More{" "}
                  <i className="fa-sharp fa-regular fa-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
