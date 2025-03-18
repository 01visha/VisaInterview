import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePasswordModal = ({ show, handleClose, ssoStatus }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // console.log('SSO Status:', ssoStatus); // Logs ssoStatus whenever it changes
  }, [ssoStatus]);

  const validateForm = () => {
    let isValid = true;

    if (!newPassword) {
      toast.error("Password is required.");
      isValid = false;
    } else if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      isValid = false;
    } else if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(newPassword)) {
      toast.error("Password must contain an uppercase letter, a number, and a special character.");
      isValid = false;
    }

    if (ssoStatus !== 1 && oldPassword === newPassword) {
      toast.error('New password cannot be the same as the old password.');
      isValid = false;
    }

    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!validateForm()) {     
      return
    }

  

    const authCode = localStorage.getItem('auth_code');
    if (!authCode) {
      toast.error('Authentication code not found. Please login again.');
      return;
    }

    setIsLoading(true);

    try {
    
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/change-password`,
        {
          old_password: ssoStatus !== 1 ? oldPassword : undefined,
          new_password: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${authCode}` },
        }
      );
      toast.success(response.data.message || 'Password changed successfully!');
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered aria-labelledby="change-password-modal">
      <Modal.Header closeButton>
        <Modal.Title id="change-password-modal">Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {ssoStatus !== 1 && (
            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2" disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Changing...' : 'Submit'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <ToastContainer />
    </Modal>
  );
};

export default ChangePasswordModal;
