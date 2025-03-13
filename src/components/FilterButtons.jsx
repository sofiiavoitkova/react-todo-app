import { useContext } from "react";
import { TodoContext } from "../context/TodoContext.jsx";

function FilterButton() {
  const { FILTER_MAP, filter, setFilter } = useContext(TodoContext);
  const FILTER_NAMES = Object.keys(FILTER_MAP);

  return (
    <div className="flex space-x-2">
      {FILTER_NAMES.map((name) => (
        <button
          key={name}
          type="button"
          className={`px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105 active:scale-95 ${
            filter === name
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          aria-pressed={filter === name}
          onClick={() => setFilter(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default FilterButton;
