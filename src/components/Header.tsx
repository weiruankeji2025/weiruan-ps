import { Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur opacity-30 -z-10"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                AI 背景消除
              </h1>
              <p className="text-sm text-slate-400">
                智能一键抠图，秒级处理
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-400">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>AI 模型在线</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
