import { Link, Outlet } from 'react-router-dom';

const Explorer = () => {
	return (
		<div className='w-full h-screen grid grid-cols-7 gap-4 bg-gray-200'>
			<div className='col-span-1 bg-white mt-5 flex flex-col'>
				<Link
					to='/explorer/block'
					className='m-5 p-2 hover:bg-gray-300 transition ease-in-out text-xl font-bold text-blue-800'>
					Blocks
				</Link>
				<Link
					to='/explorer/transaction'
					className='m-5 p-2 hover:bg-gray-300 transition ease-in-out text-xl font-bold text-red-800'>
					Transactions
				</Link>
				<Link
					to='/explorer/transaction-pool'
					className='m-5 p-2 hover:bg-gray-300 transition ease-in-out text-xl font-bold text-green-800'>
					Transaction Pool
				</Link>
			</div>
			<div className='col-span-6 bg-white mt-5'>
				<Outlet />
			</div>
		</div>
	);
};

export default Explorer;
