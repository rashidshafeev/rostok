import { Close, Cached, DescriptionOutlined } from '@mui/icons-material';
import { Order } from '@/types/Orders/Order';
import PriceDisplay from '@/components/ProductCard/PriceDisplay';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface OrderDetailsProps {
  order: Order;
}

export const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <div className='p-2 sm:p-3 lg:p-4'>
      <div className='hidden mm:flex space-x-4 mb-4'>
        <button className='flex items-center'>
          <Close className='!w-[18px] font-light text-colGreen mr-1' />
          <p className='text-sm font-semibold text-colBlack leading-[120%]'>
            Отменить
          </p>
        </button>
        <button className='flex items-center'>
          <Cached className='!w-[18px] font-light text-colGreen mr-1' />
          <p className='text-sm font-semibold text-colBlack leading-[120%]'>
            Повторить заказ
          </p>
        </button>
        <button className='flex items-center'>
          <DescriptionOutlined className='!w-4 font-light text-colGreen mr-1' />
          <p className='text-sm font-semibold text-colBlack leading-[120%]'>
            Скачать документы
          </p>
        </button>
      </div>
      <div className='space-y-3'>
        {order.items.map((item) => (
          <NavLink
          to={`/catalog/${item.category.slug}/${item.slug}`}
            key={item.sku}
            className='md:flex justify-between md:space-x-3 border-t border-[#EBEBEB] pt-3'       >
            <div className='flex space-x-2 md:space-x-3 md:w-1/2'>
              <div className='w-[50px] min-w-[50px] h-[50px] rounded-md overflow-hidden bg-colSuperLight p-1'>
                <img
                  className='w-full h-full object-contain'
                  src={item.files[0].small}
                  alt={item.fullName}
                />
              </div>
              <div>
                <p className='text-colBlack text-sm font-medium line-clamp-2 break-all'>
                {item.fullName}
                </p>

                <div className='flex space-x-2 py-1'>
                  <span className='text-xs text-colDarkGray'>
                    Код товара:
                  </span>
                  <span className='text-xs text-colDarkGray'>
                    {item.sku}
                  </span>
                </div>
              </div>
            </div>
            <div className='flex basis-1/3 justify-between items-center md:items-start space-x-3 pl-[58px] md:pl-0 pt-3 md:pt-0'>
              <div className='basis-1/2 text-colBlack whitespace-nowrap'>
                {item.quantity} {item.price.unit || 'шт'}
              </div>
              <div className='basis-1/2 text-colBlack font-bold whitespace-nowrap'>
                <PriceDisplay price={item.price} alignment='right'/>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
