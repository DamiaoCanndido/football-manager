import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Navbar() {
  return (
    <nav className="bg-gray-500 fixed flex h-24 w-full px-6 py-3 items-center justify-between border-b">
      <h2 className="text-white">Football Manager</h2>
      <div className="flex items-center">
        <form className="flex items-center" onSubmit={() => {}}>
          <Button className="bg-transparent hover:bg-transparent">
            <Search />
          </Button>
          <Input className="px-1 mx-1" />
        </form>
      </div>
    </nav>
  );
}
