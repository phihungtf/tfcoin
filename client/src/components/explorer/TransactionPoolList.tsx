interface TxPoolItemProps {
	item: {
		id: string;
		txIns: {
			amount: number;
			from: string;
			to: string;
		}[];
	};
}

const TxPoolItem: React.FC<TxPoolItemProps> = ({ item }) => {
	return (
		<tr>
			<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
				<div className='flex items-center'>
					<div className=''>
						<p className='text-gray-900 whitespace-no-wrap'>{item.id}</p>
					</div>
				</div>
			</td>
			<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
				<p className='text-gray-900 whitespace-no-wrap'>
					{item.txIns[item.txIns.length - 1].amount}
				</p>
			</td>
			<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
				<p className='relative truncate w-64'>
					{item.txIns[item.txIns.length - 1].from}
				</p>
			</td>
			<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
				<p className='text-gray-900 whitespace-no-wrap w-64 truncate'>
					{item.txIns[item.txIns.length - 1].to}
				</p>
			</td>
		</tr>
	);
};

interface TransactionPoolListProps {
	data: {
		id: string;
		txIns: {
			amount: number;
			from: string;
			to: string;
		}[];
	}[];
}

const TransactionPoolList: React.FC<TransactionPoolListProps> = (props) => {
	const { data = [] } = props;
	return (
		<div className='container w-full'>
			<div className='py-8'>
				<div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 h-full overflow-x-auto overflow-y-scroll'>
					<div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
						<table className='min-w-full leading-normal'>
							<thead>
								<tr>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										Transaction Id#
									</th>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										Amount
									</th>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal '>
										From
									</th>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										To
									</th>
								</tr>
							</thead>
							<tbody>
								{data.length > 0 &&
									data.map((item) => <TxPoolItem item={item} />)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TransactionPoolList;
