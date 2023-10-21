import { Navbar } from '@/components/main/navbar';
import { Menu } from '@/components/main/menu';
import { GameCard } from '@/components/cards/game-card';

export function Games() {
  const responses = [
    {
      id: '652acdf9a20002b136f44635',
      fullTime: false,
      startDate: '2023-10-14T21:00:00.000Z',
      round: 'Round 1',
      leagueId: '652ac86680b188aa15d17780',
      homeId: '652acce9a20002b136f44633',
      awayId: '652ac81e80b188aa15d1777f',
      homeScore: null,
      awayScore: null,
      homePenalty: null,
      awayPenalty: null,
      home: {
        id: '652acce9a20002b136f44633',
        name: 'Brasil',
        code: 'BRA',
        isCountry: true,
        logo: 'https://flagcdn.com/h80/br.png',
      },
      away: {
        id: '652ac81e80b188aa15d1777f',
        name: 'Alemanha',
        code: 'ALE',
        isCountry: true,
        logo: 'https://flagcdn.com/h80/de.png',
      },
    },
    {
      id: '652acdf9a20002b136f44634',
      fullTime: false,
      startDate: '2023-10-14T21:00:00.000Z',
      round: 'Round 1',
      leagueId: '652ac86680b188aa15d17780',
      homeId: '652acce9a20002b136f44633',
      awayId: '652ac81e80b188aa15d1777f',
      homeScore: null,
      awayScore: null,
      homePenalty: null,
      awayPenalty: null,
      home: {
        id: '652acce9a20002b136f44633',
        name: 'Brasil',
        code: 'BRA',
        isCountry: true,
        logo: 'https://flagcdn.com/h80/br.png',
      },
      away: {
        id: '652ac81e80b188aa15d1777f',
        name: 'Alemanha',
        code: 'ALE',
        isCountry: true,
        logo: 'https://flagcdn.com/h80/de.png',
      },
    },
  ];
  return (
    <div className="flex bg-white">
      <Navbar />
      <>
        <Menu />
        <main className="px-4 w-full pt-4 mt-24 ml-60">
          <div className="h-20 bg-gray-400 mb-4 rounded-xl"></div>
          <div className="flex flex-col items-center">
            {responses.map((e) => {
              return <GameCard key={e.id} items={e} />;
            })}
          </div>
        </main>
      </>
    </div>
  );
}
