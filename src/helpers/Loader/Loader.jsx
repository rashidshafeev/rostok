import { Box, CircularProgress } from '@mui/material';

export const Loading = ({ extraStyle }) => {
  return (
    <div style={{ height: extraStyle }} className='w-full py-5 h-full'>
      <div className='flex justify-center items-center w-full h-full'>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress sx={{ color: '#15765B' }} />
        </Box>
      </div>
    </div>
  );
};

export const LoadingSmall = ({ extraStyle }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size={20} sx={{ color: extraStyle }} />
    </Box>
  );
};
