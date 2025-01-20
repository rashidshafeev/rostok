import { useGetMainPageDataQuery } from '@/redux/api/contentEndpoints';

export const SaleBanner = () => {
  const { data, isLoading, isSuccess } = useGetMainPageDataQuery();

  return (
    isSuccess &&
    data && (
      <div className="flex h-[90px] xs:h-[110px] md:h-[160px] xl:h-[200px] rounded-md mm:rounded-xl overflow-hidden">
        <div
          className="w-1/2 md:w-2/5  flex lg:justify-center items-center px-3 sm:px-5"
          style={{
            backgroundColor: data?.staticBaner?.background_color,
          }}
        >
          <h1
            className="xs:text-lg sm:text-xl mm:text-3xl md:text-4xl lg:text-5xl xl:text-[54px] uppercase xl:leading-[58px] font-[900] text-[] xl:pl-10 pr-5 mm:pr-24 lg:pr-0"
            style={{
              color: data?.staticBaner?.text_color,
            }}
          >
            {data?.staticBaner?.text}
          </h1>
        </div>
        <div className="w-1/2 md:w-3/5 relative">
          <div className="absolute left-[-33px] xs:left-[-36px] mm:left-[-60px] xl:/left-[-70px] top-1/2 translate-y-[-50%] w-16 xs:w-[70px] md:w-28 xl:w-[130px] h-16 xs:h-[70px] md:h-28 xl:h-[130px] rounded-full bg-[#D62D30] text-white flex justify-center items-center lining-nums proportional-nums">
            <h1 className="xs:text-lg md:text-3xl xl:text-[40px] font-extrabold">
              <span className="text-xs md:text-sm font-semibold">до </span>
              {data?.staticBaner?.discount}
            </h1>
          </div>
          <img
            className="w-full h-full"
            src={data?.staticBaner?.picture?.medium}
            alt="*"
          />
        </div>
      </div>
    )
  );
};
