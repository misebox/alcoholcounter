import { Header } from '@/components/Header';
import { DrinkGrid } from '@/components/DrinkGrid';
import { TodaySection } from '@/components/TodaySection';
import { HistoryModal } from '@/components/HistoryModal';
import { SettingsModal } from '@/components/SettingsModal';
import { drinkStore } from '@/stores/drinkStore';

export function App() {
  return (
    <div class="container">
      <button class="settings-btn" onClick={() => drinkStore.toggleSettingsModal()}>
        ⚙️
      </button>
      
      <Header />
      <DrinkGrid />
      <TodaySection />
      
      <button 
        class="btn-show-history" 
        onClick={() => drinkStore.toggleHistoryModal()}
      >
        📝 履歴を表示
      </button>
      
      <HistoryModal />
      <SettingsModal />
    </div>
  );
}