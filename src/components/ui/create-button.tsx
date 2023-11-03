import { Button } from 'antd';

interface propTypes {
  showModal: () => void;
}

export function CreateButton({ showModal }: propTypes) {
  return (
    <Button className="bg-green-400 text-white" onClick={showModal}>
      Criar
    </Button>
  );
}
