import styles from "./TodoContent.module.css";
import { Divider, List, Modal, Spin } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ITodo } from "../TodosView";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { TodosButtons } from "./TodosButtons/TodosButtons";
import { TodoList } from "./TodoList/TodoList";
import {
  deleteMultipleTodos,
  deleteSingleTodo,
  editTodo,
  fetchTodos,
} from "../../../utils/queries";

const { confirm } = Modal;

interface ITodoContentProps {
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

export const TodoContent = ({ todos, setTodos }: ITodoContentProps) => {
  const [isCompletedList, setIsCompletedList] = useState(false);
  const [isActiveList, setIsActiveList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const activeList = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos]
  );
  const completedList = useMemo(
    () => todos.filter((todo) => todo.completed),
    [todos]
  );

  const currentList = useMemo(() => {
    if (isActiveList) return activeList;

    if (isCompletedList) return completedList;

    return todos;
  }, [activeList, completedList, isActiveList, isCompletedList, todos]);

  useEffect(() => {
    setIsLoading(true);
    fetchTodos(setTodos, setIsLoading);
  }, [setTodos]);

  const deleteTodo = useCallback((itemId: string) => {
    if (itemId) {
      confirm({
        title: "Are you sure?",
        icon: <ExclamationCircleOutlined />,
        okType: "danger",
        onOk() {
          deleteSingleTodo(itemId, setTodos);
        },
      });
    }
  }, [setTodos]);

  const deleteCompletedTodos = useCallback(() => {
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleOutlined />,
      okType: "danger",
      onOk() {
        deleteMultipleTodos(setTodos, todos);
      },
    });
  }, [setTodos, todos]);

  const handleCheckboxChange = useCallback(
    (e: CheckboxChangeEvent, itemId: string, todoIndex: number) => {
      editTodo(itemId, setTodos, todos, todoIndex, e);
    },
    [setTodos, todos]
  );

  if (isLoading) return <Spin className={styles.spin} tip="Loading..." />;

  return (
    <div className={styles.todoContent}>
      <div className={styles.todoList}>
        <Divider orientation="left">List</Divider>
        <TodosButtons
          isCompletedList={isCompletedList}
          setIsCompletedList={setIsCompletedList}
          isActiveList={isActiveList}
          setIsActiveList={setIsActiveList}
          deleteCompletedTodos={deleteCompletedTodos}
        />
        <List bordered>
          {todos.length > 0 &&
            currentList.map((todo: ITodo, index: number) => {
              return (
                <TodoList
                  todo={todo}
                  handleCheckboxChange={handleCheckboxChange}
                  deleteTodo={deleteTodo}
                  todoIndex={index}
                  key={todo.id}
                />
              );
            })}
        </List>
      </div>
    </div>
  );
};
