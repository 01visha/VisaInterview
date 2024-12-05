import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './pages/Home';
import Banner from "./pages/Banner";
import Testimonials from "./pages/Testimonials";
import Overview from "./pages/Overview";
import Features from "./pages/Features";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Otp from "./pages/Otp";
import Myprofile from "./pages/user/Myprofile";
import Pricing from "./pages/Pricing";

import './App.css';
import { UserProvider } from "./context/UserContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
      <>
      <GoogleOAuthProvider clientId='446534190853-o1fogsehrc0b9vtqb43ib7m93fvrdf87.apps.googleusercontent.com'>

      <Router>
      <Header />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Banner" element={<Banner />} />
            <Route path="/Testimonials" element={<Testimonials />} />
            <Route path="/Overview" element={<Overview />} />
            <Route path="/Features" element={<Features />} />
            <Route path="/Reviews" element={<Reviews />} />
            <Route path="/Contact" element={<Contact />} /> 
            <Route path="/Signup" element={<Signup />} />
            <Route path='/Myprofile' element={<Myprofile />} />
            <Route path='/Otp' element={<Otp />} />
            <Route path='/Pricing' element={<Pricing />} />
            <Route path="*" element={<Home />} /> 
         </Routes>      
      <Footer />
      </Router>
      </GoogleOAuthProvider>
     
      
     
      </>
   );
}

export default App;
