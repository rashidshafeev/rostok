import { useEffect } from 'react';
import { scrollToTop } from '@utils/scrollToTop';
import { useGetMainPageDataQuery } from '@api/contentEndpoints';
import HomeSkeleton from './HomeSkeleton';
import Advantages from '@components/Home/Advantages';
import Brands from '@components/Home/Brands';
import Banner from '@components/Home/Banner';
import News from '@components/Home/News';
import PopularCategories from '@components/Home/PopularCategories';
import Promotions from '@components/Home/Promotions';
import SaleBanner from '@components/Home/SaleBanner';
import SaleProducts from '@components/Home/SaleProducts';
import RoomProducts from '@components/Home/RoomProducts';
const Home = () => {
  const { data, isLoading, isSuccess } = useGetMainPageDataQuery();

  const componentMap = {
    slider: Banner,
    newProducts: News,
    staticBaner: SaleBanner,
    // suggestions: Suggestions,
    popularCategories: PopularCategories,
    promo: Promotions,
    withDiscount: SaleProducts,
    roomCategries: RoomProducts,
    // furnitureFittings: FurnitureFittings,
    brands: Brands,
    cooperate: Advantages,
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      {isSuccess && (
        <>
          {Object.keys(data).map((key) => {
            const Component = componentMap[key];
            if (Component) {
              return (
                <div key={key} className='content'>
                  <Component />
                </div>
              );
            }
            return null;
          })}
        </>
      )}
      {isLoading && <HomeSkeleton/>}
    </>
  );
};

export default Home;
