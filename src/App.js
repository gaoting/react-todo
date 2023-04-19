import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import {
  addTask,
  deleteTask,
  selectAllTasks,
  updateTask,
} from "./todosSlice";

type Todo = {
  id: number;
  task: string;
};

function App() {
  const tasks = useSelector(selectAllTasks);
  const dispatch = useDispatch();

  const [task, setTask] = useState("");

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    dispatch(addTask(task));
    setTask("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
      </header>
      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <TodoItem task={task} />
            </li>
          ))}
        </ul>
        <TodoForm
          task={task}
          onTaskChange={handleTaskChange}
          onAddTask={handleAddTask}
        />
      </main>
    </div>
  );
}

type TodoItemProps = {
  task: Todo;
};

function TodoItem({ task }: TodoItemProps) {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [newTask, setNewTask] = useState(task.task);

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    dispatch(updateTask({ id: task.id, task: newTask }));
    setEditMode(false);
  };

  const handleNewTaskChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTask(e.target.value);
  };

  return (
    <div>
      {editMode ? (
        <div>
          <input value={newTask} onChange={handleNewTaskChange} />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <span>{task.task}</span>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

type TodoFormProps = {
  task: string;
  onTaskChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTask: () => void;
};

function TodoForm({ task, onTaskChange, onAddTask }: TodoFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddTask();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={task} onChange={onTaskChange} />
      <button>Add Task</button>
    </form>
  );
}

export default App;

