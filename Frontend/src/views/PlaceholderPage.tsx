import React from 'react';
import { Card } from '../components/UI';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => (
  <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
    <h1 className="text-2xl font-bold text-slate-900 mb-2">{title}</h1>
    <p className="text-slate-500 mb-8">{description}</p>
    <Card className="p-8">
      <p className="text-slate-600 text-sm leading-relaxed">
        This screen is intentionally minimal: it exists so navigation, layout, and Vercel deployment can be exercised
        without wallets, contracts, or backends. Replace this component with your production view when you are ready.
      </p>
    </Card>
  </div>
);

export default PlaceholderPage;
