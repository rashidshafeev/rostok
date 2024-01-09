import { Banner, News, SaleBanner, Suggestions } from '../../components';

const Home = () => {
  return (
    <div className='content'>
      <Banner />
      <News />
      <SaleBanner />
      <Suggestions />
    </div>
  );
};

export default Home;
