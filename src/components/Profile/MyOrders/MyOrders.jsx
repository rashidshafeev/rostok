import {
  ContentCopy,
  ExpandMore,
  Close,
  Cached,
  DescriptionOutlined,
} from '@mui/icons-material';
import { orders } from '../../../constants/data';
import CSearchField from '../../../helpers/CustomInputs/CSearchField';
import CSelectField from '../../../helpers/CustomInputs/CSelectField';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import arrowIcon from '../../../assets/icons/arrow-icon.svg';

const MyOrders = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const options = [
    {
      id: 1,
      name: 'Отменить',
      icon: <Close className='!w-[18px] font-light text-colGreen mr-1' />,
    },
    {
      id: 2,
      name: 'Повторить заказ',
      icon: <Cached className='!w-[18px] font-light text-colGreen mr-1' />,
    },
    {
      id: 3,
      name: 'Скачать документы',
      icon: (
        <DescriptionOutlined className='!w-4 font-light text-colGreen mr-1' />
      ),
    },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleAccordion = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className='w-full lining-nums proportional-nums'>
      <NavLink className='flex mm:hidden items-center space-x-1 mb-2' to='/profile'>
        <img src={arrowIcon} alt='*' />
        <span className='text-sm font-semibold'>Вернуться к профилю</span>
      </NavLink>
      <h3 className='text-xl font-semibold text-colBlack pb-4'>Все заказы</h3>
      <div className='max-w-[700px] w-full space-y-4 mb-5'>
        <CSearchField
          label='Название/код товара или номер заказа'
          name='search'
          type='search'
        />
        <div className='grid grid-cols-2 gap-4'>
          <CSelectField
            label='Контрагент'
            name='kontragent'
            options={[
              { value: 'option1', label: 'Александр' },
              { value: 'option2', label: 'Александр 2' },
              { value: 'option3', label: 'Александр 3' },
            ]}
          />
          <CSelectField
            label='Статус заказа'
            name='status'
            options={[
              { id: 1, value: 'option1', label: 'Все' },
              { id: 2, value: 'option2', label: 'Комплектуется' },
              { id: 3, value: 'option3', label: 'Ожидает получения' },
              { id: 4, value: 'option3', label: 'Выполнен' },
              { id: 5, value: 'option3', label: 'Отменен' },
            ]}
          />
        </div>
      </div>
      <div className='space-y-5'>
        {orders?.map((el, index) => (
          <div
            className='rounded-[10px] overflow-hidden border border-[#EBEBEB]'
            key={el?.id}
          >
            <div className='lg:flex justify-between lg:space-x-3 bg-colSuperLight p-2 sm:p-3 lg:p-5'>
              <div>
                <div className='mm:flex items-center mm:space-x-2 pb-2 mm:pb-0'>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                      <h4 className='mm:text-lg lg:text-xl font-semibold text-colBlack mr-2'>
                        № {el?.orderNumber}
                      </h4>
                      <ContentCopy className='!w-4 cursor-pointer !mr-3' />
                    </div>
                    <div className='mm:hidden'>
                      <IconButton
                        aria-label='more'
                        id='long-button'
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup='true'
                        onClick={handleClick}
                        sx={{ paddingTop: '0', paddingRight: '0' }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id='long-menu'
                        MenuListProps={{
                          'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            maxHeight: 48 * 4.5,
                            width: '200px',
                          },
                        }}
                      >
                        {options.map((el) => (
                          <MenuItem
                            key={el?.id}
                            selected={el === 'Pyxis'}
                            onClick={handleClose}
                            className='flex items-center !p-2'
                          >
                            {el?.icon}
                            <span>{el?.name}</span>
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  </div>
                  <span
                    className={`${
                      el?.status === 'Комплектуется'
                        ? 'bg-[#58C7DA] text-white'
                        : el?.status === 'Ожидает получения'
                        ? 'bg-[#D62D30] text-white'
                        : el?.status === 'Выполнен'
                        ? 'bg-[#15765B] text-white'
                        : 'bg-colGray'
                    } px-2 sm:px-3 lg:px-5 py-[2px] sm:py-1 lg:py-2 rounded-[100px] text-xs sm:text-xs lg:text-sm font-semibold text-center`}
                  >
                    {el?.status}
                  </span>
                </div>
                <p className='text-colBlack'>от {el?.date}</p>
              </div>
              <div className='flex mm:justify-end'>
                <span className='text-colBlack mr-1 leading-[120%]'>
                  Сумма заказа:
                </span>
                <span className='text-colBlack leading-[120%] font-bold'>
                  24 686 ₽
                </span>
              </div>
            </div>
            <div className='grid lg:grid-cols-2 gap-3 lg:gap-5 sm:p-2 p-3 lg:p-4'>
              <div>
                <div className='flex mb-2'>
                  <span className='text-colBlack mr-1 leading-[120%]'>
                    Доставим до:
                  </span>
                  <span className='text-colBlack leading-[120%] font-semibold'>
                    {el?.date}
                  </span>
                </div>
                <div className='flex'>
                  <span className='text-colBlack mr-1 leading-[120%]'>
                    Способ получения:
                  </span>
                  <span className='text-colBlack leading-[120%] font-semibold'>
                    {el?.receiveType}
                  </span>
                </div>
                <p className='text-colBlack text-sm py-1'>{el?.address}</p>
                <div className='flex mt-1'>
                  <span className='text-colBlack mr-1 leading-[120%]'>
                    Способ оплаты:
                  </span>
                  <span className='text-colBlack leading-[120%] font-semibold'>
                    {el?.paymentType}
                  </span>
                </div>
              </div>
              <div className='lg:flex flex-col justify-between items-start'>
                <div className='flex lg:justify-end items-start space-x-3'>
                  {el?.items?.map((el) => (
                    <div
                      key={el?.id}
                      className='w-[50px] min-w-[50px] h-[50px] rounded-md overflow-hidden bg-colSuperLight p-1'
                    >
                      <img
                        className='w-full h-full object-contain'
                        src={el?.image}
                        alt=''
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleToggleAccordion(index)}
                  className='flex items-center ml-auto outline-none mt-2 lg:mt-0'
                >
                  <span className='text-sm font-semibold text-colBlack'>
                    Посмотреть заказ
                  </span>
                  <ExpandMore
                    className={`${
                      expandedIndex === index ? 'rotate-[-180deg]' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
            {expandedIndex === index && (
              <div className='p-2 sm:p-3 lg:p-4'>
                <div className='hidden mm:flex space-x-4 mb-4'>
                  <button className='flex items-center'>
                    <Close className='!w-[18px] font-light text-colGreen mr-1' />
                    <p className='text-sm font-semibold text-colBlack leading-[120%]'>
                      Отменить
                    </p>
                  </button>
                  <button className='flex items-center'>
                    <Cached className='!w-[18px] font-light text-colGreen mr-1' />
                    <p className='text-sm font-semibold text-colBlack leading-[120%]'>
                      Повторить заказ
                    </p>
                  </button>
                  <button className='flex items-center'>
                    <DescriptionOutlined className='!w-4 font-light text-colGreen mr-1' />
                    <p className='text-sm font-semibold text-colBlack leading-[120%]'>
                      Скачать документы
                    </p>
                  </button>
                </div>
                <div className='space-y-3'>
                  {el?.items?.map((el) => (
                    <div
                      key={el?.id}
                      className='md:flex justify-between md:space-x-3 border-t border-[#EBEBEB] pt-3'
                    >
                      <div className='flex space-x-2 md:space-x-3 md:w-1/2'>
                        <div className='w-[50px] min-w-[50px] h-[50px] rounded-md overflow-hidden bg-colSuperLight p-1'>
                          <img
                            className='w-full h-full object-contain'
                            src={el?.image}
                            alt=''
                          />
                        </div>
                        <div>
                          <p className='text-colBlack text-sm font-medium line-clamp-2 break-all'>
                            {el?.name}
                          </p>

                          <div className='flex space-x-2 py-1'>
                            <span className='text-xs text-colDarkGray'>
                              Артикуль:
                            </span>
                            <span className='text-xs text-colDarkGray'>
                              {el?.article}
                            </span>
                          </div>
                          <div className='flex space-x-2'>
                            <span className='text-xs lg:text-sm text-colBlack'>
                              Дата отправки:
                            </span>
                            <span className='text-xs lg:text-sm text-colGreen font-medium'>
                              {el?.deliveryDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='flex justify-between items-center md:items-start space-x-3 pl-[58px] md:pl-0 pt-3 md:pt-0'>
                        <span className='text-colBlack whitespace-nowrap'>
                          {el?.count} шт
                        </span>
                        <span className='text-colBlack font-bold whitespace-nowrap'>
                          {el?.cost} ₽
                        </span>
                        <div className='max-w-[120px] lg:max-w-[160px] w-full flex justify-end items-start'>
                          <span
                            className={`${
                              el?.status === 'Комплектуется'
                                ? 'bg-[#58C7DA] text-white'
                                : el?.status === 'Ожидает получения'
                                ? 'bg-[#D62D30] text-white'
                                : el?.status === 'Выполнен'
                                ? 'bg-[#15765B] text-white'
                                : 'bg-colGray'
                            } px-2 xl:px-4 py-1 rounded-[100px] text-[10px] leading-[115%] lg:text-xs font-semibold ml-auto text-center`}
                          >
                            {el?.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
