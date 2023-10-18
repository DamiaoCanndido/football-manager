import { Navbar } from '@/components/main/navbar';
import { Menu } from '@/components/main/menu';
import { TeamCard } from '@/components/teams/team-card';

export function Teams() {
  const responses = [
    {
      id: '1',
      name: 'Manchester City',
      code: 'MCY',
      isCountry: false,
      logo: 'https://upload.wikimedia.org/wikipedia/pt/0/02/Manchester_City_Football_Club.png',
    },
    {
      id: '2',
      name: 'Tottenham',
      code: 'TOT',
      isCountry: false,
      logo: 'https://upload.wikimedia.org/wikipedia/pt/6/6d/Tottenham_Hotspur.png',
    },
    {
      id: '3',
      name: 'Tottenham',
      code: 'TOT',
      isCountry: false,
      logo: 'https://upload.wikimedia.org/wikipedia/pt/6/6d/Tottenham_Hotspur.png',
    },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <Navbar />
      <div className="">
        <Menu />
        <main className="flex p-4 mt-24 ml-60">
          {responses.map((e) => {
            return <TeamCard key={e.id} items={e} />;
          })}
        </main>
      </div>
    </div>
  );
}
