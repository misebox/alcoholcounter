import { Show, For, createMemo } from 'solid-js';
import { drinkStore } from '@/stores/drinkStore';
import { formatLocalTime, getCurrentDayKey, getDayOfWeek } from '@/utils/dateUtils';

export function TodaySection() {
  const { state } = drinkStore;
  
  const todayHistory = createMemo(() => drinkStore.getTodayHistory());
  
  const todaySummary = createMemo(() => {
    const summary: Record<string, number> = {};
    todayHistory().forEach(item => {
      summary[item.drink] = (summary[item.drink] || 0) + 1;
    });
    return summary;
  });
  
  const totalDrinks = createMemo(() => 
    Object.values(todaySummary()).reduce((sum, count) => sum + count, 0)
  );
  
  const currentDayKey = createMemo(() => 
    getCurrentDayKey(state.settings.cutOffTime)
  );
  
  const dayOfWeek = createMemo(() => 
    getDayOfWeek(currentDayKey())
  );

  return (
    <Show when={todayHistory().length > 0}>
      <div class="today-section">
        <div class="today-header">
          <h3 class="today-title">
            {currentDayKey()} {dayOfWeek()} の記録
          </h3>
        </div>
        <div class="today-summary">
          <div class="summary-items">
            <div style="margin-bottom: 10px; font-size: 20px; font-weight: bold;">
              合計: {totalDrinks()}杯
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
              <For each={Object.entries(todaySummary())}>
                {([drink, count]) => (
                  <span class="summary-item">{drink}: {count}杯</span>
                )}
              </For>
            </div>
          </div>
        </div>
        <div class="today-list">
          <For each={todayHistory().sort((a, b) => b.timestamp - a.timestamp)}>
            {(item) => {
              const globalIndex = state.history.findIndex(h => h.timestamp === item.timestamp);
              return (
                <div class="history-item">
                  <span class="history-drink">{item.drink}</span>
                  <div style="display: flex; gap: 10px; align-items: center;">
                    <span class="history-time">{formatLocalTime(item.timestamp)}</span>
                    <button 
                      class="history-delete-btn" 
                      onClick={() => drinkStore.deleteHistoryItem(globalIndex)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      </div>
    </Show>
  );
}