import React from "react";
import {
  Users,
  Target,
  Award,
  BookOpen,
  CheckCircle,
  Globe,
  Clock,
  UserCheck,
} from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-14">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              At CrackVisa, we specialize in revolutionizing visa interview
              preparation through cutting-edge AI technology. Our platform is
              designed to simulate multiple rounds of visa interviews, offering
              candidates a real-life experience that helps them excel in the
              actual interview.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Our Vision
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Leveraging advanced AI-driven tools, we analyse each interview
              session in detail, providing a comprehensive scorecard that
              highlights strengths and areas for improvement. This personalized
              feedback covers various aspects like communication skills, speech
              clarity, and enabling candidates to refine their approach and
              confidently face real visa interviews.
            </p>
          </div>
        </div>
      </div>
      {/* Mission Section */}
      <div className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are dedicated to empowering probationers and professionals with
              the skills and confidence required to navigate the visa interview
              process effortlessly.
            </p>
          </div>
        </div>
      </div>

      <div className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Our Profession
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To redefine visa interview preparation through innovative AI
              solutions, ensuring every candidate has the tools and knowledge to
              succeed. We aim to create a platform that not only enhances
              interview performance but also builds confidence and eliminates
              anxiety for aspiring probationers and professionals
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">10,000+</h3>
              <p className="text-gray-600">Successful Applicants</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">50+</h3>
              <p className="text-gray-600">Countries Served</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">95%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Why Choose CrackVisa?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6">
              <BookOpen className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Comprehensive Resources
              </h3>
              <p className="text-gray-600">
                Access a vast library of interview questions, sample answers,
                and preparation materials.
              </p>
            </div>
            <div className="p-6">
              <Target className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                AI-Powered Practice
              </h3>
              <p className="text-gray-600">
                Experience realistic interview scenarios with our advanced AI
                interview simulator.
              </p>
            </div>
            <div className="p-6">
              <Clock className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                24/7 Availability
              </h3>
              <p className="text-gray-600">
                Practice anytime, anywhere with our always-available platform.
              </p>
            </div>
            <div className="p-6">
              <UserCheck className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Expert Guidance
              </h3>
              <p className="text-gray-600">
                Receive personalized feedback and tips from visa interview
                experts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Approach
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Prepare
                </h3>
                <p className="text-gray-600">
                  Access comprehensive study materials and practice resources
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Practice
                </h3>
                <p className="text-gray-600">
                  Engage in AI-powered mock interviews and receive instant
                  feedback
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Succeed
                </h3>
                <p className="text-gray-600">
                  Face your visa interview with confidence and clarity
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Ready to Ace Your Visa Interview?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of successful applicants who trusted CrackVisa for
            their interview preparation.
          </p>
          {/* <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
            Get Started Today
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
