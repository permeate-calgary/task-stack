import React from 'react';
import './App.css';
import {TaskList} from './components/list';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialTasks = [{
	name: ''
}];

const App: React.FC = () => (
	<TaskList
		initialTasks={initialTasks}
	/>
);

export default App;
