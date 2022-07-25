import { Dispatch, SetStateAction } from "react";
import { ITodo } from "../components/TodosView/TodosView";
import { TODOS_URL } from "./constants";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

export const fetchTodos = async (
  setTodos: Dispatch<SetStateAction<ITodo[]>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  const response = await fetch(TODOS_URL);
  const todosArray = await response.json();

  setTodos(todosArray);
  setIsLoading(false);
};

export const createTodo = async (
  newTodo: { todo: string; completed: boolean },
  setTodos: Dispatch<SetStateAction<ITodo[]>>
) => {
  const response = await fetch(TODOS_URL, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const createdTodo = await response.json();
    setTodos((todos) => [...todos, createdTodo]);
  }
};

export const deleteSingleTodo = async (
  itemId: string,
  setTodos: Dispatch<SetStateAction<ITodo[]>>
) => {
  await fetch(`${TODOS_URL}/${itemId}`, { method: "DELETE" }).then(() =>
    setTodos((todos) => todos.filter((todo) => todo.id !== itemId))
  );
};

export const deleteMultipleTodos = (
  setTodos: Dispatch<SetStateAction<ITodo[]>>,
  todos: ITodo[]
) => {
  todos.forEach(async (item) => {
    if (item.completed) {
      await fetch(`${TODOS_URL}/${item.id}`, {
        method: "DELETE",
      }).then(() => {
        setTodos(todos.filter((todo) => !todo.completed));
      });
    }
  });
};

export const editTodo = async (
  itemId: string,
  setTodos: Dispatch<SetStateAction<ITodo[]>>,
  todos: ITodo[],
  todoIndex: number,
  e: CheckboxChangeEvent
) => {
  const response = await fetch(`${TODOS_URL}/${itemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: e.target.checked }),
  });
  const updatedTodo = await response.json();
  const copy = [...todos];
  copy[todoIndex] = updatedTodo;
  setTodos(copy);
};
