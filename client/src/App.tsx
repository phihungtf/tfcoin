import { Suspense, lazy } from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Loading from './components/common/Loading';
import Header from './components/common/Header';
import Interface from './components/wallet/Interface';
import Wallet from './components/wallet/Wallet';
import Explorer from './components/explorer/Explorer';
import NotFound from './components/common/NotFound';

import BlockExplorer from './components/explorer/BlockExplorer';
import TransactionExplorer from './components/explorer/TransactionExplorer';
import TransactionPool from './components/explorer/TransactionPool';
import Dashboard from './components/wallet/Dashboard';

const SendTransaction = lazy(
	() => import('./components/wallet/SendTransaction')
);

function App() {
	return (
		<Suspense fallback={<Loading />}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='/wallet' element={<Interface />}>
						<Route path='dashboard' element={<Dashboard />} />
						<Route path='send-transaction' element={<SendTransaction />} />
						<Route path='' element={<Navigate to='/wallet/dashboard' />} />
					</Route>
					<Route path='/intro' element={<Wallet />} />
					<Route path='/explorer' element={<Explorer />}>
						<Route path='block' element={<BlockExplorer />} />
						<Route path='transaction' element={<TransactionExplorer />} />
						<Route path='transaction-pool' element={<TransactionPool />} />
						<Route
							path='/explorer'
							element={<Navigate to='/explorer/block' />}
						/>
					</Route>
					<Route path='/' element={<Navigate to='/wallet' />} />
					<Route element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</Suspense>
	);
}

export default App;
