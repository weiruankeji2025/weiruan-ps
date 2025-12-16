import type { HistoryItem } from '../types';

const HISTORY_KEY = 'bg_removal_history';
const MAX_HISTORY_ITEMS = 20;

export const getClientId = (): string => {
  let clientId = localStorage.getItem('client_id');
  if (!clientId) {
    clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('client_id', clientId);
  }
  return clientId;
};

export const getHistory = (): HistoryItem[] => {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const addToHistory = (item: Omit<HistoryItem, 'id'>): HistoryItem => {
  const history = getHistory();
  const newItem: HistoryItem = {
    ...item,
    id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };

  const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));

  return newItem;
};

export const removeFromHistory = (id: string): void => {
  const history = getHistory();
  const updatedHistory = history.filter(item => item.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
};

export const clearHistory = (): void => {
  localStorage.removeItem(HISTORY_KEY);
};
