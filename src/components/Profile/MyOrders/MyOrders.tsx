import React from 'react';

import { NavLink } from 'react-router-dom';

import { useGetUserOrdersQuery } from '@/entities/order/api/orderApi';
import arrowIcon from '@/shared/assets/icons/arrow-icon.svg';
import { Loading } from '@/shared/ui/Loader';
import ErrorEmpty from '@/helpers/Errors/ErrorEmpty';

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
        {ordersIsSuccess && orders?.data?.length > 0
          ? orders?.data?.map((order) => (
              <OrderItem key={order?.order_number} order={order} />
            ))
          : null}
        {ordersIsSuccess && (!orders?.data || orders.data.length === 0) && (
          <ErrorEmpty
            title="У вас пока нет заказов!"
            desc="Начните покупки, чтобы увидеть их здесь."
            height="230px"
            hideBtn={true}
          />
        )}
      </div>
    </div>
  );
};

export default MyOrders;
