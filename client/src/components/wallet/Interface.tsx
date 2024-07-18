import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import Address from '../common/Address';
import Balance from '../common/Balance';
import Network from '../common/Network';
import { TransactionItem } from '../common/Transaction';
import walletApi from '../../api/wallet';
import blockchainApi from '../../api/blockchain';

interface AddressData {
	address: string;
}

interface BalanceData {
	balance: number;
}

interface LatestBlockData {
	data: any; // Replace 'any' with the actual type of 'data'
	index?: number;
}

const Interface: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const privateKey = location.state?.privateKey;
	useEffect(() => {
		if (!privateKey) navigate('/intro');
	}, [privateKey, navigate]);

	const [address, setAddress] = useState<string>('');
	const [balance, setBalance] = useState<number>(0);
	const [latestBlock, setLatestBlock] = useState<LatestBlockData>(
		{} as LatestBlockData
	);
	const [myTxOuts, setMyTxOuts] = useState<TransactionItem[]>([]);
	const [refetch, setRefetch] = useState<boolean>(false);
	const [loading, setIsLoading] = useState<boolean>(false);

	const fetchData = async () => {
		try {
			const resAddress: AddressData = (await walletApi.getAddress()).data;
			const resBalance: BalanceData = (await walletApi.getBalance()).data;
			const resLatest: LatestBlockData = (await blockchainApi.getLatestBlock())
				.data;
			const resMyTxOuts: TransactionItem[] = (
				await blockchainApi.getMyUnspentTransactionOutputs()
			).data;
			Promise.all([resAddress, resBalance, resLatest, resMyTxOuts]).then(
				(values) => {
					setAddress(values[0].address);
					setBalance(values[1].balance);
					setLatestBlock(values[2].data);
					setMyTxOuts(values[3]);
				}
			);
		} catch (err) {
			console.log(err);
		}
	};

	const mineBlock = async () => {
		setIsLoading(true);
		await blockchainApi.mineBlock();
		setRefetch(!refetch);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, [refetch]);

	return (
		<div className='w-full h-screen grid grid-cols-6 gap-3 bg-gray-200'>
			<div className='flex flex-col col-span-1 bg-white mt-3'>
				<Link
					to='/wallet/dashboard'
					state={{ privateKey: privateKey }}
					className='text-xl font-bold text-blue-700 my-5 hover:bg-gray-200 text-center cursor-pointer'>
					Dashboard
				</Link>
				<Link
					to='/wallet/send-transaction'
					state={{ privateKey: privateKey }}
					className='text-xl font-bold text-red-700 my-5 hover:bg-gray-200 text-center cursor-pointer'>
					Send Transaction
				</Link>
				<Link
					to='/intro'
					className='text-xl font-bold text-gray-700 my-5 hover:bg-gray-200 text-center cursor-pointer'>
					Logout
				</Link>
			</div>
			<div className='grid grid-rows-5 col-span-5 gap-3 bg-white mt-3 p-5'>
				<div className='row-span-1 grid grid-cols-3 gap-3'>
					<Address value={address} />
					<Balance value={balance} />
					<Network value={latestBlock.index} />
				</div>
				<div className='row-span-4'>
					<Outlet
						context={{
							data: myTxOuts,
							loading: loading,
							onMine: mineBlock,
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Interface;
