import { NavLink } from 'react-router-dom';
import noImg from '../../assets/images/no-image.png';

function CatalogCard({ category }) {
  return (
    <NavLink
      to={`/catalog/${category?.slug}`}
      state={{ category: category }}
      className='relative bg-colSuperLight rounded-lg lg:rounded-[20px] min-h-[120px] max-h-[150px] lg:min-h-[240px] lg:max-h-[260px] flex overflow-hidden'
    >
      <div className='flex flex-col justify-between md:h-full z-10 relative pb-3 md:pb-0 basis-1/2  p-3'>
        <h3 className='lg:text-xl font-semibold text-colBlack text-center md:text-left min-h-[38px] mm:min-h-[auto]'>
          {category?.name || 'Не указано'}
        </h3>
        {category?.children?.length && (
          <div className='hidden md:flex flex-col text-colDarkGray text-[10px] lg:text-xs font-semibold'>
            {category?.children?.slice(0, 4)?.map((item) => (
              <NavLink
                className='px-1 lg:px-2 py-[2px] lg:py-1 bg-white rounded-[20px] mr-1 lg:mr-2 mb-1 lg:mb-2'
                key={item?.id}
                to={`/catalog/${item?.slug}`}
                state={{ category: item }}
              >
                {item?.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
      <div className='z-0 md:w-full h-full overflow-hidden basis-1/2 bg-colLightGray'>
      {/* <div className='md:absolute md:right-5 md:top-1/2 md:-translate-y-1/2 z-0 w-4/5 md:w-full md:max-w-[160px] mx-auto overflow-hidden'> */}
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
    </NavLink>
  );
}

export default CatalogCard;
