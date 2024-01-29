import { NavLink } from 'react-router-dom';
import { roomProducts } from '../../constants/data';

const RoomProducts = () => {
  return (
    <div className='pb-10'>
      <h1 className='text-colBlack text-4xl font-semibold pb-4'>
        Товары по комнатам
      </h1>
      <div className='grid grid-cols-3 gap-5'>
        {roomProducts?.map((el) => (
          <div
            key={el?.id}
            style={{ backgroundImage: `url(${el?.img})` }}
            className='p-5 bg-colSuperLight rounded-[20px] min-h-[300px] bg-cover bg-no-repeat bg-center'
          >
            <div className='absolute right-5 top-1/2 -translate-y-1/2 z-0 max-w-[160px] overflow-hidden'></div>
            <div className='flex flex-col justify-between h-full z-10 relative'>
              <h2 className='bg-white w-max rounded-[20px] px-4 py-1 font-semibold text-colBlack'>
                {el?.title}
              </h2>
              <div className='flex flex-wrap text-colDarkGray text-xs font-semibold'>
                {el?.items?.slice(0, 5)?.map((item, index) => (
                  <NavLink
                    to='#'
                    className='px-2 py-1 bg-white rounded-[20px] mr-2 mb-2'
                    key={index}
                  >
                    {item}
                  </NavLink>
                ))}
                {el?.items?.length > 4 && (
                  <NavLink
                    to='#'
                    className='px-2 py-1 bg-white rounded-[20px] mr-2 mb-2 text-colGreen'
                  >
                    Все категории
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomProducts;
