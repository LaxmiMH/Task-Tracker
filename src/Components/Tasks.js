import React from "react";
import Task from "./Task";
function Tasks({ tasksObj, onDelete, onDoubleClick }) {
  return (
    <>
      {tasksObj.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={onDelete}
          taskReminder={onDoubleClick}
        />
      ))}
    </>
  );
}

export default Tasks;
