'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, User, Phone, MessageSquare } from 'lucide-react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Initialize toastify
// toast.configure()

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    phone: '',
    message: ''
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    let formIsValid = true;
    const newErrors = {};
    const toastOptions = { autoClose: 5000 }; // Toast disappears after 3 seconds

    if (!formData.firstName.trim()) { 
        toast.error("First name is required.", toastOptions);
        formIsValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
        toast.error("First Name must contain only alphabets.", toastOptions);
        formIsValid = false;     
    }

    if (!formData.lastName.trim()) {
        toast.error("Last name is required.", toastOptions);
        formIsValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName)) {
      toast.error("Last Name must contain only alphabets.", toastOptions);
      formIsValid = false;     
  }

    if (!formData.email.trim() || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
        toast.error("Valid email is required.", toastOptions);
        formIsValid = false;
    }

    if (!formData.subject.trim()) {
        toast.error("Subject is required.", toastOptions);
        formIsValid = false;
    }

    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
        toast.error("Valid 10-digit phone number is required.", toastOptions);
        formIsValid = false;
    }

    if (!formData.message.trim()) {
        toast.error("Message is required.", toastOptions);
        formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
};

const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission

  if (!validate()) {
      return;
  }

  setIsLoading(true);

  try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/contact-us`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              firstname: formData.firstName,
              lastname: formData.lastName,
              email: formData.email,
              subject: formData.subject,
              phonenumber: formData.phone,
              message: formData.message,
          }),
      });

      const result = await response.json();

      if (response.ok) {
          toast.success('Message sent successfully!', { autoClose: 3000 });
          setFormData({
              firstName: '',
              lastName: '',
              email: '',
              subject: '',
              phone: '',
              message: '',
          });
      } else {
          toast.error(result.message || 'Failed to send the message.', { autoClose: 3000 });
      }
  } catch (error) {
      toast.error('An error occurred while sending the message.', { autoClose: 3000 });
  } finally {
      setIsLoading(false);
  }
};

  

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    setErrors((prev) => ({
      ...prev,
      [name]: ''
    }))
  }

  const inputStyles = (fieldName) =>
    `w-full px-4 py-3 bg-blue-500/50 border rounded-lg text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white ${
      errors[fieldName] ? 'border-red-500' : 'border-blue-400/50'
    }`

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 bg-blue-600 p-8 lg:p-16 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white">Get in touch</h1>
          <p className="text-blue-100 max-w-md">
            Have questions about our services? Fill out the form and we'll be in touch as soon as
            possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputStyles('firstName')}
                  required
                />
                <User className="absolute right-3 top-3 h-5 w-5 text-blue-300" />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputStyles('lastName')}
                  required
                />
                <User className="absolute right-3 top-3 h-5 w-5 text-blue-300" />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={inputStyles('email')}
                required
              />
              <Mail className="absolute right-3 top-3 h-5 w-5 text-blue-300" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="relative">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className={inputStyles('subject')}
                required
              />
              <MessageSquare className="absolute right-3 top-3 h-5 w-5 text-blue-300" />
              {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
            </div>

            <div className="relative">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className={inputStyles('phone')}
                required
              />
              <Phone className="absolute right-3 top-3 h-5 w-5 text-blue-300" />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div className="relative">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className={`${inputStyles('message')} min-h-[120px] resize-none`}
                required
              />
              <MessageSquare className="absolute right-3 top-3 h-5 w-5 text-blue-300" />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-white text-blue-600 hover:bg-blue-50 rounded-lg h-12 text-lg font-semibold transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-white p-6 lg:p-16 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md"
        >
          <img
            src="https://img.freepik.com/premium-vector/female-with-card-denoting-flat-illustration-card-payment_203633-4246.jpg?semt=ais_hybrid"
            alt="Contact illustration"
            className="w-full h-auto"
          />
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              We'd love to hear from you
            </h2>
            <p className="text-gray-600">
              Our team is always here to help. Send us a message and we'll get back to you as soon as possible.
            </p>
          </div>
        </motion.div>
        <div className="space-y-3 item-left">
                <h3 className="text-xl font-semibold text-gray-800">Official Contact Information</h3>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <p className="text-gray-600">ameet@chocosoft.in</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <p className="text-gray-600">+91 971-703-6201,
                  +91 833-000-0786</p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600">
                  Shubhangee Chocosoft
                  B1, B2 Devki Sector,<br />
                  Vrindavan City, Jamtha, Nagpur - 441122,<br />
                  Maharashtra, India
                  </p>
                </div>
              </div>
              </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Contact
