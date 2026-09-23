import React, { useState } from 'react';
import { ManufacturerMetric } from '../../types/compliance';
import { INITIAL_MANUFACTURERS } from '../../data/manufacturerData';
import { BarChart3, AlertTriangle, TrendingDown, ArrowRight, ShieldAlert, CheckCircle, Search } from 'lucide-react';

interface ManufacturerRadarProps {
  onSelectManufacturer?: (name: string) => void;
}

export const ManufacturerRadar: React.FC<ManufacturerRadarProps> = ({
  onSelectManufacturer
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [manufacturers] = useState<ManufacturerMetric[]>(INITIAL_MANUFACTURERS);

  const filtered = manufacturers.filter((m) =>
    m.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span>Manufacturer Compliance Radar</span>
          </h3>
          <p className="text-[11px] text-slate-400">
            Automated legal failure tracking & risk intelligence across registered packaged goods packers
          </p>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search manufacturer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full sm:w-56"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-2.5 px-3">Company Name</th>
              <th className="py-2.5 px-3 text-center">Total Audit</th>
              <th className="py-2.5 px-3 text-center text-emerald-400">Pass</th>
              <th className="py-2.5 px-3 text-center text-rose-400">Fail</th>
              <th className="py-2.5 px-3 text-right">Failure Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {filtered.map((item) => {
              const isCritical = item.failureRate >= 60;
              const isHigh = item.failureRate >= 40 && item.failureRate < 60;
              const isLow = item.failureRate < 10;

              return (
                <tr
                  key={item.companyName}
                  onClick={() => onSelectManufacturer && onSelectManufacturer(item.companyName)}
                  className="hover:bg-slate-800/50 transition cursor-pointer group"
                >
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-200 group-hover:text-blue-400 transition">
                      {item.companyName}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate max-w-[200px]">
                      {item.primaryViolations[0]}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-300">
                    {item.totalAudits}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-emerald-400">
                    {item.passCount}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-rose-400 font-bold">
                    {item.failCount}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <div className="w-16 sm:w-24 bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800 hidden sm:block">
                        <div
                          className={`h-full rounded-full ${
                            isCritical
                              ? 'bg-rose-500'
                              : isHigh
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min(100, item.failureRate)}%` }}
                        ></div>
                      </div>
                      <span
                        className={`font-mono font-bold text-xs ${
                          isCritical
                            ? 'text-rose-400'
                            : isHigh
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {item.failureRate}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5">
        <div className="flex items-center justify-between font-semibold text-slate-200">
          <span className="flex items-center space-x-1.5 text-blue-400">
            <TrendingDown className="w-4 h-4" />
            <span>Trend Analysis</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            Source: DCA Regional Repository
          </span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Performance for most manufacturers remains stable with varying rates of non-compliance. <strong>Tata Consumer</strong> shows the lowest failure rate (2.1%). Further review and enforcement action recommended for <strong>Apex Foods Ltd (73%)</strong> to address consistent statutory infractions.
        </p>
        <div className="pt-1 flex items-center justify-between text-[10px]">
          <span className="text-amber-400 flex items-center space-x-1">
            <ShieldAlert className="w-3 h-3" />
            <span>3 Recall Warnings Active in Northern Zone</span>
          </span>
          <span className="text-blue-400 font-semibold hover:underline cursor-pointer flex items-center space-x-0.5">
            <span>More trend data in</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};
