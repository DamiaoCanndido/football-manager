import { Navbar } from '@/components/main/navbar';
import { Menu } from '@/components/main/menu';
import { GameCard } from '@/components/cards/game-card';

export function Games() {
  const responses = [
    {
      id: '65365209eda656536ae26e29',
      fullTime: false,
      startDate: '2023-10-23T17:00:00.000Z',
      round: 'Round 1',
      leagueId: '65359a524eaa112cc9103029',
      homeId: '653447fc3f1b9593f3df9ee2',
      awayId: '6531bcd186503ea18bc11ec8',
      homeScore: 4,
      awayScore: 4,
      homePenalty: 5,
      awayPenalty: 6,
      home: {
        id: '653447fc3f1b9593f3df9ee2',
        name: 'Chelsea',
        code: 'CHE',
        type: 'club',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1024px-Chelsea_FC.svg.png',
      },
      away: {
        id: '6531bcd186503ea18bc11ec8',
        name: 'Manchester City',
        code: 'MCY',
        type: 'club',
        logo: 'https://upload.wikimedia.org/wikipedia/pt/0/02/Manchester_City_Football_Club.png',
      },
      league: {
        name: 'Premier League',
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
