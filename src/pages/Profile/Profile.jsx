import ErrorEmpty from '../../helpers/Errors/ErrorEmpty';

const Profile = () => {
  return (
    <div className='content pb-6'>
      <h1 className='text-[40px] font-semibold text-colBlack'>Мой профиль</h1>
      <ErrorEmpty
        title='Еще не готовы к покупке?'
        desc='Добавляйте понравившийся товар в сравнение, чтобы сравнить его с аналогами.'
      />
    </div>
  );
};

export default Profile;
