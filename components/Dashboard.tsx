
import React from 'react';
import { Site } from '../types';

interface DashboardProps {
  sites: Site[];
  onDelete: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ sites, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {sites.map((site) => (
        <div 
          key={site.id} 
          className="glass rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 group flex flex-col"
        >
          <div className="relative h-40 overflow-hidden bg-slate-100">
            {site.thumbnail ? (
              <img 
                src={site.thumbnail} 
                alt={site.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              </div>
            )}
            <div className="absolute top-3 right-3">
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                site.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 
                site.status === 'deploying' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {site.status}
              </span>
            </div>
          </div>
          
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
              {site.name}
            </h3>
            <p className="text-sm text-slate-500 line-clamp-2 mb-4">
              {site.description}
            </p>
            
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
              <a 
                href={site.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                Visit Site
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                </button>
                <button 
                  onClick={() => onDelete(site.id)}
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {sites.length === 0 && (
        <div className="col-span-full py-20 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800">Your cloud is empty</h3>
          <p className="text-slate-500 max-w-xs mx-auto mt-2">
            Start by creating a new site or sending an existing project to federiko.net cloud.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
