import {Sheet} from '@mui/joy';
import {SxProps} from '@mui/joy/styles/types';
import React from 'react';

interface NavBarProps {
  children: string | React.ReactNode | React.ReactNode[];
  sx?: SxProps;
}

const NavBar: React.FC<NavBarProps> = ({children, sx = {}}) => {
  return (
    <Sheet
      component="nav"
      variant="outlined"
      sx={{
        width: '100%',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 1,
        borderRadius: 'sm',
        boxShadow: 'sm',
        ...sx,
      }}
    >
      {children}
    </Sheet>
  );
};

export default NavBar;
