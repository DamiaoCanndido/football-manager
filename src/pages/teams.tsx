import { useState, useEffect, FormEvent } from 'react';
import { api } from '../lib/axios';
import { Navbar } from '@/components/main/navbar';
import { Menu } from '@/components/main/menu';
import { TeamCard } from '@/components/cards/team-card';
import { Searching } from '@/components/ui/searching';
import { Button, Form, Input, Modal, Select } from 'antd';

const { Option } = Select;

export interface ITeam {
  id: string;
  name: string;
  code: string;
  type: string;
  logo: string;
}

export function Teams() {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [select, setSelect] = useState('');
  const [searchName, setSearchName] = useState('');

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [type, setType] = useState('');
  const [logo, setLogo] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const resetFields = () => {
    setName('');
    setCode('');
    setType('');
    setLogo('');
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

  const handleSubmit = async () => {
    try {
      await api.post(`/team`, {
        name,
        code,
        type,
        logo,
      });
      api.get(`/team`).then((response) => {
        setTeams(response.data);
      });
      Modal.success({
        title: 'Criado',
        content: `Time criado.`,
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

  function getSearch(event: FormEvent) {
    event.preventDefault();
    api.get(`/team?name=${searchName}`).then((response) => {
      setTeams(response.data);
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
                setSelect(e);
              }}
              allowClear
            >
              <Option value="">Todos</Option>
              <Option value="club">Clube</Option>
              <Option value="selection">Seleção</Option>
              <Option value="amateur">Amador</Option>
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
                title="Criar novo time:"
                centered
                open={isModalOpen}
                onOk={handleSubmit}
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
                        min: 3,
                        message: 'Digite um nome com 3 caracteres no mínimo.',
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
                    label="Código"
                    name="code"
                    validateFirst
                    required
                    rules={[
                      {
                        len: 3,
                        message: 'Digite um código com 3 caracteres.',
                      },
                      {
                        required: true,
                        message: 'Digite um codigo válido',
                      },
                    ]}
                  >
                    <Input
                      placeholder="Código"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
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
                      <Option value="club">Clube</Option>
                      <Option value="selection">Seleção</Option>
                      <Option value="amateur">Amador</Option>
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
