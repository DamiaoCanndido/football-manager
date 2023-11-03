import { Navbar } from '@/components/main/navbar';
import { SideBar } from '@/components/main/sidebar';
import { GameCard } from '@/components/cards/game-card';
import { useEffect, useRef, useState } from 'react';
import { IGame } from '@/interfaces/game';
import { api } from '@/lib/axios';
import { Dayjs } from 'dayjs';
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
import { CreateButton } from '@/components/ui/create-button';

const { Option } = Select;

export function Games() {
  const [games, setGames] = useState<IGame[]>([]);
  const [game, setGame] = useState<IGame | undefined>(undefined);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [leagues, setLeagues] = useState<ILeague[]>([]);
  const [selectLeagues, setSelectLeagues] = useState('');
  const [rounds, setRounds] = useState<string[] | undefined>([]);
  const [selectRounds, setSelectRounds] = useState('');

  const [homeId, setHomeId] = useState('');
  const [awayId, setAwayId] = useState('');
  const [createLeague, setCreateLeague] = useState<string | null>();
  const [createRound, setCreateRound] = useState(1);
  const [date, setDate] = useState<Dayjs | undefined>();
  const [hour, setHour] = useState<Dayjs | undefined>();

  const homeScore = useRef<HTMLInputElement | null>(null);
  const awayScore = useRef<HTMLInputElement | null>(null);
  const homePenalty = useRef<HTMLInputElement | null>(null);
  const awayPenalty = useRef<HTMLInputElement | null>(null);

  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

  const showScoreModal = () => {
    setIsScoreModalOpen(true);
  };

  const handleScoreOk = () => {
    setIsScoreModalOpen(false);
  };

  const handleScoreCancel = () => {
    setIsScoreModalOpen(false);
  };

  const resetFields = () => {
    setHomeId('');
    setAwayId('');
    setCreateLeague(null);
    setCreateRound(1);
    setDate(undefined);
    setHour(undefined);
  };

  const resetScoreFields = () => {
    homeScore.current?.defaultValue;
    awayScore.current?.defaultValue;
    homePenalty.current?.defaultValue;
    awayPenalty.current?.defaultValue;
  };

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
    api.get(`/team`).then((response) => {
      setTeams(response.data);
    });
    api.get(`/league`).then((response) => {
      setLeagues(response.data);
    });
  }, [games]);

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
        round = '?round=' + selectRounds;
      }
      api.get(`/fixtures/${selectLeagues}/league${round}`).then((response) => {
        setGames(response.data);
      });

      const element = leagues.find((e) => {
        return e.id === selectLeagues;
      });
      setRounds(element?.rounds);
    }
  }, [selectLeagues, selectRounds]);

  const handleSubmit = async () => {
    try {
      const day = date?.format().split('T')[0];
      const hours = hour?.format().split('T')[1]?.substring(0, 8);
      const startDate = day + 'T' + hours + 'Z';
      await api.post(`/fixtures`, {
        homeId: homeId.split('*')[0],
        awayId: awayId.split('*')[0],
        leagueId: createLeague ? createLeague!.split('*')[0] : null,
        round: createRound,
        startDate,
      });
      api.get(`/fixtures`).then((response) => {
        setGames(response.data);
      });
      Modal.success({
        title: 'Criado',
        content: `Jogo criado.`,
      });
      handleOk();
    } catch (error) {
      Modal.error({
        title: 'Erro',
        content: `Requisição inválida.`,
      });
    } finally {
      handleOk();
    }
  };

  const handleScoreSubmit = async () => {
    try {
      await api.put(`/fixtures/${game!.id}`, {
        homeScore: parseInt(homeScore.current!.value),
        awayScore: parseInt(awayScore.current!.value),
        homePenalty: parseInt(homePenalty.current!.value),
        awayPenalty: parseInt(awayPenalty.current!.value),
      });
      api.get(`/fixtures`).then((response) => {
        setGames(response.data);
      });
      Modal.success({
        title: 'Atualizado',
        content: `Placar atualizado.`,
      });
      handleScoreOk();
    } catch (error) {
      Modal.error({
        title: 'Erro',
        content: `Requisição inválida.`,
      });
    } finally {
      handleScoreOk();
    }
  };

  return (
    <div className="flex bg-white">
      <Navbar />
      <>
        <SideBar />
        <main className="px-4 w-full pt-4 mt-24 ml-44">
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
                placeholder="Selecione a rodada"
              >
                {rounds?.map((e) => {
                  return (
                    <Option key={e} value={e}>
                      {'Rodada ' + e}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <>
              <CreateButton showModal={showModal} />
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
                      onChange={(e) => {
                        setCreateRound(e!);
                      }}
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
                      <DatePicker
                        onChange={(e) => {
                          setDate(e!);
                        }}
                      />
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
                      <TimePicker
                        onChange={(e) => {
                          setHour(e!);
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="flex gap-2">
                    <Form.Item name="button">
                      <Button
                        onClick={handleSubmit}
                        className="bg-green-400"
                        type="primary"
                        htmlType="submit"
                      >
                        Criar
                      </Button>
                    </Form.Item>
                    <Form.Item name="button">
                      <Button
                        onClick={resetFields}
                        className="bg-orange-400"
                        type="primary"
                        htmlType="reset"
                      >
                        Apagar
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </Modal>
              <Modal
                title="Definir placar:"
                centered
                open={isScoreModalOpen}
                onOk={handleScoreOk}
                onCancel={handleScoreCancel}
                footer
              >
                <Form
                  name="setScore"
                  style={{ maxWidth: 600 }}
                  layout="vertical"
                  autoComplete="off"
                >
                  <div className="flex gap-6">
                    <Form.Item
                      hasFeedback
                      label={game?.home.code}
                      name="homeScore"
                      validateFirst
                      required
                      rules={[
                        {
                          required: true,
                          message: 'Digite um placar válido.',
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Placar"
                        min={0}
                        ref={homeScore}
                      />
                    </Form.Item>
                    <Form.Item
                      hasFeedback
                      label="pênaltis"
                      name="homePenalty"
                      validateFirst
                    >
                      <InputNumber
                        placeholder="Placar"
                        min={0}
                        ref={homePenalty}
                      />
                    </Form.Item>
                  </div>
                  <div className="flex gap-6">
                    <Form.Item
                      hasFeedback
                      label={game?.away.code}
                      name="awayScore"
                      validateFirst
                      required
                      rules={[
                        {
                          required: true,
                          message: 'Digite um placar válido.',
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Placar"
                        min={0}
                        ref={awayScore}
                      />
                    </Form.Item>
                    <Form.Item
                      hasFeedback
                      label="pênaltis"
                      name="awayPenalty"
                      validateFirst
                    >
                      <InputNumber
                        placeholder="Placar"
                        min={0}
                        ref={awayPenalty}
                      />
                    </Form.Item>
                  </div>

                  <div className="flex gap-2">
                    <Form.Item name="button">
                      <Button
                        onClick={handleScoreSubmit}
                        className="bg-green-400"
                        type="primary"
                        htmlType="submit"
                      >
                        Definir
                      </Button>
                    </Form.Item>
                    <Form.Item name="button">
                      <Button
                        onClick={resetScoreFields}
                        className="bg-orange-400"
                        type="primary"
                        htmlType="reset"
                      >
                        Apagar
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </Modal>
            </>
          </div>
          <div className="flex flex-col items-center">
            {games.map((e) => {
              return (
                <GameCard
                  key={e.id}
                  items={e}
                  showScoreModal={showScoreModal}
                  getGame={() => {
                    setGame(e);
                  }}
                />
              );
            })}
          </div>
        </main>
      </>
    </div>
  );
}
