import { Navbar } from '@/components/main/navbar';
import { Menu } from '@/components/main/menu';
import { GameCard } from '@/components/cards/game-card';
import { useEffect, useState } from 'react';
import { IGame } from '@/interfaces/game';
import { api } from '@/lib/axios';
import { Select } from 'antd';
import { ILeague } from '@/interfaces/league';

const { Option } = Select;

export function Games() {
  const [games, setGames] = useState<IGame[]>([]);
  const [leagues, setLeagues] = useState<ILeague[]>([]);
  const [selectLeagues, setSelectLeagues] = useState('');
  const [rounds, setRounds] = useState<string[] | undefined>([]);
  const [selectRounds, setSelectRounds] = useState('');

  useEffect(() => {
    if (selectLeagues === '') {
      api.get(`/fixtures`).then((response) => {
        setGames(response.data);
      });
      setSelectRounds('');
      setRounds([]);
    } else {
      let round = '';
      if (selectRounds) {
        round = selectRounds.split(' ')[1];
      }
      api
        .get(`/fixtures/${selectLeagues}/league?round=${round}`)
        .then((response) => {
          setGames(response.data);
        });

      const element = leagues.find((e) => {
        return e.id === selectLeagues;
      });
      setRounds(element?.rounds);
    }
    api.get(`/league`).then((response) => {
      setLeagues(response.data);
    });
  }, [selectLeagues, selectRounds]);

  return (
    <div className="flex bg-white">
      <Navbar />
      <>
        <Menu />
        <main className="px-4 w-full pt-4 mt-24 ml-60">
          <div className="flex justify-between p-4 items-center h-20 bg-gray-400 mb-4 rounded-xl">
            <Select
              className="w-40"
              id="type"
              onChange={(e) => {
                setSelectLeagues(e);
              }}
              placeholder="Selecione a liga"
            >
              <Option key={'todos'} value={''}>
                Todos
              </Option>
              {leagues.map((e) => {
                return (
                  <Option key={e.id} value={e.id}>
                    {e.name}
                  </Option>
                );
              })}
            </Select>
            <Select
              className="w-40"
              allowClear
              id="rounds"
              onChange={(e) => {
                setSelectRounds(e);
              }}
              placeholder="Selecione o round"
            >
              {rounds?.map((e) => {
                return (
                  <Option key={e} value={e}>
                    {e}
                  </Option>
                );
              })}
            </Select>
          </div>
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
