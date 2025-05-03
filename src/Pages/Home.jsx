import React, {useState} from "react";
import Navbar from "../Components/Navbar";
import TaskCard from "../Components/TaskCard";

const Home = ({tasks, onUpdate, onDelete, onAddTask}) => {
  const [newTask, setNewTask] = useState({title: "", description: "", status: "To Do"});

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setNewTask((prevTask) => ({...prevTask, [name]: value}));
  };

  const handleAddNewTask = (e) => {
    e.preventDefault();
    const taskToAdd = {...newTask, id: Date.now()};
    onAddTask(taskToAdd);
    setNewTask({title: "", description: "", status: "To Do"});
  };

  const columns = [
    {key: "To Do", label: "To Do"},
    {key: "In Progress", label: "In Progress"},
    {key: "Done", label: "Done"},
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Task Dashboard</h1>
        <form onSubmit={handleAddNewTask} className="mb-6 p-4 bg-white rounded shadow max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Add New Task</h2>
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input type="text" name="title" value={newTask.title} onChange={handleInputChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea name="description" value={newTask.description} onChange={handleInputChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <select name="status" value={newTask.status} onChange={handleInputChange} className="w-full p-2 border rounded">
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Add Task
          </button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((col) => (
            <div key={col.key} className="bg-white p-4 rounded shadow">
              <h2 className="font-bold mb-2">{col.label}</h2>
              {tasks
                .filter((task) => task.status === col.key)
                .map((task) => (
                  <TaskCard key={task.id} task={task} onDelete={onDelete} onUpdate={onUpdate} />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
