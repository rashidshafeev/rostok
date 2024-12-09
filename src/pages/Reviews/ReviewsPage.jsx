import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState } from 'react';
import arrow from '@assets/icons/arrow-icon.svg';
import noImg from '@assets/images/no-image.png';

import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Loading } from "@helpers/Loader/Loader";
import { scrollToTop } from "@utils/scrollToTop";
import Review from "@components/Reviews/Review";
import { ComparisonIcon, FavoriteIcon } from "@helpers/Icons";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import { addToCart, changeQuantity } from "@store/slices/cartSlice";
import RatingStars from "@helpers/RatingStars";
import ReviewModal from "@helpers/CModal/ReviewModal";
import { useGetProductQuery } from "@api/productEndpoints";

export function ReviewsPage() {

  const [reviewModalOpen, setReviewModalOpen]  = useState(false);

  const handleCloseReviewModal  = ()  =>  setReviewModalOpen(false);

  useEffect(() => {
    scrollToTop();
  }, []);


  const state = useLocation();
  const params = useParams();
  
  const dispatch  = useDispatch();

  const { data, error, isLoading } = useGetProductsQuery(params.productId)
  const product = data?.data?.variants?.find((variant) => variant.slug === params.productId);


  const { cart } = useSelector((state) => state?.cart);
  const { comparison } = useSelector((state) => state?.comparison);
  const { user } = useSelector((state) => state?.user);
  const { favorite } = useSelector((state) => state?.favorite);


  const isProductInCart = cart?.some((el) => el?.id === product?.id);
  const productInCart = cart?.find((el) => el?.id === product?.id);

  const isProductInFavorite = user
    ? data?.data?.some((el) => el?.id === product?.id)
    : favorite?.some((el) => el?.id === product?.id);
  const isProductInComparison = comparison?.some(
    (el) => el?.id === product?.id
  );


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };


  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    if (!user) {
      dispatch(toggleFavorite(product));
    } else {
      try {
        if (isProductInFavorite) {
          await removeFromFavorite(product?.id);
        } else {
          await setToFavorites(product?.id);
        }
      } catch (error) {
        console.error('Failed to add product to favorites:', error);
      }
    }
  };

  const handleToggleComparison = (e) => {
    e.preventDefault();
    dispatch(toggleComparison(product));
  };





  if (isLoading) {
    return (
      <div className='flex justify-center items-center'>
        <Loading />
      </div>
    );
  }


  return (
    <div className='content lining-nums proportional-nums'>

      <NavLink to={`..`}>
        <div className='flex my-[10px]'>
          <img src={arrow} alt="" />
          <div className='font-semibold'>Вернуться к товару</div>
        </div>
      </NavLink>


      <div className='p-[10px] flex gap-[50px] border-b'>

        <div className='flex justify-between grow'>
          <div className='flex '>
            <div className='w-20 h-20 rounded mr-5'>


              <NavLink
                to={`/catalog/'${product.category.slug}'/${product.slug}`}
                className='cursor-pointer min-w-[56px] w-14 h-14 overflow-hidden bg-gray-100 rounded-md'>
                <img
                  className='w-full h-full object-contain'
                  src={product?.files[0]?.large || noImg}
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = noImg;
                  }}
                  alt='*'
                />
              </NavLink>


            </div>
            <div className='flex flex-col gap-2'>
              <div className='text-sm font-medium'>{`${product.groupName} ${product.name}`}</div>
              <div className='flex gap-x-2 flex-wrap'>
                {product.attributes && product?.attributes?.map((attribute, index) => (
                  <p key={index} className='text-xs font-medium text-colDarkGray flex items-center space-x-1'>
                    <span >{attribute?.name}:</span>
                    <span className='font-semibold' >{attribute.color ? (<div style={{ backgroundColor: `${attribute.color}` }} className={`w-3 h-3 rounded-full border`}></div>) : (attribute.text)}</span>
                  </p>
                ))}
              </div>
              <div className='text-xs font-medium text-colDarkGray mb-[10px] flex'>Можно забрать <p className='text-colGreen ml-1'> сегодня</p> </div>
            </div>
          </div>
          <div>
            <div>РАСПРОДАЖА</div>
          </div>
        </div>

        <div className='flex flex-col  justify-between basis-1/4'>
          <div className='flex justify-between '>
            <div className='flex items-center'>
              <div className='font-bold mr-3'>14 528 ₽</div>
              <div className='text-colDarkGray text-xs line-through	mr-1'>19 080</div>
              <div className='text-white font- semibold text-sm rounded-full px-1 bg-red-600	'>- 30 %</div>
            </div>

            <div className='flex gap-3'>
              <FavoriteIcon
                className='transition-all duration-500 hover:scale-110'
                favorite={isProductInFavorite ? 'true' : 'false'}
                onClick={handleToggleFavorite}
              />
              <ComparisonIcon
                className='w-6 h-6 rounded-full bg-colSuperLight flex items-center justify-center transition-all duration-200 hover:scale-110'
                comparison={isProductInComparison.toString()}
                onClick={handleToggleComparison}
              />

            </div>

          </div>

          <div className='flex w-full'>

            {isProductInCart && <div className='flex justify-between gap-3 w-full'>
              <div className='flex items-center gap-3'>
                <span className='w-10 h-10 min-w-[40px] rounded-full flex justify-center items-center bg-colSuperLight'
                  onClick={() => { dispatch(changeQuantity({ product, quantity: -1 })) }}>
                  <RemoveOutlined className='text-colGreen cursor-pointer' />
                </span>
                <span className='font-semibold'>{productInCart.quantity}</span>
                <span className='w-10 h-10 min-w-[40px] rounded-full flex justify-center items-center bg-colSuperLight'
                  onClick={() => { dispatch(changeQuantity({ product, quantity: 1 })) }}>
                  <AddOutlined className='text-colGreen cursor-pointer' />
                </span>
              </div>
              <button
                            className='py-3 flex justify-center text-colGreen font-semibold bg-white border-colGreen border w-full rounded cursor-pointer'>
                                Перейти в корзину</button>
            </div>}

            {!isProductInCart && <button className='py-3 flex justify-center text-white font-semibold bg-colGreen w-full rounded cursor-pointer'
                onClick={() => { dispatch(addToCart(product)) }}>Добавить в корзину</button>
            }

          </div>


        </div>

      </div>


      <h1 className='font-semibold text-[40px] my-5'>Отзывы</h1>

      <div className='w-full flex flex-nowrap justify-between scrollable gap-5 py-5'>
        {/* {photos.map((photo, i) => {

          return (
            <div className='shrink-0 p-1 border rounded'>
              <img onClick={() => { setIndex(i); }} className='rounded-md w-20 h-20 shrink-0 object-contain' src={photo.src} alt="" />

            </div>

          );
        })} */}
        <div className="flex flex-col gap-3 basis-[calc(70%-(1.25rem/2))]">
        {data?.data?.reviews?.list?.map((review, i) => {
          return (

            <div className=''>
              <Review key={i} review={review} />
            </div>
          )
        })}
        </div>
        <div className=" flex flex-col gap-3 items-end basis-1/4">
        <div className='flex items-center justify-between w-full'>
          <div className="flex gap-3">
          <div className='text-2xl font-semibold mr-2'> {data?.data?.reviews?.rating}</div>
                    <div className='flex items-center mr-2'>
                        <RatingStars totalStars={5} initialRating={data?.data?.reviews?.rating}/>
                    </div>
          </div>
                    
                    <div className='text-lg text-colDarkGray'> {data?.data?.reviews?.total_count_text}</div>

                    
                </div>
                <button 
                onClick={() => setReviewModalOpen(true)}
                className='py-3 flex  justify-center text-colGreen font-semibold bg-white border-colGreen border w-full rounded cursor-pointer'>
                                Оставить отзыв</button>
                <ReviewModal product={product} open={reviewModalOpen} handleClose={handleCloseReviewModal}/>
        </div>

        
      </div>

    </div>

  );
}



export default ReviewsPage