import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const SignOutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-lg p-6 w-full max-w-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-4">Confirm Sign Out</h2>
          <p className="mb-6">Are you sure you want to sign out?</p>
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-150 ease-in-out"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignOutModal;

