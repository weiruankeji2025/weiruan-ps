export interface HistoryItem {
  id: string;
  originalImage: string;
  processedImage: string;
  timestamp: number;
  fileName: string;
  processingTime: number;
}

export interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  status: string;
  error: string | null;
}

export interface ImageState {
  originalImage: string | null;
  processedImage: string | null;
  fileName: string | null;
}
