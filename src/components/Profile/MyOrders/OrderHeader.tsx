import React from 'react';

import CopyButton from '@/shared/ui/copy-button/CopyButton';

import type { Order } from '@/entities/order/Orders/Order';

interface OrderHeaderProps {
  order: Order;
}

export const OrderHeader = ({ order }: OrderHeaderProps) => {
  return (
    <div>
      <div className="mm:flex items-center mm:space-x-2 pb-2 mm:pb-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center">
              <span>№{order.order_number}</span>
              <CopyButton
                textToCopy={order.order_number.toString()}
                toastMessage="Номер заказа скопирован"
                iconClassName="!w-4 cursor-pointer !mr-3"
              />
            </div>
          </div>
        </div>
        <span
          className="px-2 sm:px-3 lg:px-5 py-[2px] sm:py-1 lg:py-2 rounded-[100px] text-xs sm:text-xs lg:text-sm font-semibold text-center"
          style={{
            color: order.status.text_color,
            backgroundColor: order.status.background_color,
          }}
        >
          {order.status.name}
        </span>
      </div>
      <p className="text-colBlack">Создан: {order.date}</p>
    </div>
  );
};
