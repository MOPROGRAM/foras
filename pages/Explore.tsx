import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { OpportunityType } from '../types';
import OpportunityCard from '../components/OpportunityCard';
import AIAdvisor from '../components/AIAdvisor';
import { useApp } from '../contexts/AppContext';

const Explore: React.FC = () => {
  const { t, opportunities, language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState('');

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            opp.organization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || opp.type === selectedCategory;
      const matchesLocation = !selectedLocation || opp.location.includes(selectedLocation);
      
      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [searchTerm, selectedCategory, selectedLocation, opportunities]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header & Search */}
      <div className="bg-white border-b border-slate-200 pt-8 pb-6 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">{t('navExplore')}</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <div className={`absolute top-3.5 text-slate-400 ${language === 'ar' ? 'right-4' : 'left-4'}`}>
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder={t('searchPlaceholder')}
                className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-3 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all ${language === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="md:w-64 relative">
               <div className={`absolute top-3.5 text-slate-400 ${language === 'ar' ? 'right-4' : 'left-4'}`}>
                <MapPin size={20} />
              </div>
              <select 
                className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-3 focus:ring-2 focus:ring-primary-500 focus:outline-none appearance-none cursor-pointer ${language === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">{t('allLocations')}</option>
                <option value="الرياض">الرياض</option>
                <option value="جدة">جدة</option>
                <option value="دبي">دبي</option>
                <option value="عن بعد">عن بعد</option>
              </select>
            </div>
          </div>

          {/* Categories Tabs */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t(cat.key as any)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-slate-800">
            {filteredOpportunities.length} {t('categoryAll')}
          </h2>
          <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-primary-600">
            <Filter size={16} />
            {t('filterResults')}
          </button>
        </div>

        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map(opp => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t('noResults')}</h3>
          </div>
        )}
      </div>

      <AIAdvisor />
    </div>
  );
};

export default Explore;