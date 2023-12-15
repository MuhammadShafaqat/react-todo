/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Input = () => {
// Post request code 
const [inputValue, setInputValue] = useState('');

const addTask = () => {
  // Perform POST request using Axios
  axios.post('http://localhost:3000/postItem', { title: inputValue })
    .then(response => {
      // Handle success, if needed
      console.log('POST request successful:', response.data); 
      setInputValue('');
    })
    .catch(error => {
      // Handle error, if needed
      console.error('Error sending POST request:', error);
    });
};

  //Get Request code
  const [data, setData] = useState([]); // Initialize data as an empty array
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getItem');
      setData(response.data);
    } catch (error) {
      // Handle any errors from the API request
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
  <h3>Tasks created</h3>
      <div className="input-wrapper">
        <input type="text" 
          value={inputValue}
          onChange={(e)=> setInputValue(e.target.value)}
        />
        <button  onClick={addTask}>Task</button>
      </div>
  



    <br /><br />
           <h3>Here is the comming data from the Api</h3>
      {data && data.map((item, index) => (
        <div key={index}>{item.title}</div>
      ))}
      
    </div>
  );
};

export default Input;
