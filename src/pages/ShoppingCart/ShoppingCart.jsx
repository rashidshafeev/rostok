import ErrorEmpty from '../../helpers/Errors/ErrorEmpty';

const ShoppingCart = () => {
  return (
    <div className='content pb-6'>
      <h1 className='text-[40px] font-semibold text-colBlack'>Корзина</h1>
      <ErrorEmpty
        title='Корзина пуста!'
        desc='Воспользуйтесь поиском, чтобы найти всё, что нужно.'
      />
    </div>
  );
};

export default ShoppingCart;
