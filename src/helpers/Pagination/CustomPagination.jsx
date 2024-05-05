import { Pagination, Stack } from '@mui/material';

export const CustomPagination = ({ count, handlePagination }) => {
  const totalPages = Math.ceil(count / 20);

  return (
    <Stack spacing={2} className='pt-8'>
      <Pagination
        onChange={handlePagination}
        count={totalPages}
        variant='outlined'
        shape='rounded'
        classes={{
          ul: 'pagination-mui',
        }}
        className='flex justify-end'
      />
    </Stack>
  );
};
