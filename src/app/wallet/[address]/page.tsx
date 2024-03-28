"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useApiData from '@/hooks/useApiData';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// Define interface for token data
interface Token {
  ticker: string;
  balance: string;
  price: string;
  value: string;
  asset: string;
  [key: string]: string; // Index signature allowing any string keys with string values
}


// Define interface for Account data
interface Account {
    ticker: string;
    balance: string;
    username: string;
    txCount: number;
    isGuarded: boolean;
    }


export default function Page({ params }: { params: { address: string } }) {
  const { address } = params;
  const tokensUrl = 'https://api.multiversx.com/accounts/' + address + '/tokens';

  const accountsUrl = 'https://api.multiversx.com/accounts/' + address ;


  // Fetch data from API
  const { data: tokensData, isLoading: isLoadingTokens, error: tokensError } = useApiData(tokensUrl);
  const { data: AccountData, isLoading: isLoadingAccount, error: AccountError } = useApiData(accountsUrl);




  // Process tokenList here
  const tokenList: Token[] = tokensData || [];
  const AccountDetail: Account[] = AccountData || [];


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
   



      <div className="grid-profile">
        <div className="grid-profile">
          {/* <!-- Input Fields --> */}
          {AccountDetail.username}
          {AccountDetail.txCount}
        </div>
        <div className="grid-profile">
          {/* <!-- Input Fields --> */}
          {AccountDetail.username}
          {AccountDetail.txCount}
        </div>

      </div>














        <Tabs>
    <TabList>
      <Tab>Tokens</Tab>
      <Tab>NFTs</Tab>
      <Tab>History</Tab>
    </TabList>

    <TabPanel>
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
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>


   
      </div>
    </DefaultLayout>
  );
}
