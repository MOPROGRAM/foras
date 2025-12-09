import React from 'react';
import { MapPin, Clock, ArrowLeft, ArrowRight, Building2, Briefcase } from 'lucide-react';
import { Opportunity } from '../types';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const { t, getTypeLabel, dir } = useApp();
  
  // Generate a consistent color based on the ID
  const colors = [
    'from-blue-500 to-cyan-400',
    'from-purple-500 to-indigo-400',
    'from-emerald-500 to-teal-400',
    'from-orange-500 to-amber-400',
    'from-pink-500 to-rose-400'
  ];
  const colorIndex = parseInt(opportunity.id.replace(/\D/g, '') || '0') % colors.length;
  const gradientClass = colors[colorIndex];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group flex flex-col h-full">
      <div className={`h-32 bg-gradient-to-br ${gradientClass} relative p-6 flex flex-col justify-between`}>
        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm border border-white/20">
          {getTypeLabel(opportunity.type)}
        </div>
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-slate-700 shadow-lg">
          <Building2 size={24} />
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <div>
             <h3 className="font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
              {opportunity.title}
            </h3>
            <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
              <Briefcase size={14} />
              <span>{opportunity.organization}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-slate-400" />
            {opportunity.location}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-slate-400" />
            {opportunity.postedAt}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {opportunity.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
          <span className="text-primary-600 font-bold text-sm">
             {opportunity.salary ? opportunity.salary : t('details')}
          </span>
          <Link 
            to={`/opportunity/${opportunity.id}`}
            className="text-slate-400 hover:text-primary-600 hover:bg-primary-50 p-2 rounded-full transition-all"
          >
            {dir === 'rtl' ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;