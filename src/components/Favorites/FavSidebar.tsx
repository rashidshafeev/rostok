import { useState } from "react";

export const FavSidebar = ({ favorite, selectedFilter, setSelectedFilter }) => {
  // const [value, setValue] = useState([20, 37]);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  // function valuetext(value) {
  //   return `${value}`;
  // }

  //   function getUniqueFirstChainItemsWithCount(data) {
  //     const uniqueItems = new Map();

  //     data.forEach(item => {
  //         const firstChainItem = item.chain[0];
  //         const key = `${firstChainItem.id}-${firstChainItem.name}-${firstChainItem.slug}`;

  //         if (!uniqueItems.has(key)) {
  //             uniqueItems.set(key, {
  //                 count: 0,
  //                 id: firstChainItem.id,
  //                 name: firstChainItem.name,
  //                 slug: firstChainItem.slug
  //             });
  //         }

  //         uniqueItems.get(key).count += item.count;
  //     });

  //     return Array.from(uniqueItems.values());
  // }

  // const uniqueCategories = getUniqueFirstChainItemsWithCount(favorite.categories);

  return (
    <div className="md:block hidden min-w-[220px] max-w-[220px] w-full lining-nums proportional-nums">
      <h4 className="font-semibold text-colBlack px-2 py-[2px] rounded-md">
        Категории
      </h4>
      <ul className="pl-2 pt-1 space-y-1 mb-2">
        {favorite?.categories?.map((category) => {
          return (
            <li
              onClick={() => {
                setSelectedFilter({
                  type: "category",
                  filter: category?.chain[category?.chain?.length - 1].id,
                });
              }}
              className={`text-colBlack ${
                selectedFilter.filter ===
                category?.chain[category?.chain?.length - 1].id
                  ? "font-bold"
                  : ""
              } text-sm  px-2 py-[2px] rounded-md cursor-pointer`}
            >
              {category?.chain[category?.chain?.length - 1]?.name}
              <span className="ml-2  text-xs text-colDarkGray font-normal  align-super">
                {category?.count}
              </span>
            </li>
          );
        })}
      </ul>

      {/* <h4 className='font-semibold px-2 py-[2px] text-colBlack'>Мои списки</h4>
      <ul className='pl-2 pt-1 space-y-1'>
        <li className='text-colBlack text-sm px-2 py-[2px] rounded-md cursor-pointer'>
          Двери
        </li>
        <li className='text-colBlack text-sm px-2 py-[2px] rounded-md cursor-pointer'>
          Столешницы
        </li>
      </ul> */}
      {/* <form className='sticky top-[70px] border border-colSuperLight rounded-2xl px-3 pb-5 shadow-[0px_15px_20px_0px_rgba(0,_0,_0,_0.05)] mt-2'>
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
            expandIcon={<ArrowIcon className='!w-4 !h-4 rotate-[180deg]' />}
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
            expandIcon={<ArrowIcon className='!w-4 !h-4 rotate-[180deg]' />}
          >
            <span className='font-semibold text-colBlack'>Срок доставки</span>
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
                    <p className='text-sm font-medium text-colBlack'>Сегодня</p>
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
                    <p className='text-sm font-medium text-colBlack'>Любой</p>
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
            expandIcon={<ArrowIcon className='!w-4 !h-4 rotate-[180deg]' />}
          >
            <span className='font-semibold text-colBlack'>Производитель</span>
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
                <p className='text-sm font-medium text-colBlack'>Egger (18)</p>
              }
            />
            <FormControlLabel
              control={
                <Checkbox style={{ color: '#15765B', padding: '5px' }} />
              }
              label={
                <p className='text-sm font-medium text-colBlack'>FAB (12)</p>
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
            expandIcon={<ArrowIcon className='!w-4 !h-4 rotate-[180deg]' />}
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
      </form> */}
    </div>
  );
};
