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

const MyOrders = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggleAccordion = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className='w-full lining-nums proportional-nums'>
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
            <div className='flex justify-between space-x-3 bg-colSuperLight p-5'>
              <div>
                <div className='flex space-x-2'>
                  <h4 className='text-xl font-semibold text-colBlack'>
                    № {el?.orderNumber}
                  </h4>
                  <ContentCopy className='!w-4 cursor-pointer !mr-3' />
                  <span
                    className={`${
                      el?.status === 'Комплектуется'
                        ? 'bg-[#58C7DA] text-white'
                        : el?.status === 'Ожидает получения'
                        ? 'bg-[#D62D30] text-white'
                        : el?.status === 'Выполнен'
                        ? 'bg-[#15765B] text-white'
                        : 'bg-colGray'
                    } px-5 py-2 rounded-[100px] text-sm font-semibold`}
                  >
                    {el?.status}
                  </span>
                </div>
                <p className='text-colBlack'>от {el?.date}</p>
              </div>
              <div className='flex justify-end'>
                <span className='text-colBlack mr-1'>Сумма заказа:</span>
                <span className='text-colBlack font-bold'>24 686 ₽</span>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-5 p-4'>
              <div>
                <div className='flex mb-2'>
                  <span className='text-colBlack mr-1'>Доставим до:</span>
                  <span className='text-colBlack font-semibold'>
                    {el?.date}
                  </span>
                </div>
                <div className='flex'>
                  <span className='text-colBlack mr-1'>Способ получения:</span>
                  <span className='text-colBlack font-semibold'>
                    {el?.receiveType}
                  </span>
                </div>
                <p className='text-colBlack text-sm py-1'>{el?.address}</p>
                <div className='flex mt-1'>
                  <span className='text-colBlack mr-1'>Способ оплаты:</span>
                  <span className='text-colBlack font-semibold'>
                    {el?.paymentType}
                  </span>
                </div>
              </div>
              <div className='flex flex-col justify-between items-end'>
                <div className='flex justify-end items-start space-x-3'>
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
                  className='flex items-center outline-none'
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
              <div className='p-4'>
                <div className='flex space-x-4 mb-4'>
                  <button className='flex items-center'>
                    <Close className='!w-[18px] font-light text-colGreen mr-1' />
                    <span className='text-sm font-semibold text-colBlack'>
                      Отменить
                    </span>
                  </button>
                  <button>
                    <Cached className='!w-[18px] font-light text-colGreen mr-1' />
                    <span className='text-sm font-semibold text-colBlack'>
                      Повторить заказ
                    </span>
                  </button>
                  <button>
                    <DescriptionOutlined className='!w-4 font-light text-colGreen mr-1' />
                    <span className='text-sm font-semibold text-colBlack'>
                      Скачать документы
                    </span>
                  </button>
                </div>
                <div className='space-y-3'>
                  {el?.items?.map((el) => (
                    <div
                      key={el?.id}
                      className='flex justify-between space-x-3 border-t border-[#EBEBEB] pt-3'
                    >
                      <div className='flex space-x-3 w-1/2'>
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
                            <span className='text-sm text-colBlack'>
                              Дата отправки:
                            </span>
                            <span className='text-sm text-colGreen font-medium'>
                              {el?.deliveryDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='px-2'>
                        <span className='text-colBlack'>{el?.count} шт</span>
                      </div>
                      <div>
                        <span className='text-colBlack font-bold'>
                          {el?.cost} ₽
                        </span>
                      </div>
                      <div className='max-w-[180px] w-full flex justify-end items-start'>
                        <span
                          className={`${
                            el?.status === 'Комплектуется'
                              ? 'bg-[#58C7DA] text-white'
                              : el?.status === 'Ожидает получения'
                              ? 'bg-[#D62D30] text-white'
                              : el?.status === 'Выполнен'
                              ? 'bg-[#15765B] text-white'
                              : 'bg-colGray'
                          } px-4 py-1 rounded-[100px] text-xs font-semibold ml-auto`}
                        >
                          {el?.status}
                        </span>
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
