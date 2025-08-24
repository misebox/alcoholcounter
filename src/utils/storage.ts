import type { Drink, HistoryItem, Settings } from '@/types';

const STORAGE_KEYS = {
  DRINKS: 'drinks',
  HISTORY: 'history',
  CUTOFF_HOUR: 'cutoffHour',
  SHOW_CLEAR_BUTTON: 'showClearButton',
} as const;

export const storage = {
  getDrinks(): Drink[] {
    const saved = localStorage.getItem(STORAGE_KEYS.DRINKS);
    return saved ? JSON.parse(saved) : [];
  },

  saveDrinks(drinks: Drink[]): void {
    localStorage.setItem(STORAGE_KEYS.DRINKS, JSON.stringify(drinks));
  },

  getHistory(): HistoryItem[] {
    const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return saved ? JSON.parse(saved) : [];
  },

  saveHistory(history: HistoryItem[]): void {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  },

  getSettings(): Settings {
    const cutoffHour = localStorage.getItem(STORAGE_KEYS.CUTOFF_HOUR);
    const showClearButton = localStorage.getItem(STORAGE_KEYS.SHOW_CLEAR_BUTTON);
    
    return {
      cutoffHour: cutoffHour ? parseInt(cutoffHour, 10) : 12,
      showClearButton: showClearButton === 'true',
    };
  },

  saveCutoffHour(hour: number): void {
    localStorage.setItem(STORAGE_KEYS.CUTOFF_HOUR, hour.toString());
  },

  saveShowClearButton(show: boolean): void {
    localStorage.setItem(STORAGE_KEYS.SHOW_CLEAR_BUTTON, show.toString());
  },
};