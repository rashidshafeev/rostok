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
import { Loading } from '../../helpers/Loader/Loader';
import { useGetCategoryTreeQuery } from '../../redux/api/api';

const Catalog = () => {
  // // const { catalog, loading } = useSelector((state) => state?.catalog);
  // const { categoryTree, loading } = useSelector((state) => state?.categoryTree);
  
  const { isLoading, isError, error, data } = useGetCategoryTreeQuery()
  const categoryTree = data

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content pb-6 lining-nums proportional-nums'>
      <h1 className='text-[40px] font-semibold text-colBlack'>Каталог</h1>
      {isLoading ? (
        <Loading extraStyle='520px' />
      ) : (
        <>
          <div className='flex pb-10 pt-3 min-h-[520px]'>
            <CatMainSidebar categoryTree={categoryTree} />
            <CatMainContent categoryTree={categoryTree} />
          </div>
          <Promotions />
          <Brands />
          <Advantages />
        </>
      )}
    </div>
  );
};

export default Catalog;
