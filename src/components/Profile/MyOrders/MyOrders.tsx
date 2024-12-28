import React from 'react';

import { NavLink } from 'react-router-dom';

import { useGetUserOrdersQuery } from '@/entities/order/api/orderEndpoints';
import arrowIcon from '@/shared/assets/icons/arrow-icon.svg';
import { Loading } from '@/shared/ui/Loader';

import { OrderFilters } from './OrderFilters';
import { OrderItem } from './OrderItem';

const MyOrders = () => {
  const {
    data: orders,
    isLoading: ordersIsLoading,
    isSuccess: ordersIsSuccess,
  } = useGetUserOrdersQuery();

  return (
    <div className="w-full lining-nums proportional-nums mb-5">
      <NavLink
        className="flex mm:hidden items-center space-x-1 mb-2"
        to="/profile"
      >
        <img src={arrowIcon} alt="*" />
        <span className="text-sm font-semibold">Вернуться к профилю</span>
      </NavLink>
      <h3 className="text-xl font-semibold text-colBlack pb-4">Все заказы</h3>

      {/* <OrderFilters /> */}

      <div className="space-y-5">
        {ordersIsLoading ? <Loading /> : null}
        {ordersIsSuccess && orders?.data
          ? orders?.data?.map((order) => (
              <OrderItem key={order?.order_number} order={order} />
            ))
          : null}
      </div>
    </div>
  );
};

export default MyOrders;
