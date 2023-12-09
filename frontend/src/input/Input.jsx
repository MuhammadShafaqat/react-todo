/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

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
    
    const deleteTask = ()=>{
          const updateTasks =  tasks.slice(0,-1);
          settasks(updateTasks);
    }

  return (
    <div>
        <input type="text"  
            value={inputValue}
                onChange={(e)=> setInputValue(e.target.value)}
        />
        <button onClick={addTask}>add Tasks</button>
        <h1>Tasks</h1>
        <ul>
            {tasks.map((task,index)=>(
                     <div key={index}>
                     <li>{task}</li>
                     <button onClick={deleteTask}>delete Task</button>

                     </div>
            ))   }
        </ul>
    </div>
  )
}

export default Input