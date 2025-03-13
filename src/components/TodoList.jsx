import { useState, useContext, useEffect, useRef } from "react";
import { TodoContext } from "../context/TodoContext.jsx";

function Todo({ id, name, completed }) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { toggleTaskCompleted, deleteTask, updateTask } =
    useContext(TodoContext);
  const editFieldRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isEditing && editFieldRef.current) {
      editFieldRef.current.focus();
    }
  }, [isEditing]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    updateTask(id, newName);
    setNewName("");
    setEditing(false);
  }

  function handleDelete() {
    setIsDeleting(true);
    setTimeout(() => deleteTask(id), 200);
  }

  const editTask = (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        ref={editFieldRef}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Save
        </button>
      </div>
    </form>
  );

  const viewTask = (
    <div
      className={`flex justify-between items-center p-4 border-gray-200 rounded-lg shadow-sm bg-gray-100 hover:bg-gray-200 transition-all duration-300 transform ${
        isDeleting
          ? "opacity-0 scale-95"
          : isVisible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95"
      }`}
    >
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleTaskCompleted(id)}
          className="w-4 h-4 align-middle"
        />
        <span
          className={`${
            completed
              ? "line-through text-gray-400 text-2xl"
              : "text-gray-800 text-2xl"
          } align-middle mb-1`}
        >
          {name}
        </span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => setEditing(true)}
          className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return <li>{isEditing ? editTask : viewTask}</li>;
}

export default Todo;
