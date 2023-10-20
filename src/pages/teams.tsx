import { useState, useEffect } from 'react';
import { api } from '../lib/axios';
import { Navbar } from '@/components/main/navbar';
import { Menu } from '@/components/main/menu';
import { TeamCard } from '@/components/teams/team-card';

export interface ITeam {
  id: string;
  name: string;
  code: string;
  isCountry: boolean;
  logo: string;
}

export function Teams() {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [select, setSelect] = useState('');

  useEffect(() => {
    if (select === '') {
      api.get(`/team`).then((response) => {
        setTeams(response.data);
      });
    } else {
      api.get(`/team?type=${select}`).then((response) => {
        setTeams(response.data);
      });
    }
  }, [select]);

  return (
    <div className="flex bg-white">
      <Navbar />
      <>
        <Menu />
        <main className="px-4 w-full pt-4 mt-24 ml-60">
          <div className="flex p-4 items-center h-20 bg-gray-400 mb-4 rounded-xl">
            <select
              className="w-40 h-10 p-2 border rounded-lg outline-none"
              id="type"
              onChange={(e) => {
                setSelect(e.target.value);
              }}
            >
              <option value="">Todos</option>
              <option value="club">Clube</option>
              <option value="selection">Seleção</option>
              <option value="amateur">Amador</option>
            </select>
          </div>
          <div className="flex items-center flex-wrap">
            {teams.map((e) => {
              return <TeamCard key={e.id} items={e} />;
            })}
          </div>
        </main>
      </>
    </div>
  );
}
