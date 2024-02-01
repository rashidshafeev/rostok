import { useEffect } from 'react';
import {
  Advantages,
  Brands,
  CatMainContent,
  CatMainSidebar,
  Promotions,
} from '../../components';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';

const Catalog = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content pb-6'>
      <h1 className='text-[40px] font-semibold text-colBlack'>Каталог</h1>
      <div className='flex pb-10'>
        <CatMainSidebar />
        <CatMainContent />
      </div>
      <Promotions />
      <Brands />
      <Advantages />
    </div>
  );
};

export default Catalog;
