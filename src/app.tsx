import { Search, Filter, Trophy, UserCheck, Swords } from 'lucide-react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';

export function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="bg-gray-500 flex px-6 py-3 items-center justify-between border-b">
        <h2 className="text-white">Football Manager</h2>
        <div className="flex items-center">
          <form className="flex items-center" onSubmit={() => {}}>
            <Button className="bg-transparent hover:bg-transparent">
              <Search />
            </Button>
            <Input className="px-1 mx-1" />
          </form>
          <Button className="bg-transparent hover:bg-transparent">
            <Filter />
          </Button>
        </div>
      </nav>
      <div className="flex flex-1">
        <aside className="w-60 p-2 flex flex-col bg-gray-500">
          <Button className="mb-2 bg-transparent hover:bg-gray-400">
            <Swords className="mx-3" />
            Jogos
          </Button>
          <Button className="mb-2 bg-transparent hover:bg-gray-400">
            <Trophy className="mx-3" />
            Ligas
          </Button>
          <Button className="bg-transparent hover:bg-gray-400">
            <UserCheck className="mx-3" />
            Times
          </Button>
        </aside>
        <main></main>
      </div>
    </div>
  );
}
