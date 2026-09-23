import React from 'react';
import { ExtractedProductFields } from '../../types/compliance';
import { Tag, Building2, Scale, Calendar, Phone, Mail, Globe, ShieldAlert } from 'lucide-react';

interface ExtractedFieldsViewProps {
  fields: ExtractedProductFields;
  onChange: (fields: ExtractedProductFields) => void;
}

export const ExtractedFieldsView: React.FC<ExtractedFieldsViewProps> = ({
  fields,
  onChange
}) => {
  const updateField = (key: keyof ExtractedProductFields, value: any) => {
    onChange({
      ...fields,
      [key]: value
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
          <Tag className="w-3.5 h-3.5 text-blue-400" />
          <span>Extracted Legal Metrology Fields</span>
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">
          Editable by Field Inspector
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block text-slate-400 font-semibold mb-1 flex items-center space-x-1">
            <span>MRP (Rule 6(1)(e))</span>
          </label>
          <input
            type="text"
            value={fields.mrp}
            onChange={(e) => updateField('mrp', e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-amber-300 font-bold focus:ring-1 focus:ring-blue-500"
            placeholder="₹ 162.00"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-semibold mb-1 flex items-center space-x-1">
            <span>Unit Sale Price (USP)</span>
            {!fields.unitSalePrice && (
              <span className="text-[10px] text-rose-400 font-normal">(Missing!)</span>
            )}
          </label>
          <input
            type="text"
            value={fields.unitSalePrice}
            onChange={(e) => updateField('unitSalePrice', e.target.value)}
            className={`w-full bg-slate-950 border rounded-lg px-2.5 py-1.5 text-slate-200 focus:ring-1 ${
              fields.unitSalePrice ? 'border-slate-700' : 'border-rose-700/80 bg-rose-950/20'
            }`}
            placeholder="e.g. ₹ 16.20 / 100g"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-semibold mb-1 flex items-center justify-between">
            <span className="flex items-center space-x-1">
              <Scale className="w-3 h-3 text-blue-400" />
              <span>Net Quantity (Rule 6(1)(b))</span>
            </span>
            {!fields.netQuantityStandardUnit && (
              <span className="text-[9px] text-rose-400 font-mono">Non-SI unit</span>
            )}
          </label>
          <input
            type="text"
            value={fields.netQuantity}
            onChange={(e) => updateField('netQuantity', e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-blue-300 font-mono focus:ring-1 focus:ring-blue-500"
            placeholder="1 kg or 500 g"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-semibold mb-1 flex items-center space-x-1">
            <Calendar className="w-3 h-3 text-blue-400" />
            <span>Mfg / Expiry Date (Rule 6(1)(c/d))</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <input
              type="text"
              value={fields.manufactureDate}
              onChange={(e) => updateField('manufactureDate', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 font-mono text-[11px]"
              placeholder="Mfg: MM/YYYY"
            />
            <input
              type="text"
              value={fields.expiryDate}
              onChange={(e) => updateField('expiryDate', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 font-mono text-[11px]"
              placeholder="Exp: MM/YYYY"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-slate-400 font-semibold mb-1 flex items-center space-x-1">
            <Building2 className="w-3 h-3 text-blue-400" />
            <span>Manufacturer / Packer Identity & Address (Rule 6(1)(a))</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={fields.manufacturerName}
              onChange={(e) => updateField('manufacturerName', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-medium"
              placeholder="Company Name"
            />
            <input
              type="text"
              value={fields.manufacturerAddress}
              onChange={(e) => updateField('manufacturerAddress', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-medium"
              placeholder="Physical street address, city, state & pin code"
            />
          </div>
        </div>

        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="block text-slate-400 font-semibold mb-1 flex items-center space-x-1">
              <Phone className="w-3 h-3 text-blue-400" />
              <span>Consumer Care Phone</span>
            </label>
            <input
              type="text"
              value={fields.consumerCarePhone}
              onChange={(e) => updateField('consumerCarePhone', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200"
              placeholder="Toll-free / Helpline number"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1 flex items-center space-x-1">
              <Mail className="w-3 h-3 text-blue-400" />
              <span>Consumer Care Email (Mandatory)</span>
            </label>
            <input
              type="email"
              value={fields.consumerCareEmail}
              onChange={(e) => updateField('consumerCareEmail', e.target.value)}
              className={`w-full bg-slate-950 border rounded-lg px-2.5 py-1.5 text-slate-200 ${
                fields.consumerCareEmail ? 'border-slate-700' : 'border-rose-700 bg-rose-950/20'
              }`}
              placeholder="care@company.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-400 font-semibold mb-1 flex items-center space-x-1">
            <Globe className="w-3 h-3 text-blue-400" />
            <span>Country of Origin (Rule 6(10))</span>
          </label>
          <input
            type="text"
            value={fields.countryOfOrigin}
            onChange={(e) => updateField('countryOfOrigin', e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200"
            placeholder="India"
          />
        </div>

        <div>
          <label className="block text-slate-400 font-semibold mb-1 flex items-center space-x-1">
            <ShieldAlert className="w-3 h-3 text-blue-400" />
            <span>FSSAI 14-Digit Lic. No.</span>
          </label>
          <input
            type="text"
            value={fields.fssaiLicense}
            onChange={(e) => updateField('fssaiLicense', e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-mono"
            placeholder="10021011000342"
          />
        </div>
      </div>
    </div>
  );
};
