import React, { useEffect, useState } from 'react';
import {
  AppRoot,
  List,
  Section,
  Input,
  Banner,
  Image,
  Modal,
  Blockquote,
  Title,
  Spinner,
  Placeholder,
  InlineButtons
} from '@telegram-apps/telegram-ui';
import { Download, Trash2, Share2 } from 'lucide-react';


type ModuleMeta = {
  pic: string | null;
  banner: string | null;
  developer: string;
};

type ModuleCommand = Record<string, string>;

type ModuleData = {
  name: string;
  description: string;
  meta: ModuleMeta;
  commands: ModuleCommand[];
  category: string[];
};

export const Store = () => {
  const [modules, setModules] = useState<Record<string, ModuleData>>({});
  const [filteredModules, setFilteredModules] = useState<[string, ModuleData][]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModuleKey, setSelectedModuleKey] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [installed, setInstalled] = useState(false);

  const handleToggleInstall = () => {
    setInstalled(!installed);
  };

  const handleShare = () => {
    alert(`Ссылка на модуль скопирована!`);
  };

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/MuRuLOSE/limoka-mirror/refs/heads/main/modules.json')
      .then((res) => res.json())
      .then((data) => {
        setModules(data);
        setFilteredModules(Object.entries(data));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке модулей:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = Object.entries(modules).filter(
      ([, mod]) =>
        mod.name?.toLowerCase().includes(query) ||
        mod.description?.toLowerCase().includes(query)
    );
    setFilteredModules(filtered);
  };

  const handleModuleClick = (key: string) => {
    setSelectedModuleKey(key);
    setModalOpen(true);
  };

  const selectedModule = selectedModuleKey ? modules[selectedModuleKey] : null;

  return (
    <AppRoot>
      <List>
        <Section header="Поиск модулей">
          <Input
            placeholder="Поиск по названию или описанию"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Section>

        {loading ? (
          <Section>
            <Spinner size='l' />
          </Section>
        ) : (
          <Section header="Список модулей">
            {filteredModules.map(([key, mod]) => (
              <Banner
                key={key}
                before={
                  mod.meta?.pic ? (
                    <Image src={mod.meta.pic} size={48} />
                  ) : (
                    <Image size={48} />
                  )
                }
                type="section"
                header={mod.name}
                subheader={mod.description}
                onClick={() => handleModuleClick(key)}
              />
            ))}
          </Section>
        )}
      </List>

      {selectedModule && (
        <Modal
          open={modalOpen}
          onOpenChange={(open) => setModalOpen(open)}
          header={<Modal.Header />}
          className='modal'
        >
          <Placeholder>
            <Blockquote type="text">
                <Title level="2" style={{ marginBottom: '12px' }}>
                    {selectedModule.name} by {selectedModule.meta?.developer}
                </Title>
                <p>{selectedModule.description}</p>
                <ul style={{ paddingLeft: '20px' }}>
                    {selectedModule.commands?.map((cmd, idx) => (
                    <li key={idx}>
                        {Object.entries(cmd).map(([command, desc]) => (
                        <div key={command}>
                            <code>{command}</code> {desc}
                        </div>
                        ))}
                    </li>
                    ))}
                </ul>
                {selectedModule.meta?.banner && (
                <img
                    alt="Баннер модуля"
                    src={selectedModule.meta.banner}
                    style={{
                    display: 'block',
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    }}
                />
                )}
            </Blockquote>
            <InlineButtons mode="bezeled">
              <InlineButtons.Item
                text={installed ? 'Удалить' : 'Установить'}
                mode={installed ? 'gray' : 'bezeled'}
                onClick={handleToggleInstall}
              >
                {installed ? <Trash2 size={20} /> : <Download size={20} />}
              </InlineButtons.Item>
              <InlineButtons.Item
                text="Поделиться"
                mode="plain"
                onClick={handleShare}
              >
                <Share2 size={20} />
              </InlineButtons.Item>
            </InlineButtons>
          </Placeholder>
        </Modal>
      )}
    </AppRoot>
  );
};
