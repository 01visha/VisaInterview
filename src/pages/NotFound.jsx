import React from 'react';
import { Link } from 'react-router-dom';
import './css/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      {/* Clouds and Sun */}
      <div className="sky-container">
        <div className="sky-content">
          {/* Sun */}
          <div className="sun animate-float" />
          {/* Clouds */}
          <div className="clouds">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="cloud-svg">
              <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <h1 className="error-code animate-fade-in">404</h1>
        <p className="error-message animate-fade-in-delay">
          Whoops! It looks like you are lost!
        </p>

        {/* Person on Boat Illustration */}
        <div className="boat-container animate-float">
          <div className="boat-illustration">
            {/* Boat */}
            <div className="boat" />
            {/* Person */}
            <div className="person">
              <div className="person-body" />
              <div className="person-head" />
            </div>
          </div>
        </div>

        {/* Go Back Button */}
        <div className="button-container animate-fade-in-delay-2">
          <Link 
            to="/"
            className="go-back-button"
          >
            Go back
          </Link>
        </div>
      </div>

      {/* Wave Effect at Bottom */}
      <div className="wave-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path 
            fill="#1d4ed8" 
            fillOpacity="0.3" 
            d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,176C672,160,768,160,864,176C960,192,1056,224,1152,224C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default NotFound;

