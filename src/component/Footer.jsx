import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import UnsubscribeModal from "./UnsubscribeModal";
import packageJson from "../../package.json";

function Footer() {
  const [showButton, setShowButton] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const subscribeToNewsletter = async (email) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/subscribe-newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      // Check if the response status is 200 (success)
      if (response.status === 200) {
        const data = await response.json();
        //console.log('API Response:', data); // Log for debugging
  
        // Return the message from the API to show in the success toast
        return data.message || "Subscription successful";  // Default message if not in response
      }
  
      // If status is not 200, handle as an error (e.g., 400 or other status)
      const errorData = await response.json();
      console.error('API Error:', errorData);  // Log the error
      throw new Error(errorData.message || "Something went wrong");
  
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      throw error;  // Rethrow to handle in the calling function
    }
  };
  
  
  
  
  
  const handleSubscribe = async (e) => {
    e.preventDefault(); // Prevent form submission
    setIsLoading(true);  // Set loading state to true
  
    // Regular expression to validate the email format (example for .com, .in, .org, .net)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|gov|edu)$/;
  
    // Check if the email is valid
    if (!emailRegex.test(email)) {
      toast.info("Please enter a valid email (e.g., example@domain.com)");
      setIsLoading(false); // Reset loading state
      return;
    }
  
    try {
      const message = await subscribeToNewsletter(email);
  
      // If the subscription was successful, show a success toast with the message
      toast.success(message); // `message` is returned from the API response
      setEmail(""); // Clear the email input after successful subscription
  
    } catch (error) {
      // If there is an error, show an error toast with the error message
      toast.info(`Subscription failed: ${error.message}`);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };
  
  
  
  
  
  

// const handleUnsubscribe = async (email) => {
//   try {
//     const message = await unsubscribeFromNewsletter(email);
//     toast.success(message); // Show the message directly from the API in the success toast
//     setShowUnsubscribeModal(false); // Optionally close the modal after unsubscribing
//   } catch (error) {
//     toast.error(error.message || "An error occurred. Please try again."); // Show the error message from the catch block
//   }
// };


const unsubscribeFromNewsletter = async (email) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/unsubscribe-newsletter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

 

    const data = await response.json();
    //console.log("API Response:", data); // Log response for debugging

    // Check for the message in the response
    if (data.message) {
      return data.message; // Return the message sent from the server
    } else {
      // If there's no message, throw a generic error
      throw new Error("Unknown error occurred");
    }
  } catch (error) {
   // console.error("Error unsubscribing from newsletter:", error);
    throw error; // Re-throw the error for the calling function to catch
  }
};

  
const handleUnsubscribe = async (email) => {
  // Regular expression to validate the email format (for .com, .in, .org, .net)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov)$/;

  // Validate the email format
  if (!emailRegex.test(email)) {
    toast.info("Please enter a valid email (e.g., example@domain.com)"); // Show error toast for invalid email
    return; // Exit the function if the email is invalid
  }

  try {
    // Call the unsubscribe function and get the message from the backend
    const message = await unsubscribeFromNewsletter(email);
    toast.success(message); // Show the success message returned from the API
    setShowUnsubscribeModal(false); // Close the modal after unsubscribing
  } catch (error) {
    // Show an error message if the unsubscribe fails
    toast.info(error.message || "An error occurred. Please try again.");
  }
};


  return (
    <footer className="bg-[#0a1628] text-white relative">
      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-gray-500 to-blue-950 pt-2">
        <div className="container mx-auto px-3 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="mb-4 lg:mb-0">
              <h2 className="text-3xl font-bold mb-2">Be the First to Know – Get Our Newsletter Today!</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span>Your Source for Fresh News </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Never Miss an Update</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Expert Interview Tips</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Subscribe Form */}
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-white/40 w-full"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-black/25 hover:bg-black/40 rounded-lg transition-colors duration-300 w-full sm:w-auto"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/">
              <img
                src="/assets/img/logo/visa_logo1_new.png"
                alt="CrackVisa Logo"
                className="h-12 mb-12"
              />
            </Link>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Go to</h3>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link></li>
              <li><Link to="/Myprofile" className="hover:text-blue-400">My Profile</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/Feature" className="hover:text-blue-400">Features</Link></li>
              <li><Link to="/faqs" className="hover:text-blue-400">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/aboutus" className="hover:text-blue-400">About Us</Link></li>
         
              <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
              <li>
                <button
                  onClick={() => setShowUnsubscribeModal(true)}
                  className="hover:text-blue-400 text-left"
                >
                  Unsubscribe
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Social</h3>
            <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400">Facebook</a></li>
            <li><a href="#" className="hover:text-blue-400">Instagram</a></li>
            <li><a href="#" className="hover:text-blue-400">LinkedIn</a></li>
            <li><a href="#" className="hover:text-blue-400">Youtube</a></li>   
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Policy</h3>
            <ul className="space-y-2">
              <li><Link to="/terms-and-conditions" className="hover:text-blue-400">Terms & Condition</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link to="/legal-disclaimer" className="hover:text-blue-400">Legal Disclaimer</Link></li>
              <li><Link to="/payment-policy" className="hover:text-blue-400">Payment Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">&copy; 2025 CrackVisa All Rights Reserved (Version : {packageJson.version})</span>
          </div>
        </div>
      </div>

      {/* Unsubscribe Button */}
      {/* <button
        onClick={() => setShowUnsubscribeModal(true)}
        className="absolute bottom-4 right-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-300 text-sm"
      >
        Unsubscribe
      </button> */}

      {/* Unsubscribe Modal */}
      {showUnsubscribeModal && (
        <UnsubscribeModal
          onClose={() => setShowUnsubscribeModal(false)}
          onUnsubscribe={handleUnsubscribe}
        />
      )}

      {/* Scroll to Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}

      <ToastContainer />
    </footer>
  );
}

export default Footer;

