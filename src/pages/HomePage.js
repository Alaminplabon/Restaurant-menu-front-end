import React, { useState } from 'react';
import { Box, Grid, Typography, Paper, Divider } from '@mui/material';
import CategoryList from '../components/CategoryList';
import SubcategoryList from '../components/SubcategoryList';
import ItemList from '../components/ItemList';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null); 
  };

  const handleSubcategorySelect = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
      {/* <Typography variant="h4" gutterBottom sx={{ marginBottom: '20px', color: '#333' }}>
        Categories
      </Typography> */}
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper 
            elevation={3} 
            sx={{ 
              padding: '20px', 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              marginBottom: '30px' // Add gap after CategoryList
            }}
          >
            <CategoryList onSelectCategory={handleCategorySelect} />
          </Paper>
        </Grid>

        {selectedCategory && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper 
                elevation={3} 
                sx={{ 
                  padding: '20px', 
                  backgroundColor: '#fff', 
                  borderRadius: '8px', 
                  marginLeft: '22px' // Add left padding for SubcategoryList
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ marginBottom: '15px', color: '#555' }}>
                  Subcategories
                </Typography>
                <Divider sx={{ marginBottom: '15px' }} />
                <SubcategoryList
                  categoryId={selectedCategory}
                  onSelectSubcategory={handleSubcategorySelect}
                />
              </Paper>
            </Grid>

            {selectedSubcategory && (
              <Grid item xs={12} sm={6}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    padding: '20px', 
                    backgroundColor: '#fff', 
                    borderRadius: '8px' 
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ marginBottom: '15px', color: '#555' }}>
                    Items
                  </Typography>
                  <Divider sx={{ marginBottom: '15px' }} />
                  <ItemList
                    categoryId={selectedCategory}
                    subcategoryId={selectedSubcategory}
                  />
                </Paper>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default HomePage;
