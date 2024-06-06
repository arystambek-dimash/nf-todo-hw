'use client';
import Image from 'next/image';
import {useEffect, useState} from "react";
import TaskList from "@/app/components/TaskList";

const initialTask = {id: 1, text: "Todo Test", completed: false};

export default function Home() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([initialTask]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const localTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [initialTask];
        setTasks(localTasks);
    }, []);

    const handleAddTask = () => {
        if (task === '') {
            alert('Tasks can\'t be empty');
            return;
        }
        const newTask = {id: Date.now(), text: task, completed: false};
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTask('');
    };

    const handleToggleTask = (id) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? {...task, completed: !task.completed} : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleDeleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleClearCompletedTasks = () => {
        const updatedTasks = tasks.filter(task => !task.completed);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
    });

    const remainingTasks = tasks.filter(task => !task.completed).length;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-bold">TODO</h1>
            </div>
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
                    placeholder="What to do ?"
                    value={task}
                    onChange={e => setTask(e.target.value)}
                />
                <button
                    onClick={handleAddTask}
                    className="bg-blue-500 text-white p-4 rounded ml-4"
                >
                    Add Task
                </button>
            </div>
            <div className="bg-gray-800 rounded p-4">
                <TaskList tasks={filteredTasks} toggleTask={handleToggleTask} deleteTask={handleDeleteTask}/>
                <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
                    <span>{remainingTasks} items left</span>
                    <div>
                        <button onClick={() => setFilter('all')}
                                className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All
                        </button>
                        <button onClick={() => setFilter('active')}
                                className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active
                        </button>
                        <button onClick={() => setFilter('completed')}
                                className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed
                        </button>
                    </div>
                    <button
                        onClick={handleClearCompletedTasks}
                        className="text-gray-400 hover:text-white"
                    >
                        Clear Completed
                    </button>
                </div>
            </div>
        </div>
    );
}
