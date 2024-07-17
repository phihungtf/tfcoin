import BalanceIcon from '../../assets/wallet-svg.svg';
interface BalanceProps {
	value: number;
}

const Balance: React.FC<BalanceProps> = (props) => {
	const { value } = props;
	return (
		<div className='bg-blue-400 grid grid-cols-4 gap-5 rounded-sm'>
			<div className='flex justify-center items-center col-span-1'>
				<img className='w-20 h-20' src={BalanceIcon} alt='Balance' />
			</div>
			<div className='flex flex-col col-span-3 py-5 justify-start'>
				<p className='w-full text-2xl text-white font-bold'>Balance</p>
				<p className='w-full break-words mt-5 text-white text-xl'>{value} TF</p>
			</div>
		</div>
	);
};

export default Balance;
