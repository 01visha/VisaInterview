import React, { useEffect, useRef } from "react";
import "./css/reviews.css";

// Reviews Data
const reviews = [
  { name: "Aman", program: "F1 Visa Interview Preparation", review: "CrackVisa's mock interviews were incredibly realistic!", image: "" },
  { name: "Dhawal", program: "B1/B2 Visa Success Program", review: "The B1/B2 visa preparation program was comprehensive and well-structured.", image: "" },
  { name: "Ishan", program: "US Visa Interview Package", review: "CrackVisa's interview strategies and document checklist made the whole process stress-free.", image: "" },
  { name: "Kartik", program: "F1 Student Visa Program", review: "The mock interviews helped me identify my weak points and improve my responses.", image: "" },
  { name: "Ayan", program: "B2 Tourist Visa Preparation", review: "After a previous visa rejection, I was nervous about reapplying. CrackVisa's team helped me understand my mistakes and prepare better.", image: "" }, // No image case
];

// Review Card Component
const ReviewCard = ({ name, program, review, image }) => {
  const initials = name.charAt(0); // First letter of name

  return (
    <div className="review-card">
      <div className="review-header">
        {/* Show Image if Available, Otherwise Show Initials */}
        {image ? (
          <img src={image} alt={name} className="review-image" />
        ) : (
          <div className="review-initials">{initials}</div>
        )}
        <div className="review-info">
          <h3 className="review-name">{name}</h3>
          <p className="review-program">{program}</p>
        </div>
      </div>
      <p className="review-text">{review}</p>
    </div>
  );
};

// Reviews Section Component
const Reviews = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollContent = scrollContainer.querySelector(".reviews-scroll-content");
    if (!scrollContent) return;

    const scroll = () => {
      scrollContainer.scrollLeft += 1;
      if (scrollContainer.scrollLeft >= scrollContent.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
    };

    const timer = setInterval(scroll, 50);
    
    scrollContainer.addEventListener("mouseenter", () => clearInterval(timer));
    scrollContainer.addEventListener("mouseleave", () => setInterval(scroll, 50));

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="reviews-section pt-16 scroll-mt-12">
      <div className="reviews-container">
        <h2 className="text-lg font-semibold text-gray-700 flex justify-center items-center mb-2 mt-10">
          <span className="mr-2 text-yellow-500"><i className="fas fa-bolt"></i></span> Reviews
        </h2>
        <p className="reviews-subtitle font-custom text-bold">Applicants who trusted CrackVisa</p>

        <div className="reviews-scroll" ref={scrollRef}>
          <div className="reviews-scroll-content">
            {[...reviews, ...reviews].map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
