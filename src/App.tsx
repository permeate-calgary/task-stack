import React, {useState} from 'react';
import './App.css';
import {TaskList} from './components/list';
import {HelpModal, BottomButton} from './components/help';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialTasks = [{
	name: ''
}];

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
