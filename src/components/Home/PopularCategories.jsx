
import CatalogCard from '../Catalog/CategoryCard';
import { useGetMainPageDataQuery } from '@/redux/api/contentEndpoints';
import { useWindowSize } from 'react-use';
// const PopularCategories = ({ data }) => {
const PopularCategories = () => {
  const { data, isLoading, isSuccess } = useGetMainPageDataQuery()

  const { width } = useWindowSize();
  
  if (width > 1024) return (
    <div className='pt-5 pb-10'>
      <h1 className='text-colBlack text-2xl mm:text-4xl font-semibold pb-4'>
        Популярные категории
      </h1>
        {/* <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5'> */}
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-3'>
          {isSuccess && data?.popularCategories?.slice?.(0, 6)?.map((el) => (
            <CatalogCard category={el} key={el?.id} />
          ))}
        </div>
    </div>
  );
};

export default PopularCategories;
