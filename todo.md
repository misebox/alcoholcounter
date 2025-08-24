# Drink Counter Migration Todo

## Project Migration Plan
Migrating a simple Drink Counter application from vanilla HTML/JS to modern stack with Bun, TypeScript, SolidJS, and Pure.css

## Tech Stack
- **Runtime**: Bun
- **Language**: TypeScript
- **UI Framework**: SolidJS
- **CSS Framework**: Pure.css
- **Build Tool**: Vite
- **Package Manager**: Bun

## Migration Tasks

### 1. Project Setup
- [x] Write todo.md with project migration plan
- [ ] Initialize Bun project with TypeScript
- [ ] Install SolidJS and Pure.css dependencies
- [ ] Set up TypeScript configuration
- [ ] Create project structure and directories

### 2. Architecture
- [ ] Extract and convert styles to separate CSS file
- [ ] Create SolidJS components for main sections
- [ ] Implement state management with SolidJS stores
- [ ] Convert localStorage logic to TypeScript utilities

### 3. Build Configuration
- [ ] Set up Vite for development and build
- [ ] Create index.html entry point
- [ ] Test the migrated application

## Project Structure
```
alcoholcounter/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── DrinkGrid.tsx
│   │   ├── TodaySection.tsx
│   │   ├── HistoryModal.tsx
│   │   └── SettingsModal.tsx
│   ├── stores/
│   │   └── drinkStore.ts
│   ├── utils/
│   │   ├── storage.ts
│   │   └── dateUtils.ts
│   ├── styles/
│   │   └── main.css
│   ├── types/
│   │   └── index.ts
│   └── App.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── bun.lockb
```

## Features to Migrate
1. **Drink Management**
   - Add new drinks
   - Delete drinks
   - Record drink consumption

2. **History Tracking**
   - Display today's consumption
   - View historical data grouped by day
   - Delete individual history items
   - Clear all history

3. **Settings**
   - Configure day cutoff time
   - Display timezone information
   - Toggle clear history button visibility

4. **Data Persistence**
   - localStorage for drinks list
   - localStorage for history
   - localStorage for settings

## Component Breakdown
- **App**: Main application container
- **Header**: Title and add drink input
- **DrinkGrid**: Grid of drink buttons
- **TodaySection**: Today's consumption summary
- **HistoryModal**: Historical data viewer
- **SettingsModal**: Application settings

## State Management
- Drinks array with count
- History array with timestamps
- Settings (cutoff hour, show clear button)
- Modal visibility states