import { useState } from 'react';
import { Box, Modal } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { setToken } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';

const LogoutModal = ({ open, setOpen, content }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { hideModal, modalContent, isModalVisible } = useModal();

  const logout = () => {
    dispatch(setToken());
    hideModal();
    navigate('/');
  };
  // const logout = () => {
  //   dispatch(setToken());
  //   setOpen(false);
  //   navigate('/');
  // }
  if (!isModalVisible) return null;

  return (
    <Modal
      open={isModalVisible && modalContent.type === 'logout'}
      onClose={hideModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      {/* <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    > */}
      <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-6 py-8 max-w-[480px] w-[95%] mm:w-full'>
        <span
          onClick={hideModal}
          className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
        >
          &times;
        </span>
        <h1 className='pt-1 text-2xl mm:text-3xl text-colBlack font-semibold'>
          Выход из аккаунта
        </h1>
        <p className='text-colBlack my-2'>
          Вы уверены, что хотите выйти из аккаунта?
        </p>
        <div className='flex space-x-3 pt-5'>
          <button
            onClick={hideModal}
            className='w-1/2 h-[38px] px-6 border border-colGreen bg-white rounded text-colGreen font-semibold'
          >
            Отменить
          </button>
          <button
            onClick={logout}
            className='w-1/2 h-[38px] px-6 bg-colGreen rounded text-white font-semibold'
          >
            Да
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default LogoutModal;
