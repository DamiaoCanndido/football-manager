import { FormEvent, MutableRefObject } from 'react';
import { Search } from 'lucide-react';
import { Form, Button, Input, InputRef } from 'antd';

interface propType {
  getSearch: (event: FormEvent) => void;
  searchName: MutableRefObject<InputRef | null>;
}

export function Searching(props: propType) {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      className="flex items-center"
      name="trigger"
      style={{ maxWidth: 600 }}
      layout="inline"
      autoComplete="off"
    >
      <Form.Item name="name">
        <Input placeholder="buscando..." ref={props.searchName} />
      </Form.Item>
      <Form.Item name="button">
        <Button
          onClick={props.getSearch}
          className="items-center"
          type="primary"
          htmlType="submit"
        >
          <Search />
        </Button>
      </Form.Item>
    </Form>
  );
}
