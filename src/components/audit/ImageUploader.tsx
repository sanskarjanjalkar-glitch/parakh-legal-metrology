import React, { useRef } from 'react';
import { UploadCloud, Camera, Sparkles, Image as ImageIcon } from 'lucide-react';
import { SAMPLE_INSPECTION_DATA } from '../../data/sampleProducts';
import { InspectionRecord } from '../../types/compliance';

interface ImageUploaderProps {
  onImageSelected: (dataUri: string, isSample?: boolean, sampleRecord?: InspectionRecord) => void;
  onOpenCamera: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  onOpenCamera
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageSelected(event.target.result as string, false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageSelected(event.target.result as string, false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      {/* Drag & Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-cyan-400 hover:border-cyan-600 bg-cyan-50/40 hover:bg-cyan-50/80 rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 group flex flex-col items-center justify-center space-y-1.5"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="p-2 rounded-xl bg-cyan-600/10 text-cyan-700 group-hover:scale-110 transition-transform">
          <UploadCloud className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-800">
            Upload Packaging Photo (JPG / PNG)
          </p>
          <p className="text-[11px] text-slate-500">
            Click to upload your packaging photo or drag & drop here
          </p>
        </div>
      </div>

      {/* Camera Button */}
      <button
        onClick={onOpenCamera}
        className="w-full bg-slate-100 hover:bg-cyan-50 border border-slate-300 hover:border-cyan-400 text-slate-800 text-xs font-bold py-2 px-3 rounded-xl shadow-xs flex items-center justify-center space-x-2 transition"
      >
        <Camera className="w-4 h-4 text-cyan-600" />
        <span>Open Camera Scanner (Mobile / Web)</span>
      </button>

      {/* 1-Click Evaluation Chips for Judges / Demo */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 mb-1.5 font-bold uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Instant Sample Packages:</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {SAMPLE_INSPECTION_DATA.slice(0, 3).map((sample) => {
            const isFail = sample.overallStatus === 'NON_COMPLIANT_FAIL';

            return (
              <button
                key={sample.id}
                onClick={() => onImageSelected(sample.imageUri, true, sample)}
                className="bg-slate-50 hover:bg-cyan-50/60 border border-slate-200 hover:border-cyan-400 p-2 rounded-xl text-left transition flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-bold text-slate-900 line-clamp-1">
                    {sample.brandName}
                  </div>
                  <div className="text-[10px] text-slate-500 line-clamp-1">
                    {sample.productName}
                  </div>
                </div>

                <div className="mt-1 flex items-center justify-between">
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      isFail
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isFail ? 'Fail (73%)' : 'Pass'}
                  </span>
                  <span className="text-[10px] text-cyan-700 font-bold">Load</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
