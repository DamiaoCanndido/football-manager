import { Search, Filter } from 'lucide-react';
import { Button } from './components/ui/button';

export function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="bg-neutral-500 flex px-6 py-3 items-center justify-between border-b">
        Football Manager
        <div className="flex items-center">
          <form className="flex items-center" onSubmit={() => {}}>
            <Button className="bg-transparent hover:bg-transparent">
              <Search />
            </Button>
            <input className="p-1" type="text" />
          </form>
          <Button className="bg-transparent hover:bg-transparent">
            <Filter />
          </Button>
        </div>
      </nav>
      <div className="flex flex-1">
        <aside className="w-40 flex bg-gray-500"></aside>
        <main></main>
      </div>
    </div>
  );
}
