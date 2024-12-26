import { NavLink } from 'react-router-dom';
import { useGetUserOrdersQuery } from '@/redux/api/orderEndpoints';
import { Loading } from '@/shared/ui/Loader';
import arrowIcon from '@/shared/assets/icons/arrow-icon.svg';
import { OrderItem } from './OrderItem';
import { OrderFilters } from './OrderFilters';
import React from 'react';

const MyOrders = () => {
  const { data: orders, isLoading: ordersIsLoading, isSuccess: ordersIsSuccess } = useGetUserOrdersQuery();

  return (
    <div className='w-full lining-nums proportional-nums mb-5'>
      <NavLink className='flex mm:hidden items-center space-x-1 mb-2' to='/profile'>
        <img src={arrowIcon} alt='*' />
        <span className='text-sm font-semibold'>Вернуться к профилю</span>
      </NavLink>
      <h3 className='text-xl font-semibold text-colBlack pb-4'>Все заказы</h3>
      
      {/* <OrderFilters /> */}
      
      <div className='space-y-5'>
        {ordersIsLoading && <Loading />}
        {ordersIsSuccess && orders?.data && orders?.data?.map((order) => (
          <OrderItem key={order?.order_number} order={order} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
