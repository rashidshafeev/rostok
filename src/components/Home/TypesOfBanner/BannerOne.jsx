import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import bgImg from '../../../assets/temp-images/pattern.png';
import { bannerOne } from '../../../constants/data';

const BannerOne = () => {
  return (
    <Swiper
      navigation={window.innerWidth >= 991}
      pagination={true}
      modules={[Navigation, Autoplay, EffectFade, Pagination]}
      autoHeight={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
      // effect='fade'
      // fadeEffect={{ crossFade: true, speed: 5000 }}
      slidesPerView={1}
    >
      {bannerOne?.map((el) => (
        <SwiperSlide
          key={el?.id}
          className='h-[240px] mm:h-[360px] md:h-[480px] flex items-center justify-center bg-colGreen rounded-md mm:rounded-xl bg-center bg-no-repeat bg-cover text-white'
          style={{ backgroundImage: `url(${bgImg})` }}
        >
          <div className='flex justify-center items-center space-x-3 mm:space-x-5 px-3 mm:px-4'>
            <div className='w-3/5 mm:max-w-[380px] mm:w-full'>
              <h1 className='text-xl mm:text-3xl md:text-[40px] leading-[120%] md:leading-[46px] font-bold small-caps'>
                {el?.title}
              </h1>
              <p className='text-xs mm:text-sm md:text-lg py-4 proportional-nums lining-nums small-caps'>
                {el?.desc}
              </p>
              <button className='bg-white text-colBlack max-w-[120px] mm:max-w-[196px] w-full h-6 mm:h-10 rounded mm:rounded-md font-semibold text-[10px] mm:text-sm'>
                Перейти в каталог
              </button>
            </div>
            <div className='mm:p-3 mm:max-w-[414px] w-2/5 mm:w-full relative'>
              <span className='absolute top-[12%] md:top-[20%] left-[25%] md:left-[5%] rotate-[-10deg] bg-[#D62D30] text-sm md:text-2xl font-extrabold text-white w-12 h-12 md:h-20 md:w-20 flex justify-center items-center rounded-full'>
                -50%
              </span>
              <img
                className='w-full h-full object-contain'
                src={el?.img}
                alt='*'
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerOne;
