import { NavLink } from 'react-router-dom';
import { ExpandMore } from '@mui/icons-material';
import { useState } from 'react';

const CatItemSidebar = ({ state }) => {
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
    <div className='max-w-[220px] min-w-[220px] w-full mr-8'>
      <ul className='space-y-2'>
        <li className='text-colBlack leading-5 font-semibold hover:underline'>
          <NavLink to='/catalog' className='flex items-center'>
            <ExpandMore className='cursor-pointer !m-0 !w-5 !h-5 rotate-[90deg]' />
            Каталог
          </NavLink>
        </li>
        <li className='text-colBlack leading-5 font-semibold bg-[#EBEBEB] rounded py-1 px-2'>
          {state?.catalog?.name}
        </li>
        {state?.catalog?.children?.map((el) => (
          <li key={el?.id} className='pl-3'>
            <div className='flex justify-between'>
              <NavLink
                to='products'
                state={{ category: el }}
                className='text-colBlack leading-5 font-semibold hover:underline'
              >
                <p className='relative max-w-[170px]'>
                  {el?.name}
                  <span className='absolute text-colGray font-[400] text-xs pl-2'>
                    {el?.product_count}
                  </span>
                </p>
              </NavLink>
              {el?.children?.length && (
                <ExpandMore
                  onClick={() => toggleAccordion('parent', el?.id)}
                  className={`${
                    accordion.parent === el?.id && 'rotate-[180deg]'
                  } cursor-pointer !m-0 !w-5 !h-5`}
                />
              )}
            </div>
            <div
              className={`${
                accordion.parent === el?.id ? 'block' : 'hidden'
              } pl-5 pt-1 space-y-1`}
            >
              {el?.children?.map((child) => (
                <div key={child?.id}>
                  <div className='flex justify-between items-center'>
                    <NavLink
                      to='products'
                      state={{ category: child }}
                      className='text-colBlack text-sm leading-4 font-semibold hover:underline'
                    >
                      <p className='relative max-w-[140px] w-full'>
                        {child?.name}
                        <span className='absolute text-colGray font-[400] text-xs pl-2'>
                          {child?.product_count}
                        </span>
                      </p>
                    </NavLink>
                    {child?.children?.length && (
                      <ExpandMore
                        onClick={() => toggleAccordion('child', child?.id)}
                        className={`${
                          accordion.child === child?.id && 'rotate-[180deg]'
                        } cursor-pointer !m-0 !w-5 !h-5`}
                      />
                    )}
                  </div>
                  <div
                    className={`${
                      accordion.child === child?.id ? 'block' : 'hidden'
                    } pl-5 pb-2 space-y-1`}
                  >
                    {child?.children?.map((item) => (
                      <div key={item?.id}>
                        <div className='flex justify-between'>
                          <NavLink
                            to='products'
                            state={{ category: item }}
                            className='text-colBlack leading-5 text-sm hover:underline relative flex'
                          >
                            <p className='relative max-w-[140px] w-full leading-4'>
                              {item?.name}
                              <span className='absolute text-colGray font-[400] text-xs pl-2'>
                                {item?.product_count}
                              </span>
                            </p>
                          </NavLink>
                          {item?.children?.length && (
                            <ExpandMore
                              onClick={() =>
                                toggleAccordion('childLast', item?.id)
                              }
                              className={`${
                                accordion.childLast === item?.id &&
                                'rotate-[180deg]'
                              } cursor-pointer !m-0 !w-5 !h-5`}
                            />
                          )}
                        </div>
                        <div
                          className={`${
                            accordion.childLast === item?.id
                              ? 'block'
                              : 'hidden'
                          } pl-2 pb-2`}
                        >
                          {item?.children?.map((itemChild) => (
                            <NavLink
                              key={itemChild?.id}
                              className='text-colBlack leading-5 text-sm hover:underline relative flex'
                            >
                              <p className='relative max-w-[140px] w-full'>
                                {itemChild?.name}
                                <span className='absolute text-colGray font-[400] text-xs pl-2'>
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

export default CatItemSidebar;