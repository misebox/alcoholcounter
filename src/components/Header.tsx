import { drinkStore, newDrinkName, setNewDrinkName } from '@/stores/drinkStore';
import { createSignal } from 'solid-js';

const DRINK_PRESETS = [
  'ビール',
  'ワイン',
  '日本酒',
  'ウイスキー',
  '焼酎',
  'ハイボール',
  'カクテル',
  'チューハイ',
  'ウォッカ',
  'ジン',
  'ラム',
  'テキーラ',
  'ブランデー',
  '梅酒',
];

export function Header() {
  const [showPresets, setShowPresets] = createSignal(false);

  const handleAddDrink = () => {
    drinkStore.addDrink(newDrinkName());
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddDrink();
    }
  };

  const handlePresetSelect = (preset: string) => {
    setNewDrinkName(preset);
    setShowPresets(false);
  };

  return (
    <div class="header">
      <h1>🍺 Drink Counter</h1>
      <div class="add-drink-section">
        <div class="input-with-dropdown">
          <input
            type="text"
            placeholder="飲み物を追加 (例: テキーラ)"
            value={newDrinkName()}
            onInput={(e) => setNewDrinkName(e.currentTarget.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setShowPresets(true)}
            onBlur={() => setTimeout(() => setShowPresets(false), 200)}
          />
          {showPresets() && (
            <div class="preset-dropdown">
              {DRINK_PRESETS.map(preset => (
                <button
                  class="preset-item"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handlePresetSelect(preset)}
                >
                  {preset}
                </button>
              ))}
            </div>
          )}
        </div>
        <button class="btn-add" onClick={handleAddDrink}>
          追加
        </button>
      </div>
    </div>
  );
}