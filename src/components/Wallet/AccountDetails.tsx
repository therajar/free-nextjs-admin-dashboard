import React from 'react';

// Define interface for Account data
interface Account {
    ticker: string;
    balance: string;
    username: string;
    txCount: number;
    isGuarded: boolean;
}

interface AccountDetailsProps {
    accountData: Account | undefined; // Account data may be undefined initially
    isLoading: boolean;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ accountData, isLoading }) => {
    // Show loading message while data is being fetched
    if (isLoading) {
        return <p>Loading account data...</p>;
    }

const eglbPerEGLD = 10 ** 18; // Number of EGLD units per wei


    // Show account details if data is available
    if (accountData) {
        return (
            <div className="grid-profile">
                <span>
                 <div className="text-xl font-semibold text-black dark:text-white">{accountData.username}</div>
                  <div className="text-xl">{(accountData.balance / eglbPerEGLD).toFixed(5)} EGLD</div>
                  <div>{accountData.txCount} Total Transactions</div>
                </span>
            </div>
        );
    }

    // Show an error message if data is unavailable
    return <p>Error: Unable to fetch account data.</p>;
};

export default AccountDetails;
