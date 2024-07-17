import { Fragment } from 'react';
import {
	Dialog,
	Transition,
	TransitionChild,
	DialogBackdrop,
	DialogTitle,
} from '@headlessui/react';
import generatePrivateKey from '../../helper/generatePrivateKey';

interface CreateWalletModalProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateWalletModal: React.FC<CreateWalletModalProps> = (props) => {
	const { isOpen, setIsOpen } = props;
	const closeModal = () => {
		setIsOpen(false);
	};
	const generatePK = (): string => {
		return generatePrivateKey();
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as='div'
				className='fixed inset-0 z-10 overflow-y-auto'
				onClose={closeModal}>
				<div className='min-h-screen px-4 text-center'>
					<TransitionChild
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'>
						<DialogBackdrop className='fixed inset-0' />
					</TransitionChild>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className='inline-block h-screen align-middle'
						aria-hidden='true'>
						&#8203;
					</span>
					<TransitionChild
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'>
						<div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
							<DialogTitle
								as='h3'
								className='text-lg font-medium leading-6 text-gray-900'>
								Create Wallet successful
							</DialogTitle>
							<div className='mt-2 flex flex-col'>
								<p className='text-large font-bold text-black'>
									Your private key:
								</p>
								<p className='text-sm break-words text-gray-500'>
									{isOpen && generatePK().toString()}
								</p>
							</div>

							<div className='mt-4'>
								<button
									type='button'
									className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
									onClick={closeModal}>
									Got it, thanks!
								</button>
							</div>
						</div>
					</TransitionChild>
				</div>
			</Dialog>
		</Transition>
	);
};

export default CreateWalletModal;
