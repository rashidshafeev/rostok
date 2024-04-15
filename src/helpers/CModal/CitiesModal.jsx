import { Box, Modal } from '@mui/material';
import { useGetCitiesAndRegionsQuery } from '../../redux/api/api';
import { Loading } from '../Loader/Loader';
import search from '../../assets/icons/search.svg';

const CitiesModal = ({ open, setOpen }) => {
  const { isLoading, data: locations } = useGetCitiesAndRegionsQuery();

  if (!open) return null;
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none p-8 max-w-[1180px] w-full h-[600px] overflow-hidden'>
        <span
          onClick={() => setOpen(false)}
          className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
        >
          &times;
        </span>
        <h2 className='text-2xl text-colBlack pb-5 font-bold'>
          Выберите ваш город
        </h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className='max-w-[780px] w-full border-colGreen border rounded-md flex justify-between'
        >
          <input
            className='w-full h-10 outline-none rounded-l-md bg-white px-3 border-none'
            type='search'
            placeholder='Название города или области'
          />
          <button className='bg-colGreen w-14'>
            <img className='mx-auto' src={search} alt='*' />
          </button>
        </form>
        {isLoading ? (
          <div className='h-[430px]'>
            <Loading />
          </div>
        ) : (
          <div className='flex mt-8'>
            <ul className='w-[220px] h-[430px] space-y-2 overflow-y-scroll scrollable pr-4'>
              {locations?.regions?.map((el) => (
                <li
                  className='cursor-pointer font-semibold text-colBlack'
                  key={el?.id}
                >
                  {el?.name}
                </li>
              ))}
            </ul>
            <ul className='w-full pl-4 grid grid-cols-4 h-[430px] gap-5 overflow-y-scroll scrollable pr-4'>
              {locations?.cities?.map((el) => (
                <li className='text-sm py-3' key={el?.id}>
                  {el?.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default CitiesModal;
