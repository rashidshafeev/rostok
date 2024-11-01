// import { organizations } from '../../../constants/data';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AddOrganizationModal from '../../../helpers/CModal/AddOrganizationModal';
import ErrorEmpty from '../../../helpers/Errors/ErrorEmpty';
import { NavLink } from 'react-router-dom';
import arrowIcon from '../../../assets/icons/arrow-icon.svg';
import { OrgCard } from './OrgCard';

const Organizations = () => {
  const [openAddOrgModal, setOpenAddOrgModal] = useState(false);

  const handleOpenAddOrgModal = () => {
    setOpenAddOrgModal(true);
  };

  const handleCloseAddOrgModal = () => {
    setOpenAddOrgModal(false);
  };

  const { organizations } = useSelector((state) => state?.organizations);

  return (
    <div className='w-full pb-10'>
      <NavLink
        className='flex mm:hidden items-center space-x-1 mb-2'
        to='/profile'
      >
        <img src={arrowIcon} alt='*' />
        <span className='text-sm font-semibold'>Вернуться к профилю</span>
      </NavLink>
      <h3 className='text-lg mm:text-xl justify-center font-semibold text-colBlack pb-4'>
        Мои организации
      </h3>
      <button
        onClick={handleOpenAddOrgModal}
        className='flex items-center rounded-lg border border-colSuperLight p-2'
      >
        <span className='text-colGray bg-colSuperLight w-8 h-8 rounded-md flex justify-center items-center text-5xl'>
          +
        </span>
        <span className='text-sm font-medium text-colBlack ml-3 mr-1'>
          Добавить организации
        </span>
      </button>
      <AddOrganizationModal
        open={openAddOrgModal}
        close={handleCloseAddOrgModal}
        organizations={organizations}
        setOpenAddOrgModal={setOpenAddOrgModal}
      />

      {organizations?.length > 0 ? (
        <div className='grid lg:grid-cols-2 gap-3 xl:gap-5 mt-4 lining-nums proportional-nums'>
          {organizations?.map((el, index) => (
            <OrgCard key={index} el={el} index={index} />
          ))}
        </div>
      ) : (
        <ErrorEmpty
          title='Список пуст!'
          desc='Вы пока не добавили организации'
        />
      )}
    </div>
  );
};

export default Organizations;
