import { advantages } from '../../constants/data';

const Advantages = () => {
  return (
    <div className='pt-5 pb-20'>
      <h1 className='text-colBlack text-2xl mm:text-4xl font-semibold pb-5'>
        Покупайте и сотрудничайте с «Росток»
      </h1>
      <div className='grid mm:grid-cols-2 lg:grid-cols-3 gap-5'>
        {advantages?.map((el) => (
          <div
            key={el?.id}
            className={`${
              el?.greenBlock
                ? 'bg-[#15765B] text-white'
                : 'bg-colSuperLight text-colBlack'
            } mm:min-h-[230px] rounded-[10px] p-3 mm:p-5`}
          >
            <div className='flex items-center mm:block'>
              <img className='w-10 mb-1 mr-1 mm:mr-1' src={el?.icon} alt='*' />
              <h3 className='text-xl md:text-2xl leading-[120%] font-semibold'>
                {el?.title}
              </h3>
            </div>
            <p
              className={`${
                el?.greenBlock ? 'text-white' : 'text-colBlack'
              } text-xs mm:text-sm text-colDarkGray pt-2`}
            >
              {el?.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advantages;
