import React from 'react';
import { ExternalLink, ShieldCheck, FileCheck2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs py-8 mt-12 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-slate-800/60">
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center space-x-2 text-slate-200">
              <span className="text-xl">⚖️</span>
              <span className="font-bold text-sm tracking-wide">PARAKH AI INSPECTION SUITE</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed max-w-lg">
              Automated Legal Metrology (Packaged Commodities) Rules, 2011 compliance verification powered by hybrid OCR, Computer Vision bounding algorithms, and deterministic legal rule engines. Developed for Smart India Hackathon 2026 (Problem Statement #26034).
            </p>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold text-[11px] uppercase tracking-wider mb-2.5">
              Statutory Links
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <a
                  href="https://emaap.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 flex items-center space-x-1"
                >
                  <span>eMaap National Portal</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://consumeraffairs.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 flex items-center space-x-1"
                >
                  <span>Dept of Consumer Affairs</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://consumerhelpline.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 flex items-center space-x-1"
                >
                  <span>National Consumer Helpline</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold text-[11px] uppercase tracking-wider mb-2.5">
              Standards & Legal Acts
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li className="flex items-center space-x-1">
                <FileCheck2 className="w-3 h-3 text-blue-400" />
                <span>Legal Metrology Act, 2009</span>
              </li>
              <li className="flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>GSR 779(E) 2022 Amendment</span>
              </li>
              <li className="flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>FSSAI Packaged Safety 2020</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>
            © 2024 Legal Metrology Division, DCA, GoI | Designed by SIH Team PARAKH | Version 2.1.0
          </div>
          <div className="flex items-center space-x-4">
            <span>Server: localhost:8080 (Cloud Sync Active)</span>
            <span className="text-emerald-500 font-mono">100% Client-Ready for Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
