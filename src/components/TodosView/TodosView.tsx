import { useState } from "react";
import { AddForm } from "./AddForm/AddForm";
import { TodoContent } from "./TodoContent/TodoContent";

export interface ITodo {
  id: string;
  todo: string;
  completed: boolean;
}

export const TodosView = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  return (
    <div className="todos">
      <AddForm setTodos={setTodos} />
      <TodoContent todos={todos} setTodos={setTodos} />
    </div>
  );
};
