import { useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import walletApi from '../../api/wallet';
import BigManLogo from '../../assets/big-spaceman.png';
import WalletAccessLogo from '../../assets/wallet-access.png';
import WalletLogo from '../../assets/wallet.png';
import AccessWalletModal from '../common/AccessWalletModal';
import CreateWalletModal from '../common/CreateWalletModal';
const Wallet = () => {
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	const [isOpenAccess, setIsOpenAccess] = useState(false);
	const navigate = useNavigate();
	const onCreateWallet = () => {
		setIsOpenCreate(true);
	};
	const onAccessWallet = () => {
		setIsOpenAccess(true);
	};

	const accessWallet = async (privatekey: string): Promise<void> => {
		const params: { pk: string } = {
			pk: privatekey,
		};
		try {
			const res = (await walletApi.accessWallet(params)).data;
			if (res.status === 'success') {
				console.log('res', res);
				navigate('/wallet/dashboard', { state: { privateKey: privatekey } });
			}
		} catch (err) {}
	};
	return (
		<div className='w-full h-screen mt-3 flex flex-col items-center '>
			<section className='flex w-1/2 justify-between items-center mb-3'>
				<div className='flex flex-col w-1/3'>
					<div className='text-green-800 font-bold text-4xl mb-3'>TF Coin</div>
					<p className='text-gray-800 text-base'>TFCoin Wallet</p>
				</div>
			</section>
			<section className='flex justify-center items-center'>
				<div
					className='bg-blue-500 w-1/4 h-64 grid grid-cols-3 gap-2 p-10 rounded mr-5 cursor-pointer transition ease-in-out transform hover:-translate-y-2'
					onClick={onCreateWallet}>
					<div className='flex items-center'>
						<img
							className='object-contain w-32 h-32'
							src={WalletLogo}
							alt='wallet'
						/>
					</div>
					<div className='col-span-2 flex flex-col justify-between items-start'>
						<p className='text-white font-bold text-2xl'>Create A New Wallet</p>
					</div>
				</div>
				<div
					className='bg-green-500 w-1/4 h-64 grid grid-cols-3 gap-4 p-10 rounded cursor-pointer transition ease-in-out transform hover:-translate-y-2'
					onClick={onAccessWallet}>
					<div className='flex items-center'>
						<img
							className='object-contain w-32 h-32'
							src={WalletAccessLogo}
							alt='wallet'
						/>
					</div>
					<div className='col-span-2 flex flex-col justify-between items-start'>
						<p className='text-white font-bold text-2xl'>Access My Wallet</p>
					</div>
				</div>
			</section>
			<CreateWalletModal isOpen={isOpenCreate} setIsOpen={setIsOpenCreate} />
			<AccessWalletModal
				isOpen={isOpenAccess}
				setIsOpen={setIsOpenAccess}
				onSubmit={accessWallet}
			/>
		</div>
	);
};

export default Wallet;
