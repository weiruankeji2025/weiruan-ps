import { useState } from 'react';
import { History, Trash2, Download, ChevronDown, ChevronUp, Clock, X } from 'lucide-react';
import type { HistoryItem } from '../types';
import { downloadImage, formatTime } from '../utils/imageUtils';

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export const HistoryPanel = ({
  history,
  onSelect,
  onRemove,
  onClear,
}: HistoryPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (history.length === 0) return null;

  return (
    <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-700/30 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center">
            <History className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-left">
            <h3 className="text-white font-medium">历史记录</h3>
            <p className="text-sm text-slate-400">{history.length} 条记录</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('确定要清空所有历史记录吗？')) {
                onClear();
              }
            }}
            className="p-2 text-slate-400 hover:text-red-400 transition-colors"
            title="清空历史"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-slate-700/50">
          <div className="max-h-[400px] overflow-y-auto p-4 space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="group relative flex items-center space-x-4 p-3 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-all cursor-pointer"
                onClick={() => onSelect(item)}
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 checkerboard">
                  <img
                    src={item.processedImage}
                    alt={item.fileName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{item.fileName}</p>
                  <div className="flex items-center space-x-3 text-sm text-slate-400 mt-1">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(item.timestamp).toLocaleString('zh-CN')}</span>
                    </span>
                    <span>•</span>
                    <span>耗时 {formatTime(item.processingTime)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadImage(item.processedImage, item.fileName);
                    }}
                    className="p-2 text-slate-400 hover:text-green-400 transition-colors"
                    title="下载"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(item.id);
                    }}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    title="删除"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
