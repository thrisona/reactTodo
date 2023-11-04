import React, { useState } from "react";

function AddTodo({ onAddTask }) {
  const [task, setTask] = useState("");

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== "") {
      onAddTask(task);
      setTask(""); // Clear the input field
    }
  };

  return (
    <div>
    <input 
    type="text"
    placeholder="Add a new task"
    value={task}
    onChange={handleTaskChange}
    
    />

      <button onClick={handleAddTask}>Add</button>
    </div>
  );
}

export default AddTodo;
