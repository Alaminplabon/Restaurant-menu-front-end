import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { login } from '../services/api';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    
    try {
      const response = await login({ email, password });
      console.log(response.data);
      
      localStorage.setItem('token', response.data.token);
      
      setSuccess(true); 
      setError(null); 
      
      setTimeout(() => {
        window.location.href = '/admin';
      }, 2000); 
    
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError('Login failed. Please check your email and password and try again.');
      setSuccess(false); // Ensure success message is hidden
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error}
        />
        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}
        {success && (
          <Alert severity="success" sx={{ marginTop: 2 }}>
            Login successful! Redirecting...
          </Alert>
        )}
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
