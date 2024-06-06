import React, { useEffect } from 'react'
import QuestionForm from '../../helpers/QuestionForm'
import { NavLink } from 'react-router-dom'
import vk from '../../assets/images/vk.svg';
import telegram from '../../assets/images/telegram.svg';
import whatsapp from '../../assets/images/whatsapp.svg';
import copyicon from '../../assets/icons/copy-icon.svg';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';


function Contacts() {

  useEffect(() => {
    scrollToTop();
  }, []);



  return (
    <div className="content lining-nums proportional-nums">
      <h1 className='text-[40px] font-semibold text-colBlack my-5'>
        Контакты
      </h1>
      <div className="flex gap-5">
        <div className='basis-[calc(50%-20px/2)] border border-colGreen rounded-xl p-5'>
          <div className=' font-semibold text-2xl mb-3'>Мы всегда на связи</div>
          <div>Вы можете задать вопрос, который вас интересует. Мы постараемся ответить в ближайшее время. Будьте уверены, ваш вопрос не останется без внимания</div>

          <div className='flex gap-5 my-5'>
            <div className='basis-[calc(50%-20px/2)]'>
              <p className='leading-[120%] pb-2'>
                Звоните по горячей линии
              </p>
              <h4 className='text-colBlack text-xl font-semibold lining-nums proportional-nums'>
                8 800 302-14-84
              </h4>
            </div>
            <div className='basis-[calc(50%-20px/2)]'>
              <p className='leading-[120%] pb-2'>
                Пишите в соцсетях и мессенджерах
              </p>
              <div className='flex justify-center md:justify-start pt-2 md:pt-0 items-center space-x-3'>
                <NavLink to='#'>
                  <img src={telegram} alt='*' />
                </NavLink>
                <NavLink to='#'>
                  <img src={whatsapp} alt='*' />
                </NavLink>
                <NavLink to='#'>
                  <img src={vk} alt='*' />
                </NavLink>
              </div>
            </div>
          </div>
          <div>Или оставляйте заявку</div>
          <QuestionForm />
        </div>
        <div className='basis-[calc(50%-20px/2)] bg-colSuperLight rounded-xl p-5 flex flex-col'>
          <div className=' font-semibold text-2xl mb-5'>Реквизиты</div>
          <div className='flex flex-col justify-between grow'>
          <div className='grid grid-cols-3 grid-rows-5'>

<div className=' col-start-1 col-end-2 row-start-1 row-end-2 border border-colDarkGray p-3'>Название фирмы</div>
<div className=' col-start-2 col-end-4 row-start-1 row-end-2 border border-l-0 border-colDarkGray p-3 flex items-center gap-2'>ООО «Росток»
    <img
    onClick={() => { navigator.clipboard.writeText(current?.sku) }}
    src={copyicon}
    alt=""
    className='w-4 h-4 rounded-full cursor-pointer hover:opacity-80' />
</div>

<div className=' col-start-1 col-end-2 row-start-2 row-end-3 border border-t-0 border-colDarkGray p-3'>ИНН</div>
<div className=' col-start-2 col-end-4 row-start-2 row-end-3 border border-l-0 border-t-0 border-colDarkGray p-3 flex items-center gap-2'>ООО «Росток»
    <img
    onClick={() => { navigator.clipboard.writeText(current?.sku) }}
    src={copyicon}
    alt=""
    className='w-4 h-4 rounded-full cursor-pointer hover:opacity-80' />
</div>

<div className=' col-start-1 col-end-2 row-start-3 row-end-4 border border-t-0 border-colDarkGray p-3'>КПП</div>
<div className=' col-start-2 col-end-4 row-start-3 row-end-4 border border-l-0 border-t-0 border-colDarkGray p-3 flex items-center gap-2'>ООО «Росток»
    <img
    onClick={() => { navigator.clipboard.writeText(current?.sku) }}
    src={copyicon}
    alt=""
    className='w-4 h-4 rounded-full cursor-pointer hover:opacity-80' />
</div>

<div className=' col-start-1 col-end-2 row-start-4 row-end-5 border border-t-0 border-colDarkGray p-3'>Почтовый адрес</div>
<div className=' col-start-2 col-end-4 row-start-4 row-end-5 border border-l-0 border-t-0 border-colDarkGray p-3 flex items-center gap-2'>ООО «Росток»
    <img
    onClick={() => { navigator.clipboard.writeText(current?.sku) }}
    src={copyicon}
    alt=""
    className='w-4 h-4 rounded-full cursor-pointer hover:opacity-80' />
</div>

<div className=' col-start-1 col-end-2 row-start-5 row-end-6 border border-t-0 border-colDarkGray p-3'>Название фирмы</div>
<div className=' col-start-2 col-end-4 row-start-5 row-end-6 border border-l-0 border-t-0 border-colDarkGray p-3 flex items-center gap-2'>ООО «Росток»
    <img
    onClick={() => { navigator.clipboard.writeText(current?.sku) }}
    src={copyicon}
    alt=""
    className='w-4 h-4 rounded-full cursor-pointer hover:opacity-80' />
</div>
</div>
<button className=' font-semibold text-colGreen border border-colGreen p-3 rounded w-1/2'>Скачать реквизиты</button>

          </div>
          
         
        </div>
      </div>
      <h2 className='text-[40px] font-semibold text-colBlack my-5'>
        Контакты офисов и производств
      </h2>
      <div className="flex gap-5 mb-20">
        <div className='basis-[calc(33%-(20px*2)/3)] border border-colGreen rounded-xl p-5 flex flex-col'>
          <div className=' font-semibold text-2xl mb-4'>Продажа мебели</div>
          <div className='flex flex-col justify-between grow'>
            <div className='flex flex-col gap-4 mb-10'>
              <div className='flex gap-2 items-end'> 
                <div className=' text-colDarkGray'>Телефон</div>
                <div className=' font-semibold text-lg'>8 (937) 444-67-70</div>
              </div>
              <div className='flex gap-2 items-end'> 
                <div className=' text-colDarkGray'>Режим работы</div>
                <div className=' font-semibold text-lg'>По будням с 8.00 до 17.00</div>
              </div>
              <div className='flex gap-2 items-end'> 
                <div className=' text-colDarkGray'>Эл. почта</div>
                <div className=' font-semibold text-lg'>mebel@rostok.ru</div>
              </div>
              <div className='flex gap-2 items-end'> 
                <div className=' text-colDarkGray'>Адрес</div>
                <div className=' font-semibold text-lg'>г. Кузнецк, ул. Молодой Гвардии, 186</div>
              </div>
            </div>

            <button className=' font-semibold text-colGreen border border-colGreen p-3 rounded w-1/2'>Подробнее</button>

          </div>
        </div>
        <div className='basis-[calc(33%-(20px*2)/3)] border border-colGreen rounded-xl p-5 flex flex-col'>
          <div className=' font-semibold text-2xl mb-4'>Производство фурнитуры и плитных материалов</div>

          <div className='flex flex-col justify-between grow'>
            <div className='flex flex-col gap-4 mb-10'>
              <div className='flex gap-2 items-end'> 
                <div className=' text-colDarkGray'>Телефон</div>
                <div className=' font-semibold text-lg'>8 (937) 444-67-70</div>
              </div>
              <div className='flex gap-2 items-end'> 
                <div className=' text-colDarkGray'>Режим работы</div>
                <div className=' font-semibold text-lg'>По будням с 8.00 до 17.00</div>
              </div>
              <div className='flex gap-2 items-end'> 
                <div className=' text-colDarkGray'>Эл. почта</div>
                <div className=' font-semibold text-lg'>mebel@rostok.ru</div>
              </div>
              <div className='flex gap-2 items-end'> 
                <div className=' text-colDarkGray'>Адрес</div>
                <div className=' font-semibold text-lg'>г. Кузнецк, ул. Молодой Гвардии, 186</div>
              </div>
            </div>

            <button className=' font-semibold text-colGreen border border-colGreen p-3 rounded w-1/2'>Подробнее</button>

          </div>

        </div>
        <div className='basis-[calc(33%-(20px*2)/3)] border border-colGreen rounded-xl p-5 flex flex-col'>
          <div className=' font-semibold text-2xl mb-4'>Производство столешниц</div>
          <div className='flex flex-col justify-between grow'>
            <div className='flex flex-col gap-4 mb-10'>
              <div className='flex gap-2 items-end'> 
                <div className=' text-colDarkGray'>Телефон</div>
                <div className=' font-semibold text-lg'>8 (937) 444-67-70</div>
              </div>
              <div className='flex gap-2 items-end'> 
                <div className=' text-colDarkGray'>Режим работы</div>
                <div className=' font-semibold text-lg'>По будням с 8.00 до 17.00</div>
              </div>
              <div className='flex gap-2 items-end'> 
                <div className=' text-colDarkGray'>Эл. почта</div>
                <div className=' font-semibold text-lg'>mebel@rostok.ru</div>
              </div>
              <div className='flex gap-2 items-end'> 
                <div className=' text-colDarkGray'>Адрес</div>
                <div className=' font-semibold text-lg'>г. Кузнецк, ул. Молодой Гвардии, 186</div>
              </div>
            </div>

            <button className=' font-semibold text-colGreen border border-colGreen p-3 rounded w-1/2'>Подробнее</button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts