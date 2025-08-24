import type { Drink, HistoryItem, Settings } from '@/types';

const STORAGE_KEYS = {
  DRINKS: 'drinks',
  HISTORY: 'history',
  CUTOFF_TIME: 'cutOffTime',
  CUTOFF_HOUR: 'cutoffHour', // Legacy key for migration
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
    let cutOffTime = localStorage.getItem(STORAGE_KEYS.CUTOFF_TIME);
    
    // Migration from old cutoffHour to new cutOffTime format
    if (!cutOffTime) {
      const legacyHour = localStorage.getItem(STORAGE_KEYS.CUTOFF_HOUR);
      if (legacyHour) {
        const hour = parseInt(legacyHour, 10);
        cutOffTime = `${hour.toString().padStart(2, '0')}:00`;
        localStorage.setItem(STORAGE_KEYS.CUTOFF_TIME, cutOffTime);
        localStorage.removeItem(STORAGE_KEYS.CUTOFF_HOUR);
      } else {
        cutOffTime = '09:00'; // Default to 9:00 AM
      }
    }
    
    const showClearButton = localStorage.getItem(STORAGE_KEYS.SHOW_CLEAR_BUTTON);
    
    return {
      cutOffTime,
      showClearButton: showClearButton === 'true',
    };
  },

  saveCutOffTime(time: string): void {
    localStorage.setItem(STORAGE_KEYS.CUTOFF_TIME, time);
  },

  saveShowClearButton(show: boolean): void {
    localStorage.setItem(STORAGE_KEYS.SHOW_CLEAR_BUTTON, show.toString());
  },
};