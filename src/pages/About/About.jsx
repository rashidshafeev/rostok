import React, { useEffect } from 'react'
import { Advantages, Brands } from '../../components'
import image11 from '../../assets/images/about-1-1.png'
import image12 from '../../assets/images/about-1-2.png'
import image13 from '../../assets/images/about-1-3.png'
import image14 from '../../assets/images/about-1-4.png'
import image15 from '../../assets/images/about-1-5.png'
import image16 from '../../assets/images/about-1-6.png'
import image21 from '../../assets/images/about-2-1.png'

import stall from '../../assets/icons/stall-icon.svg'
import cart from '../../assets/icons/cart-icon.svg'
import bag from '../../assets/icons/bag-icon.svg'
import calendar from '../../assets/icons/calendar-icon.svg'
import WantToBePartnerFrom from '../../components/About/WantToBePartnerFrom'
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop'

function About() {

    useEffect(() => {
        scrollToTop()
    }, []);
    return (
        <div className="content lining-nums ">
            <div className='mb-20'>
                <div className=' m-auto w-8/12 text-4xl font-semibold text-center my-10'>
                    «Росток» – это интернет-магазин с широким ассортиментом мебельной фурнитуры, плитных материалов и кухонных столешниц
                </div>
                <div className='grid grid-cols-12 grid-rows-2 gap-2 h-[50vh]'>
                    <div className='col-start-1 col-end-4 row-start-1 row-end-3  '>
                        <img src={image11} className=' w-full h-full object-cover rounded' alt="" />
                    </div>
                    <div className=' col-start-4 col-end-7 row-start-1 row-end-2 rounded'>
                        <img src={image12} className=' w-full h-full object-cover rounded' alt="" />
                    </div>
                    <div className=' col-start-4 col-end-8 row-start-2 row-end-3'>
                        <img src={image13} className=' w-full h-full object-cover rounded' alt="" />
                    </div>
                    <div className=' col-start-7 col-end-10 row-start-1 row-end-2'>
                        <img src={image14} className=' w-full h-full object-cover rounded' alt="" />
                    </div>
                    <div className=' col-start-8 col-end-10 row-start-2 row-end-3'>
                        <img src={image15} className=' w-full h-full object-cover rounded' alt="" />
                    </div>
                    <div className=' col-start-10 col-end-13 row-start-1 row-end-3'>
                        <img src={image16} className=' w-full h-full object-cover rounded' alt="" />
                    </div>
                </div>
            </div>

            <div className='flex gap-5 mb-20'>
              <div className='basis-[calc(50%-20px/2)]'>
              <div className=' text-4xl font-semibold mb-5'>
              10 лет упорной работы
                </div>
                <div>
                    <p className=' mb-5'>
                    История нашей компании берет начало в 2013 году. За десять лет упорной работы нам удалось выстроить плодотворное сотрудничество с ведущими производителями мебельных комплектующих.
                        
                    </p>
                    <p className=' mb-5'>
У нас есть собственое производство - компания «Росток» изготавливает кухонные столешницы и плитные материалы. На выбор наших клиентов мы предлагаем широкую линейку размеров и современных декоров.
                        
                    </p>
                    <p className=' mb-5'>
У нас вы можете приобрести готовые модели, а также заказать мебель по индивидуальным размерам.
                        
                    </p>
               
                
                </div>
                <div className='flex flex-wrap gap-5'>
                      <div className='basis-[calc(50%-20px/2)] border border-colLightGray rounded-lg p-5 flex gap-3'>
                        <img src={calendar} className=' w-10 h-10' alt=""  />
                            <div className=' text-colDarkGray text-lg'>c <span className=' font-bold text-4xl text-colGreen'>2013</span> года работаем на рынке</div>
                        </div>
                        <div className='basis-[calc(50%-20px/2)] border border-colLightGray rounded-lg p-5 flex gap-3'>
                            <img src={bag} className=' w-10 h-10' alt="" />
                            <div className=' text-colDarkGray text-lg'><span className=' font-bold text-4xl text-colGreen'>&gt; 100</span> производителей сотрудничают с нами</div>
                        </div>
                        <div className='basis-[calc(50%-20px/2)] border border-colLightGray rounded-lg p-5 flex gap-3'>
                            <img src={cart} className=' w-10 h-10' alt="" />
                            <div className=' text-colDarkGray text-lg'><span className=' font-bold text-4xl text-colGreen'>&gt; 20 тыс.</span> товаров в ассортименте</div>
                        </div>
                        <div className='basis-[calc(50%-20px/2)] border border-colLightGray rounded-lg p-5 flex gap-3'>
                            <img src={stall} className=' w-10 h-10' alt="" />
                            <div className=' text-colDarkGray text-lg'>в <span className=' font-bold text-4xl text-colGreen'>20</span> регионах реализуем продукцию </div>
                        </div>
                </div>
              </div>
              <div className='basis-[calc(50%-20px/2)]'>
              <img src={image21} className=' w-full h-full object-cover rounded' alt="" />

              </div>
            </div>



            <Advantages />
            {/* <Brands /> */}
            <WantToBePartnerFrom/>
            <Brands />
        </div>

    )
}

export default About