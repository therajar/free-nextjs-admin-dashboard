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
  [key: string]: string; // Index signature allowing any string keys with string values
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

        {/* Navigation links for Tokens, NFTs, and History */}
        <div className="shared__HStack-sc-1qg837v-1 iiBdOd" style={{ position: 'relative' }}>
          <div>
            <div className="_3vBBQ _2PxSm">
              <div className="shared__HStack-sc-1qg837v-1 gvaYhZ" style={{ gridTemplateColumns: 'repeat(3, minmax(60px, 1fr))' }}>
                <a aria-current="page" className="_1TrRb uYYdv" href={`/${address}/overview`} style={{ color: 'var(--primary)' }}>
                  <div color="currentColor" className="UIText-sc-96tl0y-0 foAgcB">Tokens</div>
                  <div className="_3DwpY"></div>
                </a>
                <a className="uYYdv" href={`/${address}/nfts`} style={{ color: 'currentcolor' }}>
                  <div color="currentColor" className="UIText-sc-96tl0y-0 foAgcB">NFTs</div>
                  <div className="_3DwpY"></div>
                </a>
                <a className="uYYdv" href={`/${address}/history`} style={{ color: 'currentcolor' }}>
                  <div color="currentColor" className="UIText-sc-96tl0y-0 foAgcB">History</div>
                  <div className="_3DwpY"></div>
                </a>
              </div>
            </div>
          </div>
          <div className="_1BCaw" style={{ position: 'absolute', left: '0px', right: '0px', bottom: '0px', zIndex: '-1' }}></div>
        </div>









        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Token List
          </h4>

          {/* Show loading skeleton while data is being fetched */}
          {isLoadingTokens ? (
            <div className="animate-pulse">
              {/* Skeleton rows */}
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-4 sm:grid-cols-5 ${index === 4 ? "" : "border-b border-stroke dark:border-strokedark"
                    }`}
                >
                  {columnsData.map(column => (
                    <div
                      key={column.accessor}
                      className="flex items-center justify-center p-2.5 xl:p-5"
                    >
                      <div className="h-4 bg-gray-300 dark:bg-meta-3 w-24 rounded-md"></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            // Render table when data is loaded
            <div className="flex flex-col">
              <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                {columnsData.map(column => (
                  <div
                    key={column.accessor}
                    className="p-2.5 text-center xl:p-5"
                  >
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      {column.Header}
                    </h5>
                  </div>
                ))}
              </div>

              {tokenList.map((token, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-4 sm:grid-cols-5 ${index === tokenList.length - 1
                    ? ""
                    : "border-b border-stroke dark:border-strokedark"
                    }`}
                >
                  {columnsData.map(column => (
                    <div
                      key={column.accessor}
                      className="flex items-center justify-center p-2.5 xl:p-5"
                    >
                      <p className="text-black dark:text-white">
                        {token[column.accessor]}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
