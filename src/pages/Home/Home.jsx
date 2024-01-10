import {
  Banner,
  News,
  PopularCategories,
  Promotions,
  SaleBanner,
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
    </div>
  );
};

export default Home;
