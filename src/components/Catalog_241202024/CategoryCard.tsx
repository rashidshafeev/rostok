import { NavLink } from 'react-router-dom';

import noImg from '../../assets/images/no-image.png';

function CatalogCard({ category }) {
  return (
    <NavLink
      to={`/catalog/${category?.slug}`}
      state={{ category: category }}
      className="relative bg-colSuperLight rounded-lg lg:rounded-[20px] h-[200px] lg:h-[240px] flex justify-between flex-col md:flex-row overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow duration-200"
    >
      <div className="flex flex-col justify-between z-10 relative pb-3 md:pb-0 basis-auto md:basis-1/2 lg:basis-[45%] p-3">
        <h3 className="lg:text-xl font-semibold text-colBlack text-center md:text-left">
          {category?.name || 'Не указано'}
        </h3>
        {category?.children?.length > 0 ? (
          <div className="hidden md:flex flex-col text-colDarkGray text-[10px] lg:text-xs font-semibold">
            {category?.children?.slice(0, 4)?.map((item) => (
              <NavLink
                className="px-1 lg:px-2 py-[2px] lg:py-1 bg-white rounded-[20px] mr-1 lg:mr-2 mb-1 lg:mb-2"
                key={item?.id}
                to={`/catalog/${item?.slug}`}
                state={{ category: item }}
              >
                {item?.name}
              </NavLink>
            ))}
          </div>
        ) : null}
      </div>
      <div className="z-0 flex-1 max-h-[128px] md:max-h-none md:h-full overflow-hidden md:basis-1/2 lg:basis-[55%] bg-colLightGray">
        <img
          className="w-full h-full object-cover"
          src={category?.image?.large || noImg}
          onError={(e) => {
            e.target.onError = null;
            e.target.src = noImg;
          }}
          alt="*"
        />
      </div>
    </NavLink>
  );
}

export default CatalogCard;
