import React, { useState } from 'react';

import { ArrowIcon } from '@helpers/Icons';
import { NavLink, useParams } from 'react-router-dom';

import { useGetCategoryTreeQuery } from '@/entities/product/api/productApi';

import SidebarCategoryTreeSkeleton from './SidebarCategoryTreeSkeleton';

const SidebarCategoryTree = () => {
  const { categoryId } = useParams();

  const {
    data: categories,
    isLoading: categoryTreeIsLoading,
    isSuccess: categoryTreeIsSuccess,
  } = useGetCategoryTreeQuery(categoryId);

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
    <>
      {categoryTreeIsLoading ? <SidebarCategoryTreeSkeleton /> : null}
      {!categoryTreeIsLoading && categoryTreeIsSuccess ? (
        <ul className="space-y-2">
          {categories?.children?.map((el) => (
            <li key={el?.id} className="pl-3">
              <div className="flex justify-between">
                <NavLink
                  to={`/catalog/${el?.slug}`}
                  className="text-colBlack leading-5 font-semibold cursor-pointer"
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
                    } cursor-pointer !m-0 !w-4 !h-4`}
                  />
                ) : null}
              </div>
              <div
                className={`${
                  accordion.parent === el?.id ? 'block' : 'hidden'
                } pl-5 pt-1 space-y-1`}
              >
                {el?.children?.map((child) => (
                  <div key={child?.id}>
                    <div className="flex justify-between items-center">
                      <NavLink
                        to={`/catalog/${child?.slug}`}
                        className="text-colBlack text-sm leading-4 font-semibold cursor-pointer"
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
                          } cursor-pointer !m-0 !w-4 !h-4`}
                        />
                      ) : null}
                    </div>
                    <div
                      className={`${
                        accordion.child === child?.id ? 'block' : 'hidden'
                      } pl-5 pb-2 space-y-1`}
                    >
                      {child?.children?.map((item) => (
                        <div key={item?.id}>
                          <div className="flex justify-between">
                            <NavLink
                              to={`/catalog/${item?.slug}`}
                              className="text-colBlack leading-5 text-sm cursor-pointer relative flex"
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
                                } cursor-pointer !m-0 !w-4 !h-4`}
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
                                to={`/catalog/${itemChild?.slug}`}
                                key={itemChild?.id}
                                className="text-colBlack leading-5 text-sm cursor-pointer relative flex"
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
      ) : null}
    </>
  );
};

export default SidebarCategoryTree;
