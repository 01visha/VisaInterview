import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Faqs() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqData = [
    {
      question: "Can I record & watch my interview?",
      answer:
        "No, You cannot record or watch interview, you can only review performance and track your progress. This feature helps you identify areas of improvement in your communication, language, and responses, ensuring you're well-prepared for the actual visa interview.",
    },
    {
      question: "Is there any membership plan or charges?",
      answer:
        "Yes, we offer flexible membership plans designed to suit your needs. You can choose from pay-per-use options or subscription-based plans that provide unlimited access to mock interviews, AI feedback, and personalized coaching. Detailed pricing information can be found on our platform.",
    },
    {
      question:
        "How does the AI-generated app improve my speech, vocabulary, and interview answers?",
      answer: (
        <>
          Our AI-powered app evaluates your speech clarity, vocabulary usage,
          and overall interview responses during each mock session. It provides
          real-time feedback and suggestions to help you:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Enhance your pronunciation and fluency.</li>
            <li>Expand and refine your vocabulary for better articulation.</li>
            <li>
              Structure and improve your answers to common and situational
              interview questions. The iterative feedback loop ensures
              consistent improvement with every session.
            </li>
          </ul>
        </>
      ),
    },
    {
      question: "How long does the visa application process take?",
      answer:
        "The visa application process typically takes 2-4 weeks, but it can vary based on factors such as the country, type of visa, and application volume at the consulate. To ensure a smooth process, start preparing early and complete all required documentation in advance. Our platform provides guidance to help you streamline your preparation.",
    },
    {
      question: "How can I give my first mock interview?",
      answer: (
        <>
          Giving your first mock interview on our platform is easy:
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>
              <strong>Sign Up: </strong> Create an account or log in to the
              platform.
            </li>
            {/* <li>
              <strong>Select Interview Plan: </strong> Choose the interview plan
              that aligns with your preparation goals.
            </li> */}
            <li>
              <strong>Register Yourself: </strong>Fill in your details to
              complete the registration process.
            </li>
            <li>
              <strong>Follow On-Screen Instructions: </strong>Follow the
              instructions provided to begin your interview simulation.
            </li>
            <li>
              <strong>Select the Mock Interview Module: </strong>From your
              dashboard, select the mock interview module that fits your needs.
            </li>
            <li>
              <strong>Complete the Mock Interview: </strong>Participate in the
              interview simulation as directed.
            </li>
            <li>
              <strong>Receive Detailed Performance Report: </strong>After
              completing the mock interview, you'll receive a performance report
              with actionable insights to improve your skills.
            </li>
          </ol>
        </>
      ),
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="py-12 bg-gray-50" id="faq-section">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start">
          {/* Image on the left */}
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:sticky lg:top-8">
            <img
              src="assets/img/faqs.jpg"
              alt="FAQ Illustration"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* FAQs on the right */}
          <div className="lg:w-1/2 lg:pl-8">
            <h2 className="text-3xl font-bold mb-6 font-custom text-gray-800">
              Frequently Asked Questions
            </h2>
            {faqData.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  className="flex justify-between items-center w-full p-4 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-left font-custom font-semibold text-gray-800">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-blue-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="mt-2 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600 font-custom">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
