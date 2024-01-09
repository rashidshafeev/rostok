import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import bgImg from '../../../assets/temp-images/pattern.png';
import { bannerOne } from '../../../constants/data';

const BannerOne = () => {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation, Autoplay, EffectFade]}
      // autoplay={{
      //   delay: 4000,
      //   disableOnInteraction: true,
      // }}
      effect='fade'
      // fadeEffect={{ crossFade: true }}
      slidesPerView={1}
    >
      {bannerOne?.map((el) => (
        <SwiperSlide
          key={el?.id}
          className='h-[480px] flex items-center justify-center bg-colGreen rounded-xl bg-center bg-no-repeat bg-cover text-white'
          style={{ backgroundImage: `url(${bgImg})` }}
        >
          <div className='flex justify-center items-center space-x-5'>
            <div className='max-w-[380px] w-full'>
              <h1 className='text-[40px] leading-[46px] font-bold small-caps'>
                {el?.title}
              </h1>
              <p className='text-lg py-4 proportional-nums lining-nums small-caps'>
                {el?.desc}
              </p>
              <button className='bg-white text-colBlack max-w-[196px] w-full h-10 rounded-md font-semibold text-sm'>
                Перейти в каталог
              </button>
            </div>
            <div className='p-3 max-w-[414px] w-full relative'>
              <span className='absolute top-[20%] left-[5%] rotate-[-10deg] bg-[#D62D30] text-2xl font-extrabold text-white h-20 w-20 flex justify-center items-center rounded-full'>
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
