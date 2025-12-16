import { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { fileToDataUrl } from '../utils/imageUtils';

interface ImageUploaderProps {
  onImageSelect: (dataUrl: string, fileName: string) => void;
  disabled?: boolean;
}

export const ImageUploader = ({ onImageSelect, disabled }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        alert('请选择图片文件');
        return;
      }

      const dataUrl = await fileToDataUrl(file);
      onImageSelect(dataUrl, file.name);
    },
    [onImageSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [disabled, handleFile]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  return (
    <div
      className={`
        relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer
        ${isDragging
          ? 'border-indigo-400 bg-indigo-500/10 scale-[1.02]'
          : 'border-slate-600 hover:border-indigo-500/50 hover:bg-slate-800/50'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        disabled={disabled}
      />
      <div className="p-12 text-center">
        <div
          className={`
            mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all
            ${isDragging
              ? 'bg-indigo-500/20 scale-110'
              : 'bg-slate-700/50'
            }
          `}
        >
          {isDragging ? (
            <ImageIcon className="w-10 h-10 text-indigo-400" />
          ) : (
            <Upload className="w-10 h-10 text-slate-400" />
          )}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {isDragging ? '释放以上传图片' : '拖拽图片到这里'}
        </h3>
        <p className="text-slate-400 mb-4">
          或点击选择文件
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
          <span>支持 JPG, PNG, WebP</span>
          <span>•</span>
          <span>最大 20MB</span>
        </div>
      </div>
    </div>
  );
};
