import { Box, Modal } from '@mui/material';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';
import CTextField from '../CustomInputs/CTextField';
import modalLogo from '../../assets/images/modal-logo.svg';
import CPhoneField from '../CustomInputs/CPhoneField';

const AuthModal = ({ open, setOpen, content, setContent }) => {
  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      {content === 'login' ? (
        <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none py-10 px-8 max-w-[500px] w-full'>
          <span
            onClick={() => setOpen(false)}
            className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
          >
            &times;
          </span>
          <img className='w-[116px] mb-5 mx-auto' src={modalLogo} alt='*' />
          <h1 className='text-3xl text-colBlack text-center pb-5 font-semibold'>
            Вход или регистрация
          </h1>
          <form>
            <div className='w-full space-y-5'>
              <CTextField
                label='Телефон / Эл. почта'
                name='loginInput'
                type='text'
                required={true}
              />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setContent('register');
              }}
              className='w-full h-10 px-6 bg-colGreen rounded mt-5 text-white font-semibold'
            >
              Продолжить
              <KeyboardArrowRight className='!w-5' />
            </button>
          </form>
        </Box>
      ) : (
        <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-8 py-10 max-w-[500px] w-full'>
          <span
            onClick={() => setContent('login')}
            className='absolute top-3 left-3 text-sm text-colBlack font-semibold cursor-pointer pr-4'
          >
            <KeyboardArrowLeft className='!w-4 pb-[2px]' />
            Назад
          </span>
          <span
            onClick={() => setOpen(false)}
            className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
          >
            &times;
          </span>
          <h1 className='text-3xl text-colBlack text-center py-5 font-semibold'>
            Регистрация
          </h1>
          <form>
            <div className='w-full space-y-5'>
              <CTextField label='Имя' name='name' type='text' required={true} />
              <div className='flex items-center space-x-2'>
                <CPhoneField
                  className='!w-3/5'
                  label='Телефон'
                  name='phone'
                  required={true}
                />
                <span className='pointer-events-none w-2/5 h-[38px] px-6 bg-colGray rounded text-white cursor-pointer font-semibold flex justify-center items-center'>
                  Получить код
                </span>
              </div>
              <CTextField
                label='Электронная почта'
                name='email'
                type='email'
                required={true}
              />
              <CTextField
                label='Пароль'
                name='password'
                type='password'
                required={true}
              />
              <CTextField
                label='Подтвердите пароль'
                name='confirmPassword'
                type='password'
                required={true}
              />
            </div>
            <h4 className='text-xl font-semibold text-colBlack'>
              {content?.item?.name}
            </h4>
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              className='w-full h-10 px-6 bg-colGreen rounded mt-5 text-white font-semibold'
            >
              Зарегистрироваться
              <KeyboardArrowRight className='!w-5' />
            </button>
          </form>
        </Box>
      )}
    </Modal>
  );
};

export default AuthModal;
