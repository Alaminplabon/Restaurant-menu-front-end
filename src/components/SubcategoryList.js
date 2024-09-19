import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, CircularProgress, Typography, Divider, Box } from '@mui/material';
import { fetchSubcategories } from '../services/api';

const SubcategoryList = ({ categoryId, onSelectSubcategory }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      fetchSubcategories(categoryId)
        .then((response) => {
          setSubcategories(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError('Failed to load subcategories.');
          setLoading(false);
        });
    }
  }, [categoryId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress sx={{ color: '#1976d2' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold' }}>
        {error}
      </Typography>
    );
  }

  return (
    <List sx={{ padding: 0 }}>
      {subcategories.length > 0 ? (
        subcategories.map((subcategory) => (
          <React.Fragment key={subcategory.id}>
            <ListItem
              button
              onClick={() => onSelectSubcategory(subcategory.id)}
              sx={{
                borderRadius: '4px',
                marginBottom: '8px',
                backgroundColor: '#f0f0f0',
                '&:hover': {
                  backgroundColor: '#d1c4e9', // Light purple
                },
                '&:active': {
                  backgroundColor: '#ab47bc', // Purple
                  color: '#fff',
                },
              }}
            >
              <ListItemText primary={subcategory.name} />
            </ListItem>
            <Divider sx={{ backgroundColor: '#e0e0e0' }} />
          </React.Fragment>
        ))
      ) : (
        <Typography sx={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#9e9e9e' }}>
          No subcategories available.
        </Typography>
      )}
    </List>
  );
};

export default SubcategoryList;
