import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Header() {
  const [activeHash, setActiveHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
   }, []);

    return (
      <header className="header header-2 header-4 sticky-active">
      <div className="top-bar d-none">
        <div className="container">
          <div className="top-bar-inner">
            <div className="top-bar-left white-content">
              <p className="mb-0">Get your Interview!<span /></p>
              <div className="rr-product-countdown" data-countdown data-date="Jun 30 2026 20:20:22">
                <div className="rr-product-countdown-inner">
                  <ul>
                    <li><span data-days>0</span>d</li>
                    <li><span data-hours>0</span>h</li>
                    <li><span data-minutes>0</span>m</li>
                    <li><span data-seconds>0</span>s</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="top-bar-right">
              <div className="top-social-wrap">
                <ul className="social-list">
                  <li><a href="#"><i className="fab fa-facebook-f" /></a></li>
                  <li><a href="#"><i className="fab fa-instagram" /></a></li>
                  <li><a href="#"><i className="fab fa-behance" /></a></li>
                  <li><a href="#"><i className="fab fa-skype" /></a></li>
                  <li><a href="#"><i className="fab fa-youtube" /></a></li>
                </ul>
              </div>
              <div className="register-box">
                <div className="icon"><i className="fa-regular fa-user" /></div>
                <a href="#">Login / Register</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="primary-header">
        <div className="container">
          <div className="primary-header-inner">
            <div className="header-logo d-lg-block">
              <a href="index.html">
                <img src="assets/img/logo/interview_logo_copy.png" alt="Logo" />
              </a>
            </div>
            <div className="header-right-wrap">
              <div className="header-menu-wrap">
                <div className="mobile-menu-items">
                <ul className="sub-menu">
                  <li className={activeHash === '' ? 'active' : ''}>
                    <a href="/">Home</a>
                  </li>
                  <li className={activeHash === '#testimonials' ? 'active' : ''}>
                    <a href="/#testimonials">Testimonials</a>
                  </li>
                  <li className={activeHash === '#overview' ? 'active' : ''}>
                    <a href="/#overview">Overview</a>
                  </li>
                  <li className={activeHash === '#features' ? 'active' : ''}>
                    <a href="/#features">Features</a>
                  </li>
                  <li className={activeHash === '#reviews' ? 'active' : ''}>
                    <a href="/#reviews">Reviews</a>
                  </li>
                  <li className={activeHash === '/Contact' ? 'active' : ''}>
                    <Link to="/Contact">Contact</Link>
                  </li>
                </ul>
                </div>
              </div>
              {/* /.header-menu-wrap */}
              <div className="header-right">
               
              <Link to="/Signup">SignUp</Link>
                
                <a href="/Pricing" className="ed-primary-btn header-btn">Subscribe Now <i className="fa-sharp fa-regular fa-arrow-right" /></a>
                <div className="header-logo d-none d-lg-none">
                  <a href="index.html">
                    <img src="assets/img/logo/logo-1.png" alt="Logo" />
                  </a>
                </div>
                <div className="header-right-item d-lg-none d-md-block">
                  <a href="#" className="mobile-side-menu-toggle" onClick={(e) => e.preventDefault()}><i className="fa-sharp fa-solid fa-bars" /></a>
                </div>
              </div>
              {/* /.header-right */}
            </div>
          </div>
          {/* /.primary-header-inner */}
        </div>
      </div>
    </header>

    
    )

}

export default Header