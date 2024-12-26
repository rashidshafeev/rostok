import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import CTextField from '@/shared/ui/inputs/CTextField';
import ModalSnackbar from '@/features/modals/ui/modals/ModalSnackbar';
import arrowIcon from '@/shared/assets/icons/arrow-icon.svg';
import { Loading } from '@/shared/ui/Loader';
import { useChangePasswordMutation } from '@/features/auth';

const ChangePassword = () => {
  const [openSnack, setOpenSnack] = useState(false);
  const [changePassword, { isLoading, data }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      await changePassword(data).unwrap();
    } catch (err) {
      console.error(err);
    }
    setOpenSnack(true);
  };

  return (
    <div className='w-full'>
      <NavLink
        className='flex mm:hidden items-center space-x-1 mb-2'
        to='/profile'
      >
        <img src={arrowIcon} alt='*' />
        <span className='text-sm font-semibold'>Вернуться к профилю</span>
      </NavLink>
      <h3 className='text-lg mm:text-xl font-semibold text-colBlack pb-4'>
        Изменить пароль
      </h3>
      {isLoading ? (
        <Loading extraStyle={380} />
      ) : (
        <form
          className='mm:max-w-[340px] w-full space-y-5'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <CTextField
              label='Текущий пароль'
              type='password'
              icon
              {...register('current_password', {
                required: 'Это поле обязательно',
              })}
              error={errors.current_password}
            />
            {errors.current_password && (
              <p className='text-red-500 mt-1 text-xs font-medium'>
                {errors.current_password.message}
              </p>
            )}
          </div>
          <div>
            <CTextField
              label='Новый пароль'
              type='password'
              icon
              {...register('password', {
                required: 'Это поле обязательно',
                validate: (value) => {
                  if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
                    return 'Требуется хотя бы одна строчная и прописная буква!';
                  }
                  if (!/(?=.*\d)/.test(value)) {
                    return 'Требуется хотя бы одна цифра!';
                  }
                  if (!/(?=.*[@$!%*?&#])/.test(value)) {
                    return 'Требуется хотя бы один специальный символ!';
                  }
                  if (value.length < 8) {
                    return 'Минимальная длина пароля - 8 символов!';
                  }
                  return true;
                },
              })}
            />
            {errors?.password && (
              <p className='text-red-500 mt-1 text-xs font-medium'>
                {errors?.password.message || 'Error!'}
              </p>
            )}
          </div>
          <div>
            <CTextField
              label='Повторите новый пароль'
              type='password'
              icon
              {...register('password_confirmation', {
                required: 'Это поле обязательно',
                validate: (value) =>
                  value === getValues('password') || 'Пароли не совпадают',
              })}
              error={errors.password_confirmation}
            />
            {errors.password_confirmation && (
              <p className='text-red-500 mt-1 text-xs font-medium'>
                {errors.password_confirmation.message}
              </p>
            )}
          </div>
          <button
            type='submit'
            disabled={!isValid}
            className={`${
              isValid ? 'bg-colGreen' : 'bg-colGray'
            } h-[38px] px-6 rounded text-white`}
          >
            Изменить
          </button>
        </form>
      )}
      <ModalSnackbar
        message={
          data
            ? data.success
              ? 'Ваш пароль успешно изменён!'
              : `${data.err}`
            : ''
        }
        open={openSnack}
        onClose={() => setOpenSnack(false)}
      />
    </div>
  );
};

export default ChangePassword;
