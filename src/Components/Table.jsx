import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Table() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users/1/todos')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    }
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditTodo(todoToEdit);
    setNewTask(todoToEdit.title);
  };

  const handleSaveEdit = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editTodo.id ? { ...todo, title: newTask } : todo
    );
    setTodos(updatedTodos);
    setEditTodo(null);
  };

  const handleAdd = () => {
    if (newTask.trim() !== '') {
      const newTodo = {
        id: todos.length + 1,
        title: newTask,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTask('');
    }
  };

  return (
    <React.Fragment>
  <table className="table">
    <thead className="thead-dark bg-dark"> 
          <tr>
            <th>ID</th>
            <th>TODOS</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>
                {editTodo && editTodo.id === todo.id ? (
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    style={{ width: '100%' }} // Centered input
                  />
                ) : (
                  todo.title
                )}
              </td>
              <td>{todo.completed ? 'Yes' : 'No'}</td>
              <td>
                {editTodo && editTodo.id === todo.id ? (
                  <FontAwesomeIcon
                    style={{ fontSize: '24px', color: 'green', cursor: 'pointer' }}
                    icon={faSave}
                    onClick={handleSaveEdit}
                  />
                ) : (
                  <FontAwesomeIcon
                    style={{ fontSize: '24px', color: 'blue', cursor: 'pointer' }}
                    icon={faEdit}
                    onClick={() => handleEdit(todo.id)}
                  />
                  
                )}
                <FontAwesomeIcon
                  style={{ fontSize: '24px', color: 'red', cursor: 'pointer' }}
                  icon={faTrash}
                  onClick={() => handleDelete(todo.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div  style={{ width: '100%', textAlign: 'center' }} 
>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task Name"
        />
        <button onClick={handleAdd} style={{textAlign:"center"}}>Add</button>
      </div>
    </React.Fragment>
  );
}
