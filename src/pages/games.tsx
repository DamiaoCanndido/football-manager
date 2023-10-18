import { Navbar } from '@/components/main/navbar';
import { Menu } from '@/components/main/menu';

export function Games() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Menu />
        <main>Games</main>
      </div>
    </div>
  );
}
