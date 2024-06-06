import { NavLink } from 'react-router-dom';
import { useGetCategoryTreeQuery } from '../../redux/api/api';
import { customTags } from '../../constants/data';

function CatalogFastAccess() {
  const { data } = useGetCategoryTreeQuery();

  return (
    <div className='content mx-auto flex items-center scrollable overflow-x-scroll space-x-4 pb-2'>
      {customTags?.map((el) => (
        <NavLink
          to={`/catalog${el?.slug}`}
          key={el?.id}
          style={{ backgroundColor: `${el?.bgColor}` }}
          className='rounded h-[27px] flex items-center justify-center px-4'
        >
          <img src={el?.icon2} alt='*' />
          <span className='text-sm font-semibold text-white pl-1'>
            {el?.name}
          </span>
        </NavLink>
      ))}
      {data?.children?.slice(0, 14)?.map((el) => (
        <NavLink
          to={`catalog/${el.slug}`}
          state={{ category: el }}
          key={el?.id}
          className='whitespace-nowrap text-colBlack text-sm font-semibold'
        >
          {el?.name}
        </NavLink>
      ))}
      <NavLink
        to='/catalog'
        className='whitespace-nowrap text-colGreen text-sm font-semibold'
      >
        Показать все
      </NavLink>
    </div>
  );
}

export default CatalogFastAccess;
