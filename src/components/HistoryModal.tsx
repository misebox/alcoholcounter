import { Show, For, createSignal, createMemo } from 'solid-js';
import { drinkStore } from '@/stores/drinkStore';
import { formatLocalTime, getDayOfWeek } from '@/utils/dateUtils';

export function HistoryModal() {
  const { state } = drinkStore;
  const [expandedDays, setExpandedDays] = createSignal<Set<string>>(new Set());
  
  const historyByDay = createMemo(() => drinkStore.getHistoryByDay());
  
  const sortedDays = createMemo(() => 
    Object.keys(historyByDay()).sort((a, b) => b.localeCompare(a))
  );
  
  const toggleDay = (dayKey: string) => {
    setExpandedDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(dayKey)) {
        newSet.delete(dayKey);
      } else {
        newSet.add(dayKey);
      }
      return newSet;
    });
  };
  
  const getDaySummary = (dayData: typeof state.history) => {
    const summary: Record<string, number> = {};
    dayData.forEach(item => {
      summary[item.drink] = (summary[item.drink] || 0) + 1;
    });
    return summary;
  };

  return (
    <Show when={state.modals.history}>
      <div class="modal show" onClick={(e) => {
        if (e.target === e.currentTarget) {
          drinkStore.toggleHistoryModal();
        }
      }}>
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">📝 履歴</h2>
            <button class="modal-close" onClick={() => drinkStore.toggleHistoryModal()}>
              ×
            </button>
          </div>
          <div class="modal-body">
            <Show
              when={sortedDays().length > 0}
              fallback={<div class="empty-state">まだ記録がありません</div>}
            >
              <div class="history-list">
                <For each={sortedDays()}>
                  {(dayKey) => {
                    const dayData = historyByDay()[dayKey]!;
                    const summary = getDaySummary(dayData);
                    const totalDrinks = Object.values(summary).reduce((sum, count) => sum + count, 0);
                    
                    return (
                      <div class="day-group">
                        <div
                          class={`day-header ${expandedDays().has(dayKey) ? 'expanded' : ''}`}
                          onClick={() => toggleDay(dayKey)}
                        >
                          <div>
                            <div class="day-title">{dayKey} {getDayOfWeek(dayKey)}</div>
                            <div class="day-summary">合計: {totalDrinks}杯</div>
                          </div>
                          <span class="expand-icon">▼</span>
                        </div>
                        <div class={`day-content ${expandedDays().has(dayKey) ? 'expanded' : ''}`}>
                          <div class="summary" style="margin-bottom: 10px;">
                            <div class="summary-items">
                              <For each={Object.entries(summary)}>
                                {([drink, count]) => (
                                  <span class="summary-item">{drink}: {count}杯</span>
                                )}
                              </For>
                            </div>
                          </div>
                          <For each={dayData.sort((a, b) => b.timestamp - a.timestamp)}>
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
                    );
                  }}
                </For>
              </div>
              <Show when={state.settings.showClearButton}>
                <div style="display: flex; justify-content: center; margin-top: 20px;">
                  <button class="btn-clear-small" onClick={() => drinkStore.clearHistory()}>
                    履歴をクリア
                  </button>
                </div>
              </Show>
            </Show>
          </div>
        </div>
      </div>
    </Show>
  );
}