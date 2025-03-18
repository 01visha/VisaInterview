import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
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
import Dashboard from "./pages/user/Dashboard";
import Primaryscores from "./pages/user/Primaryscores";
import Retestscores from "./pages/user/Retestscores";
import Question from "./pages/user/Question";
import Myinterview from "./pages/user/Myinterview";
import Scores from "./pages/user/Scores";
import Scorecard from "./pages/user/Scorecard";
import Tips from "./pages/user/Tips";
import Pricing from "./pages/Pricing";
import Feature from "./pages/Features_main";
import Aboutus from "./pages/Aboutus";
import Faqs from "./pages/Faqs";
import Signin from "./pages/Signin";
import NotFound from "./pages/NotFound";
import AlertMessage from './component/AlertMessage';
import LegalDisclaimer from './pages/LegalDisclaimer';
import Subscribe from './pages/Subscribe';
import Questionset from './pages/user/Questionset';
import Instructions from './pages/user/Instructions';
import QuestionAccordion from './pages/user/QuestionAccordion';
import EmailSignup from './pages/EmailSignup';
import GoogleSignup from './pages/GoogleSignup';
import SubscriptionHistory from './pages/user/SubscriptionHistory';
import ScorecardView from './pages/user/ScorecardView';
import ScoreResultView from './pages/user/ScoreResultView';
import ProfileSetup from "./pages/user/ProfileSetup";

import "./index.css";
import './App.css';

import ProtectedRoute from './component/ProtectedRoute';
import { UserProvider } from "./context/UserContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import TermsAndConditions from './pages/TermsandConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ScrollToTop from "./component/ScrollToTop"
import ResetPassword from './pages/Reset_password';
import ForgotPassword from './pages/forgot-password';               
import EmailSent from './pages/sub-pages/emailsent';
// import PricingPolicy from './pages/PrivacyPolicy';
import PaymentPolicy from './pages/PaymentPolicy';

function App() {
  return (
    <GoogleOAuthProvider clientId="186576846851-nh58o90galbmo9fc0ur0fc2joss88g8t.apps.googleusercontent.com">
      <Router>
        <UserProvider>
        <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Banner" element={<Banner />} />
              <Route path="/Testimonials" element={<Testimonials />} />
              <Route path="/Overview" element={<Overview />} />
              <Route path="/Features" element={<Features />} />
              <Route path="/Reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/Signup" element={<Signup />} /> 
              <Route path="/Otp" element={<Otp />} />             
              <Route path="/Feature" element={<Feature />} />
              <Route path="/aboutus" element={<Aboutus />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/AlertMessage" element={<AlertMessage />} />
              <Route path="/forgot-password" element={< ForgotPassword/>} />
              <Route path="/reset-password" element={< ResetPassword/>} />
              <Route path="/login" element={<Signin />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />   
              <Route path="/payment-policy" element={<PaymentPolicy />} />
              <Route path="/legal-disclaimer" element={<LegalDisclaimer />} />
              <Route path="/email-sent" element={<EmailSent />} />
              {/* <Route path="/subscribe" element={<Subscribe />} /> */}
              <Route path="/questionAcc" element={<QuestionAccordion />} />
              <Route path="/subscribe" element={<Pricing />} />
              <Route path="/instructions/:id/:num" element={<Instructions />} />
              <Route path="/EmailSignup" element={<EmailSignup />} /> 
              <Route path="/GoogleSignup" element={<GoogleSignup />} /> 
              {/* <Route path="/profile-update" element={<ProfileSetup />} /> */}

              {/* <Route path="/instructions/:interview_id" element={<Instructions />} /> */}

              {/* Protected Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route  path="/myprofile" element={<ProtectedRoute><Myprofile /></ProtectedRoute>} />
              <Route path="/Question" element={<ProtectedRoute><Question /></ProtectedRoute>} />
              <Route path="/Myinterview" element={<ProtectedRoute><Myinterview /></ProtectedRoute>} />
              <Route path="/Tips" element={<ProtectedRoute><Tips /></ProtectedRoute>} />
              <Route path="/Scores" element={<ProtectedRoute><Scores /></ProtectedRoute>} />
              <Route path="/Scorecard" element={<ProtectedRoute><Scorecard /></ProtectedRoute>} />
              <Route path="/Primaryscores" element={<ProtectedRoute><Primaryscores /></ProtectedRoute>} />
              <Route path="/Retestscores" element={<ProtectedRoute><Retestscores /></ProtectedRoute>} />                          
              <Route path="/questionset" element={<ProtectedRoute><Questionset /></ProtectedRoute>} />
              <Route  path="/subscription-history" element={<ProtectedRoute><SubscriptionHistory /></ProtectedRoute>} />
              <Route path="/scorecard/:id" element={<ProtectedRoute><ScorecardView /></ProtectedRoute>} />
              <Route path="/scoreresult/:id/:num/:num2" element={<ProtectedRoute><ScoreResultView /></ProtectedRoute>} />
              <Route path="/profile-update" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} />
              {/* Protected Routes */}
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>       
      </UserProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
