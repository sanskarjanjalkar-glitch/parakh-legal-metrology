import React, { useState, useEffect } from 'react';
import { Shield, Wifi, WifiOff, Menu, X, UserCheck, Sparkles, FileCheck, Download, BookOpen } from 'lucide-react';
import { UserSession } from '../../types/compliance';

export type AppNavTab = 'unified' | 'tender' | 'radar' | 'rules' | 'history';

interface NavbarProps {
  activeTab: AppNavTab;
  setActiveTab: (tab: AppNavTab) => void;
  user: UserSession;
  onLogout: () => void;
  onOpenReportModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onLogout,
  onOpenReportModal
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-sm">
      {/* Top National Tricolor Line */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      {/* Official Government of India Top Sub-bar */}
      <div className="px-4 py-1 bg-slate-50 border-b border-slate-200/60 text-[11px] text-slate-600 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-800">Government of India</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-700">Department of Consumer Affairs (DoCA)</span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="hidden sm:inline text-cyan-700 font-semibold">Bureau of Indian Standards (BIS) & Legal Metrology</span>
        </div>
        <div className="flex items-center space-x-2 font-mono text-[10px]">
          <span className="bg-cyan-100/70 text-cyan-900 border border-cyan-300/60 px-2 py-0.5 rounded-full font-bold">
            SIH 2026: PS #26108 & #26034
          </span>
          <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full font-bold">
            PARAKH AI
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div
            className="flex items-center space-x-3 cursor-pointer select-none"
            onClick={() => setActiveTab('unified')}
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 p-0.5 flex items-center justify-center shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center font-black text-cyan-600 text-lg">
                P
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">PARAKH</span>
                <span className="bg-cyan-100 text-cyan-800 border border-cyan-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                  AI v2.4
                </span>
              </div>
              <p className="text-[10px] text-cyan-700 tracking-wide font-medium hidden sm:block">
                Indian Standards (IS) & Legal Metrology Inspection Suite
              </p>
            </div>
          </div>

          {/* Clean Light-Themed Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1.5">
            <button
              onClick={() => setActiveTab('unified')}
              className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all duration-150 flex items-center space-x-1.5 ${
                activeTab === 'unified'
                  ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/25'
                  : 'text-slate-600 hover:text-cyan-700 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inspection & Tender Hub</span>
            </button>
            <button
              onClick={() => setActiveTab('tender')}
              className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all duration-150 flex items-center space-x-1.5 ${
                activeTab === 'tender'
                  ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/25'
                  : 'text-slate-600 hover:text-cyan-700 hover:bg-slate-100'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Tender Spec Auditor</span>
            </button>
            <button
              onClick={() => setActiveTab('radar')}
              className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all duration-150 flex items-center space-x-1.5 ${
                activeTab === 'radar'
                  ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/25'
                  : 'text-slate-600 hover:text-cyan-700 hover:bg-slate-100'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Manufacturer Radar</span>
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all duration-150 flex items-center space-x-1.5 ${
                activeTab === 'rules'
                  ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/25'
                  : 'text-slate-600 hover:text-cyan-700 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Directory</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all duration-150 flex items-center space-x-1.5 ${
                activeTab === 'history'
                  ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/25'
                  : 'text-slate-600 hover:text-cyan-700 hover:bg-slate-100'
              }`}
            >
              <span>History</span>
            </button>
          </nav>

          {/* Right Action: Download Report in Cyan + Status */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenReportModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 flex items-center space-x-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Download Report</span>
            </button>

            <div className="flex items-center space-x-1.5 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-mono text-[11px] text-slate-700 font-semibold">Active</span>
            </div>

            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="text-left hidden lg:block">
                <div className="text-xs font-bold text-slate-800 leading-tight">
                  {user.name}
                </div>
                <div className="text-[10px] text-cyan-700 font-mono font-medium">
                  {user.badgeId}
                </div>
              </div>
              <button
                onClick={onLogout}
                className="text-[11px] text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-2 py-1 rounded-lg transition"
              >
                Role
              </button>
            </div>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <button
            onClick={() => {
              setActiveTab('unified');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'unified' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-700'
            }`}
          >
            Inspection & Tender Hub
          </button>
          <button
            onClick={() => {
              setActiveTab('tender');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'tender' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-700'
            }`}
          >
            Tender Spec Auditor
          </button>
          <button
            onClick={() => {
              setActiveTab('radar');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'radar' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-700'
            }`}
          >
            Manufacturer Radar
          </button>
          <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
            <button
              onClick={onOpenReportModal}
              className="text-cyan-700 font-bold flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Report</span>
            </button>
            <button onClick={onLogout} className="text-slate-600">
              Switch Role
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
