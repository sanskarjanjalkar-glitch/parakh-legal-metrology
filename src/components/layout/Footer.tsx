import React from 'react';
import { ExternalLink, ShieldCheck, FileCheck2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs py-8 mt-12 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-slate-200">
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center space-x-2 text-slate-900">
              <span className="p-1 rounded bg-cyan-100 text-cyan-800 font-bold text-xs">P</span>
              <span className="font-bold text-sm tracking-wide">PARAKH AI INSPECTION SUITE</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed max-w-lg">
              Unified AI Ecosystem integrating Indian Standards (IS) Recommendation Engine (PS 26108) with Legal Metrology (Packaged Commodities) Rules 2011 & ISI Quality Verification (PS 26034). Built for the Ministry of Consumer Affairs, Food & Public Distribution (DoCA) & Bureau of Indian Standards (BIS).
            </p>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold text-[11px] uppercase tracking-wider mb-2.5">
              Statutory Portals
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <a
                  href="https://www.manakonline.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-700 flex items-center space-x-1"
                >
                  <span>BIS Manakonline Portal</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://gem.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-700 flex items-center space-x-1"
                >
                  <span>GeM (Govt e-Marketplace)</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://consumeraffairs.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-700 flex items-center space-x-1"
                >
                  <span>Dept of Consumer Affairs (DoCA)</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold text-[11px] uppercase tracking-wider mb-2.5">
              Standards & Legal Acts
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-600">
              <li className="flex items-center space-x-1">
                <FileCheck2 className="w-3 h-3 text-cyan-600" />
                <span>Bureau of Indian Standards Act, 2016</span>
              </li>
              <li className="flex items-center space-x-1">
                <FileCheck2 className="w-3 h-3 text-cyan-600" />
                <span>Legal Metrology Act, 2009 & Rules 2011</span>
              </li>
              <li className="flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Mandatory Quality Control Orders (QCO)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>
            © 2026 Department of Consumer Affairs (DoCA) & Bureau of Indian Standards (BIS) | Smart India Hackathon 2026
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-cyan-700 font-mono font-semibold">PS #26108 & PS #26034 Unified</span>
            <span className="text-emerald-700 font-mono font-semibold">Production Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
