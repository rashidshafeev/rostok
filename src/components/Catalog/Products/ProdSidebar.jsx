import { useNavigate } from 'react-router-dom';
import { ExpandMore } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { fetchCategoryTree } from '../../../api/catalog';
import { Loading } from '../../../helpers/Loader/Loader';

const ProdSidebar = ({ state, handleFetchProducts }) => {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { success, data } = await fetchCategoryTree(state?.category?.id, 1);
      if (success) {
        setItem(data);
        setIsLoading(false);
      }
      setIsLoading(false);
    })();
  }, [state?.category?.id]);

  return (
    <div className='max-w-[220px] min-w-[220px] w-full mr-5'>
      {isLoading ? (
        <Loading extraStyle='240px' />
      ) : (
        <ul className='space-y-2'>
          <li className='text-colBlack leading-5 font-semibold'>
            <button
              onClick={() => navigate(-1)}
              className='flex items-center bg-white'
            >
              <ExpandMore className='cursor-pointer !m-0 !w-5 !h-5 rotate-[90deg]' />
              Назад
            </button>
          </li>
          <li className='text-colBlack leading-5 font-semibold bg-[#EBEBEB] rounded py-1 px-2'>
            {state?.category?.name}
          </li>
          {item?.map((el) => (
            <li key={el?.id} className='pl-3'>
              <div className='flex justify-between'>
                <span
                  onClick={() => handleFetchProducts(el?.id)}
                  className='text-colBlack leading-5 font-semibold cursor-pointer'
                >
                  <p className='relative max-w-[170px]'>
                    {el?.name}
                    <span className='absolute text-colGray font-[400] text-xs pl-2'>
                      {el?.product_count}
                    </span>
                  </p>
                </span>
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
                      <span
                        onClick={() => handleFetchProducts(child?.id)}
                        className='text-colBlack text-sm leading-4 font-semibold cursor-pointer'
                      >
                        <p className='relative max-w-[140px] w-full'>
                          {child?.name}
                          <span className='absolute text-colGray font-[400] text-xs pl-2'>
                            {child?.product_count}
                          </span>
                        </p>
                      </span>
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
                            <span
                              onClick={() => handleFetchProducts(item?.id)}
                              className='text-colBlack leading-5 text-sm cursor-pointer relative flex'
                            >
                              <p className='relative max-w-[140px] w-full leading-4'>
                                {item?.name}
                                <span className='absolute text-colGray font-[400] text-xs pl-2'>
                                  {item?.product_count}
                                </span>
                              </p>
                            </span>
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
                              <span
                                key={itemChild?.id}
                                onClick={() => handleFetchProducts(itemChild?.id)}
                                className='text-colBlack leading-5 text-sm cursor-pointer relative flex'
                              >
                                <p className='relative max-w-[140px] w-full'>
                                  {itemChild?.name}
                                  <span className='absolute text-colGray font-[400] text-xs pl-2'>
                                    {itemChild?.product_count}
                                  </span>
                                </p>
                              </span>
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
      )}
    </div>
  );
};

export default ProdSidebar;
