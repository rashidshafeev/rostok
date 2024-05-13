import { useState } from 'react';
import { Box, Modal } from '@mui/material';
import CTextField from '../CustomInputs/CTextField';
import { useDispatch } from 'react-redux';
import {
  addOrganization,
  deleteOrganization,
  updateOrganization,
} from '../../redux/slices/organizationsSlice';
import { Controller, useForm } from 'react-hook-form';

const CModal = ({
  open,
  setOpen,
  content,
  logOutFromAccount,
  organizations,
}) => {
  const [org, setOrg] = useState(content.item);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const handleAddOrganization = (data) => {
    dispatch(addOrganization(data));
    setOpen(false);
  };

  const handleAddError = (errors) => {
    console.log(errors);
  };

  const handleDeleteOrganization = () => {
    dispatch(deleteOrganization(content.item));
    setOpen(false);
  };

  const handleUpdateOrganization = (data) => {
    dispatch(updateOrganization({ organization: content.item, data }));
    setOpen(false);
  };

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      {content?.name == 'deleteOrganization' ? (
        <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-6 py-8 max-w-[620px] w-[95%] mm:w-full'>
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
            <button
              onClick={handleDeleteOrganization}
              className='w-1/2 h-[38px] px-6 bg-colGreen rounded text-white font-semibold'
            >
              Удалить
            </button>
          </div>
        </Box>
      ) : content === 'addOrganization' ? (
        <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-6 py-8 max-w-[620px] w-[95%] mm:w-full'>
          <span
            onClick={() => setOpen(false)}
            className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
          >
            &times;
          </span>
          <h1 className='text-3xl text-colBlack text-center pb-5 font-semibold'>
            Добавление организации
          </h1>
          <form onSubmit={handleSubmit(handleAddOrganization, handleAddError)}>
            <div className='w-full space-y-5'>
              <Controller
                name='name'
                control={control}
                rules={{}}
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
                rules={{
                  validate: {
                    exists: (value) => {
                      return (
                        !organizations.some((org) => org.inn === value) ||
                        'Такая организация уже существует'
                      );
                    },
                  },
                }}
                render={({ field }) => (
                  <CTextField
                    {...field}
                    label='ИНН'
                    type='number'
                    required={true}
                  />
                )}
              />
              {errors.inn?.type === 'exists' && (
                <p className='text-red-600 text-sm ' role='alert'>
                  {errors.inn?.message}
                </p>
              )}
            </div>
            <h4 className='text-xl font-semibold text-colBlack'>
              {content?.item?.name}
            </h4>
            <button
              disabled={!watch('name') || !watch('inn')}
              className={` w-full h-[38px] px-6 ${
                !watch('name') || !watch('inn') ? 'bg-colGray' : 'bg-colGreen'
              } rounded mt-5 text-white font-semibold`}
            >
              Сохранить
            </button>
          </form>
        </Box>
      ) : content?.name === 'updateOrganization' ? (
        <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-6 py-8 max-w-[620px] w-[95%] mm:w-full'>
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
          <form onSubmit={handleSubmit(handleUpdateOrganization)}>
            <div className='w-full space-y-3'>
              <div className='grid grid-cols-2 gap-3'>
                <Controller
                  name='inn'
                  control={control}
                  rules={{}}
                  render={({ field }) => (
                    <CTextField
                      {...field}
                      label='ИНН'
                      defaultValue={content.item.inn}
                      type='number'
                      borderColor='#222'
                      focusedBorderColor='#15765B'
                      labelColor='#15765B'
                      required={true}
                    />
                  )}
                />
                <Controller
                  name='kpp'
                  control={control}
                  rules={{}}
                  render={({ field }) => (
                    <CTextField
                      {...field}
                      label='КПП'
                      defaultValue={content.item.kpp}
                      type='number'
                      borderColor='#222'
                      focusedBorderColor='#15765B'
                      labelColor='#15765B'
                      required={true}
                    />
                  )}
                />
              </div>
              <Controller
                name='name'
                control={control}
                rules={{}}
                render={({ field }) => (
                  <CTextField
                    {...field}
                    label='Название организации'
                    defaultValue={content.item.name}
                    type='text'
                    required={true}
                  />
                )}
              />

              <Controller
                name='yurAddress'
                control={control}
                rules={{}}
                render={({ field }) => (
                  <CTextField
                    {...field}
                    label='Юридический адрес'
                    defaultValue={content.item.yurAddress}
                    type='text'
                    required={true}
                  />
                )}
              />

              <Controller
                name='faqAddress'
                control={control}
                rules={{}}
                render={({ field }) => (
                  <CTextField
                    {...field}
                    label='Фактический адрес'
                    defaultValue={content.item.faqAddress}
                    type='text'
                    required={true}
                  />
                )}
              />

              <Controller
                name='ogrn'
                control={control}
                rules={{}}
                render={({ field }) => (
                  <CTextField
                    {...field}
                    label='ОГРН'
                    defaultValue={org.ogrn}
                    onChange={(e) => {
                      setOrg({ ...org, ogrn: e.target.value });
                    }}
                    type='number'
                    required={true}
                  />
                )}
              />

              <div className='grid grid-cols-2 gap-3'>
                <Controller
                  name='rasShet'
                  control={control}
                  rules={{}}
                  render={({ field }) => (
                    <CTextField
                      {...field}
                      label='Расчётный счёт'
                      defaultValue={content.item.rasShet}
                      type='number'
                      borderColor='#222'
                      focusedBorderColor='#15765B'
                      labelColor='#15765B'
                      required={true}
                    />
                  )}
                />

                <Controller
                  name='bikBanka'
                  control={control}
                  rules={{}}
                  render={({ field }) => (
                    <CTextField
                      {...field}
                      label='БИК Банка'
                      defaultValue={content.item.bikBanka}
                      type='number'
                      borderColor='#222'
                      focusedBorderColor='#15765B'
                      labelColor='#15765B'
                      required={true}
                    />
                  )}
                />

                <Controller
                  name='korrSchet'
                  control={control}
                  rules={{}}
                  render={({ field }) => (
                    <CTextField
                      {...field}
                      label='Корр. счёт'
                      defaultValue={content.item.korrSchet}
                      type='number'
                      borderColor='#222'
                      focusedBorderColor='#15765B'
                      labelColor='#15765B'
                      required={true}
                    />
                  )}
                />

                <Controller
                  name='bankName'
                  control={control}
                  rules={{}}
                  render={({ field }) => (
                    <CTextField
                      {...field}
                      label='Наименование банка'
                      defaultValue={content.item.bankName}
                      type='number'
                      borderColor='#222'
                      focusedBorderColor='#15765B'
                      labelColor='#15765B'
                      required={true}
                    />
                  )}
                />
              </div>
            </div>
            <button className='w-full h-[38px] px-6 bg-colGray rounded mt-5 text-white font-semibold'>
              Сохранить
            </button>
          </form>
        </Box>
      ) : (
        content === 'logout' && (
          <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-6 py-8 max-w-[480px] w-[95%] mm:w-full'>
            <span
              onClick={() => setOpen(false)}
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
