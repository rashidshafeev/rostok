import React, { useState } from 'react'
import arrow from '../../assets/icons/arrow-icon.svg';
import fizlicoactive from '../../assets/icons/fizlico-active.svg';
import urlico from '../../assets/icons/urlico-inactive.svg';

import stallicon from '../../assets/icons/stall-icon.svg';
import truckicon from '../../assets/icons/truck-icon.svg';
import boxicon from '../../assets/icons/box-icon.svg';


import { NavLink } from 'react-router-dom';
import CTextField from '../../helpers/CustomInputs/CTextField';

import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

import './CartCheckout.css'
import CustomRadioButton from './CustomRadioButton';
import PickupPointModal from '../../helpers/CModal/PickupPointModal';

import CSearchField from '../../helpers/CustomInputs/CSearchField';
import SubwayIcon from '../../helpers/Icons/SubwayIcon';


function CartCheckout() {
  const [type, setType] = useState('fizlico')
  const [deliveryType, setDeliveryType] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  const [pickupPointModal, setPickupPointModal] = useState(false)

  const handlePickupPointModalOpen = () => {
    setPickupPointModal(true);
  };
  const handlePickupPointModalClose = () => {
    setPickupPointModal(false);
  };


  const handleDeliveryTypeChange = (e) => {}

  const handleDeliveryDateChange = (e) => { 
    setDeliveryDate(e.currentTarget.getAttribute("data-customvalue"))
  }
  const handlePaymentMethodChange = (e) => { 
    setPaymentMethod(e.currentTarget.getAttribute("data-customvalue"))
  }

  const dates = [
    { date: "19.01.2024" },
    { date: "20.01.2024" },
    { date: "21.01.2024" },
    { date: "22.01.2024" },
  ]

  const points = [
    {
        address: 'г. Москва, Волгоградский проспект, д. 120',
        coord: [55.684758, 37.738521]
    },
    {
        address: 'г. Москва, Волгоградский проспект, д. 122',
        coord: [55.884758, 37.438521]
    },
    {
        address: 'г. Москва, Волгоградский проспект, д. 123',
        coord: [55.584758, 37.438521]
    },
    {
        address: 'г. Москва, Волгоградский проспект, д. 124',
        coord: [55.584758, 37.138521]
    },
]

  return (
    <>
      <NavLink to='/shopping-cart'>
        <div className='flex mb-[10px]'>
          <img src={arrow} alt="" />
          <div className='font-semibold'>Вернуться к корзине</div>
        </div>
      </NavLink>

      <div className=' font-semibold text-[40px]'>Оформление заказа</div>

      <div className='flex flex-col gap-5'>
        <div className='font-semibold text-2xl my-5'>
          1. Укажите данные получателя
        </div>
        <div className='flex gap-2'>
          <button className='p-3 bg-colGreen rounded font-semibold text-white flex gap-1 items-center'>
            <img src={fizlicoactive} alt="" srcset="" />
            Покупаю как физлицо
          </button>
          <button className='p-3 border border-colGreen rounded font-semibold text-colGreen flex gap-1 items-center'>
            <img src={urlico} alt="" srcset="" />
            Покупаю как юрлицо
          </button>
        </div>
        <div className='flex gap-2'>
          <div className='w-[340px]'>
            <CTextField placeholder='Имя' label='Имя' />

          </div>
          <div className='w-[340px]'>

            <CTextField placeholder='Электронная почта' label='Email' />

          </div>

        </div>
        <div className='flex gap-2'>
          <div className='w-[340px]'>
            <CTextField placeholder='+7 (___)-___-__' label='Телефон' />

          </div>

          <button className='py-2 px-7 bg-colGreen rounded font-semibold text-white'>Получить код </button>
        </div>

      </div>



      <div className='flex flex-col gap-5'>
        <div className='font-semibold text-2xl my-5 mt-12'>
          2. Где и как вы хотите получить заказ
        </div>

        <div className='flex gap-5'>

          <div onClick={() => setDeliveryType('samovyvoz')} className={`flex flex-col w-[300px] p-5 border ${ deliveryType === 'samovyvoz'? 'border-colGreen' : 'border-colLightGray'} hover:border-colGreen rounded-[10px] cursor-pointer`}>
            <div className='mb-[10px]'>
              <img className='w-10 h-10' src={stallicon} alt="" />
            </div>

            <div className='mb-[10px] decoration-colGreen font-semibold text-colGreen mr-2 text-sm'>Самовывоз</div>
            <div className='text-sm'>
              сегодня, из 1 магазина</div>

          </div>
          <div onClick={() => setDeliveryType('delivery')} className={`flex flex-col w-[300px] p-5 border ${ deliveryType === 'delivery'? 'border-colGreen' : 'border-colLightGray'} hover:border-colGreen rounded-[10px] cursor-pointer`} >
            <div className='mb-[10px]'>
              <img className='w-10 h-10' src={truckicon} alt="" />
            </div>

            <div className='mb-[10px] decoration-colGreen font-semibold text-colGreen  mr-2 text-sm'>Доставка курьером</div>
            <div className='text-sm'>
              завтра, от 500 р.</div>

          </div>
          <div onClick={() => setDeliveryType('tk')} className={`flex flex-col w-[300px] p-5 border ${ deliveryType === 'tk'? 'border-colGreen' : 'border-colLightGray'} hover:border-colGreen rounded-[10px] cursor-pointer`}>
            <div className='mb-[10px]'>
              <img className='w-10 h-10' src={boxicon} alt="" />
            </div>

            <div className='mb-[10px] decoration-colGreen font-semibold text-colGreen mr-2 text-sm'>Транспортной компанией</div>
            <div className='text-sm'>
              СДЕК, Деловые Линии и др.</div>

          </div>

        </div>

        <div className='flex justify-between items-start border border-colLightGray rounded-[10px]'>
          <div className='p-5 h-full flex flex-col justify-between'>
            <div className='flex flex-col gap-2 mb-5'>
              <div className='font-semibold'>
                Выбранный пункт самовывоза
              </div>
              <div className=''>
                г. Москва, ТЦ Росток,  ул. Ленина, д. 15 к2 секция 4
              </div>
              <div className='text-colGreen font-semibold'>
                Забирайте сегодня
              </div>
              <div className=''>
                Пн-Вс: с 8 до 21
              </div>
            </div>

            <button onClick={handlePickupPointModalOpen} className='rounded text-colGreen border border-colGreen w-fit py-3 px-5 font-semibold'>Изменить</button>
    <PickupPointModal open={pickupPointModal} handleClose={handlePickupPointModalClose}/>
          </div>

          <YMaps >
            <div className='rounded overflow-hidden grow'  >

              <Map className='w-full h-[300px] grow' defaultState={{ center: [55.75, 37.57], zoom: 9 }} >

               <Placemark geometry={[55.684758, 37.738521]} />
              </Map>
            </div>
          </YMaps>

        </div>

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
                // <div class="form_radio">
                //   <input id={date.date} type="radio" name="radio" value={date.date} onChange={handleDeliveryDateChange} checked={deliveryDate === date.date} />
                //   <label for={date.date}>{date.date}</label>
                // </div>
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


        
    </>
  )
}

export default CartCheckout