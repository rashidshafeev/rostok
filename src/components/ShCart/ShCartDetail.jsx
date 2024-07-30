import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import CCheckBoxField from '../../helpers/CustomInputs/CCheckBoxField';
import CSearchField from '../../helpers/CustomInputs/CSearchField';
import ShCartItem from './ShCartItem';
import MobileShCartItem from './MobileShCartItem';
import ShCartItemLine from './ShCartItemLine';
import shareIcon from '../../assets/icons/share.svg';
import docIcon from '../../assets/icons/download-pdf.svg';
import { useDispatch, useSelector } from 'react-redux';
import plural from 'plural-ru'
import { removeFromCart, selectItem, unselectItem } from '../../redux/slices/cartSlice';
import BreadCrumbs from '../../helpers/BreadCrumbs/BreadCrumbs';
import MobileToCheckoutBar from './MobileToCheckoutBar';
// import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useIntersection, useWindowSize } from 'react-use';
import { useGetUserCartQuery, useSendCartMutation } from '../../redux/api/cartEndpoints';
import CardLineSkeleton from '../Catalog/TypesOfCards/CardLineSkeleton';
import { getTokenFromCookies } from '../../helpers/cookies/cookies';
import LineNarrowSkeleton from '../Catalog/TypesOfCards/LineNarrowSkeleton';

