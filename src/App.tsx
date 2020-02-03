import React, {useState} from 'react';
import './App.css';
import {TaskList} from './components/list';
import {HelpModal, BottomButton} from './components/help';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialTasks = [{
	name: ''
}];

const HELP_MESSAGE = "When somebody raises their hand, type their name into the box at the top. When they're done talking, press the 'next speaker' button to move the meeting forward.";

const App: React.FC = () => {
	const [show, setShow] = useState(false);
	const handleCloseModal = () => setShow(false);
	const handleOpenModal = () => setShow(true);
	return (
		<>
			<HelpModal
				show={show}
				handleClose={handleCloseModal}
				handleOpen={handleOpenModal}
				helpMessage={HELP_MESSAGE}
			/>
			<TaskList
				initialTasks={initialTasks}
			/>
			<BottomButton
				onClick={handleOpenModal}
			/>
		</>
	);
};

export default App;
