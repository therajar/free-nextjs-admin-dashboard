"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useApiData from '@/hooks/useApiData';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


import AccountDetails from '@/components/Wallet/AccountDetails';
import TokenList from '@/components/Wallet/TokenList';
import HistoryList from '@/components/Wallet/HistoryList';
import NFTList from '@/components/Wallet/NFTList';

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
    const accountsUrl = 'https://api.multiversx.com/accounts/' + address;


    // Fetch data from API
    const { data: tokensData, isLoading: isLoadingTokens, error: tokensError } = useApiData(tokensUrl);
    const { data: AccountData, isLoading: isLoadingAccount, error: AccountError } = useApiData(accountsUrl);




    // Process tokenList here
    const tokenList: Token[] = tokensData || [];





    return (
        <DefaultLayout>
            <div className="mx-auto max-w-242.5">



                <AccountDetails
                    accountData={AccountData}
                    isLoading={isLoadingAccount}
                />

                <Tabs>
                    <TabList>
                        <Tab>Tokens</Tab>
                        <Tab>NFTs</Tab>
                        <Tab>History</Tab>
                    </TabList>

                    <TabPanel>
                        <TokenList
                            tokenList={tokenList}
                            isLoading={isLoadingTokens}
                        />
                    </TabPanel>
                    <TabPanel>
                        <NFTList />
                    </TabPanel>
                    <TabPanel>
                        <HistoryList />
                    </TabPanel>
                </Tabs>



            </div>
        </DefaultLayout>
    );
}
