import { Navbar } from '@/components/main/navbar';
import { Menu } from '@/components/main/menu';
import { GameCard } from '@/components/cards/game-card';
import { useEffect, useState } from 'react';
import { IGame } from '@/interfaces/game';
import { api } from '@/lib/axios';
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Modal,
  Select,
  TimePicker,
} from 'antd';
import { ILeague } from '@/interfaces/league';
import { ITeam } from '@/interfaces/team';

const { Option } = Select;

export function Games() {
  const [games, setGames] = useState<IGame[]>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [leagues, setLeagues] = useState<ILeague[]>([]);
  const [createLeague, setCreateLeague] = useState('');
  const [selectLeagues, setSelectLeagues] = useState('');
  const [rounds, setRounds] = useState<string[] | undefined>([]);
  const [selectRounds, setSelectRounds] = useState('');

  const [homeId, setHomeId] = useState('');
  const [awayId, setAwayId] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log(homeId);
    console.log(awayId);
    api.get(`/team`).then((response) => {
      setTeams(response.data);
    });
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
  }, [selectLeagues, selectRounds, homeId]);

  return (
    <div className="flex bg-white">
      <Navbar />
      <>
        <Menu />
        <main className="px-4 w-full pt-4 mt-24 ml-60">
          <div className="flex justify-between p-4 items-center h-20 bg-gray-400 mb-4 rounded-xl">
            <div>
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
                className="w-40 ml-2"
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
            <>
              <Button className="bg-green-400 text-white" onClick={showModal}>
                Criar
              </Button>
              <Modal
                title="Criar novo jogo:"
                centered
                open={isModalOpen}
                onOk={() => {}}
                onCancel={handleCancel}
                footer
              >
                <Form
                  name="trigger"
                  style={{ maxWidth: 600 }}
                  layout="vertical"
                  autoComplete="off"
                >
                  <Form.Item
                    hasFeedback
                    label="Time da casa"
                    name="home"
                    validateFirst
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Escolha um time.',
                      },
                    ]}
                  >
                    <Select
                      className="mt-2"
                      showSearch
                      placeholder="selecione um tipo"
                      onChange={(e) => {
                        setHomeId(e);
                      }}
                      allowClear
                    >
                      {teams.map((e) => {
                        return (
                          <Option key={e.id} value={`${e.id}*${e.name}`}>
                            {e.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    hasFeedback
                    label="Time da fora"
                    name="away"
                    validateFirst
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Escolha um time.',
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="selecione um tipo"
                      onChange={(e) => {
                        setAwayId(e);
                      }}
                      allowClear
                    >
                      {teams.map((e) => {
                        return (
                          <Option key={e.id} value={`${e.id}*${e.name}`}>
                            {e.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    hasFeedback
                    label="Liga"
                    name="league"
                    validateFirst
                  >
                    <Select
                      showSearch
                      placeholder="selecione uma liga"
                      onChange={(e) => {
                        setCreateLeague(e);
                      }}
                      allowClear
                    >
                      {leagues.map((e) => {
                        return (
                          <Option key={e.id} value={`${e.id}*${e.name}`}>
                            {e.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    hasFeedback
                    label="Rodada"
                    name="round"
                    validateFirst
                  >
                    <InputNumber
                      min={1}
                      placeholder="Rodada"
                      value={1}
                      onChange={(e) => {}}
                    />
                  </Form.Item>
                  <div className="flex">
                    <Form.Item
                      hasFeedback
                      label="Data"
                      name="startDate"
                      validateFirst
                      required
                      rules={[
                        {
                          required: true,
                          message: 'Escolha uma data.',
                        },
                      ]}
                    >
                      <DatePicker onChange={(e) => {}} />
                    </Form.Item>
                    <Form.Item
                      hasFeedback
                      label="Horário"
                      name="startHour"
                      validateFirst
                      required
                      rules={[
                        {
                          required: true,
                          message: 'Escolha um horário.',
                        },
                      ]}
                    >
                      <TimePicker onChange={(e) => {}} />
                    </Form.Item>
                  </div>
                </Form>
              </Modal>
            </>
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
