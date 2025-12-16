import { useState } from 'react';
import { Eye, EyeOff, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ImagePreviewProps {
  originalImage: string | null;
  processedImage: string | null;
  isProcessing: boolean;
}

export const ImagePreview = ({
  originalImage,
  processedImage,
  isProcessing,
}: ImagePreviewProps) => {
  const [showOriginal, setShowOriginal] = useState(false);
  const [zoom, setZoom] = useState(1);

  const displayImage = showOriginal ? originalImage : (processedImage || originalImage);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const handleReset = () => setZoom(1);

  if (!originalImage) return null;

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-800/50 border border-slate-700/50">
      {/* Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {processedImage && (
            <button
              onClick={() => setShowOriginal(!showOriginal)}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 text-white hover:bg-slate-800/80 transition-all"
            >
              {showOriginal ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  <span className="text-sm">显示原图</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">显示处理后</span>
                </>
              )}
            </button>
          )}
        </div>
        <div className="flex items-center space-x-1 px-2 py-1 rounded-xl bg-slate-900/80 backdrop-blur-sm border border-slate-700/50">
          <button
            onClick={handleZoomOut}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-sm text-slate-300 w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-slate-700 mx-1"></div>
          <button
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Image Container */}
      <div className="relative overflow-auto max-h-[500px] min-h-[300px]">
        <div
          className={`
            flex items-center justify-center p-8 transition-all duration-300
            ${!processedImage || showOriginal ? 'bg-slate-900' : 'checkerboard'}
          `}
        >
          <div
            className="relative transition-transform duration-300"
            style={{ transform: `scale(${zoom})` }}
          >
            <img
              src={displayImage || ''}
              alt="Preview"
              className={`
                max-w-full max-h-[400px] object-contain rounded-lg shadow-2xl
                ${isProcessing ? 'opacity-50 blur-sm' : ''}
              `}
            />
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Badge */}
      {processedImage && !showOriginal && (
        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-sm flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          <span>背景已移除</span>
        </div>
      )}
    </div>
  );
};
