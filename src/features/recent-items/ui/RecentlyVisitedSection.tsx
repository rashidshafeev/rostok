import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useGetRecentItemsQuery } from '@/features/recent-items';
import { getTokenFromCookies } from '@/entities/user';
import { ProductCard } from '@/widgets/product-card';

export const RecentlyVisitedSection = () => {
  const token = getTokenFromCookies();

  const { recentItems: localRecentItems } = useSelector(
    (state) => state.recentItems
  );

  // Fetching favorites from the server if the user is logged in
  const { data: serverRecentItems } = useGetRecentItemsQuery(undefined, {
    skip: !token,
  });

  const recentItems = token
    ? serverRecentItems?.data
    : localRecentItems.toReversed().slice(0, 20);

  return (
    <>
      {recentItems?.length > 0 ? (
        <div className=" bg-red py-10 slider">
          <h1 className="text-colBlack text-4xl font-semibold pb-5">
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
        </div>
      ) : null}
    </>
  );
};
