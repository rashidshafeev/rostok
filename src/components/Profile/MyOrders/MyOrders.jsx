import CSearchField from '../../../helpers/CustomInputs/CSearchField';
import CSelectField from '../../../helpers/CustomInputs/CSelectField';

const MyOrders = () => {
  return (
    <div className='w-full'>
      <h3 className='text-xl font-semibold text-colBlack pb-4'>Все заказы</h3>
      <div className='max-w-[700px] w-full space-y-4'>
        <CSearchField
          label='Название/код товара или номер заказа'
          name='search'
          type='search'
          borderColor='#222'
          focusedBorderColor='#15765B'
          labelColor='#15765B'
        />
        <div className='grid grid-cols-2 gap-4'>
          <CSelectField
            label='Контрагент'
            name='kontragent'
            labelColor='#15765B'
            inputProps={{
              borderColor: '#222',
              focusedBorderColor: '#15765B',
            }}
            options={[
              { value: 'option1', label: 'Александр' },
              { value: 'option2', label: 'Александр 2' },
              { value: 'option3', label: 'Александр 3' },
            ]}
          />
          <CSelectField
            label='Статус заказа'
            name='status'
            labelColor='#15765B'
            inputProps={{
              borderColor: '#222',
              focusedBorderColor: '#15765B',
            }}
            options={[
              { value: 'option1', label: 'Все' },
              { value: 'option2', label: 'Комплектуется' },
              { value: 'option3', label: 'Ожидает получения' },
              { value: 'option3', label: 'Выполнен' },
              { value: 'option3', label: 'Отменен' },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
