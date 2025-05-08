import React from 'react';
import { AppRoot, Tabbar } from '@telegram-apps/telegram-ui';
import { Store } from './components/Store/Store';
import { Steps } from './components/Steps/Steps';
import { Config } from './components/Config/Config';
//import { NotInTelegramWarning } from './components/NotInTelegramWarning/NotInTelegramWarning';
//import { getTelegramData } from '@telegram-apps/telegram-ui/dist/helpers/telegram';
import { Settings, ShoppingBag } from 'lucide-react';
import { useAppStore } from './stores/useAppStore';

export const App = () => {
  const { stage, tab, setStage, setTab, checkInitialization } = useAppStore();
  //const telegramData = getTelegramData();
  React.useEffect(() => {
    checkInitialization();
  }, [checkInitialization]);

  // if (!telegramData?.initData) {
  //   return <NotInTelegramWarning />;
  // }

  if (stage === 'register') {
    return <Steps onComplete={() => setStage('app')} />;
  }

  return (
    <AppRoot>
      {tab === 'store' && <Store />}
      {tab === 'config' && <Config />}

      <Tabbar className="tabbar">
        <Tabbar.Item
          text="Магазин"
          selected={tab === 'store'}
          onClick={() => setTab('store')}
        >
          <ShoppingBag />
        </Tabbar.Item>
        <Tabbar.Item
          text="Настройки"
          selected={tab === 'config'}
          onClick={() => setTab('config')}
        >
          <Settings />
        </Tabbar.Item>
      </Tabbar>
    </AppRoot>
  );
};