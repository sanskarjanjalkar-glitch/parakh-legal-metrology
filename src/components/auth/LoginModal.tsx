import React, { useState } from 'react';
import { Shield, Lock, User, ArrowRight, Zap } from 'lucide-react';
import { UserSession, UserRole } from '../../types/compliance';

interface LoginModalProps {
  isOpen: boolean;
  onLoginSuccess: (user: UserSession) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<UserRole>('INSPECTOR');
  const [badgeId, setBadgeId] = useState<string>('#F18714');
  const [password, setPassword] = useState<string>('••••••••');
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'INSPECTOR') {
      onLoginSuccess({
        name: 'Inspector R. Sharma',
        badgeId: badgeId || '#F18714',
        role: 'INSPECTOR',
        designation: 'Senior Legal Metrology Inspector',
        zone: 'Northern Regional Zone, New Delhi'
      });
    } else {
      onLoginSuccess({
        name: 'Dr. S. Sharma',
        badgeId: badgeId || '#ADM-902',
        role: 'SUPERVISOR',
        designation: 'Assistant Controller of Legal Metrology',
        zone: 'HQ Enforcement Directorate'
      });
    }
  };

  const setDemoUser = (role: UserRole) => {
    setActiveTab(role);
    if (role === 'INSPECTOR') {
      setBadgeId('#F18714');
      setPassword('password123');
    } else {
      setBadgeId('#ADM-902');
      setPassword('adminpass');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="h-1.5 w-full flex">
          <div className="h-full w-1/3 bg-[#ff9933]"></div>
          <div className="h-full w-1/3 bg-white"></div>
          <div className="h-full w-1/3 bg-[#138808]"></div>
        </div>

        <div className="px-6 pt-6 pb-4 text-center border-b border-slate-800 bg-slate-950/50">
          <div className="inline-flex p-3 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 mb-3 shadow-inner">
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center justify-center space-x-2">
            <span>PARAKH</span>
            <span className="text-slate-400 font-normal">|</span>
            <span className="text-blue-400 font-semibold text-base">AI COMPLIANCE SYSTEM</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Legal Metrology (Packaged Commodities) Rules, 2011
          </p>
          <div className="mt-2 inline-block bg-slate-800/80 text-amber-300 font-mono text-[10px] font-semibold px-2.5 py-0.5 rounded border border-amber-800/40 uppercase tracking-wider">
            Secure Portal Login
          </div>
        </div>

        <div className="grid grid-cols-2 bg-slate-950 border-b border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setDemoUser('INSPECTOR')}
            className={`py-3 text-center transition-colors flex items-center justify-center space-x-1.5 ${
              activeTab === 'INSPECTOR'
                ? 'text-blue-400 border-b-2 border-blue-500 bg-slate-900/90'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Field Inspector Login</span>
          </button>
          <button
            type="button"
            onClick={() => setDemoUser('SUPERVISOR')}
            className={`py-3 text-center transition-colors flex items-center justify-center space-x-1.5 ${
              activeTab === 'SUPERVISOR'
                ? 'text-blue-400 border-b-2 border-blue-500 bg-slate-900/90'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Supervisor / Admin Login</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {activeTab === 'INSPECTOR' ? 'Field Inspector Badge ID' : 'Supervisor Admin Username'}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={badgeId}
                onChange={(e) => setBadgeId(e.target.value)}
                placeholder={activeTab === 'INSPECTOR' ? 'e.g. #F18714' : 'admin_hq'}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">
                ISN-01
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Secure Passcode / Security Token
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => alert('Demo passcode is automatically configured. Click "Sign In to Portal"')}
              className="text-blue-400 hover:underline"
            >
              Forgot Pin?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all mt-2"
          >
            <span>Sign In to Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-3 border-t border-slate-800/80">
            <div className="text-[11px] text-slate-400 mb-2 flex items-center space-x-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>1-Click SIH Evaluator Quick Access:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setDemoUser('INSPECTOR');
                  onLoginSuccess({
                    name: 'Inspector R. Sharma',
                    badgeId: '#F18714',
                    role: 'INSPECTOR',
                    designation: 'Senior Legal Metrology Inspector',
                    zone: 'Northern Regional Zone, New Delhi'
                  });
                }}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-600/60 rounded-lg p-2 text-left transition"
              >
                <div className="text-xs font-bold text-blue-400">Inspector R. Sharma</div>
                <div className="text-[10px] text-slate-400 font-mono">Badge: #F18714</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDemoUser('SUPERVISOR');
                  onLoginSuccess({
                    name: 'Dr. S. Sharma',
                    badgeId: '#ADM-902',
                    role: 'SUPERVISOR',
                    designation: 'Assistant Controller',
                    zone: 'HQ Enforcement Directorate'
                  });
                }}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-600/60 rounded-lg p-2 text-left transition"
              >
                <div className="text-xs font-bold text-amber-400">Supervisor Portal</div>
                <div className="text-[10px] text-slate-400 font-mono">Badge: #ADM-902</div>
              </button>
            </div>
          </div>
        </form>

        <div className="px-6 py-3 bg-slate-950 text-[10px] text-center text-slate-500 border-t border-slate-800">
          Authorized personnel only. Tampering with inspection records is punishable under Section 44 of LM Act.
        </div>
      </div>
    </div>
  );
};
