import { useEffect, useRef } from 'react';

import { NavLink } from 'react-router-dom';

import { useGetCategoryTreeQuery } from '@/entities/category';
import { useGetBasicFiltersQuery } from '@/entities/filter';

export const CatalogFastAccess = () => {
  const { data } = useGetCategoryTreeQuery();
  console.log('fastacces', data);
  const { data: basicFilters } = useGetBasicFiltersQuery();

  const scrollableDivRef = useRef(null);

  useEffect(() => {
    const handleWheel = (event) => {
      const div = scrollableDivRef.current;
      if (div && event.deltaY !== 0) {
        // Prevent default vertical scroll
        event.preventDefault();
        // Scroll horizontally instead
        div.scrollLeft += event.deltaY;
      }
    };

    const div = scrollableDivRef.current;
    if (div) {
      div.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (div) {
        div.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div
      className="content mx-auto flex items-center scrollable overflow-x-scroll space-x-4 pb-2"
      ref={scrollableDivRef}
    >
      {basicFilters?.tags?.map((tag) => (
        <NavLink
          to={`/catalog/tags?tags=${tag?.tag}`}
          key={tag?.tag}
          style={{ backgroundColor: `${tag?.background_color}` }}
          className="rounded h-[27px] flex items-center justify-center px-4"
        >
          {tag?.light_icon ? (
            <img src={tag?.light_icon?.medium} className="w-4 h-4" alt="*" />
          ) : null}

          <span
            style={{ color: tag?.text_color }}
            className="text-sm font-semibold text-white pl-1"
          >
            {tag?.tag}
          </span>
        </NavLink>
      ))}
      {data?.children?.slice(0, 14)?.map((el) => (
        <NavLink
          to={`catalog/${el.slug}`}
          state={{ category: el }}
          key={el?.id}
          className="whitespace-nowrap text-colBlack text-sm font-semibold"
        >
          {el?.name}
        </NavLink>
      ))}
      <NavLink
        to="/catalog"
        className="whitespace-nowrap text-colGreen text-sm font-semibold"
      >
        Показать все
      </NavLink>
    </div>
  );
};
