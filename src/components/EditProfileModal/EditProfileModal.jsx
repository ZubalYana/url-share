import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

Modal.setAppElement('#root');

export default function EditProfileModal({ isOpen, onRequestClose }) {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

const validate = () => {
  const newErrors = {};

  if (!formData.name || formData.name.trim().length < 3) {
    newErrors.name = 'Name must be at least 3 characters';
  }
  if (!formData.currentPassword.trim()) {
    newErrors.currentPassword = 'Please enter current password';
  }

  if (formData.newPassword || formData.confirmPassword) {
    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must be 8–16 chars, include uppercase letter and special symbol';
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  if (!validate()) return;

  try {
    const updateData = {
      currentPassword: formData.currentPassword.trim(),
    };

    if (formData.name.trim() !== currentUser.name.trim()) {
      updateData.name = formData.name.trim();
    }

    if (formData.newPassword) {
      updateData.newPassword = formData.newPassword;
    }

    const response = await axios.put('/api/user/update', updateData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.setItem('user', JSON.stringify(response.data.user));
    alert('Profile updated successfully');
    onRequestClose();
  } catch (error) {
    if (error.response?.data?.message) {
      setServerError(error.response.data.message);
    } else {
      setServerError('An error occurred');
    }
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
    >
      <div className="bg-white shadow-xl rounded-xl p-6 w-[90vw] max-w-md mx-auto">
        <h2 className="text-[18px] font-semibold text-center mb-3 uppercase md:text-[24px] text-[#1c1c1c]">
          Edit Profile
        </h2>

        {serverError && (
          <p className="text-red-600 text-center mb-2">{serverError}</p>
        )}

        <div className="flex flex-col gap-4">
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />

          <TextField
            label="Current Password"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword}
            fullWidth
          />

          <TextField
            label="New Password (optional)"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            error={!!errors.newPassword}
            helperText={errors.newPassword || '8–16 chars, uppercase & special symbol'}
            fullWidth
          />

          <TextField
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            fullWidth
          />

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outlined" onClick={onRequestClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
