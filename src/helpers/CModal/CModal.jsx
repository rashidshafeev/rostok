import { Box, Modal } from '@mui/material';

const CModal = ({ open, setOpen, content }) => {
  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      {content?.name == 'deleteOrganization' ? (
        <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-6 py-8 max-w-[620px] w-full'>
          <h1 className='text-3xl text-colBlack font-semibold'>
            Удаление организации
          </h1>
          <p className='text-colBlack my-2'>
            Вы уверены, что хотите удалить организацию:
          </p>
          <h4 className='text-xl font-semibold text-colBlack'>
            {content?.item?.name}
          </h4>
          <div className='flex space-x-3 pt-5'>
            <button
              onClick={() => setOpen(false)}
              className='w-1/2 h-[38px] px-6 border border-colGreen bg-white rounded text-colGreen font-semibold'
            >
              Отменить
            </button>
            <button className='w-1/2 h-[38px] px-6 bg-colGreen rounded text-white font-semibold'>
              Удалить
            </button>
          </div>
        </Box>
      ) : (
        ''
      )}
    </Modal>
  );
};

export default CModal;
