import { useNavigate } from 'react-router-dom';
import { ExpandMore } from '@mui/icons-material';
import CTextField from '../../../helpers/CustomInputs/CTextField';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchCategoryTree } from '../../../api/catalog';
import { Loading } from '../../../helpers/Loader/Loader';
import { IOSSwitch } from '../../Favorites/styledComponents/IOSSwitch';

const ProdSidebar = ({ state, handleFetchProducts }) => {
  const [item, setItem] = useState([]);
  const [value, setValue] = useState([20, 37]);
  const [isLoading, setIsLoading] = useState(false);
  const [accordion, setAccordion] = useState({
    parent: null,
    child: null,
    childLast: null,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function valuetext(value) {
    return `${value}`;
  }

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
        <>
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
                                  onClick={() =>
                                    handleFetchProducts(itemChild?.id)
                                  }
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
          <form className='border border-colSuperLight rounded-2xl px-3 pb-5 shadow-[0px_15px_20px_0px_rgba(0,_0,_0,_0.05)] mt-2'>
            <Accordion
              sx={{
                boxShadow: 'none',
                padding: 0,
                margin: 0,
                border: 'none',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: 0,
                },
              }}
              defaultExpanded
            >
              <AccordionSummary
                sx={{ padding: 0, minHeight: 0 }}
                expandIcon={<ExpandMore />}
              >
                <span className='font-semibold text-colBlack'>Цена, ₽</span>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <div className='grid grid-cols-2 gap-3 pb-3'>
                  <CTextField label='от 0' name='costFrom' type='number' />
                  <CTextField label='до 900 000' name='costTo' type='number' />
                </div>
                <Box>
                  <Slider
                    sx={{ color: '#15765B' }}
                    size='small'
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    max={900000}
                    min={0}
                    onChange={handleChange}
                    valueLabelDisplay='auto'
                    getAriaValueText={valuetext}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                boxShadow: 'none',
                padding: 0,
                margin: 0,
                border: 'none',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: 0,
                },
              }}
              defaultExpanded
            >
              <AccordionSummary
                sx={{ padding: 0, minHeight: 0 }}
                expandIcon={<ExpandMore />}
              >
                <span className='font-semibold text-colBlack'>
                  Срок доставки
                </span>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                  defaultValue='today'
                  className='!block'
                >
                  <div>
                    <FormControlLabel
                      value='today'
                      control={
                        <Radio style={{ color: '#15765B', padding: '5px' }} />
                      }
                      label={
                        <p className='text-sm font-medium text-colBlack'>
                          Сегодня
                        </p>
                      }
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value='todayOrTomorrow'
                      control={
                        <Radio style={{ color: '#15765B', padding: '5px' }} />
                      }
                      label={
                        <p className='text-sm font-medium text-colBlack'>
                          Сегодня или завтра
                        </p>
                      }
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value='fiveDays'
                      control={
                        <Radio style={{ color: '#15765B', padding: '5px' }} />
                      }
                      label={
                        <p className='text-sm font-medium text-colBlack'>
                          До 5 дней
                        </p>
                      }
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value='any'
                      control={
                        <Radio style={{ color: '#15765B', padding: '5px' }} />
                      }
                      label={
                        <p className='text-sm font-medium text-colBlack'>
                          Любой
                        </p>
                      }
                    />
                  </div>
                </RadioGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                boxShadow: 'none',
                padding: 0,
                margin: 0,
                border: 'none',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: 0,
                },
              }}
              defaultExpanded
            >
              <AccordionSummary
                sx={{ padding: 0, minHeight: 0 }}
                expandIcon={<ExpandMore />}
              >
                <span className='font-semibold text-colBlack'>
                  Производитель
                </span>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: '#15765B', padding: '5px' }}
                      defaultChecked
                    />
                  }
                  label={
                    <p className='text-sm font-medium text-colBlack'>
                      Egger (18)
                    </p>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox style={{ color: '#15765B', padding: '5px' }} />
                  }
                  label={
                    <p className='text-sm font-medium text-colBlack'>
                      FAB (12)
                    </p>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox style={{ color: '#15765B', padding: '5px' }} />
                  }
                  label={
                    <p className='text-sm font-medium text-colBlack'>
                      LUXEFORM (12)
                    </p>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox style={{ color: '#15765B', padding: '5px' }} />
                  }
                  label={
                    <p className='text-sm font-medium text-colBlack'>
                      Swiss Krono (1)
                    </p>
                  }
                />
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                boxShadow: 'none',
                padding: 0,
                margin: 0,
                border: 'none',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: 0,
                },
              }}
              defaultExpanded
            >
              <AccordionSummary
                sx={{ padding: 0, minHeight: 0 }}
                expandIcon={<ExpandMore />}
              >
                <span className='font-semibold text-colBlack'>Статус</span>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: '#15765B', padding: '5px' }}
                      defaultChecked
                    />
                  }
                  label={
                    <span className='bg-[#F57C1F] py-1 px-2 uppercase text-xs font-bold text-white rounded-xl'>
                      Хит
                    </span>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox style={{ color: '#15765B', padding: '5px' }} />
                  }
                  label={
                    <span className='bg-[#F04438] py-1 px-2 uppercase text-xs font-bold text-white rounded-xl'>
                      Распродажа
                    </span>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox style={{ color: '#15765B', padding: '5px' }} />
                  }
                  label={
                    <span className='bg-[#15765B] py-1 px-2 uppercase text-xs font-bold text-white rounded-xl'>
                      новинка
                    </span>
                  }
                />
              </AccordionDetails>
            </Accordion>
            <FormControlLabel
              sx={{ margin: '10px 0' }}
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              labelPlacement='start'
              label={
                <p className='text-sm font-semibold text-colBlack'>
                  Высокий рейтинг
                </p>
              }
            />
            <button className='bg-white border border-colGreen w-full rounded-md mb-3 p-2 text-colBlack font-semibold outline-none'>
              Применить
            </button>
            <span className='text-colDarkGray font-semibold flex justify-center cursor-pointer'>
              Очистить фильтр
            </span>
          </form>
        </>
      )}
    </div>
  );
};

export default ProdSidebar;