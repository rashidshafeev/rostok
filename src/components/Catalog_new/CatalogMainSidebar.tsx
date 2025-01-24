import { useState } from 'react';

import { NavLink } from 'react-router-dom';

import { ArrowIcon } from '../../helpers/Icons';

const CatalogSidebar = ({ categoryTree }) => {
  const [accordion, setAccordion] = useState({
    parent: null,
    child: null,
    childLast: null,
  });

  const toggleAccordion = (type, id) => {
    setAccordion((prevState) => ({
      ...prevState,
      [type]: prevState[type] === id ? null : id,
    }));
  };

  return (
    <div className="max-w-[220px] min-w-[220px] w-full hidden md:block">
      <ul className="space-y-2">
        {categoryTree?.map((el) => (
          <li key={el?.id}>
            <div className="flex justify-between">
              <NavLink
                to={el?.slug}
                state={{ category: el }}
                className="text-colBlack leading-5 font-semibold"
              >
                <p className="relative max-w-[170px]">
                  {el?.name}
                  <span className="absolute text-colGray font-[400] text-xs pl-2">
                    {el?.product_count}
                  </span>
                </p>
              </NavLink>
              {el?.children?.length ? (
                <ArrowIcon
                  onClick={() => toggleAccordion('parent', el?.id)}
                  className={`${
                    accordion.parent !== el?.id && 'rotate-[180deg]'
                  } cursor-pointer !w-4 !h-4`}
                />
              ) : null}
            </div>
            <div
              className={`${
                accordion.parent === el?.id ? 'block' : 'hidden'
              } pl-3 pt-2 space-y-[6px]`}
            >
              {el?.children?.map((child) => (
                <div key={child?.id}>
                  <div className="flex justify-between items-center">
                    <NavLink
                      to={child.slug}
                      state={{ category: child }}
                      className="text-colBlack text-[15px] leading-4 font-medium"
                    >
                      <p className="relative max-w-[140px] w-full">
                        {child?.name}
                        <span className="absolute text-colGray font-[400] text-xs pl-2">
                          {child?.product_count}
                        </span>
                      </p>
                    </NavLink>
                    {child?.children?.length ? (
                      <ArrowIcon
                        onClick={() => toggleAccordion('child', child?.id)}
                        className={`${
                          accordion.child !== child?.id && 'rotate-[180deg]'
                        } cursor-pointer !w-4 !h-4`}
                      />
                    ) : null}
                  </div>
                  <div
                    className={`${
                      accordion.child === child?.id ? 'block' : 'hidden'
                    } pl-4 pb-2 pt-2 space-y-[5px]`}
                  >
                    {child?.children?.map((item) => (
                      <div key={item?.id}>
                        <div className="flex justify-between">
                          <NavLink
                            to={item.slug}
                            state={{ category: child }}
                            className="text-colBlack leading-5 text-sm relative flex"
                          >
                            <p className="relative max-w-[140px] w-full leading-4">
                              {item?.name}
                              <span className="absolute text-colGray font-[400] text-xs pl-2">
                                {item?.product_count}
                              </span>
                            </p>
                          </NavLink>
                          {item?.children?.length ? (
                            <ArrowIcon
                              onClick={() =>
                                toggleAccordion('childLast', item?.id)
                              }
                              className={`${
                                accordion.childLast !== item?.id &&
                                'rotate-[180deg]'
                              } cursor-pointer !w-4 !h-4`}
                            />
                          ) : null}
                        </div>
                        <div
                          className={`${
                            accordion.childLast === item?.id
                              ? 'block'
                              : 'hidden'
                          } pl-2 pb-2 pt-1`}
                        >
                          {item?.children?.map((itemChild) => (
                            <NavLink
                              to="categories/products"
                              state={{ category: itemChild }}
                              key={itemChild?.id}
                              className="text-colBlack leading-5 text-sm relative flex"
                            >
                              <p className="relative max-w-[140px] w-full">
                                {itemChild?.name}
                                <span className="absolute text-colGray font-[400] text-xs pl-2">
                                  {itemChild?.product_count}
                                </span>
                              </p>
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatalogSidebar;
