import React, { useState, useEffect } from 'react';
import { TextField, Button, Snackbar, MenuItem } from '@mui/material';
import { fetchCategories, fetchSubcategories, createItem } from '../services/api';

const ItemForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch categories when the form loads
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

  useEffect(() => {
    // Fetch subcategories when a category is selected
    const loadSubcategories = async () => {
      if (categoryId) {
        try {
          const response = await fetchSubcategories(categoryId);
          setSubcategories(response.data);
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        }
      }
    };

    loadSubcategories();
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createItem(categoryId, subcategoryId, { name, price });
      setMessage('Item created successfully!');
      setName(''); 
      setPrice('');
      setCategoryId('');
      setSubcategoryId('');
      onClose(); 
    } catch (error) {
      console.error('Error creating item:', error);
      setMessage('Failed to create item');
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
          select
          label="Select Subcategory"
          value={subcategoryId}
          onChange={(e) => setSubcategoryId(e.target.value)}
          required
          fullWidth
          margin="dense"
          disabled={!categoryId}
        >
          {subcategories.map((subcategory) => (
            <MenuItem key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="dense"
        />
        <TextField
          label="Item Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
      {message && <Snackbar
        open={Boolean(message)}
        autoHideDuration={6000}
        onClose={() => setMessage('')}
        message={message}
      />}
    </div>
  );
};

export default ItemForm;
