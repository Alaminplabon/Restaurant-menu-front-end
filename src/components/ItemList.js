import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, CircularProgress, Typography, Box, Divider } from '@mui/material';
import { fetchItems } from '../services/api';

const ItemList = ({ categoryId, subcategoryId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categoryId && subcategoryId) {
      setLoading(true);
      fetchItems(categoryId, subcategoryId)
        .then((response) => {
          setItems(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError('Failed to load items.');
          setLoading(false);
        });
    }
  }, [categoryId, subcategoryId]);

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
      {items.length > 0 ? (
        items.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem
              sx={{
                borderRadius: '4px',
                marginBottom: '8px',
                backgroundColor: '#e3f2fd', // Light blue
                '&:hover': {
                  backgroundColor: '#bbdefb', // Slightly darker blue
                },
                '&:active': {
                  backgroundColor: '#90caf9', // Even darker blue
                },
              }}
            >
              <ListItemText
                primary={item.name}
                secondary={`$${item.price}`}
                primaryTypographyProps={{ fontWeight: 'bold' }}
                secondaryTypographyProps={{ color: '#424242' }}
              />
            </ListItem>
            <Divider sx={{ backgroundColor: '#90caf9' }} />
          </React.Fragment>
        ))
      ) : (
        <Typography sx={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#9e9e9e' }}>
          No items available.
        </Typography>
      )}
    </List>
  );
};

export default ItemList;
