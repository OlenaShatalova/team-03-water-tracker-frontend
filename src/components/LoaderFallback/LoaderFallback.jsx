import { Box } from '@mui/material';
import { Loader } from '../Loader/Loader';

const LoaderFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <Loader />
  </Box>
);

export default LoaderFallback;
