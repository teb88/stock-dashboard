import {Box} from '@mui/joy';
import {SxProps} from '@mui/joy/styles/types';
import React from 'react';

interface NavBarProps {
  children: string | React.ReactNode | React.ReactNode[];
  sx?: SxProps;
}

const NavBar: React.FC<NavBarProps> = ({children, sx = {}}) => {
  return (
    <Box
      component="nav"
      sx={{
        width: '100%',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        p: 1,
        color: 'neutral.50',
        backgroundColor: 'neutral.600',
        borderRadius: 'sm',
        boxShadow: 'sm',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default NavBar;
