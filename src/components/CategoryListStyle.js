import { styled } from '@mui/material/styles';
import { List, ListItem } from '@mui/material';

// Wrapper to contain the list and title
export const ContainerWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  textAlign: 'center',
  margin: 'auto',
}));

// Horizontal List styling
export const StyledList = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(2), // Space between each category
  overflowX: 'auto', // Allows scrolling if categories exceed the width
}));

// Horizontal ListItem styling with fixed size
export const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center', // Center text horizontally
  alignItems: 'center', // Center text vertically
  textAlign: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.light, // Light primary background color
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  width: '120px', // Fixed width to ensure uniform size
  height: '50px', // Fixed height for consistency
  color: theme.palette.primary.contrastText, // Text color for contrast
  // whiteSpace: 'nowrap', // Prevents text from wrapping to new lines
  // overflow: 'hidden', // Ensures the content stays within bounds
  textOverflow: 'ellipsis', // Adds ellipsis (...) if the text is too long
  '&:hover': {
    backgroundColor: theme.palette.primary.main, // Darker background on hover
    cursor: 'pointer',
    boxShadow: theme.shadows[4], // Elevate on hover
  },
}));
