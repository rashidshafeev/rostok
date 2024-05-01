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

const Home = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <>
      <div className='content'>
        <Banner />
        <News />
        <SaleBanner />
        <Suggestions />
        <PopularCategories />
      </div>
      <Promotions />
      <div className='content'>
        <SaleProducts />
      </div>
      <RoomProducts />
      <div className='content'>
        <FurnitureFittings />
        <Brands />
        <Advantages />
      </div>
    </>
  );
};

export default Home;
