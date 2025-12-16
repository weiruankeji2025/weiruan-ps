import { useState, useCallback, useRef } from 'react';
import { removeBackground } from '@imgly/background-removal';
import type { Config } from '@imgly/background-removal';
import type { ProcessingState } from '../types';
import { blobToDataUrl } from '../utils/imageUtils';

const config: Config = {
  debug: false,
  proxyToWorker: true,
  fetchArgs: {
    mode: 'cors',
  },
};

export const useBackgroundRemoval = () => {
  const [processingState, setProcessingState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    status: '',
    error: null,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const removeBackgroundFromImage = useCallback(
    async (imageSource: string | File | Blob): Promise<string | null> => {
      abortControllerRef.current = new AbortController();

      setProcessingState({
        isProcessing: true,
        progress: 0,
        status: '正在初始化模型...',
        error: null,
      });

      const startTime = performance.now();

      try {
        const result = await removeBackground(imageSource, {
          ...config,
          progress: (key: string, current: number, total: number) => {
            const progress = Math.round((current / total) * 100);
            let status = '处理中...';

            if (key.includes('fetch')) {
              status = '正在加载AI模型...';
            } else if (key.includes('compute')) {
              status = '正在分析图片...';
            } else if (key.includes('inference')) {
              status = '正在消除背景...';
            }

            setProcessingState((prev) => ({
              ...prev,
              progress,
              status,
            }));
          },
        });

        const dataUrl = await blobToDataUrl(result);
        const processingTime = Math.round(performance.now() - startTime);

        setProcessingState({
          isProcessing: false,
          progress: 100,
          status: `处理完成! 耗时: ${(processingTime / 1000).toFixed(2)}秒`,
          error: null,
        });

        return dataUrl;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '处理失败';
        setProcessingState({
          isProcessing: false,
          progress: 0,
          status: '',
          error: errorMessage,
        });
        return null;
      }
    },
    []
  );

  const cancelProcessing = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setProcessingState({
      isProcessing: false,
      progress: 0,
      status: '已取消',
      error: null,
    });
  }, []);

  const resetState = useCallback(() => {
    setProcessingState({
      isProcessing: false,
      progress: 0,
      status: '',
      error: null,
    });
  }, []);

  return {
    processingState,
    removeBackgroundFromImage,
    cancelProcessing,
    resetState,
  };
};
