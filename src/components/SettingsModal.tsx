import { Show } from 'solid-js';
import { drinkStore } from '@/stores/drinkStore';
import { getTimezoneInfo } from '@/utils/dateUtils';

export function SettingsModal() {
  const { state } = drinkStore;
  
  const handleCutoffTimeChange = (e: InputEvent) => {
    const input = e.currentTarget as HTMLInputElement;
    const [hours] = input.value.split(':');
    const hour = parseInt(hours ?? '12', 10);
    if (!isNaN(hour)) {
      drinkStore.updateCutoffHour(hour);
    }
  };
  
  const handleShowClearToggle = (e: InputEvent) => {
    const checkbox = e.currentTarget as HTMLInputElement;
    drinkStore.toggleShowClearButton(checkbox.checked);
  };
  
  const formatCutoffTime = () => {
    const hour = String(state.settings.cutoffHour).padStart(2, '0');
    return `${hour}:00`;
  };

  return (
    <Show when={state.modals.settings}>
      <div class="modal show" onClick={(e) => {
        if (e.target === e.currentTarget) {
          drinkStore.toggleSettingsModal();
        }
      }}>
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">⚙️ 設定</h2>
            <button class="modal-close" onClick={() => drinkStore.toggleSettingsModal()}>
              ×
            </button>
          </div>
          <div class="modal-body">
            <div class="settings-item">
              <span class="settings-label">日付の区切り時間</span>
              <input
                type="time"
                class="time-input"
                value={formatCutoffTime()}
                onInput={handleCutoffTimeChange}
              />
            </div>
            <div class="settings-item">
              <span class="settings-label">タイムゾーン</span>
              <span style="font-size: 14px; color: #666;">
                {getTimezoneInfo()}
              </span>
            </div>
            <div class="settings-item">
              <span class="settings-label">履歴クリアボタンを表示</span>
              <input
                type="checkbox"
                checked={state.settings.showClearButton}
                onInput={handleShowClearToggle}
              />
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
}