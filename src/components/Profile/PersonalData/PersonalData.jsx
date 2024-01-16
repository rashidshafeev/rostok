import {
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import CTextField from '../../../helpers/CustomInputs/CTextField';
import CDatePicker from '../../../helpers/CustomInputs/CDatePicker';

const PersonalData = () => {
  return (
    <div className='w-full'>
      <h3 className='text-xl font-semibold text-colBlack pb-4'>
        Личные данные
      </h3>
      <form className='grid grid-cols-3 gap-5 max-w-[1060px]'>
        <div className='w-full space-y-5'>
          <CTextField
            label='Имя'
            name='name'
            type='text'
            borderColor='#222'
            focusedBorderColor='#15765B'
            labelColor='#15765B'
          />
          <CTextField
            label='Фамилия'
            name='lastName'
            type='text'
            borderColor='#222'
            focusedBorderColor='#15765B'
            labelColor='#15765B'
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
          <CTextField
            label='Почта'
            name='email'
            type='email'
            borderColor='#222'
            focusedBorderColor='#15765B'
            labelColor='#15765B'
          />
          <CTextField
            label='Телефон'
            name='phone'
            type='tel'
            borderColor='#222'
            focusedBorderColor='#15765B'
            labelColor='#15765B'
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
