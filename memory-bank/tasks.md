# Memory Bank: Tasks

## Current Task

Переход с CSS на SCSS

## Task ID

css-to-scss-migration-001

## Complexity Level

**Level 2** - Simple Enhancement

**Обоснование:**

- Локальное изменение, не затрагивающее архитектуру
- Требуется изменение 8+ файлов (переименование и рефакторинг)
- Низкий риск регрессий (стили изолированы)
- Требуется добавление зависимости `sass-embedded`
- Минимальное влияние на логику приложения
- Есть небольшие архитектурные решения (структура переменных, миксинов)

**Workflow:** VAN → PLAN → BUILD → REFLECT → ARCHIVE

## Status

✅ **COMPLETED** - Implementation Complete, Ready for Reflection

- [x] Инициализация Memory Bank
- [x] Определение уровня сложности
- [x] Планирование задачи
- [x] Создание ветки `feature/css-to-scss-migration`
- [x] Коммит плана (commit 31fdd69)
- [x] Реализация (BUILD)
  - [x] Setup: Установка sass-embedded
  - [x] Setup: Создание \_variables.scss и \_mixins.scss
  - [x] Global: fonts.scss и index.scss
  - [x] Components: 6 компонентов
- [x] Тестирование
  - [x] Dev server запускается успешно
  - [x] 116/116 тестов проходят успешно ✅
  - [x] Production build успешен
- [ ] Рефлексия (REFLECT)
- [ ] Архивирование (ARCHIVE)

## Description

Преобразование существующих CSS-файлов в SCSS с использованием возможностей препроцессора (переменные, миксины, вложенность) для улучшения поддерживаемости стилей и Developer Experience.

## Technology Stack

- Framework: React 19.2.3
- Build Tool: Vite 7.3.0
- Language: TypeScript 5.9.3
- Package Manager: pnpm 10.26.2
- **New:** sass-embedded (для поддержки SCSS)

## Requirements

### Функциональные требования (FR)

1. **FR-01**: Установить `sass-embedded` как dev-зависимость
2. **FR-02**: Создать структуру SCSS (переменные, миксины)
3. **FR-03**: Преобразовать все CSS файлы в SCSS (8 файлов)
4. **FR-04**: Использовать возможности SCSS (вложенность, переменные, миксины)
5. **FR-05**: Обновить импорты в компонентах и main.tsx

### Нефункциональные требования (NFR)

1. **NFR-01**: Визуальное отображение не должно измениться
2. **NFR-02**: Все 116 тестов должны пройти успешно
3. **NFR-03**: Dev-сервер и production build должны работать
4. **NFR-04**: Поддержка hot reload для SCSS

## Files to Modify

### CSS файлы для преобразования (8):

- `src/styles/fonts.css` → `src/styles/fonts.scss`
- `src/index.css` → `src/index.scss`
- `src/components/TodoApp/TodoApp.css` → `src/components/TodoApp/TodoApp.scss`
- `src/components/TodoInput/TodoInput.css` → `src/components/TodoInput/TodoInput.scss`
- `src/components/TodoList/TodoList.css` → `src/components/TodoList/TodoList.scss`
- `src/components/TodoItem/TodoItem.css` → `src/components/TodoItem/TodoItem.scss`
- `src/components/TodoFilter/TodoFilter.css` → `src/components/TodoFilter/TodoFilter.scss`
- `src/components/TodoFooter/TodoFooter.css` → `src/components/TodoFooter/TodoFooter.scss`

### Новые SCSS файлы:

- `src/styles/_variables.scss` - общие переменные
- `src/styles/_mixins.scss` - переиспользуемые миксины

### Компоненты для обновления импортов (7):

- `src/main.tsx`
- `src/components/TodoApp/TodoApp.tsx`
- `src/components/TodoInput/TodoInput.tsx`
- `src/components/TodoList/TodoList.tsx`
- `src/components/TodoItem/TodoItem.tsx`
- `src/components/TodoFilter/TodoFilter.tsx`
- `src/components/TodoFooter/TodoFooter.tsx`

## Implementation Plan

### Phase 1: Подготовка

1. Установить `sass-embedded` через pnpm
2. Создать структуру SCSS файлов (\_variables.scss, \_mixins.scss)

### Phase 2: Преобразование глобальных стилей

3. Преобразовать `src/styles/fonts.css` → `fonts.scss`
4. Преобразовать `src/index.css` → `index.scss`
5. Обновить импорты в `src/main.tsx`

### Phase 3: Преобразование стилей компонентов

6. Преобразовать CSS компонентов в SCSS (6 файлов)
7. Обновить импорты в компонентах
8. Применить SCSS возможности (вложенность, переменные)

### Phase 4: Тестирование

9. Запустить dev-сервер и проверить визуальное отображение
10. Запустить тесты (116 тестов)
11. Проверить production build

## Dependencies

- `sass-embedded` - современная быстрая реализация Dart Sass

## Challenges & Mitigations

- **CSS Custom Properties vs SCSS переменные**: Оставить CSS custom properties для динамических значений, использовать SCSS переменные для статических
- **Порядок импортов**: Убедиться, что \_variables.scss импортируется первым
- **Hot reload**: Vite автоматически поддерживает SCSS, проверить работу HMR

## Success Metrics

- ✅ Все CSS файлы преобразованы в SCSS
- ✅ Используются SCSS возможности (вложенность, переменные, миксины)
- ✅ Визуальное отображение не изменилось
- ✅ 116 тестов проходят успешно
- ✅ Dev-сервер и production build работают
- ✅ Hot reload работает для SCSS файлов
