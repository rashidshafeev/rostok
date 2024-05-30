import React, { useState } from 'react'

import stallicon from '../../assets/icons/stall-icon.svg';
import truckicon from '../../assets/icons/truck-icon.svg';
import boxicon from '../../assets/icons/box-icon.svg';


function PaymentDelivery() {
    const [delivery, setDelivery] = useState('pickup');
    const [payment, setPayment] = useState('cash');



    return (
        <div className="content lining-nums ">
            <h3 className='text-2xl my-5 font-semibold'>Оплата и доставка</h3>

            <h4 className='text-xl mt-5 mb-[10px] font-semibold '>Способы оплаты</h4>

            <div className="flex gap-5 mb-[40px]">
                <div className='flex flex-col gap-5 shrink basis-[calc(30%-10px)]'>

                    <div className={`flex p-5 border ${ payment === 'cash' ? 'border-colGreen' : 'border-colLightGray'}  rounded-[10px] gap-3`} onClick={() => setPayment('cash')}>
                        <div className='mb-[10px]'>
                            <img className='w-10 h-10' src={stallicon} alt="" />

                        </div>
                        <div>
                        <div className='mb-[10px] font-semibold cursor-pointer mr-2 text-xl text-colGreen'>Наличными</div>
                        <div className='text-sm'>
                            При получении заказа</div>
                        </div>
                        

                    </div>
                    <div className={`flex p-5 border ${ payment === 'online' ? 'border-colGreen' : 'border-colLightGray'}  rounded-[10px] gap-3`} onClick={() => setPayment('online')}>
                        <div className='mb-[10px]'>
                            <img className='w-10 h-10' src={truckicon} alt="" />
                        </div>
                            <div>
                            <div className='mb-[10px] font-semibold cursor-pointer mr-2 text-xl text-colGreen'>Онлайн-оплата</div>
                        <div className='text-sm'>
                            Картами Visa, MasterCard, Мир</div>
                            </div>
                        

                    </div>
                    <div className={`flex p-5 border ${ payment === 'account' ? 'border-colGreen' : 'border-colLightGray'}  rounded-[10px] gap-3`} onClick={() => setPayment('account')}>
                        <div className='mb-[10px]'>
                            <img className='w-10 h-10' src={boxicon} alt="" />
                        </div>
                        <div>
                        <div className='mb-[10px] font-semibold cursor-pointer mr-2 text-xl text-colGreen'>Оплата по счёту</div>
                        <div className='text-sm'>
                            Для юридических лиц</div>
                            </div>

                        

                    </div>


                </div>

                {payment === 'cash' &&  <div className='bg-colSuperLight h-full  p-5 rounded-[10px] basis-[calc(70%-10px)]'>
                <div className=' text-xl font-semibold mb-5'>Правила</div>
                <div className=' mb-4'>Оплата наличными при получении товара возможна в филиалах компании «РОСТОК»</div>

                <button className='px-8 py-3 bg-colGreen rounded text-white font-semibold'>Задать вопрос</button>
                    </div>}
                {payment === 'online' &&  <div className='bg-colSuperLight h-full p-5 rounded-[10px] basis-[calc(70%-10px)]'>
                <div className=' text-xl font-semibold mb-5'>Правила</div>
                <div className=' font-semibold mb-1'>На сайте</div>
                    <div className=' mb-4'>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> После обработки и согласования заказа менеджер интернет-магазина предоставит реквизиты для оплаты картой</div>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> Оплатить можно с помощью клиент-банка через интернет, через мобильное приложение банка, терминал самообслуживания</div>
                    </div>
                    <div className=' font-semibold mb-1'>В филиале</div>
                    <div className=' mb-4'>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> В филиале можно осуществить оплату картой непосредственно на кассе</div>
                                 </div>
                    <button className='px-8 py-3 bg-colGreen rounded text-white font-semibold'>Задать вопрос</button>
                    </div>}
                {payment === 'account' &&  <div className='bg-colSuperLight h-full p-5 rounded-[10px] basis-[calc(70%-10px)]'>
                <div className=' text-xl font-semibold mb-5'>Правила</div>
                <div className=' font-semibold mb-1'>На сайте</div>
                    <div className=' mb-4'>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> После согласования заказа на сайте необходимо выслать по e-mail реквизиты для формирования безналичного счета</div>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> Бухгалтерия формирует безналичный счет и менеджер интернет-магазина отправляет его электронной почтой клиенту для оплаты</div>
                    </div>
                    <div className=' font-semibold mb-1'>В филиале</div>
                    <div className=' mb-4'>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div>Вам необходимо предоставить реквизиты для формирования безналичного счета</div>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div>Бухгалтер филиала составляет счет и отправляет его на почту клиента, либо отдает непосредственно в руки</div>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div>Бухгалтерия формирует безналичный счет и менеджер интернет-магазина отправляет его электронной почтой клиенту для оплаты</div>
                                 </div>
                    <button className='px-8 py-3 bg-colGreen rounded text-white font-semibold'>Задать вопрос</button>
                    </div>}



            </div>


            <h4 className='text-xl mt-5 mb-[10px] font-semibold'>Способы получения</h4>
            <div className="flex gap-5 mb-[40px]">
                <div className='flex flex-col gap-5 basis-[calc(30%-10px)] '>

                    <div className={`flex p-5 border ${ delivery === 'pickup' ? 'border-colGreen' : 'border-colLightGray'}  rounded-[10px] gap-3`} onClick={() => setDelivery('pickup')}>
                        <div className='mb-[10px]'>
                            <img className='w-10 h-10' src={stallicon} alt="" />
                        </div>
                        <div>
                        <div className='mb-[10px] font-semibold cursor-pointer mr-2 text-xl text-colGreen'>Самовывоз</div>
                        <div className='text-sm'>
                        Из 255 магазинов и складов</div>
                            </div>

                        

                    </div>
                    <div className={`flex p-5 border ${ delivery === 'courier' ? 'border-colGreen' : 'border-colLightGray'}  rounded-[10px] gap-3`} onClick={() => setDelivery('courier')}>
                        <div className='mb-[10px]'>
                            <img className='w-10 h-10' src={truckicon} alt="" />
                        </div>
                        <div>
                        <div className='mb-[10px] font-semibold cursor-pointer mr-2 text-xl text-colGreen'>Адресная доставка — Росток</div>
                        <div className='text-sm'>
                        Доставка по всей России</div>
                            </div>

                        

                    </div>
                    <div className={`flex p-5 border ${ delivery === 'tk' ? 'border-colGreen' : 'border-colLightGray'}  rounded-[10px] gap-3`} onClick={() => setDelivery('tk')}>
                        <div className='mb-[10px]'>
                            <img className='w-10 h-10' src={boxicon} alt="" />
                        </div>
                        <div>
                        <div className='mb-[10px] font-semibold cursor-pointer mr-2 text-xl text-colGreen'>Транспортные компании</div>
                        <div className='text-sm'>
                            СДЕК, Деловые Линии и др.</div> 
                            </div>

                        

                    </div>

                </div>
                {delivery === 'pickup' &&  <div className='bg-colSuperLight h-full grow p-5 rounded-[10px] basis-[calc(70%-10px)]'>
                    <div className=' text-xl font-semibold mb-5'>Правила</div>
                    <div className=' mb-4'>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> Доставка заказа до магазина и пункта самовывоза бесплатная</div>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> Если товары в заказе суммарно весят больше 70 кг или в нем содержится больше 30 позиций товаров, получить такой заказ можно самовывозом со склада, доставкой курьером или транспортной компанией</div>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> Цены в розничных магазинах могут отличаться от цен на нашем сайте. Для уточнения цены товара в вашем городе нужно обратиться к менеджеру</div>

                    </div>
                    <div className=' mb-4'>Уточните заранее наличие товара в нужном филиале и предварительно его зарезервируйте.</div>
                    <button className='px-8 py-3 bg-colGreen rounded text-white font-semibold'>Задать вопрос</button>
                    </div>}
                {delivery === 'courier' &&  <div className='bg-colSuperLight h-full p-5 rounded-[10px] basis-[calc(70%-10px)]'>
                <div className=' text-xl font-semibold mb-5'>Правила</div>
                <div className=' mb-4'>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> Доставка заказа до магазина и пункта самовывоза бесплатная</div>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> Доставка осуществляется до подъезда заказчика</div>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> Товар выгружается и заносится в здание силами клиента</div>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> Время на разгрузку – до 30 минут. В случае задержки автомобиля при разгрузке более 30 мин., час простоя оплачивается дополнительно</div>

                    </div>
                    
                    <button className='px-8 py-3 bg-colGreen rounded text-white font-semibold'>Задать вопрос</button>
                    </div>}
                {delivery === 'tk' &&  <div className='bg-colSuperLight h-full p-5 rounded-[10px] basis-[calc(70%-10px)]'>
                <div className=' text-xl font-semibold mb-5'>Правила</div>
                    <div className=' mb-4'>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> Стоимость доставки тарифицируется согласно условиям перевозчика</div>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div>  Осуществляется адресный забор посылки курьером перевозчика</div>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> Все услуги по доставке и доупаковке/обрешетке оплачивает Получатель.</div>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> В случае незабора посылки (окончания срока хранения у перевозчика) Получатель обязуется компенсировать стоимость транспортных издержек по доставке и возврату посылки</div>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> Перевозчик несет полную ответственность за целостность и сохранность принятого и перевозимого отправления. овар страхуется на полную стоимость. </div>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> Если возникают претензии при возможном повреждении или потере посылки, Получатель их решает с перевозчиком самостоятельно (документы касательно стоимости груза мы в случае необходимости предоставим)</div>

                    </div>
                    <div className=' mb-4'>Всегда внимательно проверяйте товар при получении, в случае обнаружения любых повреждений или расхождений по количесту мест обязательно фиксируйте это в соответствующем Акте у перевозчика. После забора посылки перевозчик уже не принимает претензий.</div> 
                    <button className='px-8 py-3 bg-colGreen rounded text-white font-semibold'>Задать вопрос</button>
                    </div>}
            </div>
        </div>
    )
}

export default PaymentDelivery