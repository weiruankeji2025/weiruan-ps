import { useState, useEffect, useCallback } from 'react';
import type { HistoryItem } from '../types';
import { getHistory, addToHistory, removeFromHistory, clearHistory } from '../utils/storage';

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const addItem = useCallback(
    (item: Omit<HistoryItem, 'id'>): HistoryItem => {
      const newItem = addToHistory(item);
      setHistory(getHistory());
      return newItem;
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    removeFromHistory(id);
    setHistory(getHistory());
  }, []);

  const clear = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  const refresh = useCallback(() => {
    setHistory(getHistory());
  }, []);

  return {
    history,
    addItem,
    removeItem,
    clear,
    refresh,
  };
};
