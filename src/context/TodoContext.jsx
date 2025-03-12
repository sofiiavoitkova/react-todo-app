import { createContext, useState } from "react";

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Done: (task) => task.completed,
  };

  const deleteTask = (id) =>
    setTasks((tasks) => tasks.filter((task) => task.id !== id));

  const addTask = (name) =>
    setTasks((tasks) => [
      ...tasks,
      { id: "todo-" + Math.random(), name, completed: false },
    ]);

  const editTask = (id, newName) =>
    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, name: newName } : task))
    );

  const toggleTaskCompleted = (id) =>
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

  const value = {
    tasks,
    filter,
    setFilter,
    FILTER_MAP,
    addTask,
    toggleTaskCompleted,
    deleteTask,
    editTask,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
