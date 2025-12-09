
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { OpportunityType, Opportunity } from '../types';
import { Building2, MapPin, FileText, Calendar, DollarSign, Briefcase, Mail, Phone } from 'lucide-react';

const PostOpportunity: React.FC = () => {
  const { t, addOpportunity } = useApp();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    location: '',
    type: OpportunityType.JOB,
    description: '',
    deadline: '',
    salary: '',
    contactEmail: '',
    contactPhone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newOpportunity: Opportunity = {
      id: Date.now().toString(),
      ...formData,
      tags: [formData.type, formData.location],
      postedAt: new Date().toISOString().split('T')[0]
    };

    await addOpportunity(newOpportunity);
    setIsSubmitting(false);
    
    alert(t('formSuccess'));
    navigate('/explore');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">{t('postTitle')}</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          
          {/* Title */}
          <div className="mb-6">
            <label className="block text-slate-700 font-bold mb-2 text-sm">{t('formTitle')}</label>
            <div className="relative">
              <Briefcase className="absolute top-3.5 right-3 left-auto rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto text-slate-400" size={18} />
              <input 
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-10 focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Org & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-slate-700 font-bold mb-2 text-sm">{t('formOrg')}</label>
              <div className="relative">
                <Building2 className="absolute top-3.5 right-3 left-auto rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto text-slate-400" size={18} />
                <input 
                  type="text"
                  name="organization"
                  required
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-10 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-2 text-sm">{t('formLoc')}</label>
              <div className="relative">
                <MapPin className="absolute top-3.5 right-3 left-auto rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto text-slate-400" size={18} />
                <input 
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-10 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Contact Info (New) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-slate-700 font-bold mb-2 text-sm">{t('formEmail')}</label>
              <div className="relative">
                <Mail className="absolute top-3.5 right-3 left-auto rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto text-slate-400" size={18} />
                <input 
                  type="email"
                  name="contactEmail"
                  required
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-10 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-2 text-sm">{t('formPhone')}</label>
              <div className="relative">
                <Phone className="absolute top-3.5 right-3 left-auto rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto text-slate-400" size={18} />
                <input 
                  type="tel"
                  name="contactPhone"
                  required
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-10 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Type */}
          <div className="mb-6">
            <label className="block text-slate-700 font-bold mb-2 text-sm">{t('formType')}</label>
            <select 
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary-500 focus:outline-none cursor-pointer"
            >
              {Object.values(OpportunityType).map(type => (
                 <option key={type} value={type}>{t(type as any) || type}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="mb-6">
             <label className="block text-slate-700 font-bold mb-2 text-sm">{t('formDesc')}</label>
             <div className="relative">
                <FileText className="absolute top-3.5 right-3 left-auto rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto text-slate-400" size={18} />
                <textarea 
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-10 focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none"
                />
             </div>
          </div>

          {/* Deadline & Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
             <div>
              <label className="block text-slate-700 font-bold mb-2 text-sm">{t('formDeadline')}</label>
              <div className="relative">
                <Calendar className="absolute top-3.5 right-3 left-auto rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto text-slate-400" size={18} />
                <input 
                  type="date"
                  name="deadline"
                  required
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-10 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
              </div>
            </div>
             <div>
              <label className="block text-slate-700 font-bold mb-2 text-sm">{t('formSalary')}</label>
              <div className="relative">
                <DollarSign className="absolute top-3.5 right-3 left-auto rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto text-slate-400" size={18} />
                <input 
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-10 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30 disabled:opacity-50"
          >
            {isSubmitting ? '...' : t('formSubmit')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostOpportunity;
