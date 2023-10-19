import { useState, useEffect } from 'react';
import { api } from '../lib/axios';
import { Navbar } from '@/components/main/navbar';
import { Menu } from '@/components/main/menu';
import { TeamCard } from '@/components/teams/team-card';

interface ITeam {
  id: string;
  name: string;
  code: string;
  isCountry: boolean;
  logo: string;
}

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
    {
      id: '4',
      name: 'Tottenham',
      code: 'TOT',
      isCountry: false,
      logo: 'https://upload.wikimedia.org/wikipedia/pt/6/6d/Tottenham_Hotspur.png',
    },
    {
      id: '5',
      name: 'Tottenham',
      code: 'TOT',
      isCountry: false,
      logo: 'https://upload.wikimedia.org/wikipedia/pt/6/6d/Tottenham_Hotspur.png',
    },
    {
      id: '6',
      name: 'Tottenham',
      code: 'TOT',
      isCountry: false,
      logo: 'https://upload.wikimedia.org/wikipedia/pt/6/6d/Tottenham_Hotspur.png',
    },
    {
      id: '7',
      name: 'Tottenham',
      code: 'TOT',
      isCountry: false,
      logo: 'https://upload.wikimedia.org/wikipedia/pt/6/6d/Tottenham_Hotspur.png',
    },
  ];

  const [teams, setTeams] = useState<ITeam[]>([]);

  useEffect(() => {
    api.get(`/team`).then((response) => {
      setTeams(response.data);
    });
  }, []);

  return (
    <div className="flex bg-white">
      <Navbar />
      <>
        <Menu />
        <main className="flex flex-wrap px-4 pt-4 mt-24 ml-60">
          <div className="w-full h-20 bg-gray-400 mb-4 rounded-xl"></div>
          {responses.map((e) => {
            return <TeamCard key={e.id} items={e} />;
          })}
        </main>
      </>
    </div>
  );
}
