import styles from "./TodoList.module.css";
import { List, Checkbox } from "antd";
import { ReactComponent as DeleteIcon } from "../../../../img/delete.svg";
import { ITodo } from "../../TodosView";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React from "react";

interface ITodoListProps {
  todo: ITodo;
  handleCheckboxChange: (e: CheckboxChangeEvent, id: string, todoIndex: number) => void;
  deleteTodo: (id: string) => void;
  todoIndex: number;
}

const TodoListMemoized = ({
  todo,
  handleCheckboxChange,
  deleteTodo,
  todoIndex,
}: ITodoListProps) => {
  return (
    <div className={styles.list}>
      <List.Item
        className={todo.completed ? styles.li_item_act : styles.li_item}
        key={todo.id}
      >
        <label>
          <Checkbox
            className={styles.check}
            onChange={(e) => handleCheckboxChange(e, todo.id, todoIndex)}
            checked={todo.completed}
          />
          {todo.todo}
        </label>

        <button
          className={styles.delete_img}
          onClick={() => deleteTodo(todo.id)}
        >
          <DeleteIcon />
        </button>
      </List.Item>
    </div>
  );
};

export const TodoList = React.memo(TodoListMemoized);
