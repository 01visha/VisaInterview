import React, { useState } from 'react';

const UnsubscribeModal = ({ onClose, onUnsubscribe }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onUnsubscribe(email);
      onClose();
    } catch (error) {
      console.error("Error in unsubscribe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Unsubscribe from Newsletter</h2>
        <p className="mb-4 text-gray-600">Are you sure you want to unsubscribe?</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 text-gray-800"
            required
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              disabled={isLoading}
            >
              {isLoading ? "Unsubscribing..." : "Unsubscribe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnsubscribeModal;

