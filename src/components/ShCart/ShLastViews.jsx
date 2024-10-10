import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from '../ProductCard/ProductCard';
import { getTokenFromCookies } from '../../helpers/cookies/cookies';
import { useSelector } from 'react-redux';
import { useGetRecentItemsQuery } from '../../redux/api/userEndpoints';

const ShLastViews = () => {

  const token = getTokenFromCookies();

  const { recentItems: localRecentItems } = useSelector((state) => state.recentItems);
  
  // Fetching favorites from the server if the user is logged in
  const { data: serverRecentItems } = useGetRecentItemsQuery(undefined, { skip: !token });
 
  console.log("serverRecentItems");
  console.log(localRecentItems);

  const recentItems = token ? serverRecentItems?.data : localRecentItems.toReversed().slice(0,20);


  return (
    <>
    {recentItems?.length > 0 && <div className=' bg-red py-10 slider'>
      <h1 className='text-colBlack text-4xl font-semibold pb-5'>
        Вы недавно смотрели
      </h1>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        spaceBetween={20}
        breakpoints={{
          260: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
      >
        {recentItems?.map((el) => (
          <SwiperSlide key={el?.id}>
            <ProductCard product={el} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>}
    </>
  );
};

export default ShLastViews;
