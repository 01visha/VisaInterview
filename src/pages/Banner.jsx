import React from "react";


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
                  <h4 className="sub-heading wow fade-in-bottom" data-wow-delay="200ms"><span className="heading-icon"><i className="fa-sharp fa-solid fa-bolt" /></span>Welcome to Online Interview</h4>
                  <h2 className="wow fade-in-bottom" data-wow-delay="400ms">World’s Best Online Interview Experience <br />Built by <span>Industry Leaders, <br />for Future Leaders</span></h2>
                </div>
                <h4 className="bottom-title">Tech-boosted practical-first approach</h4>
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
              <div className="hero_video-wrapper">
                {/* <div className="img-shape"><img src="assets/img/shapes/hero-img-shape-3.png" alt="shape" /></div>
                <div className="img-shape-2"><img src="assets/img/shapes/hero-img-shape-4.png" alt="shape" /></div> */}
                
                  {/* <img src="assets/img/images/hero-img-2.png" alt="hero" /> */}
                  <div className="video w-video newpadd">
                      <iframe className="embedly-embed" src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FvVxElmix4hQ&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DvVxElmix4hQ&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FvVxElmix4hQ%2Fhqdefault.jpg&type=text%2Fhtml&schema=youtube" width="100%" height="100%" scrolling="no" allowFullScreen="" title="Get The Interview Demo! 🖥️"></iframe>
                     
                  </div>
                <div> 
                      <h3 className="heading"><br/>
                        <a href="https://youtu.be/vVxElmix4hQ?si=aBQSJYVkhxznwKuC" target="_blank" className="link txtcolor">
                        📱 Click here for Mobile Version</a></h3></div>
               
              </div>
            </div>
          </div>
        </div>
      </section>

                );
            }