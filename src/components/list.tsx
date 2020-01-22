import React, {useState} from 'react';
import {Task, emptyTask} from './types';
import {
	ListGroup,
	Form,
	Button
} from 'react-bootstrap';

const head = (a: Array<any>) => a[0];
const tail = (a: Array<any>) => a.slice(1);
const tailTip = (a: Array<any>) => a[a.length-1];
const headAndShoulders = (a: Array<any>) => a.slice(0, -1);

const ActiveTaskForm: React.FC<{
	pushTask: Function;
}> = ({
	pushTask
}) => {
	const [task, setTask] = useState(emptyTask);
	const resetTask = () => setTask(emptyTask);

	const handleSubmit = async (
		evt: React.FormEvent<HTMLFormElement>
	) => {
		evt.preventDefault();
		pushTask(task);
		resetTask();
	};

	return (
		<Form
			onSubmit={handleSubmit}
		>
			<Form.Control
				type="text"
				onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setTask({
						name: ev.target.value
					})
				}
				value={task.name}
			>
			</Form.Control>
		</Form>
	);
};

const ActiveTaskItem: React.FC<{
	task: Task;
}> = ({task}) => <TaskItem
	task={task}
	disabled={false}
	active={true}
/>

const DisabledTaskItem: React.FC<{
	task: Task;
}> = ({task}) => <TaskItem
	task={task}
	disabled={true}
	active={false}
/>

const TaskItem: React.FC<{
	task: Task;
	disabled: boolean;
	active: boolean;
}> = ({task, disabled, active}) => {
	const DisabledItem: React.FC<{
		child: any;
	}> = ({child}) => (
		<ListGroup.Item
			disabled
		>
			{child}
		</ListGroup.Item>
	);
	
	const ActiveItem: React.FC<{
		child: any;
	}> = ({child}) => (
		<ListGroup.Item
			active
			variant="primary"
			key="prime"
		>
			{child}
		</ListGroup.Item>
	);

	const child = task ? (
		<>
		{task.name}
		</>
	) : (
		<div>
		</div>
	) ;

	return disabled ? DisabledItem({child}) 
	                : ActiveItem({child});
};

export const TaskList: React.FC<{
	initialTasks: Array<Task>;
}> = ({initialTasks = []}) => {
	const [activeTask, setActiveTask] = useState(head(initialTasks));
	const [inactiveTasks, setInactiveTasks] = useState(tail(initialTasks));

	const pushTask = (newActive: Task) => {
		const oldActive = activeTask;
		setActiveTask(newActive);
		setInactiveTasks(
			[...inactiveTasks, oldActive]
		);
	};

	const deleteTask = () => {
		setActiveTask(tailTip(inactiveTasks));
		setInactiveTasks(headAndShoulders(inactiveTasks));
	};

	const deleteButton = (
		<Button
			variant="danger"
			block
			onClick={deleteTask}
		>
			DELETE DELETE DELETE 
		</Button>
	);

	return (
		<ListGroup
		>
			<ListGroup.Item>
				<ActiveTaskForm
					pushTask={pushTask}
				/>
				{deleteButton}
			</ListGroup.Item>
			<ActiveTaskItem
				task={activeTask}
			/>
			{
				(inactiveTasks.length > 0) ? (
					inactiveTasks.slice().reverse().map(
						task => <DisabledTaskItem task={task}/>
					)
				) : (
					<></>
				)
			}
		</ListGroup>
	);
};
