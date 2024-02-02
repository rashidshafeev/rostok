import { NavLink } from 'react-router-dom';
import { ExpandMore } from '@mui/icons-material';
import { useState } from 'react';

const CatMainSidebar = ({ catalog }) => {
  const [accordion, setAccordion] = useState({
    parent: null,
    child: null,
  });

  const toggleAccordion = (type, id) => {
    setAccordion((prevState) => ({
      ...prevState,
      [type]: prevState[type] === id ? null : id,
    }));
  };

  return (
    <div className='max-w-[220px] min-w-[220px] w-full'>
      <ul className='space-y-2'>
        {catalog?.map((el) => (
          <li key={el?.id}>
            <div className='flex justify-between'>
              <NavLink className='text-colBlack leading-5 font-semibold hover:underline'>
                <p className='relative max-w-[170px]'>
                  {el?.name}
                  <span className='absolute text-colGray font-[400] text-xs pl-2'>
                    {el?.product_count}
                  </span>
                </p>
              </NavLink>
              <ExpandMore
                onClick={() => toggleAccordion('parent', el?.id)}
                className={`${
                  accordion.parent === el?.id && 'rotate-[180deg]'
                } cursor-pointer !m-0`}
              />
            </div>
            <div
              className={`${
                accordion.parent === el?.id ? 'block' : 'hidden'
              } pl-5 space-y-[2px]`}
            >
              {el?.children?.map((child) => (
                <div key={child?.id}>
                  <div className='flex justify-between items-center'>
                    <NavLink className='text-colBlack text-sm leading-4 font-semibold hover:underline'>
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
                        } cursor-pointer !m-0`}
                      />
                    )}
                  </div>
                  <div
                    className={`${
                      accordion.child === child?.id ? 'block' : 'hidden'
                    } pl-5 pb-2`}
                  >
                    {child?.children?.map((item) => (
                      <div key={item?.id}>
                        <NavLink className='text-colBlack leading-5 text-sm hover:underline relative flex'>
                          {item?.name}
                          <span className='text-colGray font-[400] text-xs pl-2'>
                            {item?.product_count}
                          </span>
                        </NavLink>
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

export default CatMainSidebar;
