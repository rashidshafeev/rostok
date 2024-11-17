import { Box, Modal } from '@mui/material';
import { Loading } from '../Loader/Loader';

function DeleteOrganizationModal({
  open,
  close,
  item,
  handleDeleteOrganization,
  deleteLoading,
}) {
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none py-10 px-4 mm:px-8 max-w-[500px] w-[95%] mm:w-full'>
        {deleteLoading ? (
          <div className='h-[162px]'>
            <Loading />
          </div>
        ) : (
          <div>
            {' '}
            <span
              onClick={close}
              className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
            >
              &times;
            </span>
            <h1 className='text-2xl mm:text-3xl text-colBlack font-semibold'>
              Удаление организации
            </h1>
            <p className='text-colBlack my-2'>
              Вы уверены, что хотите удалить организацию:
            </p>
            <h4 className='text-xl font-semibold text-colBlack'>
              {item?.name}
            </h4>
            <div className='flex space-x-3 pt-5'>
              <button
                onClick={close}
                className='w-1/2 h-[38px] px-6 border border-colGreen bg-white rounded text-colGreen font-semibold'
              >
                Отменить
              </button>
              <button
                onClick={() => handleDeleteOrganization(item?.id)}
                className='w-1/2 h-[38px] px-6 bg-colGreen rounded text-white font-semibold'
              >
                Удалить
              </button>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
}

export default DeleteOrganizationModal;
