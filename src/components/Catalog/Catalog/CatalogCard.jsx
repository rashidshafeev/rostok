import { NavLink } from 'react-router-dom';
import noImg from '../../../assets/images/no-image.png';

function CatalogCard({ category }) {
  return (
    <NavLink
      to={`${category?.path}`}
      state={{ category: category }}
      className='p-5 relative bg-colSuperLight rounded-[20px] min-h-[240px]'
    >
      <div className='absolute right-5 top-1/2 -translate-y-1/2 z-0 max-w-[160px] overflow-hidden'>
        <img
          className='w-full h-full object-contain'
          src={category?.image?.large || noImg}
          onError={(e) => {
            e.target.onError = null;
            e.target.src = noImg;
          }}
          alt='*'
        />
      </div>
      <div className='flex flex-col justify-between h-full z-10 relative'>
        <h3 className='text-xl font-semibold text-colBlack w-max'>
          {category?.name || 'Не указано'}
        </h3>
        {category?.children?.length && (
          <div className='flex flex-wrap text-colDarkGray text-xs font-semibold'>
            {category?.children?.slice(0, 4)?.map((item) => (
              <p
                className='px-2 py-1 bg-white rounded-[20px] mr-2 mb-2'
                key={item?.id}
              >
                {item?.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </NavLink>
  );
}

export default CatalogCard;
