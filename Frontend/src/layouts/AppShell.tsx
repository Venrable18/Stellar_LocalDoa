import React, { useMemo, useState } from 'react';
import {
  Bell,
  CheckCircle,
  Coins,
  Compass,
  Globe,
  House,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Shield,
  User,
  UserPlus,
  Wallet,
  X,
} from 'lucide-react';
import type { DummyUser, ViewState } from '../App';
import { Button, Modal } from '../components/UI';

const SEARCH_DAOS: Array<{ name: string; location: string }> = [
  { name: 'Downtown Community DAO', location: 'New York' },
  { name: 'Suburban Green DAO', location: 'California' },
  { name: 'Riverside Collective', location: 'Texas' },
  { name: 'Harborfront DAO', location: 'Washington' },
];

const DUMMY_NOTIFICATIONS: Array<{ id: string; title: string; subtitle: string; view: ViewState }> = [
  {
    id: '1',
    title: 'Vote needed: Park renovation',
    subtitle: 'Downtown Community DAO • Pending',
    view: 'investments',
  },
  {
    id: '2',
    title: 'Claim available: Q1 yield',
    subtitle: 'Suburban Green DAO • Demo',
    view: 'yields',
  },
];

interface AppShellProps {
  children: React.ReactNode;
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  user: DummyUser;
}

const AppShell: React.FC<AppShellProps> = ({ children, currentView, onViewChange, user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const unreadMessages = 2;

  const navItems = useMemo(
    () => [
      { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
      { id: 'discover' as const, label: 'Discover DAOs', icon: Compass },
      { id: 'investments' as const, label: 'Neighborhoods', icon: House },
      { id: 'wallet' as const, label: 'My Wallet', icon: Wallet },
      { id: 'yields' as const, label: 'Yields', icon: Coins },
      { id: 'kyc' as const, label: 'KYC / Admin', icon: UserPlus },
      {
        id: 'messages' as const,
        label: 'Messages',
        icon: MessageSquare,
        badge: unreadMessages > 0 ? unreadMessages : undefined,
      },
      { id: 'profile' as const, label: 'Profile', icon: User },
    ],
    [],
  );

  const filteredSearchDaos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_DAOS.filter(
      (dao) => dao.name.toLowerCase().includes(q) || dao.location.toLowerCase().includes(q),
    ).slice(0, 6);
  }, [searchQuery]);

  const submitSearch = () => {
    if (!searchQuery.trim()) return;
    onViewChange('discover');
    setIsSearchOpen(false);
  };

  const shortWallet = user.wallet
    ? `${user.wallet.slice(0, 6)}…${user.wallet.slice(-4)}`
    : 'No wallet';

  const NavLink = ({ item }: { item: (typeof navItems)[0] }) => {
    const isActive = currentView === item.id;
    const Icon = item.icon;
    return (
      <button
        type="button"
        onClick={() => {
          onViewChange(item.id);
          setIsSidebarOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          isActive
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 font-semibold'
            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
        }`}
      >
        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
        <span className="flex-grow text-left text-sm">{item.label}</span>
        {item.badge !== undefined && (
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              isActive ? 'bg-white text-emerald-600' : 'bg-red-500 text-white'
            }`}
          >
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex">
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 sticky top-0 h-screen p-6 overflow-y-auto">
        <button
          type="button"
          className="flex items-center gap-2 mb-10 cursor-pointer text-left"
          onClick={() => onViewChange('dashboard')}
        >
          <div className="navy-bg p-1.5 rounded-lg">
            <Shield className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">LocalDAO</span>
        </button>

        <nav className="flex-grow space-y-2">
          {navItems.map((item) => (
            <NavLink key={item.id} item={item} />
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
          <div className="w-full flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-bold">Member Onboarding</span>
            </div>
            <span className="text-[10px] font-bold uppercase">Demo</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Globe className="w-3 h-3 text-emerald-500" />
              Demo network
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">{user.email}</p>
                <p className="text-[10px] text-slate-500 font-mono">{shortWallet}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center justify-center gap-2 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-xs font-bold">Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-grow flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4 lg:hidden">
            <button type="button" onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-grow max-w-xl mx-4 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search properties or DAOs…"
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => setTimeout(() => setIsSearchOpen(false), 150)}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    submitSearch();
                  }
                }}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              {isSearchOpen && searchQuery.trim() && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  {filteredSearchDaos.length === 0 ? (
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={submitSearch}
                      className="w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
                    >
                      Search Discover for “{searchQuery.trim()}”
                    </button>
                  ) : (
                    <>
                      {filteredSearchDaos.map((dao) => (
                        <button
                          type="button"
                          key={dao.name}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            onViewChange('discover');
                            setIsSearchOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b last:border-b-0 border-slate-100"
                        >
                          <p className="text-sm font-bold text-slate-900">{dao.name}</p>
                          <p className="text-xs text-slate-500">{dao.location}</p>
                        </button>
                      ))}
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={submitSearch}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50"
                      >
                        View all results in Discover
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotificationsOpen((c) => !c)}
                className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl z-50">
                  <div className="p-3 border-b border-slate-100">
                    <p className="text-sm font-bold text-slate-900">Notifications</p>
                    <p className="text-[10px] text-slate-500 mt-1">Static demo items</p>
                  </div>
                  <div className="p-2">
                    {DUMMY_NOTIFICATIONS.map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => {
                          onViewChange(item.view);
                          setIsNotificationsOpen(false);
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-slate-50"
                      >
                        <p className="text-sm font-bold text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.subtitle}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />
            <button
              type="button"
              className="hidden sm:flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-full border border-slate-200"
              onClick={() => onViewChange('wallet')}
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-xs font-mono text-slate-600">{shortWallet}</span>
            </button>
          </div>
        </header>

        <main className="flex-grow overflow-auto p-4 lg:p-8">{children}</main>

        <nav className="lg:hidden h-16 bg-white border-t border-slate-200 flex items-center justify-around px-2">
          {navItems.slice(0, 5).map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex flex-col items-center gap-1 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-[10px] font-medium">{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm w-full h-full border-0 cursor-default"
            aria-label="Close menu"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="navy-bg p-1.5 rounded-lg">
                  <Shield className="text-white w-5 h-5" />
                </div>
                <span className="font-bold text-xl text-slate-900">LocalDAO</span>
              </div>
              <button type="button" onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <NavLink key={item.id} item={item} />
              ))}
            </nav>
            <button
              type="button"
              onClick={() => setShowLogoutConfirm(true)}
              className="mt-auto w-full flex items-center justify-center gap-2 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-100"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-xs font-bold">Logout</span>
            </button>
          </div>
        </div>
      )}

      <Modal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        title="Confirm Logout"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowLogoutConfirm(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setShowLogoutConfirm(false)}>
              OK
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">This is a static demo — nothing is signed out.</p>
      </Modal>
    </div>
  );
};

export default AppShell;
