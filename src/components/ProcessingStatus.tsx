import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import type { ProcessingState } from '../types';

interface ProcessingStatusProps {
  state: ProcessingState;
  onCancel?: () => void;
}

export const ProcessingStatus = ({ state, onCancel }: ProcessingStatusProps) => {
  const { isProcessing, progress, status, error } = state;

  if (!isProcessing && !status && !error) return null;

  return (
    <div className="mt-6">
      {isProcessing && (
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
              <span className="text-white font-medium">{status}</span>
            </div>
            <button
              onClick={onCancel}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              取消
            </button>
          </div>
          <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 shimmer"></div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-slate-400">
            <span>处理进度</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}

      {!isProcessing && status && !error && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center space-x-3">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <span className="text-green-400">{status}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center space-x-3">
          <XCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-400">{error}</span>
        </div>
      )}
    </div>
  );
};
