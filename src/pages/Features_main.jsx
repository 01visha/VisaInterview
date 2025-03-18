import React from "react";

export default function Features_main() {
  return (
    <section className="pb-16 bg-white" id="features">
      <div className="container mx-auto px-4">
        {/* First Feature Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="/assets/img/images/feature1.jpg"
              className="w-full rounded-lg"
              alt="Features"
            />
          </div>
          <div className="space-y-4 md:space-y-6">
            <h3 className="font-custom text-2xl font-bold text-gray-800">
              Why Choose CrackVisa?
            </h3>
            <div className="space-y-2">
              <p className="font-custom text-gray-600">
                <span className="font-bold">Expertly Curated for Success:</span>
                <br className="block md:hidden" /> {/* <br> for mobile only */}
                CrackVisa is developed with insights from VISA interviews faced by
                Students, Technocrats, and Travellers. By combining their expertise
                with cutting-edge AI Technology, we offer a platform that delivers
                realistic and result-oriented interview preparation.
              </p>
              <p className="font-custom text-gray-600">
                <span className="font-bold">Tailored for Excellence:</span>
                <br className="block md:hidden" /> {/* <br> for mobile only */}
                Our AI-driven system provides personalized feedback, allowing you
                to identify and improve areas of weakness, ensuring you're fully
                prepared for your big day.
              </p>
              <p className="font-custom text-gray-600">
                <span className="font-bold">Accessible Anytime, Anywhere:</span>
                <br className="block md:hidden" /> {/* <br> for mobile only */}
                Prepare for your Visa interview on your own schedule, whether
                you're at home or on the go. CrackVisa gives you the flexibility
                to practice when and where you want.
              </p>
            </div>
          </div>
        </div>

        {/* Second Feature Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-12">
          <div className="space-y-4 md:space-y-6">
            <h3 className="font-custom text-2xl font-bold text-gray-800">
              What We Offer
            </h3>
            <div className="space-y-2">
              <p className="font-custom text-gray-600">
                <span className="font-bold">Go Beyond Scripts:</span>
                <br className="block md:hidden" /> {/* <br> for mobile only */}
                We replicate real-world visa interviews, moving beyond scripted
                Q&A to prepare you for the unpredictable nature of actual
                interviews. Develop critical thinking and spontaneous response
                skills.
              </p>
              <p className="font-custom text-gray-600">
                <span className="font-bold">Realistic Accents and Communication Styles:</span>
                <br className="block md:hidden" /> {/* <br> for mobile only */}
                Our native American interviewers simulate authentic accents and
                communication styles, giving you a true-to-life experience of
                interacting with consular officers.
              </p>
              <p className="font-custom text-gray-600">
                <span className="font-bold">Build Confidence:</span>
                <br className="block md:hidden" /> {/* <br> for mobile only */}
                Experience the formality, pressure, and dynamic flow of a visa
                interview. With repeated practice, you'll overcome anxiety and
                gain the confidence to ace your interview.
              </p>
              <p className="font-custom text-gray-600">
                <span className="font-bold">Tailored Mock Interviews:</span>
                <br className="block md:hidden" /> {/* <br> for mobile only */}
                Get personalized 1-on-1 mock interview sessions that align with
                your visa timelines and individual goals.
              </p>
              <p className="font-custom text-gray-600">
                <span className="font-bold">Comprehensive Preparation:</span>
                <br className="block md:hidden" /> {/* <br> for mobile only */}
                While many services help with logistics like flights and
                accommodations, CrackVisa Interview focuses on the crucial first
                step: clearing your visa interview with simplicity and ease.
              </p>
            </div>
          </div>
          <div>
            <img
              src="assets/img/images/feature2.jpg"
              className="w-full rounded-lg"
              alt="Features"
            />
          </div>
        </div>

        {/* Third Feature Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-12">
          <div>
            <img
              src="assets/img/images/feature3.jpg"
              className="w-full rounded-lg"
              alt="Features"
            />
          </div>
          <div className="space-y-4 md:space-y-6">
            <h3 className="font-custom text-2xl font-bold text-gray-800">
              What Makes CrackVisa Stand Out?
            </h3>
            <div className="space-y-2">
              <p className="font-custom text-gray-600">
                <span className="font-bold">Flexible:</span>
                <br className="block md:hidden" /> {/* <br> for mobile only */}
                Prepare anytime, anywhere, at your convenience.
              </p>
              <p className="font-custom text-gray-600">
                <span className="font-bold">Efficient:</span>
                <br className="block md:hidden" /> {/* <br> for mobile only */}
                AI-powered tools maximize productivity, reducing time spent waiting for feedback.
              </p>
              <p className="font-custom text-gray-600">
                <span className="font-bold">Insightful:</span>
                <br className="block md:hidden" /> {/* <br> for mobile only */}
                Receive detailed reports on performance with actionable tips for improvement.
              </p>
              <p className="font-custom text-gray-600">
                <span className="font-bold">Fast:</span>
                <br className="block md:hidden" /> {/* <br> for mobile only */}
                Instant feedback and reports eliminate delays in the preparation process.
              </p>
              <p className="font-custom text-gray-600">
                <span className="font-bold">Easy:</span>
                <br className="block md:hidden" /> {/* <br> for mobile only */}
                Designed with user-friendliness in mind, CrackVisa is intuitive and hassle-free to use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}