import boxicon from '@/shared/assets/icons/box-icon.svg';
import checkicon from '@/shared/assets/icons/check-icon.svg';
import stallicon from '@/shared/assets/icons/stall-icon.svg';
import truckicon from '@/shared/assets/icons/truck-icon.svg';

import type { Product } from '@/entities/product/Product';

interface DeliveryInfoProps {
  product: Product | null;
}

export const DeliveryInfo = ({ product }: DeliveryInfoProps) => {
  return (
    <div className="flex flex-col gap-4 px-5">
      <div className="flex">
        <img className="w-5 mr-2 " src={checkicon} alt="*" />
        <div className="text-sm">
          {product && product?.availability?.stock !== 0
            ? `В наличии ${product.availability.stock} шт.`
            : null}
          {product &&
          product?.availability?.stock === 0 &&
          product?.availability?.preorder === null
            ? 'Нет в наличии'
            : null}
          {product && product?.availability?.preorder !== null
            ? `Нет в наличии, ожидается ${product.availability.preorder.formatted}`
            : null}
        </div>
      </div>
      {/* 
      <div className="flex">
        <img className="w-5 mr-2" src={stallicon} alt="*" />
        <div className="text-colGreen font-semibold underline underline-offset-8 cursor-pointer mr-2 text-sm">
          Самовывоз:
        </div>
        <div className="text-sm"> сегодня, из 1 магазина</div>
      </div>
      <div className="flex">
        <img className="w-5 mr-2" src={truckicon} alt="*" />
        <div className="text-colGreen font-semibold underline underline-offset-8 cursor-pointer mr-2 text-sm">
          Доставка:
        </div>
        <div className="text-sm">25 октября</div>
      </div>
      <div className="flex">
        <img className="w-5 mr-2" src={boxicon} alt="*" />
        <div className="text-colGreen font-semibold underline underline-offset-8 cursor-pointer mr-2 text-sm">
          Транспортная компания:
        </div>
        <div className="text-sm">25 октября</div>
      </div> */}
    </div>
  );
};
