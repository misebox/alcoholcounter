export interface Drink {
  name: string;
  count: number;
}

export interface HistoryItem {
  drink: string;
  timestamp: number;
}

export interface Settings {
  cutOffTime: string; // Format: "HH:MM"
  showClearButton: boolean;
}