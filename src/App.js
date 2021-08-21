import Header from "./Components/Header";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Tasks from "./Components/Tasks";
import Footer from "./Components/Footer";
import About from './Components/About'
import Addtask from "./Components/Addtask";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  //fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    console.log(data);

    return data;
  };
  //fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  //Delete task
  const deleteTask = async (id) => {
    await fetch(
      `http://localhost:5000/tasks/${id}`,

      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then(console.log(id));
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //add task

  const addTask = async (task) => {
    const res = await fetch(
      "http://localhost:5000/tasks",

      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );

    const data = await res.json();
    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };
  //reminder
  const taskReminder = async (id) => {
    const taskToggle = await fetchTask(id);
    const upTask = { ...taskToggle, reminder: !taskToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(upTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  //show add task form
  const showTaskForm = () => {
    setShowAddTask(!showAddTask);
  };

  return (
    <Router>
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
      <Route path='/about' component={About} />
      <Footer></Footer>
    </div>
    </Router>
  );
}
export default App;
