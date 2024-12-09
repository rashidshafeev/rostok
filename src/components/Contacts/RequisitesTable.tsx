import { ContactsDataItem, ContactsFile } from '@/types/ServerData/PageContent/GetContactsResponse';
import CopyButton from '../common/CopyButton';
import React from 'react';

interface RequisitesTableProps {
  data: ContactsDataItem[];
  file?: ContactsFile
}

export const RequisitesTable = ({ data, file }: RequisitesTableProps) => {
  const handleDownload = () => {
    if (file?.url) {
      window.open(file.url, '_blank');
    }
  };

  return (
    <>
      <div className='grid grid-cols-3'>
        {data.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className={`col-start-1 col-end-2 row-start-${index + 1} row-end-${index + 2} border ${index > 0 ? 'border-t-0' : ''} border-colDarkGray p-3`}>
              {item.id}
            </div>
            <div className={`flex justify-between items-start col-start-2 col-end-4 row-start-${index + 1} row-end-${index + 2} border border-l-0 ${index > 0 ? 'border-t-0' : ''} border-colDarkGray p-3`}>
              {item.value}
              <CopyButton 
                textToCopy={item.value}
                toastMessage={`${item.id} скопирован`}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
      {file?.url && (
        <button 
          onClick={handleDownload}
          className='mt-4 font-semibold text-colGreen border border-colGreen p-3 rounded w-full md:w-1/2 hover:bg-green-50 transition-colors'
        >
          Скачать реквизиты
        </button>
      )}
    </>
  );
};
