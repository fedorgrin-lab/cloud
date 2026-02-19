
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users: User[] = JSON.parse(localStorage.getItem('federiko_users') || '[]');

    if (isLogin) {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (users.some(u => u.email === email)) {
        setError('User already exists');
        return;
      }
      const newUser: User = {
        id: Math.random().toString(36).substring(7),
        email,
        name: name || email.split('@')[0],
        password,
        avatar: `https://picsum.photos/seed/${email}/100/100`
      };
      users.push(newUser);
      localStorage.setItem('federiko_users', JSON.stringify(users));
      onLogin(newUser);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full glass p-8 rounded-3xl border border-slate-200 shadow-2xl animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-400 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3">
            <span className="font-bold text-3xl">F</span>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">
          {isLogin ? 'Welcome Back' : 'Join Federiko Cloud'}
        </h2>
        <p className="text-center text-slate-500 text-sm mb-8">
          {isLogin ? 'Access your projects and cloud services.' : 'Start deploying your sites to the edge today.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
                placeholder="John Doe"
              />
            </div>
          )}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
              placeholder="name@example.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-rose-500 text-xs font-medium text-center">{error}</p>}

          <button 
            type="submit"
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98]"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
