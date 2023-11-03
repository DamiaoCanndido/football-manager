import { useState, useEffect, useRef } from 'react';
import { api } from '../lib/axios';
import { Navbar } from '@/components/main/navbar';
import { SideBar } from '@/components/main/sidebar';
import { TeamCard } from '@/components/cards/team-card';
import { Searching } from '@/components/ui/searching';
import { Button, Form, Input, Modal, Select, InputRef } from 'antd';
import { ITeam } from '@/interfaces/team';
import { SearchSelect } from '@/components/ui/search-select';
import { CreateButton } from '@/components/ui/create-button';

const { Option } = Select;

export function Teams() {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [select, setSelect] = useState('all');
  const searchName = useRef<InputRef | null>(null);

  const name = useRef<InputRef | null>(null);
  const code = useRef<InputRef | null>(null);
  const [type, setType] = useState('');
  const logo = useRef<InputRef | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const resetFields = () => {
    name.current?.input?.defaultValue;
    code.current?.input?.defaultValue;
    setType('');
    logo.current?.input?.defaultValue;
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
        name: name.current?.input?.value,
        code: code.current?.input?.value,
        type,
        logo: logo.current?.input?.value,
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
    if (select === 'all') {
      api.get(`/team`).then((response) => {
        setTeams(response.data);
      });
    } else {
      api.get(`/team?type=${select}`).then((response) => {
        setTeams(response.data);
      });
    }
  }, [select]);

  function getSearch() {
    const name = searchName.current?.input?.value;
    api.get(`/team?name=${name}`).then((response) => {
      setTeams(response.data);
    });
  }

  const selectOptions = [
    { all: 'Todos' },
    { club: 'Clube' },
    { selection: 'Seleção' },
    { amateur: 'Amador' },
  ];

  return (
    <div className="flex">
      <Navbar />
      <>
        <SideBar />
        <main className="px-4 w-full pt-4 mt-24 ml-44">
          <div className="flex justify-between p-4 items-center h-20 bg-gray-400 mb-4 rounded-xl">
            <SearchSelect options={selectOptions} setSelect={setSelect} />
            <Searching getSearch={getSearch} searchName={searchName} />
            <>
              <CreateButton showModal={showModal} />
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
                    <Input placeholder="Nome" ref={name} />
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
                    <Input placeholder="Código" ref={code} />
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
                    <Input placeholder="copie a url da imagem" ref={logo} />
                  </Form.Item>
                  <div className="flex gap-2">
                    <Form.Item name="submit">
                      <Button
                        onClick={handleSubmit}
                        className="bg-green-400"
                        type="primary"
                        htmlType="submit"
                      >
                        Criar
                      </Button>
                    </Form.Item>
                    <Form.Item name="reset">
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
