import { useEffect } from 'react';
import {
  Advantages,
  Brands,
  CatalogContent,
  CatalogSidebar,
  Promotions,
} from '../../components';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { Loading } from '../../helpers/Loader/Loader';
import ErrorEmpty from '../../helpers/Errors/ErrorEmpty';
import Breadcrumbs from '../../helpers/Breadcrumbs/Breadcrumbs';
import { useGetCategoryTreeQuery } from '../../redux/api/productEndpoints';

const Catalog = () => {
  const { isLoading, isError, data } = useGetCategoryTreeQuery();

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content pb-6 lining-nums proportional-nums'>
      <Breadcrumbs breadcrumbs={[]} />
      <h1 className='text-3xl mm:text-4xl md:text-[40px] font-semibold text-colBlack'>
        Каталог
      </h1>
      {isLoading ? (
        <Loading extraStyle='520px' />
      ) : isError ? (
        <ErrorEmpty
          title='Что-то пошло не так!'
          desc='Произошла ошибка! Пожалуйста, повторите попытку еще раз.'
          height='420px'
        />
      ) : (
        <>
          <div className='flex pb-10 pt-3 min-h-[520px]'>
            <CatalogSidebar categoryTree={data?.children} />
            <CatalogContent categoryTree={data?.children} />
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
