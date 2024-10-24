/* eslint-disable no-useless-escape */
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import CTextField from '../../../helpers/CustomInputs/CTextField';
import CDatePicker from '../../../helpers/CustomInputs/CDatePicker';
import { Controller, useForm } from 'react-hook-form';
import CPhoneField from '../../../helpers/CustomInputs/CPhoneField';
import arrowIcon from '../../../assets/icons/arrow-icon.svg';
import dayjs from 'dayjs';
import { updateProfile } from '../../../api/user';

const PersonalData = () => {
  const { user, token } = useSelector((state) => state?.user);

  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      dateOfBirth: data.dateOfBirth
        ? dayjs(data.dateOfBirth).format('DD-MM-YYYY')
        : null,
    };
    await updateProfile(formData, token);
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
        Личные данные
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid md:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-5 max-w-[1060px]'
      >
        <div className='w-full space-y-5'>
          <Controller
            name='name'
            control={control}
            defaultValue={user?.name}
            rules={{
              required: 'Поле обязательно к заполнению!',
            }}
            render={({ field }) => (
              <CTextField label='Имя' type='text' {...field} />
            )}
          />
          <Controller
            name='email'
            control={control}
            defaultValue={user?.email}
            rules={{
              required: 'Поле обязательно к заполнению!',
            }}
            render={({ field }) => (
              <CTextField label='Эл. почта' type='email' {...field} />
            )}
          />
          <div className='!mt-3 md:!mt-5'>
            <p className='text-colBlack'>Пол</p>
            <Controller
              name='gender'
              control={control}
              defaultValue='male'
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  <FormControlLabel
                    value='male'
                    control={<Radio style={{ color: '#15765B' }} />}
                    label='Мужской'
                  />
                  <FormControlLabel
                    value='female'
                    control={<Radio style={{ color: '#15765B' }} />}
                    label='Женский'
                  />
                </RadioGroup>
              )}
            />
          </div>
        </div>
        <div className='w-full space-y-5'>
          <Controller
            name='last_name'
            control={control}
            defaultValue=''
            rules={{
              required: false,
            }}
            render={({ field }) => (
              <CTextField label='Фамилия' type='text' {...field} />
            )}
          />
          <Controller
            name='phone'
            control={control}
            defaultValue={user?.phone}
            rules={{
              required: 'Поле обязательно к заполнению!',
              pattern: {
                value: /^((\+7|7|8)[\s\-]?)?(\(?\d{3}\)?[\s\-]?)?[\d\s\-]{10}$/,
                message: 'Введите корректный номер телефона',
              },
            }}
            render={({ field }) => <CPhoneField label='Телефон' {...field} />}
          />
          <div className='lg:pt-6'>
            <Controller
              name='dateOfBirth'
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <CDatePicker
                  {...field}
                  label='Дата рождения'
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />
          </div>
        </div>
        <div className='flex items-center h-max pt-3 mm:pt-0'>
          <button className='h-[38px] px-6 bg-colGreen rounded text-white'>
            Сохранить
          </button>
          <button
            onClick={(e) => e.preventDefault()}
            className='ml-3 text-colGreen border-b border-colGreen font-semibold'
          >
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalData;
