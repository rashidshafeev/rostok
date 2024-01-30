/* eslint-disable no-useless-escape */
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import CTextField from '../../../helpers/CustomInputs/CTextField';
import CDatePicker from '../../../helpers/CustomInputs/CDatePicker';
import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import CPhoneField from '../../../helpers/CustomInputs/CPhoneField';

const PersonalData = () => {
  const { user } = useSelector((state) => state?.user);

  const { control } = useForm();

  return (
    <div className='w-full'>
      <h3 className='text-xl font-semibold text-colBlack pb-4'>
        Личные данные
      </h3>
      <form className='grid grid-cols-3 gap-5 max-w-[1060px]'>
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

          <div>
            <p className='text-colBlack'>Пол</p>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
              defaultValue='male'
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
          </div>
        </div>
        <div className='w-full space-y-5'>
          <CTextField label='Фамилия' name='lastName' type='text' />
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
          <div className='pt-6'>
            <CDatePicker name='dateOfBirth' label='Дата рождения' />
          </div>
        </div>
        <div className='flex items-center h-max'>
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
