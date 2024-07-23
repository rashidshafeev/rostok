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

  // return (
  //   <>
  //     <div className='content'>
  //       <Banner />
  //        <News  />
  //       <SaleBanner />
  //       <Suggestions />
  //      <PopularCategories  />
  //     </div>
  //     <Promotions/>
  //     <div className='content'>
  //       <SaleProducts  />
  //     </div>
  //    <RoomProducts />
  //     <div className='content'>
  //       <FurnitureFittings />
  //      <Brands  />
  //     <Advantages /> 
  //     </div>
  //   </>
  // );\
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
    </>
  );
};

export default Home;
