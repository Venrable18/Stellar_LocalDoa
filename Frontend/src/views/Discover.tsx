import React, { useMemo, useState } from 'react';
import { Filter, MapPin, Search, Users } from 'lucide-react';
import { Card } from '../components/UI';

type DiscoverDao = {
  name: string;
  location: string;
  description: string;
  tvl: string;
  members: number;
  tags: string[];
};

const DAOS: DiscoverDao[] = [
  {
    name: 'Downtown Community DAO',
    location: 'New York',
    description: 'Revitalizing shared spaces and small-business corridors downtown.',
    tvl: '$150,000',
    members: 45,
    tags: ['Urban', 'Retail'],
  },
  {
    name: 'Suburban Green DAO',
    location: 'California',
    description: 'Green infrastructure and walkable paths in established neighborhoods.',
    tvl: '$75,000',
    members: 32,
    tags: ['Green', 'Paths'],
  },
  {
    name: 'Riverside Collective',
    location: 'Texas',
    description: 'Waterfront access and flood-resilient public amenities.',
    tvl: '$92,000',
    members: 28,
    tags: ['Water', 'Resilience'],
  },
  {
    name: 'Harborfront DAO',
    location: 'Washington',
    description: 'Mixed-use pier development with community oversight.',
    tvl: '$210,000',
    members: 61,
    tags: ['Mixed-use', 'Harbor'],
  },
];

const Discover: React.FC = () => {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    DAOS.forEach((d) => d.tags.forEach((t) => s.add(t)));
    return [...s].sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DAOS.filter((d) => {
      const matchesQ =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q);
      const matchesTag = !tag || d.tags.includes(tag);
      return matchesQ && matchesTag;
    });
  }, [query, tag]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Discover DAOs</h1>
        <p className="text-slate-500 mt-1">Static sample neighborhoods for the demo deployment.</p>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, city, or topic…"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Filter className="w-4 h-4" />
            <span className="font-bold text-slate-700">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTag(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                tag === null ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              All
            </button>
            {allTags.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setTag(t === tag ? null : t)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                  tag === t ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((dao) => (
          <Card key={dao.name} className="p-6 flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{dao.name}</h2>
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                {dao.location}
              </p>
            </div>
            <p className="text-sm text-slate-600 flex-grow">{dao.description}</p>
            <div className="flex flex-wrap gap-2">
              {dao.tags.map((t) => (
                <span key={t} className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-sm">
              <span className="font-bold text-slate-900">{dao.tvl} TVL</span>
              <span className="text-slate-500 flex items-center gap-1">
                <Users className="w-4 h-4" />
                {dao.members} members
              </span>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 text-sm py-12">No DAOs match those filters.</p>
      )}
    </div>
  );
};

export default Discover;
