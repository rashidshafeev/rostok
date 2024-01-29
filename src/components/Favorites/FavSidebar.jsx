import { NavLink } from 'react-router-dom';

const FavSidebar = () => {
  return (
    <div className='max-w-[220px] w-full'>
      <NavLink
        to='/favorites/items'
        className='font-semibold text-colBlack px-2 py-[2px] rounded-md aria-[current=page]:bg-[#EBEBEB]'
      >
        Избранное
      </NavLink>
      <ul className='pl-2 pt-1 space-y-1 mb-2'>
        <li>
          <NavLink
            className='text-colBlack text-sm px-2 py-[2px] rounded-md aria-[current=page]:bg-[#EBEBEB]'
            to='/favorites/category'
          >
            Кресла-мешки
          </NavLink>
        </li>
        <li>
          <NavLink
            className='text-colBlack text-sm px-2 py-[2px] rounded-md'
            to='/favorites/category'
          >
            Кожаные кресла
          </NavLink>
        </li>
        <li>
          <NavLink
            className='text-colBlack text-sm px-2 py-[2px] rounded-md'
            to='/favorites/category'
          >
            Кресла-диваны
          </NavLink>
        </li>
        <li>
          <NavLink
            className='text-colBlack text-sm px-2 py-[2px] rounded-md'
            to='/favorites/category'
          >
            В современном стиле
          </NavLink>
        </li>
      </ul>
      <h4 className='font-semibold px-2 pt-3 pb-[2px] text-colBlack'>
        Мои списки
      </h4>
      <ul className='pl-2 pt-1 space-y-1'>
        <li>
          <NavLink
            className='text-colBlack text-sm px-2 py-[2px] rounded-md'
            to='/favorites/category'
          >
            Двери
          </NavLink>
        </li>
        <li>
          <NavLink
            className='text-colBlack text-sm px-2 py-[2px] rounded-md'
            to='/favorites/category'
          >
            Столешницы
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default FavSidebar;
