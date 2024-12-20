import React, { useState } from 'react';
import { useGetWalletInfoQuery, useGetTransactionListQuery } from '@/redux/api/walletEndpoints';

const Wallet = () => {
  const [page, setPage] = useState(1);
  const { data: walletInfo, isLoading: isLoadingInfo, error: walletError } = useGetWalletInfoQuery();
  const { data: transactionList, isLoading: isLoadingTransactions, error: transactionsError } = useGetTransactionListQuery({ 
    page,
    limit: 10 
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoadingInfo || isLoadingTransactions) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (walletError) {
    return (
      <div className="mt-2 p-4 text-red-700 bg-red-100 rounded-md">
        Произошла ошибка при загрузке информации о кошельке
      </div>
    );
  }

  const mainBalance = walletInfo?.balances[0];

  return (
    <div className='flex flex-col content lining-nums proportional-nums'>
      <div className="mb-4 bg-gray-50 rounded-lg shadow">
        <div className="flex justify-between items-start p-6 w-full">
          <div className="flex  items-center gap-4">
            <div className="text-4xl text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-1">
                {walletInfo?.wallet.name || 'Ваш кошелек'}
              </h2>
              <p className="text-3xl font-bold text-primary">
                {mainBalance?.sum_format} {mainBalance?.currency.symbol}
              </p>
            </div>
          </div>

          <button className="bg-colGreen text-white font-semibold px-6  py-3 rounded-md hover:bg-primary-dark" onClick={() => {paymentModal.show();}}>
            Пополнить
          </button>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4 mt-6">
        История транзакций
      </h3>

      {transactionsError ? (
        <div className="p-4 text-red-700 bg-red-100 rounded-md">
          Произошла ошибка при загрузке истории транзакций
        </div>
      ) : !transactionList?.data || transactionList.data.length === 0 ? (
        <div className="p-4 text-blue-700 bg-blue-100 rounded-md">
          История транзакций пуста
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow mb-4">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Описание</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тип</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Сумма</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactionList.data.map((transaction) => (
                  <tr key={transaction.timestamp} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.date.formatted}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {transaction.notes.text}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.operationType === 'debit' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.operationType === 'debit' ? 'Пополнение' : 'Списание'}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                      transaction.operationType === 'debit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.operationType === 'debit' ? '+' : '-'}{transaction.amount} {transaction.currency.symbol}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {transactionList.totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <nav className="flex gap-1">
                {Array.from({ length: transactionList.totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded ${
                      page === pageNum
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Wallet;
