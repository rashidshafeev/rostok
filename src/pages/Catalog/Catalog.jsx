import { useEffect } from 'react';
import {
  Advantages,
  Brands,
  CatMainContent,
  CatMainSidebar,
  Promotions,
} from '../../components';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { useSelector } from 'react-redux';

const Catalog = () => {
  const { catalog } = useSelector((state) => state?.catalog);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content pb-6 lining-nums proportional-nums'>
      <h1 className='text-[40px] font-semibold text-colBlack'>Каталог</h1>
      <div className='flex pb-10 pt-3 min-h-[520px]'>
        <CatMainSidebar catalog={catalog} />
        <CatMainContent catalog={catalog} />
      </div>
      <Promotions />
      <Brands />
      <Advantages />
    </div>
  );
};

export default Catalog;
