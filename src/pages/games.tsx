import { Navbar } from '@/components/main/navbar';
import { Menu } from '@/components/main/menu';

export function Games() {
  return (
    <div className="flex bg-white">
      <Navbar />
      <>
        <Menu />
        <main className="px-4 w-full pt-4 mt-24 ml-60">
          <div className="h-20 bg-gray-400 mb-4 rounded-xl"></div>
          <div className="flex flex-wrap"></div>
        </main>
      </>
    </div>
  );
}
