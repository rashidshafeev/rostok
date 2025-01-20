import { NavLink } from 'react-router-dom';

import { useGetMainPageDataQuery } from '@/redux/api/contentEndpoints';

// const RoomProducts = ({ data }) => {
export const RoomProducts = () => {
  const { data, isLoading, isSuccess } = useGetMainPageDataQuery();

  return (
    <div className="pt-5 pb-10 lg:px-4 max-w-[1420px] w-full mx-auto">
      <h1 className="text-colBlack text-2xl mm:text-4xl font-semibold pb-4 px-3 mm:px-4 lg:px-0">
        Товары по комнатам
      </h1>
      <div className="flex lg:grid grid-cols-3 gap-5 overflow-x-scroll lg:overflow-x-hidden pb-3 lg:pb-0 scrollable px-3 mm:px-4 lg:px-0">
        {isSuccess
          ? data?.roomCategories?.map((el, i) => (
              <div
                // key={el?.id}
                key={i}
                className="bg-colSuperLight rounded-[20px] min-w-[300px] lg:min-h-[300px] relative overflow-hidden"
              >
                <div className="lg:absolute lg:top-0 lg:left-0 w-full h-[150px] lg:h-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={el?.image?.large}
                    alt="*"
                  />
                </div>
                <div className="flex flex-col justify-between min-h-[110px] lg:h-full z-10 relative p-2 mm:p-3 lg:p-5">
                  <h2 className="lg:bg-white w-max rounded-[20px] lg:px-4 py-1 font-semibold text-colBlack mb-2 lg:mb-0">
                    {el?.name}
                  </h2>
                  <div className="hidden lg:flex flex-wrap text-colDarkGray text-xs font-semibold">
                    {el?.children?.slice(0, 5)?.map((item, index) => (
                      <NavLink
                        to={`/catalog/${item.slug}`}
                        className="px-2 py-1 bg-white rounded-[20px] mr-2 mb-2"
                        key={index}
                      >
                        {item?.name}
                      </NavLink>
                    ))}
                    {el?.children?.length > 4 ? (
                      <NavLink
                        to={`/catalog/${el?.slug}`}
                        className="px-2 py-1 bg-white rounded-[20px] mr-2 mb-2 text-colGreen"
                      >
                        Все категории
                      </NavLink>
                    ) : null}
                  </div>
                  <div className="flex lg:hidden flex-wrap text-colDarkGray text-xs font-semibold">
                    {el?.items?.slice(0, 3)?.map((item, index) => (
                      <NavLink
                        to="#"
                        className="px-2 py-1 bg-white rounded-[20px] mr-1 mb-1"
                        key={index}
                      >
                        {item}
                      </NavLink>
                    ))}
                    {el?.items?.length > 4 ? (
                      <NavLink
                        to="#"
                        className="px-2 py-1 bg-white rounded-[20px] mr-2 mb-2 text-colGreen"
                      >
                        Все категории
                      </NavLink>
                    ) : null}
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
