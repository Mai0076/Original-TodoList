import React, { useState } from "react";
import { Button } from "@headlessui/react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //新しいtodoを作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h2 className="text-red-400 underline decoration-double decoration-2 font-bold text-5xl tracking-wide">
          TodoList
        </h2>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          placeholder="やること"
          className="border border-gray-300 focus:outline-red-400 rounded w-100 h-10 p-3 pt-5 text-sm mt-5"
        />
        <input type="submit" value="" className="" />
      </form>
      <ul className="mt-5">
        {todos.map((todo) => (
          <li key={todo.id} className="mt-3">
            <input
              type="checkbox"
              className="mr-4"
              onChange={(e) => handleChecked(todo.id, todo.checked)}
            />
            <input
              type="text"
              placeholder="入力してください"
              onChange={(e) => handleEdit(todo.id, e.target.value)}
              className="border border-gray-300 focus:outline-red-400 rounded w-100 h-7 p-3 pt-3 text-sm mr-4"
              value={todo.inputValue}
              disabled={todo.checked}
            />
            <Button
              onClick={() => handleDelete(todo.id)}
              className="py-2 px-3 rounded bg-red-500 hover:bg-red-600 text-white border-red-700 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
