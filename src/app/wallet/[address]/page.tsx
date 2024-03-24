
"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useApiData from '@/hooks/useApiData';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect } from 'react';

// Define interface for token data
interface Token {
  ticker: string;
  balance: string;
  price: string;
  value: string;
  asset: string;
}

export default function Page({ params }: { params: { address: string } }) {
  const { address } = params;
  const tokensUrl = 'https://api.multiversx.com/accounts/' + address + '/tokens';

  // Fetch data from API
  const { data: tokensData, isLoading: isLoadingTokens, error: tokensError } = useApiData(tokensUrl);

  // Process tokenList here
  const tokenList: Token[] = tokensData || [];

  // Columns for the table
  const columnsData = [
    {
      Header: 'Asset',
      accessor: 'ticker',
    },
    {
      Header: 'Balance',
      accessor: 'balance',
    },
    {
      Header: 'Price',
      accessor: 'price',
    },
    {
      Header: 'Value',
      accessor: 'value',
    },
  ];

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Wallet" />
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Token List
          </h4>

          <div className="flex flex-col">
            <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
              {columnsData.map(column => (
                <div key={column.accessor} className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    {column.Header}
                  </h5>
                </div>
              ))}
            </div>

            {tokenList.map((token, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 sm:grid-cols-5 ${
                  index === tokenList.length - 1
                    ? ""
                    : "border-b border-stroke dark:border-strokedark"
                }`}
              >
                {columnsData.map(column => (
                  <div key={column.accessor} className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">{token[column.accessor]}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
