import React, { useState } from 'react';
import { METROLOGY_RULES_2011 } from '../../data/metrologyRules';
import { BookOpen, Search, Calculator, ShieldCheck, Scale } from 'lucide-react';

export const RulesDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [widthCm, setWidthCm] = useState<number>(15);
  const [heightCm, setHeightCm] = useState<number>(20);

  const pdpArea = widthCm * heightCm;
  let requiredMinFont = 2.0;
  if (pdpArea <= 50) requiredMinFont = 1.0;
  else if (pdpArea <= 100) requiredMinFont = 1.5;
  else if (pdpArea <= 500) requiredMinFont = 2.0;
  else if (pdpArea <= 1000) requiredMinFont = 4.0;
  else requiredMinFont = 6.0;

  const filteredRules = METROLOGY_RULES_2011.filter(
    (r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.clause.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <span>Legal Metrology (Packaged Commodities) Rules, 2011 Engine</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Statutory reference repository, penalty provisions under Section 36, and dimensional font tables
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search rule (e.g. MRP, Rule 6, Font)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-72"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-900/40 rounded-xl p-5 shadow-xl">
        <div className="flex items-center space-x-2 text-blue-400 mb-3">
          <Calculator className="w-5 h-5" />
          <h3 className="text-sm font-bold text-white">
            Rule 7 Principal Display Panel (PDP) Font Height Calculator
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs text-slate-300 font-semibold mb-1">
              Package Width (cm)
            </label>
            <input
              type="number"
              min="1"
              max="200"
              value={widthCm}
              onChange={(e) => setWidthCm(Math.max(1, parseFloat(e.target.value) || 1))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-300 font-semibold mb-1">
              Package Height (cm)
            </label>
            <input
              type="number"
              min="1"
              max="200"
              value={heightCm}
              onChange={(e) => setHeightCm(Math.max(1, parseFloat(e.target.value) || 1))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
            />
          </div>

          <div>
            <span className="block text-xs text-slate-400 mb-1">Calculated PDP Area</span>
            <div className="text-sm font-bold text-slate-200 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 font-mono">
              {pdpArea.toFixed(1)} cm²
            </div>
          </div>

          <div className="bg-blue-600/20 border border-blue-500/40 rounded-lg p-2.5 text-center">
            <span className="block text-[10px] text-blue-300 font-bold uppercase tracking-wider">
              Statutory Min Font
            </span>
            <span className="text-lg font-extrabold text-white font-mono">
              ≥ {requiredMinFont.toFixed(1)} mm
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRules.map((rule) => (
          <div
            key={rule.ruleCode}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3 hover:border-slate-700 transition"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded">
                {rule.ruleCode}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">
                LM Rules, 2011
              </span>
            </div>

            <h4 className="text-sm font-bold text-slate-100">
              {rule.title}
            </h4>
            <div className="text-[11px] text-slate-400 italic">
              {rule.clause}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {rule.summary}
            </p>

            <div className="p-2.5 rounded-lg bg-slate-950 text-[11px] text-slate-300 border border-slate-800/80">
              <strong className="text-blue-400 block mb-0.5">Statutory Obligation:</strong>
              {rule.statutoryObligation}
            </div>

            {rule.minimumFontSizeTable && (
              <div className="border border-slate-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-950 text-slate-400 font-bold">
                    <tr>
                      <th className="py-1.5 px-2">PDP Area</th>
                      <th className="py-1.5 px-2 text-right">Min Font Height</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                    {rule.minimumFontSizeTable.map((row) => (
                      <tr key={row.pdpArea}>
                        <td className="py-1 px-2">{row.pdpArea}</td>
                        <td className="py-1 px-2 text-right text-emerald-400 font-bold">{row.minFontMm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="text-[10px] text-rose-300 bg-rose-950/30 border border-rose-900/40 p-2 rounded-lg">
              <strong className="text-rose-400">Statutory Penalties: </strong>
              {rule.penaltyDetails}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
