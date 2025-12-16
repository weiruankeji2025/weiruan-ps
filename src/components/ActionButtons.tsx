import { Download, Trash2, RefreshCw, Wand2 } from 'lucide-react';

interface ActionButtonsProps {
  hasOriginal: boolean;
  hasProcessed: boolean;
  isProcessing: boolean;
  onProcess: () => void;
  onDownload: () => void;
  onClear: () => void;
}

export const ActionButtons = ({
  hasOriginal,
  hasProcessed,
  isProcessing,
  onProcess,
  onDownload,
  onClear,
}: ActionButtonsProps) => {
  if (!hasOriginal) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 mt-6">
      {!hasProcessed && !isProcessing && (
        <button
          onClick={onProcess}
          className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg shadow-indigo-500/25 btn-glow"
        >
          <Wand2 className="w-5 h-5" />
          <span>开始处理</span>
        </button>
      )}

      {hasProcessed && (
        <>
          <button
            onClick={onDownload}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white font-medium hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/25 btn-glow"
          >
            <Download className="w-5 h-5" />
            <span>下载PNG</span>
          </button>
          <button
            onClick={onProcess}
            disabled={isProcessing}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-700/50 rounded-xl text-slate-300 font-medium hover:bg-slate-700 transition-all border border-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-5 h-5 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>重新处理</span>
          </button>
        </>
      )}

      <button
        onClick={onClear}
        disabled={isProcessing}
        className="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-700/50 rounded-xl text-slate-300 font-medium hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all border border-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Trash2 className="w-5 h-5" />
        <span>清除</span>
      </button>
    </div>
  );
};
