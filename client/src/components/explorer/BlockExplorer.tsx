import { useEffect, useState } from 'react';
import blockchainApi from '../../api/blockchain';
import Difficulty from '../common/Difficulty';
import LastBlock from '../common/LastBlock';
import Nonce from '../common/Nonce';
import BlockList from './BlockList';

const BlockExplorer = () => {
	const [blocks, setBlocks] = useState([]);
	interface Block {
		index: number;
		nonce: number;
		difficulty: number;
	}

	const [latestBlock, setLatestBlock] = useState<Block>({
		index: 0,
		nonce: 0,
		difficulty: 0,
	});

	const fetchData = async () => {
		try {
			const resLatest = blockchainApi.getLatestBlock();
			const resBlocks = blockchainApi.getBlocks();
			Promise.all([resLatest, resBlocks]).then((values) => {
				setLatestBlock(values[0].data);

				setBlocks(
					values[1].data.sort((a: any, b: any) => b.timestamp - a.timestamp)
				);
			});
		} catch (err) {}
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className='grid grid-rows-5 gap-2 h-screen'>
			<div className='row-span-1 grid grid-cols-3 gap-2'>
				<LastBlock value={latestBlock.index} />
				<Nonce value={latestBlock.nonce} />
				<Difficulty value={latestBlock.difficulty} />
			</div>
			<div className='row-span-4 p-5'>
				<BlockList data={blocks} />
			</div>
		</div>
	);
};

export default BlockExplorer;
