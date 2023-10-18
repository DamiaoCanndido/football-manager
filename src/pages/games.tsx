import { Navbar } from '@/components/main/navbar';
import { Menu } from '@/components/main/menu';

export function Games() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Menu />
        <main className="p-4 mt-24 ml-60">Games</main>
      </div>
    </div>
  );
}
