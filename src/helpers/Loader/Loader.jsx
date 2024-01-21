import Loader from 'react-js-loader';

export const Loading = ({ extraStyle }) => {
  return (
    <div style={{ height: extraStyle }} className='w-full py-5 h-full'>
      <div className='flex justify-center items-center w-full h-full'>
        <div className='item'>
          <Loader
            type='spinner-default'
            bgColor={'#15765B'}
            color={'#15765B'}
            size={70}
          />
        </div>
      </div>
    </div>
  );
};

export const LoadingSmall = ({ extraStyle }) => {
  return (
    <Loader
      type='spinner-default'
      bgColor={extraStyle}
      color={extraStyle}
      size={28}
    />
  );
};
