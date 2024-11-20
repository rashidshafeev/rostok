import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UpdateOrganizationModal from '../../../helpers/CModal/UpdateOrganizationModal';
import DeleteOrganizationModal from '../../../helpers/CModal/DeleteOrganizationModal';

export const OrgCard = ({
  el,
  index,
  handleDeleteOrganization,
  deleteLoading,
  delOrgSuccess,
  handleEditOrganization,
  editLoading,
  editOrgSuccess,
}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [openDeleteOrgModal, setOpenDeleteOrgModal] = useState(false);
  const [openUpdateOrgModal, setOpenUpdateOrgModal] = useState(false);

  const handleOpenDeleteOrgModal = () => {
    setOpenDeleteOrgModal(true);
  };

  const handleCloseDeleteOrgModal = () => {
    setOpenDeleteOrgModal(false);
  };
  const handleOpenUpdateOrgModal = () => {
    setOpenUpdateOrgModal(true);
  };

  const handleCloseUpdateOrgModal = () => {
    setOpenUpdateOrgModal(false);
  };

  const handleToggleAccordion = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div
      key={el?.id}
      className='rounded-[10px] border border-[#EBEBEB] overflow-hidden h-max'
    >
      <div className='bg-colSuperLight min-h-[58px] flex items-center px-5 py-2'>
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
        <div className='flex justify-between xl:items-center flex-col xl:flex-row xl:space-x-3 pt-2'>
          <div
            onClick={() => handleToggleAccordion(index)}
            className='flex cursor-pointer order-1 xl:order-0'
          >
            <span className='text-colBlack font-semibold'>
              Посмотреть реквизиты
            </span>
            <ExpandMoreIcon
              className={`${expandedIndex === index ? 'rotate-[-180deg]' : ''}`}
            />
          </div>
          <div className='flex xl:justify-end space-x-3 pb-3 xl:pb-0'>
            <span
              onClick={handleOpenUpdateOrgModal}
              className='text-colDarkGray text-sm border-b border-colDarkGray cursor-pointer font-semibold'
            >
              Редактировать
            </span>
            <UpdateOrganizationModal
              open={openUpdateOrgModal}
              close={handleCloseUpdateOrgModal}
              item={el}
              handleEditOrganization={handleEditOrganization}
              editLoading={editLoading}
              editOrgSuccess={editOrgSuccess}
            />
            <span
              onClick={handleOpenDeleteOrgModal}
              className='text-colDarkGray text-sm border-b border-colDarkGray cursor-pointer font-semibold'
            >
              Удалить
            </span>
            <DeleteOrganizationModal
              open={openDeleteOrgModal}
              close={handleCloseDeleteOrgModal}
              item={el}
              handleDeleteOrganization={handleDeleteOrganization}
              deleteLoading={deleteLoading}
              delOrgSuccess={delOrgSuccess}
            />
          </div>
        </div>
        {expandedIndex === index && (
          <div className='space-y-2 pt-3'>
            <div className='flex'>
              <span className='text-colDarkGray mr-2 leading-5'>ОГРН:</span>
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
              <h5 className='text-colBlack leading-5'>{el?.u_address}</h5>
            </div>
            <div className='flex'>
              <span className='text-colDarkGray mr-2 leading-5'>
                Фактический адрес:
              </span>
              <h5 className='text-colBlack leading-5'>{el?.f_address}</h5>
            </div>
            <div className='flex'>
              <span className='text-colDarkGray mr-2 leading-5'>
                Расчетный счет:
              </span>
              <h5 className='text-colBlack leading-5'>{el?.bank_account}</h5>
            </div>
            <div className='flex'>
              <span className='text-colDarkGray mr-2 leading-5'>
                БИК Банка:
              </span>
              <h5 className='text-colBlack leading-5'>{el?.bank_bik}</h5>
            </div>
            <div className='flex'>
              <span className='text-colDarkGray mr-2 leading-5'>
                Корр. счет:
              </span>
              <h5 className='text-colBlack leading-5'>
                {el?.correspondent_account}
              </h5>
            </div>
            <div className='flex'>
              <span className='text-colDarkGray mr-2 leading-5'>
                Наименование банка:
              </span>
              <h5 className='text-colBlack leading-5'>{el?.bank_name}</h5>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
