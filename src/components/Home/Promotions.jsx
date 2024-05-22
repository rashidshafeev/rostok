import { NavLink } from 'react-router-dom';
import { promotions } from '../../constants/data';

const Promotions = () => {
  return (
    <div className='pb-10 lg:px-4 max-w-[1420px] w-full mx-auto'>
      <h1 className='text-colBlack text-2xl mm:text-4xl font-semibold pb-3 px-3 sm:px-4 lg:px-0'>
        Акции
      </h1>
      <div className='flex space-x-5 overflow-x-scroll lg:overflow-x-hidden pb-3 scrollable px-3'>
        {promotions?.map((el, index) => (
          <div
            key={el?.id}
            className='text-white min-w-[300px] max-w-[300px] lg:max-w-[460px] w-full h-[160px] lg:h-[224px] rounded-xl overflow-hidden relative'
            style={{ backgroundImage: `url(${el?.bgImg})` }}
          >
            <div
              className={`${
                index === 0
                  ? 'bg-[#15765B]'
                  : index === 1
                  ? 'bg-[#0D85A9]'
                  : 'bg-[#FED97A]'
              } flex flex-col justify-between py-5 pl-5 h-full w-[55%]`}
            >
              <div
                className={`${
                  index === 0
                    ? 'bg-[#15765B]'
                    : index === 1
                    ? 'bg-[#0D85A9]'
                    : 'bg-[#FED97A]'
                } absolute w-[16%] h-full top-0 left-[47%] rounded-[100%]`}
              ></div>
              <h3
                className={`${
                  index === 2 ? 'text-black' : 'text-white'
                } lining-nums proportional-nums lg:text-xl leading-[120%] font-semibold z-[1] line-clamp-4 break-all`}
              >
                {el?.title}
              </h3>
              <NavLink
                className={`${
                  index === 2
                    ? 'border-black text-black'
                    : 'border-white text-white'
                } border-b w-max font-medium`}
                to='#'
              >
                Подробнее
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotions;
