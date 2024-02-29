import React, { useCallback, useEffect, useState, useRef  } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import LightGallery from 'lightgallery/react';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';

import favorite from '../../assets/icons/favorite-green.svg';
import comparison from '../../assets/icons/comparison-green.svg';
import star from '../../assets/icons/adv1fill.svg';
import share from '../../assets/icons/share.svg';
import downloadpdf from '../../assets/icons/download-pdf.svg';
import print from '../../assets/icons/print.svg';

import dummyImage from '../../assets/images/dummy-product-image.png';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart } from '../../redux/slices/productsSlice';

import { Tabs } from 'flowbite-react';

import minusbutton from '../../assets/icons/minus-button.svg';
import plusbutton from '../../assets/icons/plus-button.svg';

function ProductPage() {
  const tabsRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  
  const params = useParams()
  console.log("params")
  console.log(params)

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchProductStart(params.productId))
  }, [dispatch]);

  const product = useSelector((state) => state?.product);
  console.log(product)

  const lightGalleryRef = useRef(null);
  const containerRef = useRef(null);
  const [galleryContainer, setGalleryContainer] = useState(null);

  const onInit = useCallback((detail) => {
    if (detail) {
      lightGalleryRef.current = detail.instance;
      lightGalleryRef.current.openGallery();
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setGalleryContainer(containerRef.current);
    }
  }, []);

  const videos = [
    {
      src: dummyImage,
      thumb: dummyImage,
    },
    {
      src: dummyImage,
    },
    {
      src: dummyImage,
    },
  ]


const handleChange2 = (event) => {
  tabsRef.current?.setActiveTab(3)
};

  return (
    <div className='content lining-nums proportional-nums'>
      <div className=''>
        <div className='text-xl font-semibold '>Кресло мягкое Грэйс Z-14 (изумруд) на высоких ножках с подлокотниками в гостиную, офис, зону ожидания, салон красоты</div>
        <div className='flex'>
        <NavLink
            to='#'
            className='text-center flex flex-row justify-between items-center'
          >
            <img className='mx-auto' src={star} alt='*' />
            <span className='text-xs pt-1 font-normal text-colBlack'>
              4,5
            </span>
          </NavLink>
        <NavLink
            to='#'
            className='text-center flex flex-row justify-between items-center'
          >
            <span className='text-xs pt-1 font-medium text-colDarkGray'>
              12 отзывов
            </span>
          </NavLink>
          <NavLink
            to='#'
            className='text-center flex flex-row justify-between items-center'
          >
            <img className='mx-auto' src={comparison} alt='*' />
            <span className='text-xs pt-1 font-medium text-colBlack'>
              Сравнить
            </span>
          </NavLink>
          <NavLink
            to='#'
            className='text-center flex flex-row justify-between items-center'
          >
            <img className='mx-auto stroke-colGreen' src={favorite} alt='*' />
            <span className='text-xs pt-1 font-medium text-colBlack'>
              В избранное
            </span>
          </NavLink>
          <NavLink
            to='#'
            className='text-center flex flex-row justify-between items-center'
          >
            <img className='mx-auto' src={downloadpdf} alt='*' />
            <span className='text-xs pt-1 font-medium text-colBlack'>
              Скачать PDF 
            </span>
          </NavLink>
          <NavLink
            to='#'
            className='text-center flex flex-row justify-between items-center'
          >
            <img className='mx-auto' src={print} alt='*' />
            <span className='text-xs pt-1 font-medium text-colBlack'>
              Распечатать
            </span>
          </NavLink>
       
        </div>
      </div>
      <div className='flex pb-5 min-h-[420px] gap-5'>
        <div className='basis-5/12'>
        <div
        style={{
          height: '800px',
        }}
        ref={containerRef}
      ></div>
        <LightGallery
          container={galleryContainer}
          onInit={onInit}
          plugins={[lgThumbnail, lgVideo]}
          closable={false}
          slideDelay={400}
          thumbWidth={130}
          thumbHeight={'100px'}
          thumbMargin={6}
          appendSubHtmlTo={'.lg-item'}
          dynamic={true}
          dynamicEl={videos}
          videojs
          videojsOptions={{ muted: false }}
          hash={false}
          elementClassNames={'inline-gallery-container'}
          download={false}
          backgroundColor={'#FFF'}
          addClass={'gallery'}
          showMaximizeIcon={false}
          counter={false}
        ></LightGallery>
        </div>
        <div className='basis-4/12'></div>

        <div className='basis-3/12'>
            <div className='shadow-[1px_1px_34px_0_rgba(0,0,0,0.1)] p-5 rounded-xl flex flex-col gap-8'>

              <div className='flex justify-between'>
                <div className='flex flex-col items-start'>
                  <div className='text-lg font-medium'>14 528 ₽</div>
                  <div className='text-colGray text-sm line-through	'>19 080</div>
                </div>
                <div className='flex justify-center items-center'>
                  <div className='bg-colSuperLight w-8 h-8 rounded-full flex'>
                    <img className='mx-auto w-5' src={minusbutton} alt='*' />
                  </div>
                  <div className='mx-2.5'>1</div>
                  <div className='bg-colSuperLight w-8 h-8 rounded-full flex'>
                    <img className='mx-auto w-5' src={plusbutton} alt='*' />
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-3'>

                <div className='py-3 flex justify-center text-white font-semibold bg-colGreen w-full rounded cursor-pointer'>Добавить в корзину</div>
                <div className='py-3 flex justify-center text-colGreen font-semibold bg-white border-colGreen border w-full rounded cursor-pointer'>Купить в 1 клик</div>

              </div>

              <div className='flex justify-center text-colGreen font-semibold underline underline-offset-8 cursor-pointer'>
                Узнать цену для юрлиц
              </div>
              
            </div>
        </div>
        
      </div>
      <div className='flex pb-5 min-h-[420px] gap-5'>
        
      <Tabs aria-label="Default tabs" style="pills" className='flex justify-between' ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}>
        <Tabs.Item active className="bg-transparent" title="Характеристика и описание" >
          This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </Tabs.Item>
        <Tabs.Item title="Документы и сертификаты" >
          This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </Tabs.Item>
        <Tabs.Item title="Отзывы" >
          This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </Tabs.Item>
        <Tabs.Item title="Доставка и оплата" >
          This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </Tabs.Item>

      </Tabs>
      <button onClick={handleChange2}>TEST</button>
      </div>
    </div>
    
    
  )
}

export default ProductPage