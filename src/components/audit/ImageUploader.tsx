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
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Upload Product Packaging Image
        </h3>
        <span className="text-[11px] text-blue-400 font-medium">
          Supports JPG, PNG, WebP
        </span>
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-slate-700 hover:border-blue-500/80 bg-slate-950/60 hover:bg-slate-900/80 rounded-xl p-5 text-center cursor-pointer transition-all duration-200 group flex flex-col items-center justify-center space-y-2"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="p-3 rounded-full bg-blue-600/10 group-hover:bg-blue-600/20 text-blue-400 group-hover:scale-110 transition-transform">
          <UploadCloud className="w-7 h-7" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-200">
            Drag and Drop Zone
          </p>
          <p className="text-[11px] text-slate-400">
            Browse files or drop packaging snapshot here
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={onOpenCamera}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold py-2.5 px-3 rounded-xl shadow-lg shadow-blue-600/20 flex items-center justify-center space-x-2 transition"
        >
          <Camera className="w-4 h-4" />
          <span>Camera Capture (Mobile & Web)</span>
        </button>
      </div>

      <div className="pt-2 border-t border-slate-800">
        <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold text-slate-300">
            1-Click PPT Demo Case Studies (Instant Evaluation):
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SAMPLE_INSPECTION_DATA.map((sample) => {
            const isFail = sample.overallStatus === 'NON_COMPLIANT_FAIL';
            const isCounterfeit = sample.overallStatus === 'COUNTERFEIT_FLAGGED';

            return (
              <button
                key={sample.id}
                onClick={() => onImageSelected(sample.imageUri, true, sample)}
                className="bg-slate-950 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-600 p-2.5 rounded-lg text-left transition flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-200 line-clamp-1">
                    {sample.brandName}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">
                    {sample.productName}
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      isFail
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : isCounterfeit
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {isFail ? 'Fail (Slide 6)' : isCounterfeit ? 'Counterfeit Alert' : '100% Pass'}
                  </span>
                  <span className="text-[10px] text-blue-400 font-mono">Load</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
