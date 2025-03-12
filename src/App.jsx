import { useContext, useRef, useEffect } from "react";
import { TodoContext } from "./context/TodoContext.jsx";
import Todo from "./components/TodoList.jsx";
import Form from "./components/Form";
import FilterButton from "./components/FilterButtons.jsx";

function App() {
  const { tasks, filter, FILTER_MAP } = useContext(TodoContext);
  const filteredTasks = tasks.filter(FILTER_MAP[filter]);
  const listHeadingRef = useRef(null);

  useEffect(() => {
    if (listHeadingRef.current) {
      listHeadingRef.current.focus();
    }
  }, [filteredTasks]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">TO DO</h1>
        <Form />
        <div className="my-5 flex justify-center">
          <FilterButton />
        </div>
        <ul className="space-y-2" ref={listHeadingRef}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => <Todo key={task.id} {...task} />)
          ) : (
            <p className="my-2 text-center text-gray-500">No tasks available</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
