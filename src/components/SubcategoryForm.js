import React, { useState, useEffect } from 'react';
import { TextField, Button, Snackbar, MenuItem } from '@mui/material';
import { createSubcategory, fetchCategories } from '../services/api';

const SubcategoryForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSubcategory(categoryId, { name });
      setMessage('Subcategory created successfully!');
      setName('');
      setCategoryId(''); 
      onClose(); 
    } catch (error) {
      console.error('Error creating subcategory:', error);
      setMessage('Failed to create subcategory');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="Select Category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          fullWidth
          margin="dense"
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Subcategory Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="dense"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '10px' }}
        >
          Submit
        </Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SubcategoryForm;
