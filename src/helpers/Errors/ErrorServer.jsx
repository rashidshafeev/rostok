const ErrorServer = ({ errorMessage }) => {
  return (
    <div className='h-full flex items-center justify-center'>
      <div className='max-w-md w-full p-8 bg-white shadow-lg rounded-lg'>
        <h2 className='text-3xl font-semibold text-center text-red-600 mb-4'>
          Ошибка с сервера!
        </h2>
        <p className='text-lg text-center text-gray-800 mb-6'>{errorMessage}</p>
        <div className='flex justify-center'>
          <button
            className='bg-red-500 font-medium text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            onClick={() => window.location.reload()}
          >
            Перезагрузить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorServer;
