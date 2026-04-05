import { useState } from 'react';
import AppShell from './layouts/AppShell';
import Dashboard from './views/Dashboard';
import Discover from './views/Discover';
import PlaceholderPage from './views/PlaceholderPage';

export type ViewState =
  | 'dashboard'
  | 'discover'
  | 'investments'
  | 'wallet'
  | 'yields'
  | 'kyc'
  | 'messages'
  | 'profile'
  | 'create-dao';

export type DummyUser = {
  email: string;
  wallet?: string;
};

const dummyUser: DummyUser = {
  email: 'investor@example.com',
  wallet: '0xdemo0000000000000000000000000000000001',
};

function App() {
  const [view, setView] = useState<ViewState>('dashboard');

  const content = (() => {
    switch (view) {
      case 'dashboard':
        return <Dashboard onViewChange={setView} user={dummyUser} />;
      case 'discover':
        return <Discover />;
      case 'investments':
        return (
          <PlaceholderPage
            title="Neighborhoods"
            description="Dummy portfolio of place-based DAO investments. No wallet or contracts are connected."
          />
        );
      case 'wallet':
        return (
          <PlaceholderPage
            title="My Wallet"
            description="Dummy balances and linked accounts. Deploy a real build to connect a wallet."
          />
        );
      case 'yields':
        return (
          <PlaceholderPage
            title="Yields"
            description="Dummy yield and claim history for preview only."
          />
        );
      case 'kyc':
        return (
          <PlaceholderPage
            title="KYC / Admin"
            description="Dummy verification and admin tools. No data is submitted."
          />
        );
      case 'messages':
        return (
          <PlaceholderPage
            title="Messages"
            description="Dummy DAO chat preview. No realtime channel is connected."
          />
        );
      case 'profile':
        return (
          <PlaceholderPage
            title="Profile"
            description="Dummy profile and preferences."
          />
        );
      case 'create-dao':
        return (
          <PlaceholderPage
            title="Create DAO"
            description="Dummy flow for launching a neighborhood DAO. No deployment occurs here."
          />
        );
      default:
        return <Dashboard onViewChange={setView} user={dummyUser} />;
    }
  })();

  return (
    <AppShell currentView={view} onViewChange={setView} user={dummyUser}>
      {content}
    </AppShell>
  );
}

export default App;
