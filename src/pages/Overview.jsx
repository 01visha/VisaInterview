import React from "react";

export default function Overview() {
  return (
    <section
      id="overview"
      data-section="overview"
      className=" py-12 bg-gray-50 scroll-mt-24"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h4 className="text-lg font-semibold text-gray-700 flex justify-center items-center">
            <span className="mr-2 text-yellow-500">
              <i className="fas fa-bolt"></i>
            </span>
            Overview
          </h4>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {/* Card 1 */}
          <div className="max-w-lg w-full md:w-80 lg:w-2/3 bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg shadow-slate-800  hover:shadow-fuchsia-700">
            <img
              src="/assets/img/service/ai_img.png"
              alt="AI Answers"
              className="w-20 h-20 mx-auto mb-4"
              loading="lazy"
            />
            <div className="text-center">
              <h5 className="text-xl font-medium text-gray-800 mb-2">
                AI&nbsp;Answers
              </h5>
              <p className="text-gray-600 font-semibold mb-2">
                Let AI Guide Your US Visa Interview Journey
              </p>
              <p className="text-gray-500 text-sm text-left">
                The ultimate AI-powered mock visa interview assessment platform.
                Designed to simplify and optimize the visa interview process,
                Crack Visa integrates advanced artificial intelligence with a
                comprehensive knowledge repository, expert consultations, and
                personalized interview simulations.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="max-w-lg w-full md:w-80 lg:w-2/3 bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg  shadow-slate-800 hover:shadow-fuchsia-700">
            <img
              src="/assets/img/service/mike_img_1.png"
              alt="Speech Recognition"
              className="w-20 h-20 mx-auto mb-4"
              loading="lazy"
            />
            <div className="text-center">
              <h5 className="text-xl font-medium text-gray-800 mb-2">
                Speech Recognition
              </h5>
              <p className="text-gray-600 font-semibold mb-2">
                Blazing Fast Transcription
              </p>
              <p className="text-gray-500 text-sm text-left">
                By integrating speech recognition technology, the Crack Visa
                project becomes more streamlined, accessible, and effective. It
                provides an innovative approach to modernizing traditional
                interview processes, enhancing both user experience and
                operational efficiency. Trained models for accent recognition
                and error correction in speech transcription.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
