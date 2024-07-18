import { useEffect, useRef } from 'react';
import Transaction, { TransactionItem } from '../common/Transaction';
import { useOutletContext } from 'react-router-dom';

interface DashboardCtx {
	data: TransactionItem[];
	loading: boolean;
	onMine: () => void;
}

const Dashboard: React.FC = () => {
	const {
		data = [],
		loading = false,
		onMine = () => {},
	} = useOutletContext() as DashboardCtx;
	let transactionView = useRef<HTMLDivElement>(null);

	console.log('dashboard data', data);

	useEffect(() => {
		if (transactionView.current) {
			transactionView.current.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'start',
			});
		}
	}, [data]);

	return (
		<div className='w-full h-full grid grid-cols-4 mt-5'>
			<div className='col-span-3'>
				<div className='text-2xl font-bold my-2 text-indigo-800'>
					Your Unspent Transaction currently
				</div>
				<div className='flex flex-col h-96 overflow-y-scroll'>
					{data.map((item, index) => (
						<Transaction item={item} index={index} key={index} />
					))}
					<div ref={transactionView} />
				</div>
			</div>
			<div className='col-span-1 flex items-center flex-col'>
				<div className='text-2xl font-bold my-2 text-indigo-800 mb-10'>
					Mining block
				</div>
				<button
					type='button'
					onClick={onMine}
					className='py-2 px-4 w-1/2 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
					{loading && (
						<svg
							width='40'
							height='40'
							fill='currentColor'
							className='mr-2 animate-spin'
							viewBox='0 0 1792 1792'
							xmlns='http://www.w3.org/2000/svg'>
							<path d='M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z'></path>
						</svg>
					)}
					Mine
				</button>
			</div>
		</div>
	);
};

export default Dashboard;