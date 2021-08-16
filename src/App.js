import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import Addtask from "./Components/Addtask";
import { useState } from "react";
import "./App.css";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  //Delete task
  const deleteTask = (id) => {
    console.log(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //add task

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };
  //reminder
  const taskReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  //show add task form
  const showTaskForm = () => {
    setShowAddTask(!showAddTask);
  };

  return (
    <div className="container">
      <Header showTaskForm={showTaskForm} showAdd={showAddTask} />
      {showAddTask && <Addtask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks
          tasksObj={tasks}
          onDelete={deleteTask}
          onDoubleClick={taskReminder}
        />
      ) : (
        "No tasks for today"
      )}
    </div>
  );
}
export default App;
