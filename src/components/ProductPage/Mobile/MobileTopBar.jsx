import React from 'react'

import favoriteiconactive from '../../../assets/icons/favorite-green-full.svg';
import favoriteicon from '../../../assets/icons/favorite-gray.svg';
import comparisoniconactive from '../../../assets/icons/comparison-card-active.svg';
import comparisonicon from '../../../assets/icons/comparison-card-inactive.svg';
import share from '../../../assets/icons/share-gray.svg';
import back from '../../../assets/icons/arrow-icon-gray.svg';
import { useDispatch, useSelector } from 'react-redux';
import { toggleComparison } from '../../../redux/slices/comparisonSlice';
import { toggleFavorite } from '../../../redux/slices/favoriteSlice';

function MobileTopBar({ product }) {

  const dispatch = useDispatch();
  const favorite = useSelector(state => state?.favorite)
  const comparison = useSelector(state => state?.comparison)

  const isProductInFavorite = favorite?.favorite?.some((el) => el?.id === product?.id);
  const isProductInComparison = comparison?.comparison?.some((el) => el?.id === product?.id);

  return (
    <div className='flex justify-between'>
      <div>
        {/* <img src={back} alt='back' className='cursor-pointer'/> */}
        </div>
    <div className='flex items-center'>
    <img className='mx-auto mr-2' src={share} alt='*' />
    <img className={`mx-auto mr-2  w-6`} src={isProductInComparison ? comparisoniconactive : comparisonicon} alt='*' onClick={(e) => {
                dispatch(toggleComparison(product));
              }}/>
    <img className='mx-auto mr-1 w-6 h-6' src={isProductInFavorite ?  favoriteiconactive  : favoriteicon} alt='*' onClick={(e) => {
                dispatch(toggleFavorite(product));
              }}/>
    </div>
    </div>
  )
}

export default MobileTopBar