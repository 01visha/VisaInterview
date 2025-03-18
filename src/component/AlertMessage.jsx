import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const AlertMessage = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.message) {
      setMessage(location.state.message);
      // Clear the message after 5 seconds
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
      {message}
    </div>
  );
};

export default AlertMessage;

