// src/AuthModal/AuthModal.tsx
import React, { useState } from 'react';

import { KeyboardArrowLeft } from '@mui/icons-material';
import { Modal, Box } from '@mui/material';
 
import { useModal } from '@/features/modals/model/context';
import modalLogo from '@/shared/assets/images/modal-logo.svg';

import { AuthWithEmail } from "./AuthWithEmail";
import { CheckAuth } from "./CheckAuth";
import { ResetPassword } from './ResetPassword';
import { Register } from './Register';


export const AuthModal = () => {
  const { hideModal, modalContent, isModalVisible } = useModal();
  const [content, setContent] = useState(modalContent?.content || 'checkAuth');
  const [login, setLogin] = useState('');

  if (!isModalVisible) return null;

  return (
    <Modal
      open={isModalVisible ? modalContent.type === 'auth' : null}
      onClose={() => hideModal()}
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none pt-10 pb-4 px-4 mm:py-10 mm:px-8 max-w-[500px] w-[95%] mm:w-full">
        {content !== 'checkAuth' ? <span
            onClick={() => {
              setContent('checkAuth');
              //   setResError(null);
              //   reset();
            }}
            className='absolute top-3 left-3 text-sm text-colBlack font-semibold cursor-pointer pr-4'
          >
            <KeyboardArrowLeft className='!w-4 pb-[2px]' />
            Назад
          </span> : null}
        <span
          onClick={() => hideModal()}
          className="absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4"
        >
          &times;
        </span>
        <img className="w-[116px] mb-4 mx-auto" src={modalLogo} alt="*" />
        {content === 'checkAuth' ? <CheckAuth setContent={setContent} setLogin={setLogin} /> : null}
        {content === 'authWithEmail' ? <AuthWithEmail hideModal={hideModal} setContent={setContent} login={login} /> : null}
        {content === 'resetPassword' ? <ResetPassword
            // control={control}
            // handleSubmit={handleSubmit}
            setContent={setContent}
          />
        ) : null}
        {content === 'register' ? <Register hideModal={hideModal} setContent={setContent} login={login}/> : null}
      </Box>
    </Modal>
  );
};
