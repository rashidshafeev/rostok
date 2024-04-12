import { useEffect } from 'react';
import Advantages from '../../../Home/Advantages';
import Brands from '../../../Home/Brands';
import Promotions from '../../../Home/Promotions';
import CatItemContent from './CatItemContent';
import CatItemSidebar from './CatItemSidebar';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from '../../../../helpers/scrollToTop/scrollToTop';

const Categories = () => {
  const { state } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content lining-nums proportional-nums'>
      <h3 className='font-semibold text-4xl text-colBlack pb-5'>
        {state?.catalog?.name}
      </h3>
      <div className='flex pb-5 min-h-[420px]'>
        <CatItemSidebar state={state} />
        <CatItemContent />
      </div>
      <Promotions />
      <Brands />
      <Advantages />
    </div>
  );
};

export default Categories;
