import { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/slices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { OKIcon, OKShareButton, TelegramIcon, TelegramShareButton, VKIcon, VKShareButton } from 'react-share';
import CTextField from '../CustomInputs/CTextField';

const ShareModal = ({}) => {
    
  const { hideModal, modalContent, isModalVisible } = useModal();
  const location = useLocation()

  const [url, setUrl] = useState(modalContent?.url || `https://rosstok.ru${location.pathname}`);

  useEffect(() => {
    setUrl(modalContent?.url || `https://rosstok.ru${location.pathname}`);
  }, [modalContent, location.pathname]);

  if (!isModalVisible) return null;

  return (
    <Modal
    open={isModalVisible && modalContent?.type === 'share'}
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
            <h1 className='pt-1 text-2xl mm:text-3xl text-colBlack font-semibold mb-5'>
              Поделиться
            </h1> 
            <CTextField
                value={url || ''}
                onChange={(e) => setUrl(e.target.value)}
            />
            <div className='flex pt-5'>
                <OKShareButton url={url || ''}>
                    <OKIcon/>
                </OKShareButton>
                <VKShareButton url={url || ''}>
                    <VKIcon/>
                </VKShareButton>
                <TelegramShareButton url={url || ''}>
                    <TelegramIcon/>
                </TelegramShareButton>
              {/* <button
                onClick={() => hideModal()}
                className='w-1/2 h-[38px] px-6 border border-colGreen bg-white rounded text-colGreen font-semibold'
              >
                Отменить
              </button>
              <button
                onClick={logout}
                className='w-1/2 h-[38px] px-6 bg-colGreen rounded text-white font-semibold'
              >
                Да
              </button> */}
            </div>
          </Box>
    </Modal>
  );
};

export default ShareModal;
