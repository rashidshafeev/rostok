import { Outlet } from 'react-router-dom';
import ProfileSidebar from '../../components/Profile/ProfileSidebar';

const Profile = () => {
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