import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Button, Box, Dialog,
  DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CategoryForm from './CategoryForm';
import SubcategoryForm from './SubcategoryForm';
import ItemForm from './ItemForm';

const AdminPage = () => {
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubcategory, setOpenSubcategory] = useState(false);
  const [openItem, setOpenItem] = useState(false);
  const navigate = useNavigate();

  const handleOpenCategory = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      setOpenCategory(true);
    }
  };

  const handleCloseCategory = () => {
    setOpenCategory(false);
  };

  const handleOpenSubcategory = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      setOpenSubcategory(true);
    }
  };

  const handleCloseSubcategory = () => {
    setOpenSubcategory(false);
  };

  const handleOpenItem = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      setOpenItem(true);
    }
  };

  const handleCloseItem = () => {
    setOpenItem(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpenCategory}>
          Create Category
        </Button>

        <Dialog open={openCategory} onClose={handleCloseCategory}>
          <DialogTitle>Create a New Category</DialogTitle>
          <DialogContent>
            <CategoryForm onClose={handleCloseCategory} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCategory} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Button variant="contained" color="secondary" onClick={handleOpenSubcategory}>
          Create Subcategory
        </Button>

        <Dialog open={openSubcategory} onClose={handleCloseSubcategory}>
          <DialogTitle>Create a New Subcategory</DialogTitle>
          <DialogContent>
            <SubcategoryForm onClose={handleCloseSubcategory} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSubcategory} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Button variant="contained" color="default" onClick={handleOpenItem}>
          Create Item
        </Button>

        <Dialog open={openItem} onClose={handleCloseItem}>
          <DialogTitle>Create a New Item</DialogTitle>
          <DialogContent>
            <ItemForm onClose={handleCloseItem} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseItem} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default AdminPage;
