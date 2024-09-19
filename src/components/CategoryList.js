import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/api';
import { ListItemText } from '@mui/material';
import { StyledList, StyledListItem, ContainerWrapper } from './CategoryListStyle';

const CategoryList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then((response) => {
      // Limit the categories to 15
      const limitedCategories = response.data.slice(0, 10);
      setCategories(limitedCategories);
    });
  }, []);

  return (
    <ContainerWrapper>
      <h2>All Categories</h2>
      <StyledList>
        {categories.map((category) => (
          <StyledListItem 
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
          >
            <ListItemText primary={category.name} />
          </StyledListItem>
        ))}
      </StyledList>
    </ContainerWrapper>
  );
};

export default CategoryList;