const ShCartDetail = () => {
  
  const token = getTokenFromCookies();
  const { cart: localCart } = useSelector((state) => state.cart);
  console.log('shopping cart rendered')
  // Fetching cart data from the server if the user is logged in
  const { data: serverCart, isLoading, error } = useGetUserCartQuery(undefined, { skip: !token });
  const cart = token ? serverCart?.data : localCart;

  const [sendCart, { isLoading: sendCartIsLoading }] = useSendCartMutation();

  const [itemType, setItemType] = useState('lineBig');
  const [filteredCart, setFilteredCart] = useState([])

  const orderInfo = useRef(null);
  const orderInfoVisible = useIntersection(orderInfo, {
    root: null,
    rootMargin: '0px',
    threshold: 1
  });

  const { width, height } = useWindowSize();

  const dispatch = useDispatch();

  const selected = cart?.filter((item) => item.selected === true || item.selected.toString() === '1');

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;


    if (!isChecked) {
      
      const payload = selected.map(item => ({
        id: item.id,
        quantity: item.quantity,
        selected: 0
      }))

      token ? sendCart({items: payload}) : selected.forEach((item) => dispatch(unselectItem(item)));

    } else {
      const unselectedItems = cart?.filter(item => !item.selected);

      const payload = unselectedItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        selected: 1
      }));

      token ? sendCart({items: payload}) : unselectedItems.forEach((item) => dispatch(selectItem(item)));

    }

  }

  const handleRemoveSelected = () => {
    const payload = selected.map(item => ({
      id: item.id,
      quantity: 0,
      selected: 0
    }))

    token ? sendCart({items: payload}) : selected.forEach((item) => dispatch(removeFromCart(item)));
  }

  const handleFilter = (event) => {
    const filterValue = event.target.value; 

    let filteredCart = cart.filter((product) => product.name.toLowerCase().includes(filterValue.toLowerCase()) || product.groupName.toLowerCase().includes(filterValue.toLowerCase()) || product.sku.includes(filterValue))
    console.log(filteredCart)


    setFilteredCart(filteredCart)
  }

  useEffect(() => {
    setFilteredCart(cart)

    const allItems = cart?.map((el) => el);

  }, [cart])


  return (
    <>

      <div className='hidden lg:flex justify-between items-end'>
        <div className='flex max-w-[460px] w-full pt-3'>
          <CSearchField
            label='Введите наименование или артикул'
            name='search'
            type='search'
            handleChange={handleFilter}
          />

        </div>
        <div className='flex justify-end items-center space-x-4 '>
          <div className='flex cursor-pointer'>
            <img src={shareIcon} alt='*' />
            <span className='text-xs font-medium text-colBlack pl-2'>
              Поделиться
            </span>
          </div>
          <div className='flex cursor-pointer'>
            <img src={docIcon} alt='*' />
            <span className='text-xs font-medium text-colBlack pl-2'>
              Скачать PDF заказа
            </span>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap gap-10 py-5'>
        <div className='lg:basis-[calc(70%-20px)] basis-full'>
          <div className='flex justify-between items-center pb-2'>
            <div className='flex items-center'>
              <div className='pb-[3px]'>
                <CCheckBoxField
                  label='Выбрать всё'
                  onChange={handleSelectAllChange}
                  checked={cart?.length === selected?.length}
                  styles='text-colBlack font-medium text-sm'
                />
              </div>
              {selected?.length !== 0 && <button
                onClick={handleRemoveSelected}
                className='text-colDarkGray font-medium text-sm ml-4'
              >
                Удалить выбранные
              </button>}




            </div>
            <div className='block lg:hidden'>
              <img className="w-6 h-6" src={shareIcon} alt="" />

            </div>
            <div className='hidden lg:flex justify-end items-center space-x-2 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                className='cursor-pointer'
                onClick={() => setItemType('lineBig')}
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M2.33301 2.6665C1.78072 2.6665 1.33301 3.11422 1.33301 3.6665V5.6665C1.33301 6.21879 1.78072 6.6665 2.33301 6.6665H4.33301C4.88529 6.6665 5.33301 6.21879 5.33301 5.6665V3.6665C5.33301 3.11422 4.88529 2.6665 4.33301 2.6665H2.33301ZM2.33301 7.99984C1.78072 7.99984 1.33301 8.44755 1.33301 8.99984V10.9998C1.33301 11.5521 1.78072 11.9998 2.33301 11.9998H4.33301C4.88529 11.9998 5.33301 11.5521 5.33301 10.9998V8.99984C5.33301 8.44755 4.88529 7.99984 4.33301 7.99984H2.33301ZM1.33301 14.3332C1.33301 13.7809 1.78072 13.3332 2.33301 13.3332H4.33301C4.88529 13.3332 5.33301 13.7809 5.33301 14.3332V16.3332C5.33301 16.8855 4.88529 17.3332 4.33301 17.3332H2.33301C1.78072 17.3332 1.33301 16.8855 1.33301 16.3332V14.3332ZM9 2.6665C8.44772 2.6665 8 3.11422 8 3.6665V5.6665C8 6.21879 8.44772 6.6665 9 6.6665H17.6667C18.219 6.6665 18.6667 6.21879 18.6667 5.6665V3.6665C18.6667 3.11422 18.219 2.6665 17.6667 2.6665H9ZM8 9C8 8.44772 8.44772 8 9 8H17.6667C18.219 8 18.6667 8.44772 18.6667 9V11C18.6667 11.5523 18.219 12 17.6667 12H9C8.44772 12 8 11.5523 8 11V9ZM9 13.333C8.44772 13.333 8 13.7807 8 14.333V16.333C8 16.8853 8.44772 17.333 9 17.333H17.6667C18.219 17.333 18.6667 16.8853 18.6667 16.333V14.333C18.6667 13.7807 18.219 13.333 17.6667 13.333H9Z'
                  fill={`${itemType === 'lineSmall' ? '#B5B5B5' : '#15765B'}`}
                />
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                className='cursor-pointer'
                onClick={() => setItemType('lineSmall')}
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M1.33301 3.6665C1.33301 3.11422 1.78072 2.6665 2.33301 2.6665H17.6663C18.2186 2.6665 18.6663 3.11422 18.6663 3.6665V5.6665C18.6663 6.21879 18.2186 6.6665 17.6663 6.6665H2.33301C1.78072 6.6665 1.33301 6.21879 1.33301 5.6665V3.6665ZM1.33301 8.99984C1.33301 8.44755 1.78072 7.99984 2.33301 7.99984H17.6663C18.2186 7.99984 18.6663 8.44755 18.6663 8.99984V10.9998C18.6663 11.5521 18.2186 11.9998 17.6663 11.9998H2.33301C1.78072 11.9998 1.33301 11.5521 1.33301 10.9998V8.99984ZM2.33301 13.3332C1.78072 13.3332 1.33301 13.7809 1.33301 14.3332V16.3332C1.33301 16.8855 1.78072 17.3332 2.33301 17.3332H17.6663C18.2186 17.3332 18.6663 16.8855 18.6663 16.3332V14.3332C18.6663 13.7809 18.2186 13.3332 17.6663 13.3332H2.33301Z'
                  fill={`${itemType === 'lineBig' ? '#B5B5B5' : '#15765B'}`}
                />
              </svg>
            </div>
          </div>
          {isLoading && 
          <div className='flex flex-col gap-3'>
              {Array.from({ length: 6 }).map((_, index) => (
        <CardLineSkeleton key={index} />
      ))}
          </div>
          
          }
          {(itemType === 'lineBig' && width > 991 && !isLoading) ? (
            <ShCartItem
              cart={filteredCart}
              selectedItems={selected}
            />
          ) : (itemType === 'lineSmall' && width > 991 && !isLoading) ? (
            <ShCartItemLine
              cart={filteredCart}
              selectedItems={selected}
            />
          ) : (
            <MobileShCartItem
              cart={filteredCart}
              selectedItems={selected}
            />
          )}
        </div>
        <div ref={orderInfo} className='lg:basis-[calc(30%-20px)] basis-full'>

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
                    {selected?.length} {plural(selected?.length, 'товар', 'товара', 'товаров')}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-colBlack text-sm whitespace-nowrap'>
                    Количество
                  </span>
                  <span className='w-full border-b border-colGray border-dashed mt-2 mx-1'></span>
                  <span className='font-bold whitespace-nowrap'>{cart?.selectedQuantity} шт</span>
                </div>
                <div className='flex justify-between items-center pt-2'>
                  <span className='text-colBlack text-sm'>Вес</span>
                  <span className='w-full border-b border-colGray border-dashed mt-2 mx-1'></span>
                  <span className='font-bold whitespace-nowrap'>19.5 кг</span>
                </div>
                <br />
                <div className='flex justify-between items-center'>
                  <span className='text-colBlack text-sm'>Сумма</span>
                  <span className='w-full border-b border-colGray border-dashed mt-2 mx-1'></span>
                  <span className='font-bold whitespace-nowrap'>53 848 ₽</span>
                </div>
                <div className='flex justify-between items-center pt-2'>
                  <span className='text-colBlack text-sm'>Скидка</span>
                  <span className='w-full border-b border-colGray border-dashed mt-2 mx-1'></span>
                  <span className='font-bold whitespace-nowrap'>- 13 848 ₽</span>
                </div>
                <div className='flex justify-between items-center pt-3 pb-5'>
                  <span className='text-lg font-semibold text-colBlack'>Итого</span>
                  <span className='text-lg font-semibold text-colBlack'>
                    40 000 ₽
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
        </div>
      </div>
      {(orderInfoVisible && orderInfoVisible.intersectionRatio < 1) && <MobileToCheckoutBar selected={selected} quantity={cart?.selectedQuantity} />}

    </>
  );
};

export default ShCartDetail;
