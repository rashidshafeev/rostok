import { advantages } from '../../constants/data';
import { useGetMainPageDataQuery } from '../../redux/api/productEndpoints';

const Advantages = () => {

  const { data, isLoading, isSuccess } = useGetMainPageDataQuery()

  return (
    <div className='pt-5 pb-20'>
      <h1 className='text-colBlack text-2xl mm:text-4xl font-semibold pb-5'>
        Покупайте и сотрудничайте с «Росток»
      </h1>
      <div className='grid mm:grid-cols-2 lg:grid-cols-3 gap-5'>
        {isSuccess && data?.cooperate?.map((el) => (
          <div
            key={el?.id}
            className={`${
              el?.accent === '1'
                ? 'bg-[#15765B] text-white'
                : 'bg-colSuperLight text-colBlack'
            } mm:min-h-[230px] rounded-[10px] p-3 mm:p-5`}
          >
            <div className='flex items-center mm:block'>
              <img className='w-10 mb-1 mr-1 mm:mr-1' src={el?.icon[0]?.small} alt='*' />
              <h3 className='text-xl md:text-2xl leading-[120%] font-semibold'>
                {el?.title}
              </h3>
            </div>
            <p
              className={`${
                el?.accent === '1' ? 'text-white' : 'text-colBlack'
              } text-xs mm:text-sm text-colDarkGray pt-2`}
            >
              {el?.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advantages;
