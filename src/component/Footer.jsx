import React, { useState, useEffect } from "react";
//import "../css/main.css";

function Footer() {

  const [showButton, setShowButton] = useState(false);

  // Handle scroll event to toggle button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to the top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


    return (
        <>
<footer className="footer-section footer-3">
        <div className="footer-top-wrap">
          <div className="container">
            <div className="row footer-wrap">
              <div className="col-lg-3 col-md-6">
                <div className="footer-widget">
                   <img
          src="assets/img/logo/visa_logo_new.png"
          loading="lazy"
          width={220}
          alt="VisaInterview Logo"
        />
                                 
            {/* <ul className="footer-social">
                    <li><a href="#"><i className="fab fa-facebook-f" /></a></li>
                    <li><a href="#"><i className="fab fa-instagram" /></a></li>
                    <li><a href="#"><i className="fab fa-behance" /></a></li>
                    <li><a href="#"><i className="fab fa-youtube" /></a></li>
                  </ul> */}
                </div>
              </div>
               <div className="col-lg-2 col-md-6">
                <div className="footer-widget">
                  <h3 className="widget-header">Company Info</h3>
                  <ul className="footer-list">
                    <li><a href="/Aboutus">About Us</a></li>
                    <li><a href="#">Resource Center</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Instructor</a></li>
                   
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <div className="footer-widget">
                  <h3 className="widget-header">Useful Links</h3>
                  <ul className="footer-list">
                    <li><a href="/Faqs">FAQs</a></li>
                    <li><a href="#">Digital Marketing</a></li>
                    <li><a href="#">Design &amp; Branding</a></li>
                    {/* <li><a href="contact.html">Storytelling &amp; Voice Over</a></li> */}
                    {/* <li><a href="contact.html">News &amp; Blogs</a></li> */}
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <div className="footer-widget">
                  <h3 className="widget-header">Resourses</h3>
                  <ul className="footer-list">
                    <li><a href="#">Community</a></li>
                    <li><a href="#">Support</a></li>
                    <li><a href="#">Video Guides</a></li>
                    <li><a href="#">Documentation</a></li>
                    <li><a href="#">Security</a></li>
                  </ul>
                </div>
              </div> 
              <div className="col-lg-2 col-md-6">
                <div className="footer-widget">
                  <h3 className="widget-header">More Info</h3>
                  <ul className="footer-list">
                    <li> <a href="/terms-and-conditions" className="footer-legal_link underline-offset w-inline-block" >Terms and Conditions</a></li>
                    <li> <a href="/privacy-policy" className="footer-legal_link underline-offset w-inline-block" > Privacy Policy </a></li>
                  </ul>
                </div>
              </div>
              
              {/* <div className="col-lg-2 col-md-6">
                <div className="footer-widget">
                 <div className="sidebar-post">
                    <img src="assets/img/images/footer-post-2.png" alt="post" />
                    <div className="post-content">
                      <h3 className="title"><a href="#">Where Dreams Find a Home</a></h3>
                      <ul className="post-meta">
                        <li><i className="fa-light fa-calendar" />20 April, 2024</li>
                      </ul>
                    </div>
                  </div> 
                </div>
              </div> */}
            </div>
          </div>
        </div>
        
    
      </footer>
      {showButton && (
        <button className="scroll-up-btn" onClick={scrollToTop}>
          ↑
        </button>
      )} </>

    );

}

export default Footer