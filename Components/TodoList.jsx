import React, { useState, useEffect } from 'react';
import '../index.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className='mainList'>
      <h1>Todo List</h1>
      <div className='input'>
        <div className='inputfield'>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='listData'>
        <ul>
          {tasks.map((task, index) => (
            <div className='list' key={index}>
              <li>
                <div className='data'>
                  {task}
                </div>
                <div className='btn'>
                  <button onClick={() => removeTask(index)}>Remove</button>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
