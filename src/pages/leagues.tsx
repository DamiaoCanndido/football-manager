import { Navbar } from '@/components/main/navbar';
import { Menu } from '@/components/main/menu';
import { LeagueCard } from '@/components/cards/league-card';
import { FormEvent, useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import { Searching } from '@/components/ui/searching';
import { ILeague } from '@/interfaces/league';
import { ITeam } from '@/interfaces/team';
import { Select } from 'antd';

const { Option } = Select;

export function Leagues() {
  const [leagues, setLeagues] = useState<ILeague[]>([]);
  const [country, setCountry] = useState<ITeam[]>([]);
  const [select, setSelect] = useState('');

  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    api.get(`/team?type=selection`).then((response) => {
      setCountry(response.data);
    });

    if (select === '') {
      api.get(`/league`).then((response) => {
        setLeagues(response.data);
      });
    } else {
      api.get(`/league/${select}/country`).then((response) => {
        setLeagues(response.data);
      });
    }
  }, [select]);

  function getSearch(event: FormEvent) {
    event.preventDefault();
    api.get(`/league?name=${searchName}`).then((response) => {
      setLeagues(response.data);
    });
  }

  return (
    <div className="flex">
      <Navbar />
      <>
        <Menu />
        <main className="px-4 w-full pt-4 mt-24 ml-60">
          <div className="flex justify-between p-4 items-center h-20 bg-gray-400 mb-4 rounded-xl">
            <Select
              className="w-40"
              allowClear
              id="type"
              onChange={(e) => {
                setSelect(e);
              }}
              placeholder="Selecione o país"
            >
              {country.map((e) => {
                return (
                  /*
                    value com o valor de id não pesquisa no select.
                  */
                  <Option key={e.id} value={e.id}>
                    {e.name}
                  </Option>
                );
              })}
            </Select>
            <Searching
              getSearch={getSearch}
              searchName={searchName}
              setSearchName={setSearchName}
            />
          </div>
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
