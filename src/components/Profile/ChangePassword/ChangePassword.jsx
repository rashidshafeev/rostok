import { NavLink } from 'react-router-dom';
import CTextField from '../../../helpers/CustomInputs/CTextField';
import arrowIcon from '../../../assets/icons/arrow-icon.svg';

const ChangePassword = () => {
  return (
    <div>
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
      <form className='mm:max-w-[340px] w-full space-y-5'>
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
