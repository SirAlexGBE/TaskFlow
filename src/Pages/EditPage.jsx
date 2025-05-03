import React, {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Navbar from "../Components/Navbar";

const EditPage = ({tasks, onUpdate}) => {
  const {id} = useParams();
  const navigate = useNavigate();
  const task = tasks.find((task) => String(task.id) === id);

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "To Do");

  if (!task) {
    return <div>Task not found</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(task.id, {title, description, status});
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow max-w-md mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 border rounded">
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditPage;
