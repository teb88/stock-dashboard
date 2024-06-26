import {Box} from '@mui/joy';
import React from 'react';

import NavBar from './NavBar';
import ThemeToggle from './ThemeToggle';
// import ThemeToggle from './ThemeToggle';

interface PageLayoutProps {
  headerContent: string | React.ReactElement;
  children: React.ReactElement;
}

const PageLayout: React.FC<PageLayoutProps> = ({headerContent, children}) => {
  return (
    <Box
      sx={{
        px: 2,
        pt: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <NavBar sx={{mb: 2}}>
        {headerContent}
        <ThemeToggle />
      </NavBar>
      <Box sx={{flexGrow: 1, overflow: 'hidden'}}>{children}</Box>
    </Box>
  );
};

export default PageLayout;
