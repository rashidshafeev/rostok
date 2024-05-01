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
    <div className='content'>
      <Banner />
      <News />
      <SaleBanner />
      {/* <Suggestions /> */}
      {/* <PopularCategories /> */}
      {/* <Promotions /> */}
      {/* <SaleProducts /> */}
      {/* <RoomProducts /> */}
      {/* <FurnitureFittings /> */}
      {/* <Brands /> */}
      {/* <Advantages /> */}
    </div>
  );
};

export default Home;
