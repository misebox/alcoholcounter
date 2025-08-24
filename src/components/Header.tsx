import { drinkStore, newDrinkName, setNewDrinkName } from '@/stores/drinkStore';

export function Header() {
  const handleAddDrink = () => {
    drinkStore.addDrink(newDrinkName());
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddDrink();
    }
  };

  return (
    <div class="header">
      <h1>🍺 Drink Counter</h1>
      <div class="add-drink-section">
        <input
          type="text"
          placeholder="飲み物を追加 (例: テキーラ)"
          value={newDrinkName()}
          onInput={(e) => setNewDrinkName(e.currentTarget.value)}
          onKeyPress={handleKeyPress}
        />
        <button class="btn-add" onClick={handleAddDrink}>
          追加
        </button>
      </div>
    </div>
  );
}