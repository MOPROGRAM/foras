
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, MapPin, Clock, Building2, Share2, Heart, Calendar, Mail, Phone, Send, CheckCircle2 } from 'lucide-react';
import AIAdvisor from '../components/AIAdvisor';
import { useApp } from '../contexts/AppContext';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, opportunities, getTypeLabel, dir, sendMessage } = useApp();
  const opportunity = opportunities.find(o => o.id === id);

  const [messageForm, setMessageForm] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [msgStatus, setMsgStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  if (!opportunity) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-bold">404</h2>
        <Link to="/explore" className="text-primary-600 underline">{t('ctaExplore')}</Link>
      </div>
    );
  }

  const BackIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsgStatus('sending');
    
    await sendMessage({
      id: Date.now().toString(),
      opportunityId: opportunity.id,
      opportunityTitle: opportunity.title,
      senderName: messageForm.name,
      senderEmail: messageForm.email,
      content: messageForm.content,
      timestamp: new Date().toISOString(),
      replies: []
    });

    setMsgStatus('sent');
    setMessageForm({ name: '', email: '', content: '' });
  };

  // Generate color
  const colors = [
    'from-blue-600 to-cyan-500',
    'from-purple-600 to-indigo-500',
    'from-emerald-600 to-teal-500',
    'from-orange-600 to-amber-500',
    'from-pink-600 to-rose-500'
  ];
  const colorIndex = parseInt(opportunity.id.replace(/\D/g, '') || '0') % colors.length;
  const gradientClass = colors[colorIndex];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header - No Image */}
      <div className={`h-64 w-full relative bg-gradient-to-r ${gradientClass} flex items-center`}>
        <div className="container mx-auto px-4">
          <Link to="/explore" className="absolute top-6 rtl:right-6 ltr:left-6 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-colors">
            <BackIcon size={24} />
          </Link>
          
          <div className="text-white pt-10">
             <span className="bg-white/20 backdrop-blur-sm border border-white/20 text-white px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">
              {getTypeLabel(opportunity.type)}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{opportunity.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Building2 size={20} />
                <span className="font-semibold">{opportunity.organization}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <span>{opportunity.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">{t('details')}</h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
              {opportunity.description}
            </p>

            <div className="mt-8">
              <h3 className="font-bold text-slate-900 mb-3">{t('contactInfo')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-sm">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{t('email')}</p>
                    <a href={`mailto:${opportunity.contactEmail}`} className="font-bold text-slate-800 hover:text-primary-600">
                      {opportunity.contactEmail}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-sm">
                    <Phone size={20} />
                  </div>
                   <div>
                    <p className="text-xs text-slate-500">{t('phone')}</p>
                    <a href={`tel:${opportunity.contactPhone}`} className="font-bold text-slate-800 hover:text-primary-600">
                      {opportunity.contactPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Messaging Form */}
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">{t('sendMessage')}</h2>
            {msgStatus === 'sent' ? (
              <div className="bg-green-50 text-green-700 p-6 rounded-xl flex flex-col items-center justify-center text-center">
                <CheckCircle2 size={48} className="mb-2" />
                <h3 className="font-bold text-lg">{t('msgSentTitle')}</h3>
                <p>{t('msgSentDesc')}</p>
                <button onClick={() => setMsgStatus('idle')} className="mt-4 text-sm font-bold underline">
                  {t('sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder={t('namePlaceholder')}
                    value={messageForm.name}
                    onChange={(e) => setMessageForm({...messageForm, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder={t('emailPlaceholder')}
                    value={messageForm.email}
                    onChange={(e) => setMessageForm({...messageForm, email: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                </div>
                <textarea
                  required
                  rows={4}
                  placeholder={t('msgPlaceholder')}
                  value={messageForm.content}
                  onChange={(e) => setMessageForm({...messageForm, content: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none"
                />
                <button 
                  type="submit" 
                  disabled={msgStatus === 'sending'}
                  className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {msgStatus === 'sending' ? '...' : <><Send size={18} /> {t('send')}</>}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
               <button className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20">
                {t('applyNow')}
              </button>
              <button className="mx-2 p-3 border border-slate-200 rounded-xl text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors">
                <Heart size={24} />
              </button>
              <button className="p-3 border border-slate-200 rounded-xl text-slate-400 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-colors">
                <Share2 size={24} />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between py-3 border-b border-slate-50">
                <span className="text-slate-500">{t('postedAt')}</span>
                <span className="font-medium text-slate-900 flex items-center gap-2">
                  <Clock size={16} className="text-slate-400" />
                  {opportunity.postedAt}
                </span>
              </div>
               <div className="flex items-center justify-between py-3 border-b border-slate-50">
                <span className="text-slate-500">{t('deadline')}</span>
                <span className="font-medium text-red-600 flex items-center gap-2">
                  <Calendar size={16} />
                  {opportunity.deadline}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-50">
                <span className="text-slate-500">{t('salary')}</span>
                <span className="font-medium text-slate-900">
                  {opportunity.salary || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white text-center">
            <h3 className="font-bold text-xl mb-2">{t('aiAdvisor')}</h3>
            <p className="text-white/80 text-sm mb-4">
              Need help? Ask the AI advisor about this opportunity.
            </p>
          </div>
        </div>
      </div>
      
      <AIAdvisor />
    </div>
  );
};

export default Details;
