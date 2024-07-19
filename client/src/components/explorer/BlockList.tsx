import moment from 'moment';

interface BlockItemProps {
	item: {
		index: number;
		timestamp: number;
		data: any[];
		nonce: number;
		hash: string;
	};
}

const BlockItem: React.FC<BlockItemProps> = ({ item }) => {
	return (
		<tr>
			<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
				<div className='flex items-center'>
					<div className=''>
						<p className='text-gray-900 whitespace-no-wrap'>{item.index}</p>
					</div>
				</div>
			</td>
			<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
				<p className='text-gray-900 whitespace-no-wrap'>
					{moment.unix(item.timestamp).fromNow()}
				</p>
			</td>
			<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
				<p className='text-gray-900 whitespace-no-wrap'>{item.data.length}</p>
			</td>
			<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
				<span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
					<span
						aria-hidden='true'
						className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
					<span className='relative'>{item.nonce}</span>
				</span>
			</td>
			<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm w-0'>
				<p className='text-gray-900 whitespace-no-wrap truncate'>{item.hash}</p>
			</td>
		</tr>
	);
};

interface BlockListProps {
	data: {
		index: number;
		timestamp: number;
		data: any[];
		nonce: number;
		hash: string;
	}[];
}

const BlockList: React.FC<BlockListProps> = (props) => {
	const { data = [] } = props;
	return (
		<div className='container w-full'>
			<div className='py-8'>
				<div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 h-96 overflow-x-auto overflow-y-scroll'>
					<div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
						<table className='min-w-full leading-normal'>
							<thead>
								<tr>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										Block#
									</th>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										Created at
									</th>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										Transaction length
									</th>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										nonce
									</th>
									<th
										scope='col'
										className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
										hash
									</th>
								</tr>
							</thead>
							<tbody>
								{data.length > 0 &&
									data.map((item) => (
										<BlockItem item={item} key={item.index} />
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlockList;
