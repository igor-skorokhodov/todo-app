import styles from "./AddForm.module.css";
import { Button, Input, Form } from "antd";
import { ITodo } from "../TodosView";
import { Dispatch, SetStateAction } from "react";
import { createTodo } from "../../../utils/queries";

interface IAddFormProps {
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

export const AddForm = ({ setTodos }: IAddFormProps) => {
  const [form] = Form.useForm();

  const handleSubmit = async ({ todo }: { todo: string }) => {
    const newTodo = { todo, completed: false };
    createTodo(newTodo, setTodos).then(() => form.resetFields());
  };

  return (
    <div className={styles.addForm}>
      <div className={styles.header_wrapper}>
        <h1 className={styles.title}>Todo List</h1>
      </div>
      <div className={styles.form_wrapper}>
        <Form
          form={form}
          className={styles.add}
          initialValues={{ todo: "" }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="todo"
            rules={[{ required: true, message: "Please enter todo" }]}
          >
            <Input
              placeholder="Add to do"
              className={styles.add_input}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.add_btn}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
