import React from "react";

export default function Features() {
  return (
    <section
      className="pt-12 pb-10 bg-gray-50  scroll-mt-20"
      id="features"
      data-section="features"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h4 className="text-lg font-semibold text-gray-700 flex justify-center items-center mb-3">
            <span className="mr-2 text-yellow-500">
              <i className="fas fa-bolt"></i>
            </span>
            Our Features
          </h4>
          <h2 className="text-3xl font-bold text-gray-800">
            Why Choose CrackVisa?
          </h2>
        </div>

        {/* Card Container - Uses grid for better spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center  shadow-slate-800  hover:shadow-sky-400">
            <div className=" flex justify-center">
              <img
                src="assets/img/icon/feature-icon-1_1.png"
                alt="Expertly Curated for Success"
                className="w-16 h-16"
              />
            </div>

            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-800 mb-3  mt-3">
                Expertly Curated for Success
              </h3>
              <p className="text-gray-600 mb-4 text-left">
                CrackVisa is developed with insights from VISA interviews faced
                by Students,Technocrats and Travellers . By combining their
                expertise with cutting-edge AI Technology, we offer a platform
                that delivers realistic and result-oriented interview
                preparation.
              </p>
              <a
                href="/Feature"
                target="_blank"
                className="text-blue-600 font-medium flex justify-center items-center hover:underline"
              >
                Learn More
                <i className="ml-2 fas fa-arrow-right"></i>
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center  shadow-slate-800  hover:shadow-sky-400">
            {/* ✅ Fix: Ensure icon is centered */}
            <div className=" flex justify-center">
              <img
                src="assets/img/icon/feature-icon-1-2.png"
                alt="What We Offer"
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-3 text-center ml-6  mt-3">
              What We Offer
            </h3>
            <p className="text-gray-600 mb-4 text-left">
              We go beyond scripted Q&A to simulate real-world visa interviews,
              helping you prepare for unpredictable scenarios. Strengthen your
              critical thinking and spontaneous response skills with our
              training.
            </p>
            <a
              href="/Feature"
              target="_blank"
              className="text-blue-600 font-medium flex justify-center items-center hover:underline"
            >
              Learn More
              <i className="ml-2 fas fa-arrow-right"></i>
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center  shadow-slate-800  hover:shadow-sky-400">
            {/* ✅ Fix: Ensure icon is centered */}
            <div className="flex justify-center">
              <img
                src="assets/img/icon/feature-icon-1-3.png"
                alt="What Makes CrackVisa Stand Out?"
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-3 text-center ml-6 mt-3">
              What Makes CrackVisa Stand Out?
            </h3>
            <ul className="text-gray-600 list-disc list-inside mb-4 text-left">
              <li>
                Flexible: Practice anytime, anywhere, at your convenience.
              </li>
              <li>
                Efficient: AI-powered tools maximize productivity, reducing time
                spent.
              </li>
              <li>Speed: Get instant feedback on your performance.</li>
            </ul>
            <a
              href="/Feature"
              target="_blank"
              className="text-blue-600 font-medium flex justify-center items-center hover:underline"
            >
              Learn More
              <i className="ml-2 fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
