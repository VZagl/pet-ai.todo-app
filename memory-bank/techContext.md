# Memory Bank: Technical Context

## Current Technical Stack

### Frontend
- **React**: 19.2.3 (latest)
- **React DOM**: 19.2.3
- **TypeScript**: 5.9.3

### Build & Development
- **Vite**: 7.3.0
- **@vitejs/plugin-react-swc**: 4.2.2 (SWC для быстрой компиляции)

### Testing
- **Vitest**: 4.0.16
- **@vitest/ui**: 4.0.16
- **@testing-library/react**: 16.3.1
- **@testing-library/jest-dom**: 6.9.1
- **@testing-library/user-event**: 14.6.1
- **jsdom**: 27.3.0

### Code Quality
- **ESLint**: 9.39.2
  - @eslint/js: 9.39.2
  - eslint-plugin-react-hooks: 7.0.1
  - eslint-plugin-react-refresh: 0.4.26
  - typescript-eslint: 8.50.1
- **Prettier**: 3.7.4
  - prettier-plugin-css-order: 2.1.2
  - prettier-plugin-organize-attributes: 1.0.0
  - prettier-plugin-organize-imports: 4.3.0

### Package Management
- **pnpm**: 10.26.2 (enforced via preinstall hook)

## Development Environment
- **Platform**: Windows 10 (Build 17763)
- **Shell**: PowerShell
- **Node.js**: Требуется для работы (версия будет проверена)

## Available Scripts
- `pnpm dev` - Запуск dev сервера
- `pnpm build` - Сборка для продакшена
- `pnpm lint` - Проверка кода
- `pnpm preview` - Предпросмотр сборки
- `pnpm test` - Запуск тестов
- `pnpm test:ui` - Запуск тестов с UI
- `pnpm test:coverage` - Проверка покрытия тестами

## Configuration Files
- `vite.config.ts` - Конфигурация Vite
- `tsconfig.json` - Основная конфигурация TypeScript
- `tsconfig.app.json` - Конфигурация для приложения
- `tsconfig.node.json` - Конфигурация для Node.js
- `eslint.config.js` - Конфигурация ESLint
- `vitest.setup.ts` - Настройка Vitest

## Dependencies Status
✅ Все зависимости установлены (node_modules присутствует)
✅ Используется современный стек (React 19, Vite 7)
✅ Настроено тестирование
✅ Настроены инструменты качества кода
