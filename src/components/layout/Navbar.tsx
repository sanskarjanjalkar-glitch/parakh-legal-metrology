import React, { useState, useEffect } from 'react';
import { Shield, Wifi, WifiOff, Menu, X, UserCheck, RefreshCw } from 'lucide-react';
import { UserSession } from '../../types/compliance';
import { getPendingSync } from '../../services/offlineSync';

interface NavbarProps {
  activeTab: 'audit' | 'trends' | 'rules' | 'history';
  setActiveTab: (tab: 'audit' | 'trends' | 'rules' | 'history') => void;
  user: UserSession;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onLogout
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [syncing, setSyncing] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      triggerAutoSync();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setPendingCount(getPendingSync().length);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerAutoSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setPendingCount(0);
    }, 1500);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#ff9933]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      <div className="px-4 py-1.5 bg-slate-950/80 border-b border-slate-800/60 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-200">Government of India</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">Department of Consumer Affairs</span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-amber-400 font-medium">Legal Metrology Division</span>
        </div>
        <div className="flex items-center space-x-3 text-[11px]">
          <span className="hidden sm:inline bg-blue-950 text-blue-300 border border-blue-800/60 px-2 py-0.5 rounded-full font-mono">
            SIH 2026: PS #26034
          </span>
          <span className="bg-amber-950/80 text-amber-300 border border-amber-800/60 px-2 py-0.5 rounded-full font-mono font-semibold">
            AFRD02 • PARAKH
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[7px] flex items-center justify-center">
                <span className="text-2xl">⚖️</span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white">PARAKH</span>
                <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
                  AI v2.1
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide font-medium hidden sm:block">
                Legal Metrology Rules 2011 Verification Engine
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                activeTab === 'audit'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Field Audit
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                activeTab === 'trends'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Company Trends
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                activeTab === 'rules'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Rules Engine
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              History & Log
            </button>
          </nav>

          <div className="hidden sm:flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/80 text-xs">
              {isOnline ? (
                <div className="flex items-center space-x-1.5 text-emerald-400">
                  <Wifi className="w-3.5 h-3.5" />
                  <span className="font-mono text-[11px]">Online</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1.5 text-amber-400">
                  <WifiOff className="w-3.5 h-3.5 animate-pulse" />
                  <span className="font-mono text-[11px]">Offline Cache</span>
                </div>
              )}

              {pendingCount > 0 && (
                <button
                  onClick={triggerAutoSync}
                  className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-[10px] bg-blue-950/80 border border-blue-800 px-1.5 py-0.5 rounded"
                  title="Click to sync offline audit records"
                >
                  <RefreshCw className={`w-3 h-3 ${syncing ? 'animate-spin' : ''}`} />
                  <span>{pendingCount} Pending</span>
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-800">
              <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-200 border border-slate-600">
                <UserCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-xs font-semibold text-slate-200 leading-tight">
                  {user.name}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {user.badgeId} ({user.role})
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="text-xs text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 px-2.5 py-1.5 rounded-lg transition"
            >
              Logout
            </button>
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <div className="flex items-center text-xs">
              {isOnline ? (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5"></span>
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-1.5 animate-ping"></span>
              )}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
          <div className="py-2 border-b border-slate-800 text-xs text-slate-300 flex justify-between items-center">
            <span>Signed in as: <strong className="text-white">{user.name}</strong> ({user.badgeId})</span>
            <button
              onClick={onLogout}
              className="text-rose-400 text-xs px-2 py-0.5 rounded bg-rose-950 border border-rose-800"
            >
              Logout
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => { setActiveTab('audit'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-xs font-semibold text-center ${
                activeTab === 'audit' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Field Audit
            </button>
            <button
              onClick={() => { setActiveTab('trends'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-xs font-semibold text-center ${
                activeTab === 'trends' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Company Trends
            </button>
            <button
              onClick={() => { setActiveTab('rules'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-xs font-semibold text-center ${
                activeTab === 'rules' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Rules Engine
            </button>
            <button
              onClick={() => { setActiveTab('history'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-xs font-semibold text-center ${
                activeTab === 'history' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Audit History
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
