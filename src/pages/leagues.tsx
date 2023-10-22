import { Navbar } from '@/components/main/navbar';
import { Menu } from '@/components/main/menu';
import { LeagueCard } from '@/components/cards/league-card';
import { FormEvent, useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import { Searching } from '@/components/ui/searching';
import { ILeague } from '@/interfaces/league';
import { ITeam } from '@/interfaces/team';
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';

const { Option } = Select;

export function Leagues() {
  const [leagues, setLeagues] = useState<ILeague[]>([]);
  const [country, setCountry] = useState<ITeam[]>([]);
  const [countrySearchSelect, setCountrySearchSelect] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [season, setSeason] = useState('');
  const [type, setType] = useState('');
  const [logo, setLogo] = useState('');
  const [numberOfRounds, setNumberOfRounds] = useState(1);
  const [countryId, setCountryId] = useState<string | null>(null);

  const resetFields = () => {
    setName('');
    setSeason('');
    setType('');
    setLogo('');
    setNumberOfRounds(1);
    setCountryId('');
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    api.get(`/team?type=selection`).then((response) => {
      setCountry(response.data);
    });

    if (countrySearchSelect === '') {
      api.get(`/league`).then((response) => {
        setLeagues(response.data);
      });
    } else {
      api.get(`/league/${countrySearchSelect}/country`).then((response) => {
        setLeagues(response.data);
      });
    }
  }, [countrySearchSelect]);

  const handleSubmit = async () => {
    try {
      await api.post(`/league`, {
        name,
        season,
        type,
        logo,
        numberOfRounds,
        countryId,
      });
      api.get(`/league`).then((response) => {
        setLeagues(response.data);
      });
      Modal.success({
        title: 'Criado',
        content: `Liga criada.`,
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
              id="type"
              onChange={(e) => {
                setCountrySearchSelect(e);
                setCountryId(e);
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
            <>
              <Button className="bg-green-400 text-white" onClick={showModal}>
                Criar
              </Button>
              <Modal
                title="Criar nova liga:"
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
                    label="Nome"
                    name="name"
                    validateFirst
                    required
                    rules={[
                      {
                        min: 5,
                        message: 'Digite um nome com 5 caracteres no mínimo.',
                      },
                      {
                        required: true,
                        message: 'Digite um nome válido',
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    hasFeedback
                    label="Temporada"
                    name="season"
                    validateFirst
                    required
                    rules={[
                      {
                        min: 9,
                        message:
                          'Digite o início e fim da temporada separado por /',
                      },
                      {
                        required: true,
                        message: 'Digite a temporada válida',
                      },
                    ]}
                  >
                    <Input
                      placeholder="Temporada"
                      value={season}
                      onChange={(e) => setSeason(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    name="type"
                    label="Tipo"
                    rules={[
                      {
                        required: true,
                        message: 'Escolha o tipo de time',
                      },
                    ]}
                  >
                    <Select
                      placeholder="selecione um tipo"
                      onChange={(e) => {
                        setType(e);
                      }}
                      allowClear
                    >
                      <Option value="league">Liga</Option>
                      <Option value="cup">Copa</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    hasFeedback
                    label="Logo"
                    name="logo"
                    validateFirst
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Cole um url válida',
                      },
                      {
                        type: 'url',
                        message: 'Url inválida',
                      },
                    ]}
                  >
                    <Input
                      placeholder="copie a url da imagem"
                      value={logo}
                      onChange={(e) => setLogo(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    hasFeedback
                    label="Número de rodadas"
                    name="numberOfRounds"
                    validateFirst
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Digite um número válido.',
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Número de rodadas"
                      value={numberOfRounds}
                      onChange={(e) => setNumberOfRounds(e!)}
                    />
                  </Form.Item>
                  <Form.Item hasFeedback label="País" name="country">
                    <Select
                      className="w-40"
                      allowClear
                      id="country"
                      onChange={(e) => {
                        setCountryId(e);
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
                  </Form.Item>

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
            </>
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
