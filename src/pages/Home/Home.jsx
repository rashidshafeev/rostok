import { useEffect } from 'react';
import {
  Advantages,
  Banner,
  Brands,
  FurnitureFittings,
  News,
  PopularCategories,
  Promotions,
  RoomProducts,
  SaleBanner,
  SaleProducts,
  Suggestions,
} from '../../components';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { useGetMainPageDataQuery } from '../../redux/api/productEndpoints';

const Home = () => {

  const { data, isLoading, isSuccess } = useGetMainPageDataQuery()
  
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <div className='content'>
        <Banner />
        {isSuccess && data.newProducts && <News data={data.newProducts} />}
        <SaleBanner />
        <Suggestions />
        {isSuccess && data.popularCategories && <PopularCategories data={data.popularCategories} />}
      </div>
      {isSuccess && data.promo && <Promotions data={data.promo} />}
      <div className='content'>
        <SaleProducts  />
      </div>
      {isSuccess && data.roomCategories &&  <RoomProducts data={data.roomCategories} />}
      <div className='content'>
        <FurnitureFittings />
        {isSuccess && data.brands && <Brands data={data.brands} />}
        {isSuccess && data.cooperate && <Advantages data={data.cooperate} /> }
      </div>
    </>
  );
};

export default Home;
