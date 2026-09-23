import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageDataUri: string) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  onCapture
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setCameraError('Camera access not permitted or device has no accessible video stream. You can still upload images or use the pre-loaded sample packages.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const captureFrame = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUri = canvas.toDataURL('image/jpeg', 0.95);
      onCapture(dataUri);
      stopCamera();
      onClose();
    }
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-between p-4 backdrop-blur-md">
      <div className="w-full max-w-lg flex items-center justify-between py-2 text-white">
        <div className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-blue-400" />
          <span className="font-bold text-sm">Mobile Label Scanner</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleCamera}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200"
            title="Switch Camera (Front / Back)"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative w-full max-w-lg aspect-[3/4] bg-slate-950 rounded-2xl overflow-hidden border border-slate-700 flex items-center justify-center">
        {cameraError ? (
          <div className="p-6 text-center text-slate-400 space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
            <p className="text-xs">{cameraError}</p>
            <button
              onClick={() => {
                stopCamera();
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold"
            >
              Use Sample Images Instead
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-8 border-2 border-dashed border-blue-400/70 rounded-xl pointer-events-none flex flex-col justify-between p-4">
              <div className="flex justify-between">
                <span className="w-4 h-4 border-t-2 border-l-2 border-blue-400"></span>
                <span className="w-4 h-4 border-t-2 border-r-2 border-blue-400"></span>
              </div>
              <div className="text-center">
                <span className="bg-slate-900/80 text-blue-300 text-[10px] font-mono px-2.5 py-1 rounded-full border border-blue-500/30">
                  Align Principal Display Panel (PDP) Here
                </span>
              </div>
              <div className="flex justify-between">
                <span className="w-4 h-4 border-b-2 border-l-2 border-blue-400"></span>
                <span className="w-4 h-4 border-b-2 border-r-2 border-blue-400"></span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-full max-w-lg py-4 flex flex-col items-center space-y-2">
        {!cameraError && (
          <button
            onClick={captureFrame}
            className="w-16 h-16 rounded-full border-4 border-white bg-blue-600 hover:bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/50 transition-transform active:scale-95"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
          </button>
        )}
        <p className="text-[11px] text-slate-400 text-center">
          Tap shutter to extract Legal Metrology declarations via Hybrid OCR
        </p>
      </div>
    </div>
  );
};
