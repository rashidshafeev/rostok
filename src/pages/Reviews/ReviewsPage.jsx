





import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from 'react';
import arrow from '../../assets/icons/arrow-icon.svg';
import minusbutton from '../../assets/icons/minus-button.svg';
import plusbutton from '../../assets/icons/plus-button.svg';
import favorite from '../../assets/icons/favorite.svg';
import comparison from '../../assets/icons/comparison.svg';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductStart } from "../../redux/slices/productsSlice";
import { useGetProductsQuery } from "../../redux/api/api";




export function ReviewsPage() {

  const state = useLocation();
  const params = useParams();

  // const dispatch = useDispatch();
  // useEffect(() => {

  //   dispatch(fetchProductStart(params.productId))
  // }, [dispatch]);

  // const product = useSelector((state) => state?.product);

  const { data, error, isLoading } = useGetProductsQuery(params.productId)

  console.log(data.data)

  

  console.log(state, params);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };


  return (
    <div className='content lining-nums proportional-nums'>

      <NavLink to={`..`}>
        <div className='flex mb-[10px]'>
          <img src={arrow} alt="" />
          <div className='font-semibold'>Вернуться к товару</div>
        </div>
      </NavLink>


      <div className='p-[10px] flex gap-[50px] border-b'>

        <div className='flex justify-between grow'>
          <div className='flex '>
            <div className='w-20 h-20 rounded mr-5'></div>
            <div className='flex flex-col'>
              <div className='text-sm font-medium'>ЛДСП Дуб Млечный Свеза U10095, 3500*1750*16</div>
              <div className='text-xs font-medium text-colDarkGray mb-[10px]'>Артикул: 127504</div>
              <div className='text-xs font-medium text-colDarkGray mb-[10px]'>Цвет: Черный</div>
              <div className='text-xs font-medium text-colDarkGray mb-[10px] flex'>Можно забрать <p className='text-colGreen ml-1'> сегодня</p> </div>
            </div>
          </div>
          <div>
            <div>РАСПРОДАЖА</div>
          </div>
        </div>

        <div className='flex flex-col  justify-between basis-1/3'>
          <div className='flex justify-between '>
            <div className='flex items-center'>
              <div className='font-bold mr-3'>14 528 ₽</div>
              <div className='text-colDarkGray text-xs line-through	mr-1'>19 080</div>
              <div className='text-white font- semibold text-sm rounded-full px-1 bg-red-600	'>- 30 %</div>
            </div>

            <div className='flex'>
              <div className='w-6 h-6 rounded-full bg-colSuperLight flex justify-center items-center mr-[10px]'>
                <img className='w-3 h-3' src={favorite} alt="" />
              </div>
              <div className='w-6 h-6 rounded-full bg-colSuperLight flex justify-center items-center'>
                <img className='w-3 h-3' src={comparison} alt="" />
              </div>

            </div>

          </div>

          <div className='flex justify-between '>

            <div className='flex items-center mr-5'>
              <div className='flex justify-between items-center'>
                <div className='bg-colSuperLight w-8 h-8 rounded-full flex'>
                  <img className='mx-auto w-5' src={minusbutton} alt='*' />
                </div>
                <div className='mx-4 font-semibold text-colGreen'>1</div>
                <div className='bg-colSuperLight w-8 h-8 rounded-full flex'>
                  <img className='mx-auto w-5' src={plusbutton} alt='*' />
                </div>
              </div>
            </div>

            <button className='py-3 flex justify-center text-white font-semibold bg-colGreen w-full rounded cursor-pointer'>В корзину</button>

          </div>


        </div>

      </div>


      <h1 className='font-semibold text-[40px]'>Отзывы</h1>

      <div className='w-full flex flex-nowrap scrollable overflow-x-auto gap-2 py-5'>
        {/* {photos.map((photo, i) => {

          return (
            <div className='shrink-0 p-1 border rounded'>
              <img onClick={() => { setIndex(i); }} className='rounded-md w-20 h-20 shrink-0 object-contain' src={photo.src} alt="" />

            </div>

          );
        })} */}
      </div>

    </div>

  );
}



export default ReviewsPage