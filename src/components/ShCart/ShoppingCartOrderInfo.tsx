import React, { useRef } from 'react'
import { useIntersection } from 'react-use';
import plural from 'plural-ru'
import { NavLink } from 'react-router-dom';
import { getTokenFromCookies } from '../../helpers/cookies/cookies';
import { CartProduct, LocalCartState } from '@/types/Store/Cart/CartState';

type ShoppingCartOrderInfoProps = {
  cart: LocalCartState,
  selected: CartProduct[],
}

const ShoppingCartOrderInfo : React.FC<ShoppingCartOrderInfoProps> = ({ cart, selected }) => {
    const token = getTokenFromCookies()

  return (
<>

    <div className='border border-[#EBEBEB] rounded-[10px] p-5'>
      {selected?.length === 0 ? (
        <div className='text-center text-[#828282] text-lg font-medium mb-5'>
          Выберите товары, которые хотите заказать
        </div> ) : (

        <>
          <div className='flex justify-between items-center pb-3'>
            <span className='text-xl font-semibold text-colBlack'>
              Итого
            </span>
            <span className='text-xl font-semibold text-colBlack'>
            {cart?.selected?.count} {plural(selected?.length, 'товар', 'товара', 'товаров')}
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-colBlack text-sm whitespace-nowrap'>
              Количество
            </span>
            <span className='w-full border-b border-colGray border-dashed mt-2 mx-1'></span>
            <span className='font-bold whitespace-nowrap'>{cart?.selected?.quantity} шт</span>
          </div>
          {/* <div className='flex justify-between items-center pt-2'>
            <span className='text-colBlack text-sm'>Вес</span>
            <span className='w-full border-b border-colGray border-dashed mt-2 mx-1'></span>
            <span className='font-bold whitespace-nowrap'>19.5 кг</span>
          </div> */}
          <br />
          <div className='flex justify-between items-center'>
            <span className='text-colBlack text-sm'>Сумма</span>
            <span className='w-full border-b border-colGray border-dashed mt-2 mx-1'></span>
            <span className='font-bold whitespace-nowrap'>{cart?.selected?.amount} {cart?.currency.symbol }</span>
          </div>
          {cart?.selected?.discount > 0 && <div className='flex justify-between items-center pt-2'>
            <span className='text-colBlack text-sm'>Скидка</span>
            <span className='w-full border-b border-colGray border-dashed mt-2 mx-1'></span>
            <span className='font-bold whitespace-nowrap'>-{cart?.selected?.discount} {cart?.currency?.symbol }</span>
          </div>}
          <div className='flex justify-between items-center pt-3 pb-5'>
            <span className='text-lg font-semibold text-colBlack'>Итого</span>
            <span className='text-lg font-semibold text-colBlack'>
              {cart?.selected?.amount - cart?.selected?.discount} {cart?.currency?.symbol }
            </span>
          </div>

        </>
      )


      }
      
      {selected?.length === 0 && <button className={`text-white cursor-auto font-semibold bg-colGray rounded w-full h-[50px] flex justify-center items-center`}>
        Перейти к оформлению
      </button>}
      {selected?.length !== 0 && <NavLink to='/checkout' className={`text-white font-semibold bg-colGreen rounded w-full h-[50px] flex justify-center items-center`}>
        Перейти к оформлению
      </NavLink>}
    </div>
    </>
  )
}

export default ShoppingCartOrderInfo