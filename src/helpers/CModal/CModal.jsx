import { Box, Modal } from '@mui/material';
import CTextField from '../CustomInputs/CTextField';
import { useDispatch } from 'react-redux';
import { addOrganization } from '../../redux/slices/organizationsSlice';
import { Controller, useForm } from "react-hook-form"

const CModal = ({ open, setOpen, content, logOutFromAccount, organizations }) => {
  if (!open) return null;
  
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch();

  const onAddOrganization = (data) => {
    dispatch(addOrganization(data));
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      {content?.name == 'deleteOrganization' ? (
        <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-6 py-8 max-w-[620px] w-full'>
          <span
            onClick={() => setOpen(false)}
            className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
          >
            &times;
          </span>
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
      ) : content === 'addOrganization' ? (
        <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-6 py-8 max-w-[620px] w-full'>
          <span
            onClick={() => setOpen(false)}
            className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
          >
            &times;
          </span>
          <h1 className='text-3xl text-colBlack text-center pb-5 font-semibold'>
            Добавление организации
          </h1>
          <form onSubmit={handleSubmit(onAddOrganization)}>
            <div className='w-full space-y-5'>

                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <CTextField
                      {...field}
                      label='Название организации'
                      type='text'
                      required={true}
                    />
                  )}
                />

                <Controller
                  name='inn'
                  control={control}
                  render={({ field }) => (
                    <CTextField
                      {...field}
                      label='ИНН'
                      type='number'
                      required={true}
                    />
                  )}
                />


              
            </div>
            <h4 className='text-xl font-semibold text-colBlack'>
              {content?.item?.name}
            </h4>
            <button
              disabled={!watch('name') ||!watch('inn')}
              className={` w-full h-[38px] px-6 ${ !watch('name') ||!watch('inn') ? 'bg-colGray' : 'bg-colGreen'} rounded mt-5 text-white font-semibold`}
            >
              Сохранить
            </button>
          </form>
        </Box>
      ) : content?.name === 'updateOrganization' ? (
        <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-6 py-8 max-w-[620px] w-full'>
          <span
            onClick={() => setOpen(false)}
            className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
          >
            &times;
          </span>
          <h1 className='text-3xl text-colBlack text-center pb-2 font-semibold'>
            Редактирование организации
          </h1>
          <h4 className='text-xl text-center font-semibold pb-4 text-colBlack'>
            {content?.item?.name}
          </h4>
          <form>
            <div className='w-full space-y-3'>
              <div className='grid grid-cols-2 gap-3'>
                <CTextField
                  label='ИНН'
                  name='inn2'
                  type='number'
                  borderColor='#222'
                  focusedBorderColor='#15765B'
                  labelColor='#15765B'
                  required={true}
                />
                <CTextField
                  label='КПП'
                  name='kpp'
                  type='number'
                  borderColor='#222'
                  focusedBorderColor='#15765B'
                  labelColor='#15765B'
                  required={true}
                />
              </div>
              <CTextField
                label='Название организации'
                name='name2'
                type='text'
                required={true}
              />
              <CTextField
                label='Юридический адрес'
                name='yurAddress'
                type='text'
                required={true}
              />
              <CTextField
                label='Фактический адрес'
                name='faqAddress'
                type='text'
                required={true}
              />
              <CTextField
                label='ОГРН'
                name='ogrn'
                type='number'
                required={true}
              />
              <div className='grid grid-cols-2 gap-3'>
                <CTextField
                  label='Расчётный счёт'
                  name='resShet'
                  type='number'
                  borderColor='#222'
                  focusedBorderColor='#15765B'
                  labelColor='#15765B'
                  required={true}
                />
                <CTextField
                  label='БИК Банка'
                  name='bikBanka'
                  type='number'
                  borderColor='#222'
                  focusedBorderColor='#15765B'
                  labelColor='#15765B'
                  required={true}
                />
                <CTextField
                  label='Корр. счёт'
                  name='korrSchet'
                  type='number'
                  borderColor='#222'
                  focusedBorderColor='#15765B'
                  labelColor='#15765B'
                  required={true}
                />
                <CTextField
                  label='Наименование банка'
                  name='bankName'
                  type='number'
                  borderColor='#222'
                  focusedBorderColor='#15765B'
                  labelColor='#15765B'
                  required={true}
                />
              </div>
            </div>
            <button
              disabled
              className='w-full h-[38px] px-6 bg-colGray rounded mt-5 text-white font-semibold'
            >
              Сохранить
            </button>
          </form>
        </Box>
      ) : (
        content === 'logout' && (
          <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-6 py-8 max-w-[480px] w-full'>
            <span
              onClick={() => setOpen(false)}
              className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
            >
              &times;
            </span>
            <h1 className='text-3xl text-colBlack font-semibold'>
              Выход из аккаунта
            </h1>
            <p className='text-colBlack my-2'>
              Вы уверены, что хотите выйти из аккаунта?
            </p>
            <div className='flex space-x-3 pt-5'>
              <button
                onClick={() => setOpen(false)}
                className='w-1/2 h-[38px] px-6 border border-colGreen bg-white rounded text-colGreen font-semibold'
              >
                Отменить
              </button>
              <button
                onClick={logOutFromAccount}
                className='w-1/2 h-[38px] px-6 bg-colGreen rounded text-white font-semibold'
              >
                Да
              </button>
            </div>
          </Box>
        )
      )}
    </Modal>
  );
};

export default CModal;
