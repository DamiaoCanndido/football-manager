import { Button } from './button';
import { Input } from './input';
import { FormEvent } from 'react';
import { Search } from 'lucide-react';

interface propType {
  getSearch: (event: FormEvent) => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export function Searching(props: propType) {
  return (
    <form onSubmit={props.getSearch} className="flex items-center">
      <Button className="bg-transparent hover:bg-transparent">
        <Search />
      </Button>
      <Input
        value={props.name}
        onChange={(e) => props.setName(e.target.value)}
        className="px-1 mx-1"
      />
    </form>
  );
}
