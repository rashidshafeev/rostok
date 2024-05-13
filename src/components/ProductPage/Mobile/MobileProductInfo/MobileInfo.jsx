import React from 'react'


import stallicon from '../../../../assets/icons/stall-icon.svg';
import truckicon from '../../../../assets/icons/truck-icon.svg';
import boxicon from '../../../../assets/icons/box-icon.svg';

function MobileInfo() {
  return (
    <>
    <h3 className='text-2xl mt-5 font-semibold'>Оплата и доставка</h3>

    <h4 className='text-xl mt-5 mb-[10px] font-semibold'>Способы получения</h4>
    <div className='flex lg:flex-row flex-col gap-5'>
        
        <div className='flex p-5 border border-colLightGray rounded-[10px]'>
            <div className='mr-[10px]'>
                <img className='w-12 h-12' src={stallicon} alt="" />
            </div>
                <div className='flex flex-col'>
                <div className='mb-[10px] decoration-colGreen font-semibold underline underline-offset-8 cursor-pointer mr-2 text-sm'>Самовывоз</div>
            <div className='text-sm'>
                </div>
            
            сегодня, из 1 магазина</div>

        </div>
        <div className='flex p-5 border border-colLightGray rounded-[10px]'>
            <div className='mr-[10px]'>
                <img className='w-12 h-12' src={truckicon} alt="" />
            </div>
            <div className='flex flex-col'><div className='mb-[10px] decoration-colGreen font-semibold underline underline-offset-8 cursor-pointer mr-2 text-sm'>Доставка курьером</div>
            <div className='text-sm'>
            завтра, от 500 р.</div>
</div>
            
        </div>
        <div className='flex p-5 border border-colLightGray rounded-[10px]'>
            <div className='mr-[10px]'>
                <img className='w-12 h-12' src={boxicon} alt="" />
            </div>

            <div className='flex flex-col'>

            <div className='mb-[10px] decoration-colGreen font-semibold underline underline-offset-8 cursor-pointer mr-2 text-sm'>Транспортной компанией</div>
            <div className='text-sm'>
            СДЕК, Деловые Линии и др.</div>
            </div>


        </div>

    </div>

    <h4 className='text-xl mt-5 mb-[10px] font-semibold'>Способы оплаты</h4>
    <div className='flex lg:flex-row flex-col gap-5'>

    <div className='flex p-5 border border-colLightGray rounded-[10px]'>
            <div className='mr-[10px]'>
                <img className='w-12 h-12' src={stallicon} alt="" />
            </div>


            <div className='flex flex-col'>
            <div className='mb-[10px] decoration-colGreen font-semibold underline underline-offset-8 cursor-pointer mr-2 text-sm'>Наличными или картой в магазине</div>
            <div className='text-sm'>
            При получении заказа</div>
            </div>

           

        </div>
        <div className='flex p-5 border border-colLightGray rounded-[10px]'>
            <div className='mr-[10px]'>
                <img className='w-12 h-12' src={truckicon} alt="" />
            </div>

            <div className='flex flex-col'>
            <div className='mb-[10px] decoration-colGreen font-semibold underline underline-offset-8 cursor-pointer mr-2 text-sm'>Онлайн-оплата</div>
            <div className='text-sm'>
            Картами Visa, MasterCard, Мир</div>
            </div>

          

        </div>
        <div className='flex p-5 border border-colLightGray rounded-[10px]'>
            <div className='mr-[10px]'>
                <img className='w-12 h-12' src={boxicon} alt="" />
            </div>

            <div className='flex flex-col'>
            <div className='mb-[10px] decoration-colGreen font-semibold underline underline-offset-8 cursor-pointer mr-2 text-sm'>Оплата по счёту</div>
            <div className='text-sm'>
            Для юридических лиц</div>

            </div>

            
        </div>
        

    </div>
</>
  )
}

export default MobileInfo