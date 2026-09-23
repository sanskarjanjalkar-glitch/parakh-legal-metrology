import React, { useState, useRef, useEffect } from 'react';
import { BoundingBox } from '../../types/compliance';
import { FilterMode, applyCVFilter } from '../../services/cvFilterService';
import { Eye, Layers, Sliders, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface CanvasVisualizerProps {
  imageSrc: string;
  boxes: BoundingBox[];
  selectedBoxId: string | null;
  onSelectBox: (boxId: string | null) => void;
  pdpAreaCm2: number;
}

export const CanvasVisualizer: React.FC<CanvasVisualizerProps> = ({
  imageSrc,
  boxes,
  selectedBoxId,
  onSelectBox,
  pdpAreaCm2
}) => {
  const [filterMode, setFilterMode] = useState<FilterMode>('normal');
  const [processedImage, setProcessedImage] = useState<string>(imageSrc);
  const [showBoxes, setShowBoxes] = useState<boolean>(true);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setProcessedImage(imageSrc);
    setFilterMode('normal');
  }, [imageSrc]);

  const handleFilterChange = async (mode: FilterMode) => {
    setFilterMode(mode);
    if (!imgRef.current) return;
    try {
      const filtered = await applyCVFilter(imgRef.current, mode);
      setProcessedImage(filtered);
    } catch (err) {
      console.warn('Filter apply error:', err);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col">
      <div className="px-3 py-2 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-slate-300">Computer Vision Overlay</span>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
            PDP: {pdpAreaCm2} cm²
          </span>
        </div>

        <div className="flex items-center space-x-1 overflow-x-auto py-0.5">
          <button
            onClick={() => handleFilterChange('normal')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition ${
              filterMode === 'normal'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => handleFilterChange('clahe')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition flex items-center space-x-1 ${
              filterMode === 'clahe'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Contrast Limited Adaptive Histogram Equalization"
          >
            <span>CLAHE</span>
          </button>
          <button
            onClick={() => handleFilterChange('denoise')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition ${
              filterMode === 'denoise'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Denoise
          </button>
          <button
            onClick={() => handleFilterChange('high_contrast')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition ${
              filterMode === 'high_contrast'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Glare Reducer
          </button>

          <button
            onClick={() => setShowBoxes(!showBoxes)}
            className={`ml-1 px-2 py-1 rounded text-[11px] font-medium border flex items-center space-x-1 ${
              showBoxes
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>{showBoxes ? 'YOLOv8 Boxes ON' : 'Boxes OFF'}</span>
          </button>
        </div>
      </div>

      <div className="relative w-full aspect-[4/5] sm:aspect-[4/4.8] bg-slate-950 flex items-center justify-center p-3 overflow-hidden select-none">
        <div className="relative max-h-full max-w-full inline-block">
          <img
            ref={imgRef}
            src={processedImage}
            alt="Packaging inspection view"
            crossOrigin="anonymous"
            className="max-h-[500px] w-auto rounded-lg shadow-2xl object-contain"
          />

          {showBoxes &&
            boxes.map((box) => {
              const isSelected = selectedBoxId === box.id;
              const isFail = box.status === 'fail';
              const isWarn = box.status === 'warning';

              let borderColor = 'border-emerald-500';
              let bgColor = 'bg-emerald-500/10';
              let badgeColor = 'bg-emerald-600 text-white';

              if (isFail) {
                borderColor = 'border-rose-500';
                bgColor = 'bg-rose-500/20';
                badgeColor = 'bg-rose-600 text-white';
              } else if (isWarn) {
                borderColor = 'border-amber-500';
                bgColor = 'bg-amber-500/20';
                badgeColor = 'bg-amber-600 text-white';
              }

              return (
                <div
                  key={box.id}
                  onClick={() => onSelectBox(isSelected ? null : box.id)}
                  style={{
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    width: `${box.width}%`,
                    height: `${box.height}%`
                  }}
                  className={`absolute border-2 rounded cursor-pointer transition-all duration-150 ${borderColor} ${bgColor} ${
                    isSelected ? 'ring-4 ring-blue-400 ring-offset-2 ring-offset-slate-900 z-30' : 'z-10'
                  } ${isFail ? 'animate-pulse' : ''}`}
                >
                  <div
                    className={`absolute -top-5 left-0 px-1.5 py-0.2 text-[9px] font-bold rounded flex items-center space-x-1 shadow whitespace-nowrap pointer-events-none ${badgeColor}`}
                  >
                    {isFail ? (
                      <XCircle className="w-2.5 h-2.5" />
                    ) : (
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    )}
                    <span>{box.field}</span>
                    <span className="opacity-80 font-mono">({Math.round(box.confidence * 100)}%)</span>
                  </div>

                  {isSelected && (
                    <div className="absolute top-full left-0 mt-1 bg-slate-900 border border-slate-700 p-2.5 rounded-lg shadow-2xl text-[11px] text-slate-200 z-40 min-w-[220px] max-w-[280px]">
                      <div className="font-bold text-white flex items-center justify-between border-b border-slate-800 pb-1 mb-1">
                        <span>{box.label}</span>
                        <span className={`px-1 rounded text-[9px] font-mono ${badgeColor}`}>
                          {box.ruleCode}
                        </span>
                      </div>
                      <div className="text-slate-300 font-mono text-[10px] bg-slate-950 p-1.5 rounded border border-slate-800 my-1">
                        "{box.text}"
                      </div>
                      {box.measuredFontMm && (
                        <div className="text-[10px] text-slate-400">
                          Font Height: <strong className={isFail ? 'text-rose-400' : 'text-emerald-400'}>{box.measuredFontMm} mm</strong> (Rule 7 Min: {box.requiredFontMm} mm)
                        </div>
                      )}
                      {box.notes && (
                        <div className="text-[10px] text-amber-300 mt-1">
                          ⚠️ {box.notes}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      <div className="px-3 py-1.5 bg-slate-950 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
        <span>Click any highlighted box to inspect extracted spatial and font measurement</span>
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Passed</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>Violation</span>
          </span>
        </div>
      </div>
    </div>
  );
};
