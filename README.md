# 🍺 Drink Counter

A modern web application for tracking beverage consumption with daily history and customizable settings.

## Features

- **Quick Drink Recording** - One-tap recording with preset drink options
- **Daily Tracking** - View today's consumption at a glance
- **History Management** - Browse and manage historical data by day
- **Customizable Settings** - Set custom day cutoff times for shift workers
- **Data Persistence** - All data saved locally in browser storage
- **Responsive Design** - Works seamlessly on mobile and desktop

## Tech Stack

- **Runtime**: [Bun](https://bun.sh) - Fast all-in-one JavaScript runtime
- **Framework**: [SolidJS](https://www.solidjs.com/) - Reactive UI library
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Pure.css](https://purecss.io/) - Minimal CSS framework
- **Build Tool**: [Vite](https://vitejs.dev/) - Fast build tool with HMR

## Installation

```bash
# Install dependencies
bun install
```

## Development

```bash
# Start development server with hot reload
bun run dev

# Server runs at http://localhost:3000
```

## Build

```bash
# Build for production
bun run build

# Preview production build
bun run preview
```

## Project Structure

```
src/
├── components/     # UI components
│   ├── Header.tsx        # App header with drink input
│   ├── DrinkGrid.tsx     # Grid of drink buttons
│   ├── TodaySection.tsx  # Today's consumption summary
│   ├── HistoryModal.tsx  # Historical data viewer
│   └── SettingsModal.tsx # App settings
├── stores/         # State management
│   └── drinkStore.ts     # Central state store
├── utils/          # Utility functions
│   ├── storage.ts        # LocalStorage helpers
│   └── dateUtils.ts      # Date/time utilities
├── types/          # TypeScript definitions
│   └── index.ts          # Type interfaces
├── styles/         # CSS files
│   └── main.css          # Global styles
└── App.tsx         # Root component
```

## Usage

1. **Add Drinks**: Enter a drink name or select from presets
2. **Record Consumption**: Click drink buttons to record
3. **View History**: Click "履歴を表示" to see past records
4. **Adjust Settings**: Configure day cutoff time for shift schedules
5. **Delete Records**: Remove individual entries or clear all history

## Features in Detail

### Day Cutoff Time
Set a custom cutoff time (default 9:00 AM) to determine when a new "day" begins. Useful for night shift workers or custom tracking periods.

### Data Storage
All data is stored locally in the browser using localStorage:
- Drink list and counts
- Consumption history with timestamps
- User preferences and settings

### Privacy
No data is sent to external servers. All information remains on your device.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Private project - All rights reserved
