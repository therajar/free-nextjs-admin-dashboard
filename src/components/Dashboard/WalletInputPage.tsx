"use client";
import { useState } from 'react';
import Link from 'next/link';

const WalletInputPage: React.FC = () => {
    const [walletAddress, setWalletAddress] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWalletAddress(event.target.value);
    };

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">Track Any Wallet</h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <input
                                    type="text"
                                    value={walletAddress}
                                    onChange={handleInputChange}
                                    placeholder="Enter Address, Herotag"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div>
                                <Link href={`/wallet/${walletAddress}`}>
                                    <button className="bg-blue-500 text-white rounded-md px-4 py-2">Go</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletInputPage;
