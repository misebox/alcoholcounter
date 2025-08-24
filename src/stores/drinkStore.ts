import { createStore } from 'solid-js/store';
import { createSignal } from 'solid-js';
import type { Drink, HistoryItem, Settings } from '@/types';
import { storage } from '@/utils/storage';
import { getCurrentDayKey, getDayKey } from '@/utils/dateUtils';

interface StoreState {
  drinks: Drink[];
  history: HistoryItem[];
  settings: Settings;
  modals: {
    history: boolean;
    settings: boolean;
  };
}

const [state, setState] = createStore<StoreState>({
  drinks: storage.getDrinks(),
  history: storage.getHistory(),
  settings: storage.getSettings(),
  modals: {
    history: false,
    settings: false,
  },
});

export const [newDrinkName, setNewDrinkName] = createSignal('');

export const drinkStore = {
  state,
  
  addDrink(name: string) {
    const trimmedName = name.trim();
    if (!trimmedName || state.drinks.some(d => d.name === trimmedName)) {
      return;
    }
    
    setState('drinks', drinks => [...drinks, { name: trimmedName, count: 0 }]);
    storage.saveDrinks(state.drinks);
    setNewDrinkName('');
  },
  
  deleteDrink(index: number) {
    const drink = state.drinks[index];
    if (!drink || !confirm(`${drink.name}を削除しますか？`)) {
      return;
    }
    
    setState('drinks', drinks => drinks.filter((_, i) => i !== index));
    storage.saveDrinks(state.drinks);
  },
  
  recordDrink(index: number) {
    const drink = state.drinks[index];
    if (!drink) return;
    
    setState('drinks', index, 'count', count => count + 1);
    
    const historyItem: HistoryItem = {
      drink: drink.name,
      timestamp: Date.now(),
    };
    
    setState('history', history => [historyItem, ...history]);
    
    storage.saveDrinks(state.drinks);
    storage.saveHistory(state.history);
  },
  
  deleteHistoryItem(index: number) {
    const item = state.history[index];
    if (!item) return;
    
    const formattedTime = new Date(item.timestamp).toLocaleString();
    if (!confirm(`${item.drink} (${formattedTime}) を削除しますか？`)) {
      return;
    }
    
    setState('history', history => history.filter((_, i) => i !== index));
    
    const drinkIndex = state.drinks.findIndex(d => d.name === item.drink);
    if (drinkIndex !== -1 && state.drinks[drinkIndex]!.count > 0) {
      setState('drinks', drinkIndex, 'count', count => Math.max(0, count - 1));
    }
    
    storage.saveDrinks(state.drinks);
    storage.saveHistory(state.history);
  },
  
  clearHistory() {
    if (!confirm('履歴をすべて削除しますか？')) {
      return;
    }
    
    setState('history', []);
    setState('drinks', drinks => 
      drinks.map(d => ({ ...d, count: 0 }))
    );
    
    storage.saveDrinks(state.drinks);
    storage.saveHistory(state.history);
  },
  
  updateCutOffTime(time: string) {
    setState('settings', 'cutOffTime', time);
    storage.saveCutOffTime(time);
  },
  
  toggleShowClearButton(show: boolean) {
    setState('settings', 'showClearButton', show);
    storage.saveShowClearButton(show);
  },
  
  toggleHistoryModal() {
    setState('modals', 'history', show => !show);
  },
  
  toggleSettingsModal() {
    setState('modals', 'settings', show => !show);
  },
  
  getTodayHistory() {
    const currentDayKey = getCurrentDayKey(state.settings.cutOffTime);
    return state.history.filter(item => 
      getDayKey(item.timestamp, state.settings.cutOffTime) === currentDayKey
    );
  },
  
  getHistoryByDay() {
    const currentDayKey = getCurrentDayKey(state.settings.cutOffTime);
    const dayGroups: Record<string, HistoryItem[]> = {};
    
    state.history.forEach(item => {
      const dayKey = getDayKey(item.timestamp, state.settings.cutOffTime);
      if (dayKey !== currentDayKey) {
        if (!dayGroups[dayKey]) {
          dayGroups[dayKey] = [];
        }
        dayGroups[dayKey]!.push(item);
      }
    });
    
    return dayGroups;
  },
};