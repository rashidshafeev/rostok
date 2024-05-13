import React, { useState } from 'react'
import arrow from '../../assets/icons/arrow-icon.svg';
import fizlicoactive from '../../assets/icons/fizlico-active.svg';
import fizlico from '../../assets/icons/fizlico-inactive.svg';
import urlicoactive from '../../assets/icons/urlico-active.svg';
import urlico from '../../assets/icons/urlico-inactive.svg';

import stallicon from '../../assets/icons/stall-icon.svg';
import truckicon from '../../assets/icons/truck-icon.svg';
import boxicon from '../../assets/icons/box-icon.svg';

import shareIcon from '../../assets/icons/share.svg';
import docIcon from '../../assets/icons/download-pdf.svg';

import SubwayIcon from '../../helpers/Icons/SubwayIcon';

import plural from 'plural-ru'
import {
  postAuthCheck,
  postAuthWithEmail,
  postRegister,
  postSendVerificationCode,
  postConfirmVerificationCode,
} from '../../api/user';

import { NavLink, useNavigate } from 'react-router-dom';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

import CustomRadioButton from './CustomRadioButton';
import PickupPointModal from '../../helpers/CModal/PickupPointModal';

import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Loading, LoadingSmall } from '../../helpers/Loader/Loader';

import CPhoneField from '../../helpers/CustomInputs/CPhoneField';
import CTextField from '../../helpers/CustomInputs/CTextField';
import CSearchField from '../../helpers/CustomInputs/CSearchField';
import { CheckCircleRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import CSelectField from '../../helpers/CustomInputs/CSelectField';
import { FormControl, InputLabel, ListSubheader, MenuItem, Select } from '@mui/material';
import AddressModal from '../../helpers/CModal/AddressModal/AddressModal';
import FizlicoLoggedInForm from '../../components/Checkout/FizlicoLoggedInForm';
import UrlicoLoggedInForm from '../../components/Checkout/UrlicoLoggedInForm';
import FizlicoNotLoggedForm from '../../components/Checkout/FizlicoNotLoggedForm';
import UrlicoNotLoggedForm from '../../components/Checkout/UrlicoNotLoggedForm';
import { useSendOrderMutation } from '../../redux/api/api';


function CartCheckout() {

  const navigate = useNavigate();

  const [type, setType] = useState('fizlico')
  const [deliveryType, setDeliveryType] = useState('pickup')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [formErrors, setFormErrors] = useState({})

  const [pickupPoint, setPickupPoint] = useState({
    id: 1,
    address: 'г. Москва, Волгоградский проспект, д. 120',
    coord: [55.684758, 37.738521]
  });

  const [pickupPointModal, setPickupPointModal] = useState(false)

  const handlePickupPointModalOpen = () => {
    setPickupPointModal(true);
  };
  const handlePickupPointModalClose = () => {
    setPickupPointModal(false);
  };

  const [addressModal, setAddressModal] = useState(false)

  const handleAddressModalOpen = () => {
    setAddressModal(true);
  };
  const handleAddressModalClose = () => {
    setAddressModal(false);
  };


  const handleDeliveryDateChange = (e) => {
    setDeliveryDate(e.currentTarget.getAttribute("data-customvalue"))
  }
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.currentTarget.getAttribute("data-customvalue"))
  }

  const user = useSelector((state) => state?.user);
  const cart = useSelector((state) => state?.cart);
  const { organizations } = useSelector((state) => state?.organizations);

  const selected = cart?.cart.filter((item) => item.selected === true);


  const methods = useForm({
    mode: 'onChange'
  })

  const [ sendOrder, result] = useSendOrderMutation()


  const dates = [
    { date: "19.01.2024" },
    { date: "20.01.2024" },
    { date: "21.01.2024" },
    { date: "22.01.2024" },
  ]

  const [miniLoading, setMiniLoading] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openSnack2, setOpenSnack2] = useState(false);
  const [isCode, setIsCode] = useState({ verification: null, sendCode: null });


 

  const onPersonalInfoSubmit = (data) => {
    console.log(data)

    const items = []

    selected.map((item) => {
      items.push({
        id: item.id,
        quantity: item.quantity
      })
    })

    const order = {
      type,
      clientInfo: data,
      deliveryType,
      pickupPoint,
      deliveryDate,
      paymentMethod,
      order: items,
    }
    
    console.log(sendOrder(order))
    console.log(result)
    
    // navigate('/', { state: { order } });
  }

  const onError = (errors, e) => {
    setFormErrors(errors);
    console.log(errors);
  }


 


  const [addressList, setAddressList] = useState([
    'ул Пушкина дом Колотушкина',
    'ул Колотушкина дом Пушкина',
  ]);

  const [address, setAddress] = useState('');

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const [client, setClient] = useState('');
  const handleChange = (event) => {
    setClient(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className='content pb-6 lining-nums proportional-nums'>
      <FormProvider { ...methods}>
            <form  onSubmit={methods.handleSubmit(onPersonalInfoSubmit, onError)}>


      <NavLink to='/shopping-cart'>
        <div className='flex mb-[10px]'>
          <img src={arrow} alt="" />
          <div className='font-semibold'>Вернуться к корзине</div>
        </div>
      </NavLink>
      <div className=' font-semibold text-[40px]'>Оформление заказа</div>
      <div className='flex flex-wrap  py-5'>
        <div className='lg:basis-[70%] basis-full'>

          <div className='flex flex-col gap-5'>
            <div className='font-semibold text-2xl my-5'>
              1. Укажите данные получателя
            </div>
            <div className='flex gap-2'>
              <button onClick={() => setType('fizlico')} className={`p-3 border ${type === 'fizlico' ? 'bg-colGreen text-white' : 'bg-colWhite text-colGreen'}  rounded font-semibold  flex gap-1 items-center`}>
                <img src={type === 'fizlico' ? fizlicoactive : fizlico} width={20} height={20} alt="" srcset="" />
                Покупаю как физлицо
              </button>
              <button onClick={() => setType('urlico')} className={`p-3 border ${type === 'urlico' ? 'bg-colGreen text-white' : 'bg-colWhite text-colGreen'} rounded font-semibold  flex gap-1 items-center`}>
                <img src={type === 'urlico' ? urlicoactive : urlico} width={20} height={20} alt="" srcset="" />
                Покупаю как юрлицо
              </button>
            </div>
              <div className='flex flex-col gap-3'>

                  {(user?.user && type === 'fizlico') &&

                    <FizlicoLoggedInForm user={user}
                      organizations={organizations}
                      isCode={isCode}
                      miniLoading={miniLoading} />}

                  {(!user?.user && type === 'fizlico') &&
                    <FizlicoNotLoggedForm />
                  }

                  {(user?.user && type === 'urlico') &&
                    <UrlicoLoggedInForm user={user}
                      organizations={organizations}
                      isCode={isCode}
                      miniLoading={miniLoading} />
                  }

                  {(!user?.user && type === 'urlico') && <UrlicoNotLoggedForm />}



              </div>
            
          </div>



          <div className='flex flex-col gap-5'>
            <div className='font-semibold text-2xl my-5 mt-12'>
              2. Где и как вы хотите получить заказ
            </div>

            <div className='flex gap-5'>

              <div onClick={() => setDeliveryType('pickup')} className={`flex flex-col basis-[calc(33%-20px/3)] p-5 border ${deliveryType === 'pickup' ? 'border-colGreen' : 'border-colLightGray'} hover:border-colGreen rounded-[10px] cursor-pointer`}>
                <div className='mb-[10px]'>
                  <img className='w-10 h-10' src={stallicon} alt="" />
                </div>

                <div className='mb-[10px] decoration-colGreen font-semibold text-colGreen mr-2 text-sm'>Самовывоз</div>
                <div className='text-sm'>
                  сегодня, из 1 магазина</div>

              </div>
              <div onClick={() => setDeliveryType('delivery')} className={`flex flex-col basis-[calc(33%-20px/3)] p-5 border ${deliveryType === 'delivery' ? 'border-colGreen' : 'border-colLightGray'} hover:border-colGreen rounded-[10px] cursor-pointer`} >
                <div className='mb-[10px]'>
                  <img className='w-10 h-10' src={truckicon} alt="" />
                </div>

                <div className='mb-[10px] decoration-colGreen font-semibold text-colGreen  mr-2 text-sm'>Доставка курьером</div>
                <div className='text-sm'>
                  завтра, от 500 р.</div>

              </div>
              <div onClick={() => setDeliveryType('tk')} className={`flex flex-col basis-[calc(33%-20px/3)] p-5 border ${deliveryType === 'tk' ? 'border-colGreen' : 'border-colLightGray'} hover:border-colGreen rounded-[10px] cursor-pointer`}>
                <div className='mb-[10px]'>
                  <img className='w-10 h-10' src={boxicon} alt="" />
                </div>

                <div className='mb-[10px] decoration-colGreen font-semibold text-colGreen mr-2 text-sm'>Транспортной компанией</div>
                <div className='text-sm'>
                  СДЕК, Деловые Линии и др.</div>

              </div>

            </div>

            {deliveryType === 'pickup' && 
            <div className='md:flex hidden justify-between items-start border border-colLightGray rounded-[10px]'>
            <div className='p-5 h-full flex flex-col justify-between'>
              <div className='flex flex-col gap-2 mb-5'>
                <div className='font-semibold'>
                  Выбранный пункт самовывоза
                </div>
                <div className=''>
                  {pickupPoint?.address || ' '}
                </div>
                <div className='text-colGreen font-semibold'>
                  Забирайте сегодня
                </div>
                <div className=''>
                  Пн-Вс: с 8 до 21
                </div>
              </div>

              <button onClick={handlePickupPointModalOpen} className='rounded text-colGreen border border-colGreen w-fit py-3 px-5 font-semibold'>Изменить</button>
              <PickupPointModal open={pickupPointModal} handleClose={handlePickupPointModalClose} pickupPoint={pickupPoint} setPickupPoint={setPickupPoint} />
            </div>

            <YMaps >
              <div className='rounded overflow-hidden grow'  >

                <Map className='w-full h-[300px] grow' defaultState={{ center: [55.75, 37.57], zoom: 9 }} >

                  <Placemark geometry={pickupPoint.coord} />
                </Map>
              </div>
            </YMaps>

          </div>}

          {deliveryType === 'delivery' &&
          <div className='flex flex-col gap-5'>
            <div className='text-lg font-semibold'>Адрес доставки</div>
            {!user?.address && 
            <>
            <div onClick={handleAddressModalOpen} className='text-colGreen font-semibold decoration-colGreen underline underline-offset-[5px] cursor-pointer'>Добавить адрес</div>
            <AddressModal  open={addressModal} handleClose={handleAddressModalClose} addressList={addressList} setAddressList={setAddressList} />
            </>}
                 
                  <Select
                    label={'Адрес'}
                    name={'address'}
                    value={address}
                    onChange={handleAddressChange}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '1px',
                        borderColor: '#B5B5B5',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '1px',
                        borderColor: '#B5B5B5',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#15765B',
                        borderWidth: '1px',
                      },
                      '&.Mui-focused': {
                        color: '#15765B',
                      },
                      paddingRight: 0,
                    }}
                  >
                    {addressList.map((el, index) => (
                      <MenuItem key={index} value={el}>
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
            <div className='text-lg font-semibold'>Ориентировочная дата доставки: <span className='text-lg font-semibold text-colGreen'>пятница, 25 октября - пятница, 1 ноября</span></div>

            </div>}

          {deliveryType === 'tk' &&
          <div>

            </div>}
            

            <CTextField placeholder='Комментарий' label='Комментарий' multiline rows={4} />





          </div>

          <div className='flex flex-col gap-5'>
            <div className='font-semibold text-2xl my-5 mt-12 '>
              3. Когда вам будет удобно забрать заказ?
            </div>

            <div className='flex gap-5'>
              {
                dates?.map((date) => {
                  return ( 
                    <CustomRadioButton value={date.date} handleChange={handleDeliveryDateChange} checked={date.date === deliveryDate} > {date.date}  </CustomRadioButton>
                  )
                })
              }
            </div>

          </div>

          <div className='flex flex-col gap-5'>
            <div className='font-semibold text-2xl my-5 mt-12 '>
              4. Как вам будет удобнее оплатить заказ?
            </div>
            <div className='flex gap-5'>
              <CustomRadioButton value='onDelivery' handleChange={handlePaymentMethodChange} checked={'onDelivery' === paymentMethod} >
                <div>
                  <div className='font-semibold mb-3'>Наличными или картой в магазине</div>
                  <div>При получении заказа</div>
                </div>
              </CustomRadioButton>
              <CustomRadioButton value='onlinePayment' handleChange={handlePaymentMethodChange} checked={'onlinePayment' === paymentMethod}>
                <div>
                  <div className='font-semibold mb-3'>Онлайн-оплата</div>
                  <div>Картами Visa, MasterCard, Мир</div>
                </div>
              </CustomRadioButton>
            </div>


          </div>


        </div>
        <div className='lg:basis-[30%] basis-full'>
          <div className='border border-[#EBEBEB] rounded-[10px] p-5'>
            {selected.length === 0 ? (
              <div className='text-center text-[#828282] text-lg font-medium mb-5'>
                Корзина пуста
              </div>) : (

              <>
                <div className='flex justify-between items-center pb-3'>
                  <span className='text-xl font-semibold text-colBlack'>
                    Итого
                  </span>
                  <span className='text-xl font-semibold text-colBlack'>
                    40 000 ₽
                    
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-colBlack text-sm whitespace-nowrap'>
                    Выбрано товаров
                  </span>
                  <span className='w-full border-b border-colGray border-dashed mt-2 mx-1'></span>
                  <span className='font-bold whitespace-nowrap'>{selected.length} шт</span>
                </div>
                <div className='flex justify-between items-center pt-2'>
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
                <div className='flex justify-between items-center pt-2 mb-5'>
                  <span className='text-colBlack text-sm'>Скидка</span>
                  <span className='w-full border-b border-colGray border-dashed mt-2 mx-1'></span>
                  <span className='font-bold whitespace-nowrap'>- 13 848 ₽</span>
                </div>

              </>
            )


            }

            <button className={`text-white font-semibold ${selected.length === 0 ? 'bg-colGray' : 'bg-colGreen'} rounded w-full h-[50px] flex justify-center items-center`}>
              Подтвердить заказ
            </button>
          </div>
        </div>

      </div>


      </form>
      </FormProvider>
    </div>
  )
}

export default CartCheckout