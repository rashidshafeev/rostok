import { Box, Modal } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import CTextField from '../CustomInputs/CTextField';
import { Loading } from '../Loader/Loader';

function UpdateOrganizationModal({
  open,
  close,
  item,
  handleEditOrganization,
  editLoading,
  editOrgSuccess,
}) {
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      inn: item?.inn || '',
      kpp: item?.kpp || '',
      name: item?.name || '',
      u_address: item?.u_address || '',
      f_address: item?.f_address || '',
      ogrn: item?.ogrn || '',
      bank_account: item?.bank_account || '',
      bank_bik: item?.bank_bik || '',
      correspondent_account: item?.correspondent_account || '',
      bank_name: item?.bank_name || '',
    },
  });

  const handleUpdateOrganization = (data) => {
    data.id = item?.id;
    handleEditOrganization(data);
    if (editOrgSuccess) {
      close();
    }
  };

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none py-10 px-8 max-w-[500px] w-full'>
        {editLoading ? (
          <div className='h-[162px]'>
            <Loading />
          </div>
        ) : (
          <div>
            <span
              onClick={close}
              className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
            >
              &times;
            </span>
            <h1 className='text-3xl text-colBlack text-center pb-2 font-semibold'>
              Редактирование организации
            </h1>
            <h4 className='text-xl text-center font-semibold pb-4 text-colBlack'>
              {item?.name}
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
                      type='text'
                      required={true}
                    />
                  )}
                />

                <Controller
                  name='u_address'
                  control={control}
                  rules={{}}
                  render={({ field }) => (
                    <CTextField
                      {...field}
                      label='Юридический адрес'
                      type='text'
                      required={true}
                    />
                  )}
                />

                <Controller
                  name='f_address'
                  control={control}
                  rules={{}}
                  render={({ field }) => (
                    <CTextField
                      {...field}
                      label='Фактический адрес'
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
                      type='number'
                      required={true}
                    />
                  )}
                />

                <div className='grid grid-cols-2 gap-3'>
                  <Controller
                    name='bank_account'
                    control={control}
                    rules={{}}
                    render={({ field }) => (
                      <CTextField
                        {...field}
                        label='Расчётный счёт'
                        type='number'
                        borderColor='#222'
                        focusedBorderColor='#15765B'
                        labelColor='#15765B'
                      />
                    )}
                  />

                  <Controller
                    name='bank_bik'
                    control={control}
                    rules={{}}
                    render={({ field }) => (
                      <CTextField
                        {...field}
                        label='БИК Банка'
                        type='number'
                        borderColor='#222'
                        focusedBorderColor='#15765B'
                        labelColor='#15765B'
                      />
                    )}
                  />

                  <Controller
                    name='correspondent_account'
                    control={control}
                    rules={{}}
                    render={({ field }) => (
                      <CTextField
                        {...field}
                        label='Корр. счёт'
                        type='number'
                        borderColor='#222'
                        focusedBorderColor='#15765B'
                        labelColor='#15765B'
                      />
                    )}
                  />

                  <Controller
                    name='bank_name'
                    control={control}
                    rules={{}}
                    render={({ field }) => (
                      <CTextField
                        {...field}
                        label='Наименование банка'
                        type='text'
                        borderColor='#222'
                        focusedBorderColor='#15765B'
                        labelColor='#15765B'
                      />
                    )}
                  />
                </div>
              </div>
              <button className='w-full h-[38px] px-6 bg-colGreen rounded mt-5 text-white font-semibold'>
                Сохранить
              </button>
            </form>
          </div>
        )}
      </Box>
    </Modal>
  );
}

export default UpdateOrganizationModal;
