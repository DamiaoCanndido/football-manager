import { Navbar } from '@/components/main/navbar';
import { Menu } from '@/components/main/menu';
import { GameCard } from '@/components/cards/game-card';
import { useEffect, useState } from 'react';
import { IGame } from '@/interfaces/game';
import { api } from '@/lib/axios';

export function Games() {
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    api.get(`/fixtures`).then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="flex bg-white">
      <Navbar />
      <>
        <Menu />
        <main className="px-4 w-full pt-4 mt-24 ml-60">
          <div className="h-20 bg-gray-400 mb-4 rounded-xl"></div>
          <div className="flex flex-col items-center">
            {games.map((e) => {
              return <GameCard key={e.id} items={e} />;
            })}
          </div>
        </main>
      </>
    </div>
  );
}
