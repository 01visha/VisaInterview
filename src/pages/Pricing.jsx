import React from "react";


export default function Pricing() {
    return (
    


<div className="d-flex flex-column justify-content-center align-items-center pt-4 pb-5 bg-violet-300 font-nunitosansa">
  <div className="Toastify" />
  <div className="text-center px-4 px-md-10">
    <h5 className="responsive-heading">
    Make your interview more comfortable.
    </h5>
    <h6 className="responsive-subheading">
      Choose Your Subscription Plan
    </h6>
  </div>
  <div className="row row-cols-1 row-cols-md-3 g-4 max-w-4xl">
  <div className="col">
      <div className="card-container">
        <h2 className="h4 fw-bold">Weekly Plan</h2>
        <div className="mb-4">
          <div className="d-flex justify-content-center align-items-baseline gap-2">
            <span className="fs-1 fw-bold text-black">₹ 50</span>
            <span className="fs-5 line-through-red text-black">₹ 100</span>
          </div>
          <div className="">
            <span className="fs-5 fw-bold textcol">50% OFF</span>
          </div>
        </div>
        <hr className="border border-gray-400 my-4" />
        <ul className="mb-4 list-unstyled text-start px-4">
          
          <li className="d-flex align-items-center">
            <i className="bi bi-check-circle custom-check-icon me-2"></i>
            Priority Notification for Interviews
          </li>         
          {/* <li className="d-flex align-items-center">
            <i className="bi bi-check-circle custom-check-icon me-2"></i>
            Ad-Free Experience
          </li>           */}
        </ul>
        <button className="butn butn1top">SUBSCRIBE NOW</button>
      </div>
    </div>
    <div className="col">
      <div className="card-container">
        <h2 className="h4 fw-bold">Monthly Plan</h2>
        <div className="mb-4">
          <div className="d-flex justify-content-center align-items-baseline gap-2">
            <span className="fs-1 fw-bold text-black">₹ 250</span>
            <span className="fs-5 line-through-red text-black">₹ 500</span>
          </div>
          <div className="">
            <span className="fs-5 fw-bold textcol">50% OFF</span>
          </div>
        </div>
        <hr className="border border-gray-400 my-4" />
        <ul className="mb-4 list-unstyled text-start px-4">
          <li className="d-flex align-items-center">
            <i className="bi bi-check-circle custom-check-icon me-2"></i>
            Access To All Interviews Answers
          </li>
          <li className="d-flex align-items-center">
            <i className="bi bi-check-circle custom-check-icon me-2"></i>
            Priority Notification for Interviews
          </li>         
          {/* <li className="d-flex align-items-center">
            <i className="bi bi-check-circle custom-check-icon me-2"></i>
            Ad-Free Experience
          </li>           */}
        </ul>
        <button className="butn butn2top">SUBSCRIBE NOW</button>
      </div>
    </div>
    <div className="col">
      <div className="card-container1">
        <h2 className="h4 fw-bold">Yearly Plan</h2>
        <div className="mb-4">
          <div className="d-flex justify-content-center align-items-baseline gap-2">
            <span className="fs-1 fw-bold text-black">₹ 1999</span>
            <span className="fs-5 line-through-red text-black">₹ 3000</span>
          </div>
          <div className="">
            <span className="fs-5 fw-semibold textcol"> 66.64% OFF</span>
          </div>
        </div>
        <hr className="border border-gray-400 my-4" />
        <ul className="mb-4 list-unstyled text-start px-4">
          <li className="d-flex align-items-center">
            <i className="bi bi-check-circle custom-check-icon me-2"></i>
            Access To All Interviews Questions & Answers
          </li>
          <li className="d-flex align-items-center">
            <i className="bi bi-check-circle custom-check-icon me-2"></i>
            Priority Notification for Interviews
          </li>         
          <li className="d-flex align-items-center">
            <i className="bi bi-check-circle custom-check-icon me-2"></i>
            Ad-Free Experience
          </li>      
          <li className="d-flex align-items-center">
            <i className="bi bi-check-circle custom-check-icon me-2"></i>
            Unlock Personalized Interview Insights
          </li>    
        </ul>
        <button className="butn">SUBSCRIBE NOW</button>
      </div>
    </div>
  </div>
</div>
    );
  }