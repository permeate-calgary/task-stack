import React from 'react';
import {Modal, Button} from 'react-bootstrap';
const DEFAULT_MESSAGE = 'Throw stuff you need to do onto the stack using the text box at the top. Finish stuff and take it off with DELETE DELETE DELETE.';

export const HelpModal: React.FunctionComponent<{
	helpMessage?: string;
	show: boolean;
	handleOpen: () => void;
	handleClose: () => void;
	// eslint-disable-next-line react/prop-types
}> = ({helpMessage, show, handleOpen, handleClose}) => {
	helpMessage = helpMessage || DEFAULT_MESSAGE;

	return (
		<Modal
			show={show}
			onClick={handleOpen}
			onHide={handleClose}
		>
			<Modal.Header>
				<Modal.Title>
				Help
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{helpMessage}
			</Modal.Body>
		</Modal>
	);
};

export const BottomButton: React.FunctionComponent<{
	// eslint-disable-next-line react/prop-types
	onClick: () => void;
}> = ({onClick}) => (
	<Button
		variant='link'
		onClick={onClick}
		size='sm'
		style={{
			position: 'fixed',
			bottom: 10,
			left: '50%',
			right: '50%',
			marginLeft: '-50px',
			width: '100px',
		}}
	>
		Send Help
	</Button>
);
