import { advantages } from '../../constants/data';

const Advantages = () => {
  return (
    <div className='pb-20'>
      <h1 className='text-colBlack text-4xl font-semibold pb-5'>
        Покупайте и сотрудничайте с «Росток»
      </h1>
      <div className='grid grid-cols-3 gap-5'>
        {advantages?.map((el) => (
          <div
            key={el?.id}
            className={`${
              el?.greenBlock
                ? 'bg-[#15765B] text-white'
                : 'bg-colSuperLight text-colBlack'
            } min-h-[230px] rounded-[10px] p-5`}
          >
            <img src={el?.icon} alt='*' />
            <h3 className='text-2xl font-semibold'>{el?.title}</h3>
            <p
              className={`${
                el?.greenBlock ? 'text-white' : 'text-colBlack'
              } text-sm text-colDarkGray pt-2`}
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
