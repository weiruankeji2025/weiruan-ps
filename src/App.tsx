import { useState, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImagePreview } from './components/ImagePreview';
import { ProcessingStatus } from './components/ProcessingStatus';
import { ActionButtons } from './components/ActionButtons';
import { HistoryPanel } from './components/HistoryPanel';
import { Features } from './components/Features';
import { useBackgroundRemoval } from './hooks/useBackgroundRemoval';
import { useHistory } from './hooks/useHistory';
import { downloadImage } from './utils/imageUtils';
import type { ImageState, HistoryItem } from './types';

function App() {
  const [imageState, setImageState] = useState<ImageState>({
    originalImage: null,
    processedImage: null,
    fileName: null,
  });
  const processingStartTimeRef = useRef<number>(0);

  const { processingState, removeBackgroundFromImage, cancelProcessing, resetState } =
    useBackgroundRemoval();
  const { history, addItem, removeItem, clear: clearHistory } = useHistory();

  const handleImageSelect = useCallback((dataUrl: string, fileName: string) => {
    setImageState({
      originalImage: dataUrl,
      processedImage: null,
      fileName,
    });
    resetState();
  }, [resetState]);

  const handleProcess = useCallback(async () => {
    if (!imageState.originalImage) return;

    processingStartTimeRef.current = performance.now();
    const result = await removeBackgroundFromImage(imageState.originalImage);

    if (result && imageState.fileName) {
      setImageState((prev) => ({
        ...prev,
        processedImage: result,
      }));

      const processingTime = Math.round(performance.now() - processingStartTimeRef.current);

      addItem({
        originalImage: imageState.originalImage,
        processedImage: result,
        timestamp: Date.now(),
        fileName: imageState.fileName,
        processingTime,
      });
    }
  }, [imageState.originalImage, imageState.fileName, removeBackgroundFromImage, addItem]);

  const handleDownload = useCallback(() => {
    if (imageState.processedImage && imageState.fileName) {
      downloadImage(imageState.processedImage, imageState.fileName);
    }
  }, [imageState.processedImage, imageState.fileName]);

  const handleClear = useCallback(() => {
    setImageState({
      originalImage: null,
      processedImage: null,
      fileName: null,
    });
    resetState();
  }, [resetState]);

  const handleHistorySelect = useCallback((item: HistoryItem) => {
    setImageState({
      originalImage: item.originalImage,
      processedImage: item.processedImage,
      fileName: item.fileName,
    });
    resetState();
  }, [resetState]);

  return (
    <div className="min-h-screen gradient-bg">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <Header />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Hero Section */}
        {!imageState.originalImage && (
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              一键消除图片背景
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              AI 智能识别，自动抠图，高清透明 PNG 输出
            </p>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {!imageState.originalImage ? (
            <>
              <ImageUploader
                onImageSelect={handleImageSelect}
                disabled={processingState.isProcessing}
              />
              <Features />
            </>
          ) : (
            <>
              <ImagePreview
                originalImage={imageState.originalImage}
                processedImage={imageState.processedImage}
                isProcessing={processingState.isProcessing}
              />
              <ProcessingStatus
                state={processingState}
                onCancel={cancelProcessing}
              />
              <ActionButtons
                hasOriginal={!!imageState.originalImage}
                hasProcessed={!!imageState.processedImage}
                isProcessing={processingState.isProcessing}
                onProcess={handleProcess}
                onDownload={handleDownload}
                onClear={handleClear}
              />

              {/* Upload another image */}
              {!processingState.isProcessing && (
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <p className="text-sm text-slate-400 mb-3">或上传其他图片</p>
                  <ImageUploader
                    onImageSelect={handleImageSelect}
                    disabled={processingState.isProcessing}
                  />
                </div>
              )}
            </>
          )}

          {/* History Panel */}
          {history.length > 0 && (
            <div className="mt-8">
              <HistoryPanel
                history={history}
                onSelect={handleHistorySelect}
                onRemove={removeItem}
                onClear={clearHistory}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-slate-500">
          <p>所有图片处理均在本地完成，保护您的隐私安全</p>
          <p className="mt-2">Powered by AI Background Removal</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
