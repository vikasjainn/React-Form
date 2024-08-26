// src/components/DatePickerExample.tsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField, Button, Modal, Box, Typography, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import dayjs from 'dayjs';
import './DatePickerStyles.css'; // Import custom CSS for date picker

const FormComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Trim spaces for first and last names
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    if (!trimmedFirstName || !trimmedLastName || !dob || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (trimmedFirstName !== firstName || trimmedLastName !== lastName) {
      alert('First and Last Names should not have leading or trailing spaces.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Invalid email format.');
      return;
    }

    if (!validatePassword(password)) {
      alert('Password must be at least 8 characters long, include a number, and a special character.');
      return;
    }

    if (isFutureDate(dob)) {
      alert('Date of Birth cannot be a future date.');
      return;
    }

    handleOpenModal();
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return (
      password.length >= 8 &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password) // Checks for special characters
    );
  };

  const isFutureDate = (date: Date | null) => {
    if (!date) return false;
    return dayjs(date).isAfter(dayjs(), 'day');
  };

  const calculateAge = (dob: Date | null) => {
    if (!dob) return 'N/A';
    const today = dayjs();
    const birthDate = dayjs(dob);
    return today.diff(birthDate, 'year');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <DatePicker
          selected={dob}
          onChange={(date) => setDob(date)}
          dateFormat="MM/dd/yyyy"
          customInput={<TextField fullWidth margin="normal" variant="outlined" label="Date of Birth" />}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={
            !firstName ||
            !lastName ||
            !dob ||
            !email ||
            !password ||
            !confirmPassword
          }
        >
          Submit
        </Button>
      </form>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Submitted Information
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            <p><strong>First Name:</strong> {firstName}</p>
            <p><strong>Last Name:</strong> {lastName}</p>
            <p><strong>Date of Birth:</strong> {dob ? dayjs(dob).format('MM/DD/YYYY') : 'N/A'}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Age:</strong> {calculateAge(dob)}</p>
          </Typography>
          <Button onClick={handleCloseModal} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default FormComponent;
