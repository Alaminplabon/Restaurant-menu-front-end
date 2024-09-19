import React, { useState } from 'react';
import { TextField, Button, Snackbar, CircularProgress, Alert } from '@mui/material';
import { createCategory } from '../services/api';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCategory({ name });
      setMessage('Category created successfully!');
    } catch (error) {
      console.error('Error creating category:', error);
      setMessage('Failed to create category');
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
      setName(''); // Clear the input field after submission
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 16 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Category Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          style={{ marginTop: 16 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Create Category'}
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={message.includes('Failed') ? 'error' : 'success'}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CategoryForm;
