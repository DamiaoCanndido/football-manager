import { Navbar } from '@/components/main/navbar';
import { Menu } from '@/components/main/menu';
import { LeagueCard } from '@/components/cards/league-card';

export function Leagues() {
  const responses = [
    {
      id: '1',
      name: 'PREMIER LEAGUE',
      type: 'LEAGUE',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1920px-Premier_League_Logo.svg.png',
      season: '2023/2024',
      rounds: ['Round 1', 'Round 2', 'Round 3'],
      numberOfRounds: 3,
      countryId: '1',
    },
    {
      id: '2',
      name: 'BRASILEIRO SÉRIE A',
      type: 'LEAGUE',
      logo: 'https://upload.wikimedia.org/wikipedia/pt/4/42/Campeonato_Brasileiro_S%C3%A9rie_A_logo.png',
      season: '2023/2024',
      rounds: ['Round 1', 'Round 2', 'Round 3'],
      numberOfRounds: 3,
      countryId: '2',
    },
  ];
  return (
    <div className="flex bg-white">
      <Navbar />
      <>
        <Menu />
        <main className="px-4 w-full pt-4 mt-24 ml-60">
          <div className="h-20 bg-gray-400 mb-4 rounded-xl"></div>
          <div className="flex flex-wrap">
            {responses.map((e) => {
              return <LeagueCard key={e.id} items={e} />;
            })}
          </div>
        </main>
      </>
    </div>
  );
}
