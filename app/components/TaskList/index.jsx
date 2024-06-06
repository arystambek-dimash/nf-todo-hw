import React, {useState, useEffect} from 'react';
import TaskItem from '../TaskItem';

const TaskList = ({filter, tasks, toggleTask, deleteTask}) => {
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        const filterTasks = () => {
            if (filter === 'active') {
                return tasks.filter(task => !task.completed);
            }
            if (filter === 'completed') {
                return tasks.filter(task => task.completed);
            }
            return tasks
        };

        setFilteredTasks(filterTasks());
    }, [filter, tasks]);

    return (
        <div>
            <ul>
                {filteredTasks.map(task => (
                    <TaskItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask}/>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
