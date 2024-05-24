import { useGetCategoryTreeQuery } from '../../redux/api/api';
import CatalogCard from '../Catalog/Catalog/CatalogCard';
import { Loading } from '../../helpers/Loader/Loader';
import ErrorEmpty from '../../helpers/Errors/ErrorEmpty';

const PopularCategories = () => {
  const { isLoading, isError, data } = useGetCategoryTreeQuery();

  return (
    <div className='pt-5 pb-10'>
      <h1 className='text-colBlack text-2xl mm:text-4xl font-semibold pb-4'>
        Популярные категории
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
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5'>
          {data?.children?.slice?.(0, 6)?.map((el) => (
            <CatalogCard category={el} key={el?.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularCategories;
