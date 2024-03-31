import {Box, LinearProgress} from '@mui/joy';

const LoadingIndicator = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'background.level1',
      }}
    >
      <Box sx={{width: '200px', height: '20px'}}>
        <LinearProgress variant="soft" />
      </Box>
    </Box>
  );
};

export default LoadingIndicator;
