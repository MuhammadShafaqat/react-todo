/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styles from './styles.module.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Input = () => {
    const [inputValue, setInputValue] = useState('');
    const [tasks, settasks] = useState([]);

  const  addTask = ()=>{
    if (inputValue == '') {
        return false;
    }else{
        settasks([...tasks, inputValue]);
        setInputValue('');
       }
    }
    // update tasks
    const editTask = ()=>{

    }
    // delete tasks
    const deleteTask = ()=>{
          const updateTasks =  tasks.slice(0,-1);
          settasks(updateTasks);
    }

  return (
    <div className={styles.container}>
        <div className="input-container">
        <input type="text"  
            value={inputValue}
                onChange={(e)=> setInputValue(e.target.value)}
        />
        
        <button onClick={addTask}>add Tasks</button>
        </div>
        <h1>Tasks</h1>
     {
        tasks.length === 0 ? (
            <h3>No tasks saved</h3>
        ): (
            <ul>
            {tasks.map((task,index)=>(
                     <div key={index} className={styles.taskwrapper}>
                     <li>{task}</li>
                     <FaEdit onClick={editTask} />
                     <FaTrash onClick={deleteTask} />
                     

                     </div>
            ))   }
        </ul>
        )
     }
    </div>
  )
}

export default Input