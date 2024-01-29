import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { ProfileSidebar } from '../../components';

const Profile = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content pb-6 min-h-[520px]'>
      <h1 className='text-[40px] font-semibold text-colBlack'>Мой профиль</h1>
      <div className='flex pt-2'>
        <ProfileSidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
