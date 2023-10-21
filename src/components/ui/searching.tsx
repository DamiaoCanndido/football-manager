import { FormEvent } from 'react';
import { Search } from 'lucide-react';
import { Form, Button, Input } from 'antd';

interface propType {
  getSearch: (event: FormEvent) => void;
  searchName: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
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
        <Input
          placeholder="buscando..."
          value={props.searchName}
          onChange={(e) => props.setSearchName(e.target.value)}
        />
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
