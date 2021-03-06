import React from "react";
import { FaTimes } from "react-icons/fa";

const Task = ({ task, deleteTask, taskReminder }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""} `}
      onDoubleClick={() => taskReminder(task.id)}
    >
      <h3>
        {task.text}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => 
            {
            deleteTask(task.id);
          console.log(task.id)
            }
          
          }
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
