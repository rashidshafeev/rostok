import { NavLink } from 'react-router-dom';
import { promotions } from '../../constants/data';

const Promotions = () => {
  const getBgColor = (index) => {
    const colors = ['#15765B', '#0D85A9', '#FED97A'];
    return index < colors.length ? colors[index] : '';
  };

  return (
    <div className='pb-10'>
      <h1 className='text-colBlack text-4xl font-semibold pb-4'>Акции</h1>
      <div className='flex space-x-5'>
        {promotions?.map((el, index) => (
          <div
            key={el?.id}
            className={`text-white w-[460px] h-[224px] rounded-xl overflow-hidden relative ${
              index === 2 ? 'text-black' : 'text-white'
            }`}
            style={{ backgroundImage: `url(${el?.bgImg})` }}
          >
            <div
              className={`bg-[${getBgColor(
                index
              )}] flex flex-col justify-between py-5 pl-5 h-full w-[55%]`}
            >
              <div
                className={`bg-[${getBgColor(
                  index
                )}] absolute w-[16%] h-full top-0 left-[47%] rounded-[100%]`}
              ></div>
              <h3 className='lining-nums proportional-nums text-xl font-semibold z-[1]'>
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
