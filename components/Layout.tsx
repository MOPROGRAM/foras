
import React, { useState } from 'react';
import { Menu, X, Bell, User, Search, Home, Bookmark, PlusCircle, Globe, Mail, LogOut, LogIn } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language, toggleLanguage, messages } = useApp();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                {language === 'ar' ? 'ف' : 'F'}
              </div>
              <span className="text-xl font-bold text-primary-900 hidden sm:block">{t('appTitle')}</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/') ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'}`}
            >
              <Home size={18} />
              {t('navHome')}
            </Link>
            <Link 
              to="/explore" 
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/explore') ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'}`}
            >
              <Search size={18} />
              {t('navExplore')}
            </Link>
             <Link 
              to="/inbox" 
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/inbox') ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'}`}
            >
              <Mail size={18} />
              {t('inbox')}
              {messages.length > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full">{messages.length}</span>}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
             <button 
              onClick={toggleLanguage}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-full flex items-center gap-1 text-sm font-bold"
            >
              <Globe size={18} />
              <span>{language === 'ar' ? 'En' : 'عربي'}</span>
            </button>

            <Link 
              to="/post" 
              className="hidden md:flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-primary-700 transition-colors"
            >
              <PlusCircle size={16} />
              {t('ctaPost')}
            </Link>

            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center border border-primary-200 hover:bg-primary-200 transition-colors"
                >
                  <User size={18} />
                </button>

                {showUserMenu && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setShowUserMenu(false)} />
                    <div className="absolute top-12 right-0 rtl:right-auto rtl:left-0 z-40 bg-white rounded-xl shadow-lg border border-slate-200 py-2 w-48">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs text-slate-500">{language === 'ar' ? 'مسجل كـ' : 'Signed in as'}</p>
                        <p className="text-sm font-medium text-slate-900 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        {language === 'ar' ? 'تسجيل خروج' : 'Sign out'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
              >
                <LogIn size={16} />
                {language === 'ar' ? 'دخول' : 'Login'}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-900/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-0 bottom-0 w-64 bg-white shadow-xl p-4 flex flex-col gap-4 ltr:left-0 rtl:right-0" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4 border-b pb-4">
              <span className="font-bold text-lg text-primary-900">{t('appTitle')}</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-slate-500">
                <X size={24} />
              </button>
            </div>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700">
              <Home size={20} />
              {t('navHome')}
            </Link>
            <Link to="/explore" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700">
              <Search size={20} />
              {t('navExplore')}
            </Link>
             <Link to="/inbox" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700">
              <Mail size={20} />
              {t('inbox')}
            </Link>
            <Link to="/post" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-primary-600 bg-primary-50">
              <PlusCircle size={20} />
              {t('navPost')}
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {language === 'ar' ? 'ف' : 'F'}
                </div>
                <span className="text-xl font-bold text-primary-900">{t('appTitle')}</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                {t('footerDesc')}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">{t('quickLinks')}</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/explore" className="hover:text-primary-600">{t('navExplore')}</Link></li>
                <li><Link to="/post" className="hover:text-primary-600">{t('navPost')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">{t('contactUs')}</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>support@foras.app</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-100 mt-8 pt-8 text-center text-sm text-slate-500">
            © 2024 {t('appTitle')}. {t('rights')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
