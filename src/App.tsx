import {Box} from '@mui/joy';
import './App.css';

import {Outlet} from 'react-router-dom';

function App() {
  return (
    <Box sx={{height: '100%'}}>
      <Outlet />
    </Box>
  );
}

export default App;
