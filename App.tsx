
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CreateSite from './components/CreateSite';
import Auth from './components/Auth';
import { Site, View, User } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [allSites, setAllSites] = useState<Site[]>([]);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initial Auth Check
  useEffect(() => {
    const savedUser = localStorage.getItem('federiko_current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    const savedSites = localStorage.getItem('federiko_sites');
    if (savedSites) {
      setAllSites(JSON.parse(savedSites));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('federiko_current_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('federiko_current_user');
    setCurrentView('dashboard');
  };

  const addSite = (newSite: Site) => {
    if (!currentUser) return;
    const siteWithOwner = { ...newSite, ownerId: currentUser.id };
    const updatedSites = [siteWithOwner, ...allSites];
    setAllSites(updatedSites);
    localStorage.setItem('federiko_sites', JSON.stringify(updatedSites));
    setCurrentView('dashboard');
  };

  const deleteSite = (id: string) => {
    const updatedSites = allSites.filter(s => s.id !== id);
    setAllSites(updatedSites);
    localStorage.setItem('federiko_sites', JSON.stringify(updatedSites));
  };

  if (isLoading) return null;

  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  // Filter sites for current user
  const userSites = allSites.filter(site => site.ownerId === currentUser.id);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
        user={currentUser}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 overflow-y-auto relative p-6 md:p-10 transition-all duration-300">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">
              {currentView === 'dashboard' ? 'Cloud Workspace' : 
               currentView === 'create' ? 'Create New Site' : 
               currentView === 'profile' ? 'My Profile' : 'Settings'}
            </h1>
            <p className="text-slate-500 mt-1">
              {currentView === 'dashboard' 
                ? `Hello, ${currentUser.name}. You have ${userSites.length} projects stored in Federiko Cloud.` 
                : currentView === 'create' ? 'Use AI to generate and deploy your project to the cloud.'
                : 'Manage your personal preferences and account security.'}
            </p>
          </div>
          
          {currentView === 'dashboard' && (
            <button 
              onClick={() => setCurrentView('create')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-all flex items-center gap-2 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              New Project
            </button>
          )}
        </header>

        {currentView === 'dashboard' && (
          <Dashboard sites={userSites} onDelete={deleteSite} />
        )}

        {currentView === 'create' && (
          <CreateSite onAdd={addSite} onCancel={() => setCurrentView('dashboard')} />
        )}

        {currentView === 'profile' && (
          <div className="glass p-8 rounded-3xl border border-slate-200 max-w-2xl animate-fade-in">
            <div className="flex items-center gap-6 mb-8">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-24 h-24 rounded-full border-4 border-white shadow-xl" />
              <div>
                <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                <p className="text-slate-500">{currentUser.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">Pro Account</span>
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t border-slate-100">
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/50 rounded-xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Total Sites</p>
                    <p className="text-xl font-bold text-slate-800">{userSites.length}</p>
                  </div>
                  <div className="p-4 bg-white/50 rounded-xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Cloud Storage</p>
                    <p className="text-xl font-bold text-slate-800">12.4 MB / 1 GB</p>
                  </div>
               </div>
            </div>
            <button className="mt-8 px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl transition-all text-sm font-bold">
               Edit Profile Details
            </button>
          </div>
        )}

        {/* Decorative background elements */}
        <div className="fixed top-0 right-0 -z-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl opacity-50"></div>
        <div className="fixed bottom-0 left-0 -z-10 w-64 h-64 bg-teal-100/30 rounded-full blur-3xl opacity-50"></div>
      </main>
    </div>
  );
};

export default App;
