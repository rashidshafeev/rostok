import banner from '../../assets/temp-images/banner.png';

const SaleBanner = () => {
  return (
    <div className='flex h-[200px] rounded-xl overflow-hidden'>
      <div className='w-2/5 bg-[#F8B638] flex justify-center items-center px-5'>
        <h1 className='text-[54px] leading-[58px] font-[900] text-white pl-10'>
          Осенниий ценопад!
        </h1>
      </div>
      <div className='w-3/5 relative'>
        <div className='absolute left-[-70px] top-1/2 translate-y-[-50%] w-[130px] h-[130px] rounded-full bg-[#D62D30] text-white flex justify-center items-center lining-nums proportional-nums'>
          <h1 className='text-[40px] font-extrabold'>
            <span className='text-sm font-semibold'>до </span>
            50%
          </h1>
        </div>
        <img src={banner} alt='*' />
      </div>
    </div>
  );
};

export default SaleBanner;
