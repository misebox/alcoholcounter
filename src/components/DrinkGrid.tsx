import { For, Show } from 'solid-js';
import { drinkStore } from '@/stores/drinkStore';

export function DrinkGrid() {
  const { state } = drinkStore;

  return (
    <div class="drinks-grid">
      <Show
        when={state.drinks.length > 0}
        fallback={<div class="empty-state">飲み物を追加してください</div>}
      >
        <For each={state.drinks}>
          {(drink, index) => (
            <div style="position: relative;">
              <button
                class="drink-btn"
                onClick={() => drinkStore.recordDrink(index())}
              >
                <span>{drink.name}</span>
              </button>
              <button
                class="delete-btn"
                onClick={() => drinkStore.deleteDrink(index())}
              >
                ×
              </button>
            </div>
          )}
        </For>
      </Show>
    </div>
  );
}