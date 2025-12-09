import React from 'react';
import { ArrowLeft, ArrowRight, Search, Users, Briefcase, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import OpportunityCard from '../components/OpportunityCard';
import AIAdvisor from '../components/AIAdvisor';
import { useApp } from '../contexts/AppContext';

const Home: React.FC = () => {
  const { t, opportunities, dir } = useApp();
  const featuredOpportunities = opportunities.slice(0, 3);
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50 to-white pt-20 pb-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
              {t('heroTitle')} <span className="text-primary-600 relative inline-block">
                {t('appTitle')}
                <svg className="absolute w-full h-3 -bottom-1 right-0 text-primary-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10">
              {t('heroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore" className="bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-500/30 flex items-center justify-center gap-2">
                {t('ctaExplore')}
                <ArrowIcon size={20} />
              </Link>
              <Link to="/explore" className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <Search size={20} />
                {t('ctaSearch')}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements - CSS only */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 border-b md:border-b-0 md:border-l rtl:md:border-l-0 rtl:md:border-r border-slate-100 pb-4 md:pb-0 md:pl-4 rtl:md:pl-0 rtl:md:pr-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <Briefcase size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">+5,000</p>
                <p className="text-slate-500 text-sm">{t('statsActive')}</p>
              </div>
            </div>
             <div className="flex items-center gap-4 border-b md:border-b-0 md:border-l rtl:md:border-l-0 rtl:md:border-r border-slate-100 pb-4 md:pb-0 md:pl-4 rtl:md:pl-0 rtl:md:pr-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">+120,000</p>
                <p className="text-slate-500 text-sm">{t('statsSeekers')}</p>
              </div>
            </div>
             <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <GraduationCap size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">+500</p>
                <p className="text-slate-500 text-sm">{t('statsOrgs')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t('ctaExplore')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
               <Link 
                to={`/explore?category=${cat.id}`} 
                key={cat.id} 
                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-primary-500 hover:shadow-md transition-all flex flex-col items-center gap-3 group"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                  <div className="font-bold text-lg">#</div>
                </div>
                <span className="font-medium text-slate-700 group-hover:text-primary-600">{t(cat.key as any)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{t('latestOpps')}</h2>
            </div>
            <Link to="/explore" className="text-primary-600 font-bold hover:underline flex items-center gap-1">
              {t('viewAll')} <ArrowIcon size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredOpportunities.map(opp => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        </div>
      </section>

      <AIAdvisor />
    </div>
  );
};

export default Home;