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
                {el?.name}
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
              } pl-5 space-y-1`}
            >
              {el?.children?.map((child) => (
                <div key={child?.id}>
                  <div className='flex justify-between items-center'>
                    <NavLink className='text-colBlack leading-[18px] font-semibold hover:underline'>
                      {child?.name}
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
                        <NavLink className='text-colBlack leading-5 text-sm hover:underline'>
                          {item?.name}
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
