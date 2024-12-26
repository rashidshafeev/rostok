import { Close, Cached, DescriptionOutlined } from '@mui/icons-material';
import { Order } from '@/types/Orders/Order';
import PriceDisplay from '@/components/ProductCard/PriceDisplay';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCancelOrderMutation, useRepeatOrderMutation, useCreatePDFOrderMutation } from '@/redux/api/orderEndpoints';
import { useModal } from '@/features/modals/model/context';
import { toast } from 'sonner';

interface OrderDetailsProps {
  order: Order;
}

export const OrderDetails = ({ order }: OrderDetailsProps) => {
  const [cancelOrder] = useCancelOrderMutation();
  const [repeatOrder] = useRepeatOrderMutation();
  const [createPDFOrder] = useCreatePDFOrderMutation();
  const { showModal } = useModal();
  const navigate = useNavigate();

  const handleCancelOrder = async () => {
    try {
      await cancelOrder({
        order_number: order.order_number,
      }).unwrap();
    } catch (err: any) {
      console.error('Error canceling order:', err);
    }
  };

  const handleRepeatOrder = async () => {
    try {
      const result = await repeatOrder({
        order_number: order.order_number,
      }).unwrap();
      if (result.success === 'ok') {
        navigate(`/profile/orders/`);
        toast.success('Заказ успешно повторен');
      }
    } catch (err: any) {
      console.error('Error repeating order:', err);
      showModal({
        type: 'confirmation',
        title: 'Ошибка',
        text: 'Не удалось повторить заказ. Пожалуйста, попробуйте позже.',
        action: () => {}
      });
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const result = await createPDFOrder({
        order_number: order.order_number,
      }).unwrap();
      
      if (result.success === 'ok' && result.file) {
        const url = window.URL.createObjectURL(result.file);
        const link = document.createElement('a');
        link.href = url;
        link.download = `order-${order.order_number}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (err: any) {
      console.error('Error downloading PDF:', err);
      showModal({
        type: 'confirmation',
        title: 'Ошибка',
        text: 'Не удалось скачать PDF. Пожалуйста, попробуйте позже.',
        action: () => {}
      });
    }
  };

  const handleCancelClick = () => {
    showModal({
      type: 'confirmation',
      title: 'Отмена заказа',
      text: 'Вы уверены, что хотите отменить заказ?',
      action: handleCancelOrder
    });
  };

  return (
    <div className='p-2 sm:p-3 lg:p-4'>
      <div className='hidden mm:flex space-x-4 mb-4'>
        <button 
          className='flex items-center cursor-pointer'
          onClick={handleCancelClick}
        >
          <Close className='!w-[18px] font-light text-colGreen mr-1' />
          <p className='text-sm font-semibold text-colBlack leading-[120%]'>
            Отменить
          </p>
        </button>
        <button 
          className='flex items-center cursor-pointer'
          onClick={handleRepeatOrder}
        >
          <Cached className='!w-[18px] font-light text-colGreen mr-1' />
          <p className='text-sm font-semibold text-colBlack leading-[120%]'>
            Повторить заказ
          </p>
        </button>
        <button 
          className='flex items-center cursor-pointer'
          onClick={handleDownloadPDF}
        >
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
            className='md:flex justify-between md:space-x-3 border-t border-[#EBEBEB] pt-3'
          >
            <div className='flex space-x-2 md:space-x-3 md:w-1/2'>
              <div className='w-[50px] min-w-[50px] h-[50px] rounded-md overflow-hidden bg-colSuperLight p-1'>
                <img
                  className='w-full h-full object-contain'
                  src={item.files[0]?.small}
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
            <div className='flex basis-1/3 justify-between items-center md:items-center space-x-3 pl-[58px] md:pl-0 pt-3 md:pt-0'>
              <div className='basis-1/3 text-colBlack font-semibold text-right  whitespace-nowrap'>
                {item.quantity} {item.price.unit || 'шт'}
              </div>
              <div className='basis-1/3 text-colBlack whitespace-nowrap'>
              <PriceDisplay price={item.price} alignment='right'/>
              </div>
              <div className='basis-1/3 text-colBlack text-lg text-right font-bold whitespace-nowrap'>
                {item.price.total} {item.price.currency.symbol}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
