import React, { useEffect } from 'react' 
import image11 from '@/shared/assets/images/about-1-1.png'
import image12 from '@/shared/assets/images/about-1-2.png'
import image13 from '@/shared/assets/images/about-1-3.png'
import image14 from '@/shared/assets/images/about-1-4.png'
import image15 from '@/shared/assets/images/about-1-5.png'
import image16 from '@/shared/assets/images/about-1-6.png'
import image21 from '@/shared/assets/images/about-2-1.png'

import stall from '@/shared/assets/icons/stall-icon.svg'
import cart from '@/shared/assets/icons/cart-icon.svg'
import bag from '@/shared/assets/icons/bag-icon.svg'
import calendar from '@/shared/assets/icons/calendar-icon.svg'
import WantToBePartnerFrom from '@components/About/WantToBePartnerFrom'
import { scrollToTop } from '@/shared/lib/scrollToTop';

import Advantages from '@components/Home/Advantages';
import Brands from '@components/Home/Brands';

function About() {

    useEffect(() => {
        scrollToTop()
    }, []);
    return (
        <div className="content lining-nums">
            <div className='mb-10 md:mb-20'>
                <div className='mx-auto w-full md:w-8/12 text-2xl md:text-4xl font-semibold text-center my-5 md:my-10 px-4 md:px-0'>
                    «Росток» – это интернет-магазин с широким ассортиментом мебельной фурнитуры, плитных материалов и кухонных столешниц
                </div>
                <div className='px-4 md:px-0'>
                    <div className='hidden md:grid md:grid-cols-12 md:grid-rows-2 md:gap-2 md:h-[50vh]'>
                        <div className='md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-3'>
                            <img src={image11} className='w-full h-full object-cover rounded' alt="О компании Росток" />
                        </div>
                        <div className='md:col-start-4 md:col-end-7 md:row-start-1 md:row-end-2'>
                            <img src={image12} className='w-full h-full object-cover rounded' alt="О компании Росток" />
                        </div>
                        <div className='md:col-start-4 md:col-end-8 md:row-start-2 md:row-end-3'>
                            <img src={image13} className='w-full h-full object-cover rounded' alt="О компании Росток" />
                        </div>
                        <div className='md:col-start-7 md:col-end-10 md:row-start-1 md:row-end-2'>
                            <img src={image14} className='w-full h-full object-cover rounded' alt="О компании Росток" />
                        </div>
                        <div className='md:col-start-8 md:col-end-10 md:row-start-2 md:row-end-3'>
                            <img src={image15} className='w-full h-full object-cover rounded' alt="О компании Росток" />
                        </div>
                        <div className='md:col-start-10 md:col-end-13 md:row-start-1 md:row-end-3'>
                            <img src={image16} className='w-full h-full object-cover rounded' alt="О компании Росток" />
                        </div>
                    </div>

                    <div className='md:hidden flex flex-col gap-2'>
                        <div className='aspect-[3/2]'>
                            <img src={image11} className='w-full h-full object-cover rounded' alt="О компании Росток" />
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='aspect-square'>
                                <img src={image12} className='w-full h-full object-cover rounded' alt="О компании Росток" />
                            </div>
                            <div className='aspect-square'>
                                <img src={image14} className='w-full h-full object-cover rounded' alt="О компании Росток" />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='aspect-square'>
                                <img src={image15} className='w-full h-full object-cover rounded' alt="О компании Росток" />
                            </div>
                            <div className='aspect-square'>
                                <img src={image16} className='w-full h-full object-cover rounded' alt="О компании Росток" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col md:flex-row gap-5 mb-10 md:mb-20 px-4 md:px-0'>
              <div className='w-full md:basis-[calc(50%-20px/2)]'>
              <div className='text-2xl md:text-4xl font-semibold mb-3 md:mb-5'>
              10 лет упорной работы
                </div>
                <div>
                    <p className='mb-3 md:mb-5 text-sm md:text-base'>
                    История нашей компании берет начало в 2013 году. За десять лет упорной работы нам удалось выстроить плодотворное сотрудничество с ведущими производителями мебельных комплектующих.
                        
                    </p>
                    <p className='mb-3 md:mb-5 text-sm md:text-base'>
У нас есть собственое производство - компания «Росток» изготавливает кухонные столешницы и плитные материалы. На выбор наших клиентов мы предлагаем широкую линейку размеров и современных декоров.
                        
                    </p>
                    <p className='mb-3 md:mb-5 text-sm md:text-base'>
У нас вы можете приобрести готовые модели, а также заказать мебель по индивидуальным размерам.
                        
                    </p>
               
                
                </div>
                <div className='flex flex-col md:flex-row flex-wrap gap-3 md:gap-5'>
                      <div className='w-full md:basis-[calc(50%-20px/2)] border border-colLightGray rounded-lg p-4 md:p-5 flex gap-3 items-center'>
                        <img src={calendar} className='w-8 md:w-10 h-8 md:h-10' alt=""  />
                            <div className='text-colDarkGray text-base md:text-lg'>c <span className='font-bold text-3xl md:text-4xl text-colGreen'>2013</span> года работаем на рынке</div>
                        </div>
                        <div className='w-full md:basis-[calc(50%-20px/2)] border border-colLightGray rounded-lg p-4 md:p-5 flex gap-3 items-center'>
                            <img src={bag} className='w-8 md:w-10 h-8 md:h-10' alt="" />
                            <div className='text-colDarkGray text-base md:text-lg'><span className='font-bold text-3xl md:text-4xl text-colGreen'>&gt; 100</span> производителей сотрудничают с нами</div>
                        </div>
                        <div className='w-full md:basis-[calc(50%-20px/2)] border border-colLightGray rounded-lg p-4 md:p-5 flex gap-3 items-center'>
                            <img src={cart} className='w-8 md:w-10 h-8 md:h-10' alt="" />
                            <div className='text-colDarkGray text-base md:text-lg'><span className='font-bold text-3xl md:text-4xl text-colGreen'>&gt; 20 тыс.</span> товаров в ассортименте</div>
                        </div>
                        <div className='w-full md:basis-[calc(50%-20px/2)] border border-colLightGray rounded-lg p-4 md:p-5 flex gap-3 items-center'>
                            <img src={stall} className='w-8 md:w-10 h-8 md:h-10' alt="" />
                            <div className='text-colDarkGray text-base md:text-lg'>в <span className='font-bold text-3xl md:text-4xl text-colGreen'>20</span> регионах реализуем продукцию </div>
                        </div>
                </div>
              </div>
              <div className='w-full md:basis-[calc(50%-20px/2)]'>
              <img src={image21} className='w-full h-full object-cover rounded' alt="" />

              </div>
            </div>

            <div className="px-4 md:px-0">
                <Advantages />
                <WantToBePartnerFrom/>
                <Brands />
            </div>
        </div>

    )
}

export default About