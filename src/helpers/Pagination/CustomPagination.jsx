import { Pagination, Stack } from '@mui/material';

export const CustomPagination = ({page, count, handlePagination }) => {
  const totalPages = Math.ceil(count / 20);
  console.log("pagination page")
  console.log(page)
  return (
    <Stack spacing={2} className='pt-8'>
      <Pagination
        onChange={handlePagination}
        count={totalPages}
        page={page}
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
