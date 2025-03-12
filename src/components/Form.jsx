import { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext.jsx";

function Form() {
  const [name, setName] = useState("");
  const { addTask } = useContext(TodoContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    addTask(name);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        id="new-todo-input"
        className="text-2xl flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="text"
        autoComplete="off"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Add
      </button>
    </form>
  );
}

export default Form;
