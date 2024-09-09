
import CatalogCard from '../Catalog/CatalogCard';
import { useGetMainPageDataQuery } from '../../redux/api/productEndpoints';

// const PopularCategories = ({ data }) => {
const PopularCategories = () => {
  const { data, isLoading, isSuccess } = useGetMainPageDataQuery()
  
  return (
    <div className='pt-5 pb-10'>
      <h1 className='text-colBlack text-2xl mm:text-4xl font-semibold pb-4'>
        Популярные категории
      </h1>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5'>
          {isSuccess && data?.popularCategories?.slice?.(0, 6)?.map((el) => (
            <CatalogCard category={el} key={el?.id} />
          ))}
        </div>
    </div>
  );
};

export default PopularCategories;
