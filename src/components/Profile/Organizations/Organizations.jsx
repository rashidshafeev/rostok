import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { organizations } from '../../../constants/data';
import { useState } from 'react';

const Organizations = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggleAccordion = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className='w-full'>
      <h3 className='text-xl font-semibold text-colBlack pb-4'>
        Мои организации
      </h3>
      <button className='flex items-center rounded-lg border border-[#F5F5F5] p-2'>
        <span className='text-colGray bg-[#F5F5F5] w-8 h-8 rounded-md flex justify-center items-center text-5xl'>
          +
        </span>
        <span className='text-sm font-medium text-colBlack ml-3 mr-1'>
          Добавить организации
        </span>
      </button>
      <div className='grid grid-cols-2 gap-5 mt-4 lining-nums proportional-nums'>
        {organizations?.map((el, index) => (
          <div
            key={el?.id}
            className='rounded-[10px] border border-[#EBEBEB] overflow-hidden h-max'
          >
            <div className='bg-[#F5F5F5] min-h-[58px] flex items-center px-5 py-2'>
              <h3 className='text-xl font-semibold line-clamp-2 break-all'>
                {el?.name}
              </h3>
            </div>
            <div className='p-4'>
              <div className='flex space-x-3'>
                <div className='flex'>
                  <span className='text-colDarkGray mr-2'>ИНН:</span>
                  <h5 className='text-colBlack'>{el?.inn}</h5>
                </div>
                <div className='flex'>
                  <span className='text-colDarkGray mr-2'>КПП:</span>
                  <h5 className='text-colBlack'>{el?.kpp}</h5>
                </div>
              </div>
              <h5 className='text-colBlack py-2'>{el?.address}</h5>
              <div className='flex justify-between items-center space-x-3 pt-2'>
                <div
                  onClick={() => handleToggleAccordion(index)}
                  className='flex cursor-pointer'
                >
                  <span className='text-colBlack font-semibold'>
                    Посмотреть реквизиты
                  </span>
                  <ExpandMoreIcon
                    className={`${
                      expandedIndex === index ? 'rotate-[-180deg]' : ''
                    }`}
                  />
                </div>
                <div className='flex justify-end space-x-3'>
                  <span className='text-colDarkGray text-sm border-b border-colDarkGray cursor-pointer font-semibold'>
                    Редактировать
                  </span>
                  <span className='text-colDarkGray text-sm border-b border-colDarkGray cursor-pointer font-semibold'>
                    Удалить
                  </span>
                </div>
              </div>
              {expandedIndex === index && (
                <div className='space-y-2 pt-3'>
                  <div className='flex'>
                    <span className='text-colDarkGray mr-2 leading-5'>
                      ОГРН:
                    </span>
                    <h5 className='text-colBlack leading-5'>{el?.ogrn}</h5>
                  </div>
                  <div className='flex'>
                    <span className='text-colDarkGray mr-2 leading-5'>
                      Название организации:
                    </span>
                    <h5 className='text-colBlack leading-5'>{el?.name}</h5>
                  </div>
                  <div className='flex'>
                    <span className='text-colDarkGray mr-2 leading-5'>
                      Юридический адрес:
                    </span>
                    <h5 className='text-colBlack leading-5'>
                      {el?.yurAddress}
                    </h5>
                  </div>
                  <div className='flex'>
                    <span className='text-colDarkGray mr-2 leading-5'>
                      Фактический адрес:
                    </span>
                    <h5 className='text-colBlack leading-5'>
                      {el?.faqAddress}
                    </h5>
                  </div>
                  <div className='flex'>
                    <span className='text-colDarkGray mr-2 leading-5'>
                      Расчетный счет:
                    </span>
                    <h5 className='text-colBlack leading-5'>{el?.rasShet}</h5>
                  </div>
                  <div className='flex'>
                    <span className='text-colDarkGray mr-2 leading-5'>
                      БИК Банка:
                    </span>
                    <h5 className='text-colBlack leading-5'>{el?.bikBanka}</h5>
                  </div>
                  <div className='flex'>
                    <span className='text-colDarkGray mr-2 leading-5'>
                      Корр. счет:
                    </span>
                    <h5 className='text-colBlack leading-5'>{el?.korrSchet}</h5>
                  </div>
                  <div className='flex'>
                    <span className='text-colDarkGray mr-2 leading-5'>
                      Наименование банка:
                    </span>
                    <h5 className='text-colBlack leading-5'>{el?.bankName}</h5>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organizations;
