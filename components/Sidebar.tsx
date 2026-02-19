
import React from 'react';
import { View, User } from '../types';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  isExpanded: boolean;
  setIsExpanded: (val: boolean) => void;
  user: User;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isExpanded, setIsExpanded, user, onLogout }) => {
  const menuItems = [
    { id: 'dashboard' as View, label: 'Workspace', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/><path d="M12 12h.01"/><path d="M12 16h.01"/><path d="M8 12h.01"/><path d="M8 16h.01"/><path d="M16 12h.01"/><path d="M16 16h.01"/></svg>
    )},
    { id: 'create' as View, label: 'Deploy', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="M12 13V21"/><path d="M15 16l-3-3-3 3"/></svg>
    )},
    { id: 'settings' as View, label: 'Cloud Settings', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
    )},
  ];

  return (
    <aside 
      className={`edge-sidebar border-r border-slate-200 transition-all duration-300 flex flex-col items-center py-6 h-screen relative z-50 shadow-2xl ${isExpanded ? 'w-64' : 'w-16'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="mb-10 px-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-400 rounded-xl flex items-center justify-center text-white shadow-lg cursor-pointer transform hover:rotate-6 transition-transform">
          <span className="font-bold text-xl">F</span>
        </div>
      </div>

      <nav className="flex-1 w-full space-y-2 px-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${
              currentView === item.id 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <div className="flex-shrink-0">{item.icon}</div>
            {isExpanded && <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="mt-auto px-2 w-full space-y-2">
        <button 
          onClick={() => onViewChange('profile')}
          className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${
            currentView === 'profile' 
            ? 'bg-slate-800 text-white' 
            : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
          }`}
        >
          <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-300 flex-shrink-0">
             <img src={user.avatar} alt={user.name} />
          </div>
          {isExpanded && <span className="font-medium">Account Info</span>}
        </button>
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all text-slate-400 hover:bg-rose-50 hover:text-rose-600"
        >
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </div>
          {isExpanded && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
