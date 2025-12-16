import { Zap, Shield, Smartphone, Cloud } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: '极速处理',
    description: '基于 WebGPU 加速的 AI 模型，秒级完成背景消除',
  },
  {
    icon: Shield,
    title: '隐私安全',
    description: '所有处理在本地完成，图片不会上传到任何服务器',
  },
  {
    icon: Smartphone,
    title: '全端适配',
    description: '支持电脑、平板、手机等各种设备访问使用',
  },
  {
    icon: Cloud,
    title: '无需安装',
    description: '纯网页应用，打开即用，无需下载安装任何软件',
  },
];

export const Features = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
      {features.map((feature, index) => (
        <div
          key={index}
          className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-indigo-500/30 hover:bg-slate-800/50 transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-3 group-hover:bg-indigo-500/20 transition-colors">
            <feature.icon className="w-5 h-5 text-indigo-400" />
          </div>
          <h4 className="text-white font-medium mb-1">{feature.title}</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};
