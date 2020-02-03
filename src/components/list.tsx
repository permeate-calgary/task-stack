import React, {useState} from 'react';
import {Task, emptyTask} from './types';
import {ListGroup, Form, Button} from 'react-bootstrap';

const tailTip = (a: any[]) => a[a.length-1];
const headAndShoulders = (a: any[]) => a.slice(0, -1);

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
			key={child.name ? child.name : child}
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

export const TaskList: React.FC<{
	initialTasks: Array<Task>;
}> = ({initialTasks = []}) => {
	const [activeTask, setActiveTask] = useState(tailTip(initialTasks));
	const [inactiveTasks, setInactiveTasks] = useState(headAndShoulders(initialTasks));

	const pushTask = (newActive: Task) => {
		/* const oldActive = activeTask; */
		/* setActiveTask(newActive); */
		if (!activeTask.name) {
			setActiveTask(newActive);
			setInactiveTasks(
				inactiveTasks
			);
		} else {
			setInactiveTasks(
				[newActive, ...inactiveTasks]
			);
		}
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
