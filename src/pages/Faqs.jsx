import React from "react";

export default function Faqs() {
  return (
    <section className="py-5 bg-light" id="faq-section">
      <div className="container">
        {/* Image */}
        <div className="text-center mb-4">
          <img
            src="assets/img/faqs.jpg"
            alt="FAQ Illustration"
            className="img-fluid"
            style={{ maxWidth: "500px" }}
          />
        </div>

        {/* Accordion */}
        <div className="accordion" id="faqAccordion">
          {/* FAQ 1 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Can I record & watch my interview?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Yes, our platform allows you to record your mock interviews. You
                can review your performance and track your progress. This
                feature helps you identify areas of improvement in your
                communication, body language, and responses, ensuring you're
                well-prepared for the actual visa interview.
              </div>
            </div>
          </div>

          {/* FAQ 2 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Is there any membership plan or charges?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Yes, we offer flexible membership plans designed to suit your
                needs. You can choose from pay-per-use options or
                subscription-based plans that provide unlimited access to mock
                interviews, AI feedback, and personalized coaching. Detailed
                pricing information can be found on our platform.
              </div>
            </div>
          </div>

          {/* FAQ 3 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                How does the AI-generated app improve my speech, vocabulary, and
                interview answers?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Our AI-powered app evaluates your speech clarity, vocabulary
                usage, and overall interview responses during each mock session.
                It provides real-time feedback and suggestions to help you:
                <ul>
                  <li>Enhance your pronunciation and fluency.</li>
                  <li>
                    Expand and refine your vocabulary for better articulation.
                  </li>
                  <li>
                    Structure and improve your answers to common and situational
                    interview questions. The iterative feedback loop ensures
                    consistent improvement with every session.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ 4 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                How long does the visa application process take?
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                The visa application process typically takes 2-4 weeks, but it
                can vary based on factors such as the country, type of visa, and
                application volume at the consulate. To ensure a smooth process,
                start preparing early and complete all required documentation in
                advance. Our platform provides guidance to help you streamline
                your preparation.
              </div>
            </div>
          </div>
          {/* FAQ 5 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                How can I give my first mock interview?
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="headingFive"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Giving your first mock interview on our platform is easy:
                <ol>
                  <li>Sign up and create your profile.</li>
                  <li>Select the mock interview module from the dashboard.</li>
                  <li>Schedule your session based on your convenience.</li>
                  <li>Follow the on-screen instructions to begin your interview simulation.</li>
                </ol>
                After completion, you'll receive a detailed performance report with actionable insights to help you improve.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
