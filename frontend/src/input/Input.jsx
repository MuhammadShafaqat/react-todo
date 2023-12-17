/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import styles from './styles.module.css';

const Input = () => {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getItem');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddOrUpdate = () => {
    if (editItemId) {
      // Update task
      axios.put(`http://localhost:3000/updateItem/${editItemId}`, { title: inputValue })
        .then(response => {
          console.log('PUT request successful:', response.data);
          setEditItemId(null);
          setInputValue('');
          fetchData();
        })
        .catch(error => {
          console.error('Error updating item:', error);
        });
    } else {
      // Add new task
      axios.post('http://localhost:3000/postItem', { title: inputValue })
        .then(response => {
          console.log('POST request successful:', response.data);
          setInputValue('');
          fetchData();
        })
        .catch(error => {
          console.error('Error sending POST request:', error);
        });
    }
  };

  const handleEdit = (itemId, currentTitle) => {
    setEditItemId(itemId);
    setInputValue(currentTitle);
  };

  const handleDelete = (itemId) => {
    axios.delete(`http://localhost:3000/deleteItem/${itemId}`)
      .then(response => {
        console.log('DELETE request successful:', response.data);
        fetchData();
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
     <div  className={styles.subContainer}>
     <h3>create Tasks</h3>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder='what is the task today?'
          value={inputValue}
          onChange={(e)=> setInputValue(e.target.value)} className={styles.dataInput}
        />
        <button onClick={handleAddOrUpdate} type='button' className= {styles.button1} >{editItemId ? 'Save' : 'Add Task'}</button>
      </div>

      <br /><br />
      <h3>My Tasks</h3>
      {loading ? (
        <p>Loading...</p>
      ) : data && data.length === 0 ? (
        <p>No data</p>
      ) : (
        data.map((item, index) => (
          <div key={item._id} style={{ display: 'flex', alignItems: 'center' }}>
            {editItemId === item._id ? (
              <>
                {/* No additional input or button */}
              </>
            ) : (
              <>
          <div className={styles.tasks}>
          <span className='h4'>{index}.</span>
                <p style={{ marginLeft: '5px', fontSize: '20px' }} className={styles.title}>{item.title}</p>
                <FaEdit
                  style={{ fontSize: '18px', color: 'blue', marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => handleEdit(item._id, item.title)}
                />
                <FaTrash
                className='mr-1'
                  style={{ fontSize: '18px', color: 'red', marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => handleDelete(item._id)}
                />
          </div>
              </>
            )}
          </div>
        ))
      )}
     </div>
    </div>
  );
};

export default Input;
