import CTextField from '../../../helpers/CustomInputs/CTextField';

const ChangePassword = () => {
  return (
    <div>
      <h3 className='text-xl font-semibold text-colBlack pb-4'>
        Изменить пароль
      </h3>
      <form className='max-w-[340px] w-full space-y-5'>
        <CTextField label='Новый пароль' name='newPassword' type='password' />
        <CTextField
          label='Повторите пароль'
          name='repeatPassword'
          type='password'
        />
        <button
          disabled
          className='h-[38px] px-6 bg-colGray rounded text-white'
        >
          Изменить
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
