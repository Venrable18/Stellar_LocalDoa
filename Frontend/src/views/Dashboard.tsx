import React, { useMemo, useState } from 'react';
import { Coins, Plus, Search, ShieldCheck, Users, Wallet } from 'lucide-react';
import type { DummyUser, ViewState } from '../App';
import { Card } from '../components/UI';

type DaoRow = {
  address: string;
  name: string;
  location: string;
  tvlRaw: bigint;
  tvlFormatted: string;
};

type InvestmentRow = {
  id: string;
  daoAddress: string;
  daoName: string;
  name: string;
  status: number;
};

type YieldRow = {
  totalYield: bigint;
};

const dummyDaos: DaoRow[] = [
  { address: '0x123', name: 'Downtown DAO', location: 'New York', tvlRaw: 100000n, tvlFormatted: '$100,000' },
  { address: '0x456', name: 'Suburb DAO', location: 'California', tvlRaw: 50000n, tvlFormatted: '$50,000' },
  { address: '0x789', name: 'Urban DAO', location: 'Texas', tvlRaw: 75000n, tvlFormatted: '$75,000' },
];

const dummyInvestments: InvestmentRow[] = [
  { id: '1', daoAddress: '0x123', daoName: 'Downtown DAO', name: 'Park Renovation', status: 0 },
  { id: '2', daoAddress: '0x456', daoName: 'Suburb DAO', name: 'Community Garden', status: 0 },
];

const dummyYields: YieldRow[] = [{ totalYield: 5000n }, { totalYield: 3000n }];

const formatUsdcAmount = (amount: bigint): string => `$${amount.toString()}`;

const statusLabel = (status: number): string => (status === 0 ? 'Pending' : 'Active');

interface DashboardProps {
  onViewChange: (view: ViewState) => void;
  user: DummyUser;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange, user }) => {
  const [daos] = useState(dummyDaos);
  const [investments] = useState(dummyInvestments);
  const [yields] = useState(dummyYields);
  const [daoPage, setDaoPage] = useState(1);
  const [proposalPage, setProposalPage] = useState(1);
  const PAGE_SIZE = 5;

  const totals = useMemo(() => {
    const totalTvl = daos.reduce((sum, dao) => sum + dao.tvlRaw, 0n);
    const totalYield = yields.reduce((sum, row) => sum + row.totalYield, 0n);
    const proposed = investments.filter((inv) => inv.status === 0);
    return { totalTvl, totalYield, proposed };
  }, [daos, investments, yields]);

  const pagedDaos = useMemo(() => {
    const start = (daoPage - 1) * PAGE_SIZE;
    return daos.slice(start, start + PAGE_SIZE);
  }, [daos, daoPage]);

  const pagedProposals = useMemo(() => {
    const start = (proposalPage - 1) * PAGE_SIZE;
    return totals.proposed.slice(start, start + PAGE_SIZE);
  }, [totals.proposed, proposalPage]);

  const daoPages = Math.max(1, Math.ceil(daos.length / PAGE_SIZE));
  const proposalPages = Math.max(1, Math.ceil(totals.proposed.length / PAGE_SIZE));

  const firstName = user.email.split('@')[0] ?? 'Investor';

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, {firstName}.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onViewChange('discover')}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
          >
            <Search className="w-4 h-4" />
            Discover
          </button>
          <button
            type="button"
            onClick={() => onViewChange('kyc')}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            KYC / Admin
          </button>
          <button
            type="button"
            onClick={() => onViewChange('create-dao')}
            className="px-4 py-2 navy-bg text-white rounded-xl text-sm font-bold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create DAO
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6">
          <Wallet className="w-5 h-5 text-blue-600 mb-3" />
          <p className="text-slate-500 text-sm">Total TVL</p>
          <h3 className="text-2xl font-bold">{formatUsdcAmount(totals.totalTvl)}</h3>
        </Card>
        <Card className="p-6">
          <Coins className="w-5 h-5 text-emerald-600 mb-3" />
          <p className="text-slate-500 text-sm">Total Yield Generated</p>
          <h3 className="text-2xl font-bold">{formatUsdcAmount(totals.totalYield)}</h3>
        </Card>
        <Card className="p-6">
          <Users className="w-5 h-5 text-purple-600 mb-3" />
          <p className="text-slate-500 text-sm">Active DAOs</p>
          <h3 className="text-2xl font-bold">{daos.length}</h3>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-slate-900">Active DAOs</h2>
            <p className="text-xs text-slate-500">{daos.length} total</p>
          </div>
          {daos.length === 0 ? (
            <p className="text-slate-500 text-sm">No DAO deployed yet.</p>
          ) : (
            <>
              <div className="max-h-96 overflow-y-auto pr-1 space-y-3">
                {pagedDaos.map((dao) => (
                  <div key={dao.address} className="p-4 border border-slate-200 rounded-xl">
                    <p className="font-bold text-slate-900">{dao.name}</p>
                    <p className="text-xs text-slate-500">{dao.location}</p>
                    <p className="text-xs text-slate-500 mt-1">TVL: {dao.tvlFormatted}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDaoPage((p) => Math.max(1, p - 1))}
                  disabled={daoPage <= 1}
                  className="px-3 py-1.5 text-xs font-bold border border-slate-200 rounded-lg disabled:opacity-50"
                >
                  Prev
                </button>
                <p className="text-xs text-slate-500">
                  Page {daoPage} / {daoPages}
                </p>
                <button
                  type="button"
                  onClick={() => setDaoPage((p) => Math.min(daoPages, p + 1))}
                  disabled={daoPage >= daoPages}
                  className="px-3 py-1.5 text-xs font-bold border border-slate-200 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-slate-900">Proposals Needing Votes</h2>
            <p className="text-xs text-slate-500">{totals.proposed.length} total</p>
          </div>
          {totals.proposed.length === 0 ? (
            <p className="text-slate-500 text-sm">No pending proposals.</p>
          ) : (
            <>
              <div className="max-h-96 overflow-y-auto pr-1 space-y-3">
                {pagedProposals.map((proposal) => (
                  <div
                    key={`${proposal.daoAddress}-${proposal.id}`}
                    className="p-4 border border-slate-200 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-3"
                  >
                    <div>
                      <p className="font-bold text-slate-900">{proposal.name}</p>
                      <p className="text-xs text-slate-500">
                        {proposal.daoName} • {statusLabel(proposal.status)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onViewChange('investments')}
                      className="px-4 py-2 navy-bg text-white text-xs font-bold rounded-lg"
                    >
                      Vote
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setProposalPage((p) => Math.max(1, p - 1))}
                  disabled={proposalPage <= 1}
                  className="px-3 py-1.5 text-xs font-bold border border-slate-200 rounded-lg disabled:opacity-50"
                >
                  Prev
                </button>
                <p className="text-xs text-slate-500">
                  Page {proposalPage} / {proposalPages}
                </p>
                <button
                  type="button"
                  onClick={() => setProposalPage((p) => Math.min(proposalPages, p + 1))}
                  disabled={proposalPage >= proposalPages}
                  className="px-3 py-1.5 text-xs font-bold border border-slate-200 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
