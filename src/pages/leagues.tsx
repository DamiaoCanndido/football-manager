import { Navbar } from '@/components/main/navbar';
import { Menu } from '@/components/main/menu';
import { LeagueCard } from '@/components/cards/league-card';
import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';

export interface ILeague {
  id: string;
  name: string;
  type: string;
  logo: string;
  season: string;
  rounds: string[];
  numberOfRounds: number;
  countryId: string;
}

export function Leagues() {
  const [leagues, setLeagues] = useState<ILeague[]>([]);

  useEffect(() => {
    api.get(`/league`).then((response) => {
      setLeagues(response.data);
    });
  }, []);

  return (
    <div className="flex bg-white">
      <Navbar />
      <>
        <Menu />
        <main className="px-4 w-full pt-4 mt-24 ml-60">
          <div className="h-20 bg-gray-400 mb-4 rounded-xl"></div>
          <div className="flex flex-wrap">
            {leagues.map((e) => {
              return <LeagueCard key={e.id} items={e} />;
            })}
          </div>
        </main>
      </>
    </div>
  );
}
