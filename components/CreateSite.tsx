
import React, { useState } from 'react';
import { Site } from '../types';
import { getSiteSuggestions } from '../services/geminiService';

interface CreateSiteProps {
  onAdd: (site: Site) => void;
  onCancel: () => void;
}

const CreateSite: React.FC<CreateSiteProps> = ({ onAdd, onCancel }) => {
  const [idea, setIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: ''
  });
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const handleAiGenerate = async () => {
    if (!idea.trim()) return;
    setIsGenerating(true);
    try {
      const result = await getSiteSuggestions(idea);
      setFormData({
        name: result.suggestedName,
        description: result.suggestedDescription,
        url: `${result.suggestedName.toLowerCase().replace(/\s+/g, '-')}.federiko.net`
      });
      setAiSuggestion(result.suggestion);
    } catch (error) {
      console.error("AI Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSite: Site = {
      id: Math.random().toString(36).substring(7),
      ownerId: '', // Set by App component
      name: formData.name,
      description: formData.description,
      url: formData.url.startsWith('http') ? formData.url : `https://${formData.url}`,
      lastUpdated: new Date().toISOString(),
      status: 'active',
      thumbnail: `https://picsum.photos/seed/${formData.name}/400/300`
    };
    onAdd(newSite);
  };

  return (
    <div className="max-w-4xl animate-fade-in pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="glass p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 2v20"/><path d="m4.93 4.93 14.14 14.14"/><path d="M2 12h20"/><path d="m4.93 19.07 14.14-14.14"/></svg>
              AI Cloud Assistant
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Describe your website idea, and Gemini will help you create the metadata for your cloud project.
            </p>
            <div className="flex gap-2">
              <input 
                type="text"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="e.g. A blog for a professional chef specialized in Italian cuisine"
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm bg-white"
              />
              <button 
                onClick={handleAiGenerate}
                disabled={isGenerating || !idea.trim()}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center gap-2 text-sm font-bold shadow-lg"
              >
                {isGenerating ? (
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                )}
                Generate
              </button>
            </div>
            
            {aiSuggestion && (
              <div className="mt-4 p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-xs text-blue-700 leading-relaxed italic animate-fade-in">
                <strong>Pro Tip:</strong> {aiSuggestion}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="glass p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Project Name</label>
              <input 
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Cloud URL</label>
              <input 
                required
                type="text"
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                placeholder="my-cool-site.federiko.net"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
              <textarea 
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              ></textarea>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button 
                type="submit"
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all font-bold text-sm"
              >
                Deploy to Cloud
              </button>
              <button 
                type="button"
                onClick={onCancel}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all font-bold text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6">Cloud Preview</h3>
            
            <div className="border rounded-lg overflow-hidden shadow-2xl bg-white aspect-[4/3] flex flex-col">
              <div className="h-6 bg-slate-100 border-b flex items-center px-2 gap-1.5">
                <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <div className="ml-2 flex-1 bg-white h-4 rounded text-[8px] flex items-center px-2 text-slate-400 truncate">
                  {formData.url || 'your-site.federiko.net'}
                </div>
              </div>
              <div className="flex-1 flex flex-col p-4">
                <div className="w-1/3 h-4 bg-slate-100 rounded mb-4"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-full h-2 bg-slate-50 rounded"></div>
                  <div className="w-full h-2 bg-slate-50 rounded"></div>
                  <div className="w-3/4 h-2 bg-slate-50 rounded"></div>
                  <div className="w-1/2 h-20 bg-blue-50/50 rounded-lg border border-blue-100 mt-4 flex items-center justify-center text-[10px] text-blue-300">
                    Live Preview Placeholder
                  </div>
                </div>
                <div className="mt-auto h-8 flex items-center justify-center border-t border-slate-50 pt-2 text-[8px] text-slate-300 uppercase tracking-widest">
                  Site generated on federiko.net
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Secure by Default</h4>
                  <p className="text-[10px] text-slate-500">Every site on Federiko Cloud gets an automatic SSL certificate.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h3L12 22l2-10h-3l2-10z"/></svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Edge Acceleration</h4>
                  <p className="text-[10px] text-slate-500">Content delivered via our global Edge network for ultra-fast loading.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSite;
