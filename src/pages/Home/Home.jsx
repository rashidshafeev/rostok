import {
  Banner,
  News,
  PopularCategories,
  Promotions,
  SaleBanner,
  SaleProducts,
  Suggestions,
} from '../../components';

const Home = () => {
  return (
    <div className='content'>
      <Banner />
      <News />
      <SaleBanner />
      <Suggestions />
      <PopularCategories />
      <Promotions />
      <SaleProducts />
    </div>
  );
};

export default Home;
