// src/components/ConfirmationModal.js

import { Box, Modal } from '@mui/material';
import { useModal } from '../../context/ModalContext';


const ConfirmationModal = () => {
  
    const { hideModal, modalContent, isModalVisible } = useModal();
    
    if (!isModalVisible) return null;

  return (
    <Modal
      open={isModalVisible && modalContent.type === 'confirmation'}
      onClose={hideModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-6 py-8 max-w-[480px] w-[95%] mm:w-full'>
        <span
          onClick={hideModal}
          className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
        >
          &times;
        </span>
        <h1 className='pt-1 text-2xl mm:text-3xl text-colBlack font-semibold'>
          {modalContent.title}
        </h1>
        <p className='text-colBlack my-2'>
          {modalContent.text}
        </p>
        <div className='flex space-x-3 pt-5'>
          <button
            onClick={() => hideModal()}
            className='w-1/2 h-[38px] px-6 border border-colGreen bg-white rounded text-colGreen font-semibold'
          >
            Отменить
          </button>
          <button
            onClick={() => { modalContent.action(modalContent.product)
                hideModal()
            }}
            className='w-1/2 h-[38px] px-6 bg-colGreen rounded text-white font-semibold'
          >
            Да
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;