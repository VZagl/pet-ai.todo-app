# Memory Bank: Tasks

## Current Task

**Task ID:** theming-001  
**Название:** Двухслойная система тематизации (Color Scheme + Theme Variants)  
**Уровень:** Level 3 — Intermediate Feature  
**Ветка:** `feat/theming-001-two-layer-theming`  
**Источник:** [`memory-bank/backlog.md`](backlog.md) (строки 25–60)

**Статус:** BUILD complete → REFLECT complete → ARCHIVE

**Слой 1:** Color Scheme (светлый/тёмный режим)  
**Слой 2:** Theme Variants (Ocean, Forest, Sunset, Lavender)

---

## Description

Двухслойная система тематизации для pet.todo: первый слой — выбор светлого/тёмного режима (с учётом системных настроек), второй — выбор цветовой темы (Ocean, Forest, Sunset, Lavender). Каждая тема имеет light и dark варианты. Реализация на CSS Custom Properties, дизайн-токенах и React Context.

## Complexity

- **Level:** 3 (Intermediate Feature)
- **Type:** Feature — новая функциональность, затрагивающая несколько компонентов

## Technology Stack

- **Framework:** React 19
- **Build Tool:** Vite 7
- **Language:** TypeScript 5.9
- **Стили:** SCSS (sass-embedded), CSS Custom Properties
- **Хранение настроек:** localStorage (через существующий `storage.ts`)

## Technology Validation Checkpoints

- [x] Проект инициализирован, зависимости установлены
- [x] Стек технологий определён (React, Vite, SCSS)
- [x] CSS Custom Properties уже используются в `index.scss`
- [x] `useLocalStorage` и `storage.ts` доступны для персистентности
- [ ] Тестовая сборка после рефакторинга CSS

## Requirements Analysis

### Core Requirements

- [ ] **Слой 1 — Color Scheme:**
  - Автоматическое определение системных настроек (`prefers-color-scheme: light | dark`)
  - Ручное переключение: авто / светлая / тёмная
  - Базовые цветовые переменные (фон, текст, границы, тени)
- [ ] **Слой 2 — Theme Variants:**
  - 5 вариантов: Default (текущая палитра Option B) + Ocean, Forest, Sunset, Lavender
  - Default — fallback при отсутствии сохранённых настроек; также выбираемый вариант в селекторе тем
  - Каждая тема имеет light и dark варианты (10 наборов цветов)
  - Accent-цвета и семантические цвета (success, warning, error)
- [ ] **Техническая реализация:**
  - CSS Custom Properties для всех цветов
  - Система дизайн-токенов: `src/styles/tokens/`
  - Хук `useTheme()` для управления темами
  - ThemeContext для провайдинга состояния
- [ ] **UI компоненты** (уточнить в Creative phase):
  - Переключатель Color Scheme (авто / светлая / тёмная) — формат, расположение
  - Селектор Theme Variant (список тем с превью) — формат превью, способ выбора
  - Компонент настроек тем в header — компоновка (рядом с LanguageSwitcher, объединённый dropdown и т.д.)
- [ ] **Сохранение и синхронизация:**
  - localStorage для пользовательских настроек
  - Синхронизация между вкладками (storage event)
  - Fallback при отсутствии сохранённых настроек: themeVariant = Default, colorScheme = auto (текущая палитра)
- [ ] **TypeScript типизация:**
  - Типы для theme config
  - Typed CSS переменные (интерфейсы)
  - Theme context типы

### Technical Constraints

- Не менять существующий стек (React, Vite, SCSS)
- Сохранить совместимость с текущими компонентами
- Минимизировать breaking changes в SCSS (переход с `$var` на `var(--var)`)

## Component Analysis

### Новые компоненты

| Компонент           | Назначение                                                            | Зависимости                                   |
| ------------------- | --------------------------------------------------------------------- | --------------------------------------------- |
| `ThemeProvider`     | Контекст тем, применение CSS переменных на `document.documentElement` | storage, media query                          |
| `useTheme`          | Хук доступа к theme state и setters                                   | ThemeProvider                                 |
| `ThemeToggle`       | Переключатель светлая/тёмная (sun/moon иконки)                        | useTheme                                      |
| `SettingsButton`    | Кнопка открытия модалки настроек (settings иконка)                    | —                                             |
| `SettingsModal`     | Модальное окно настроек (overlay + табы)                              | useTheme                                      |
| `ThemeSelectionTab` | Таб выбора темы: мини-карточки, Принять/Отказаться                    | useTheme                                      |
| `HeaderControls`    | Контейнер: ThemeToggle \| LanguageSwitcher \| SettingsButton (flex)   | ThemeToggle, LanguageSwitcher, SettingsButton |

### Затрагиваемые компоненты

| Компонент               | Изменения                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| `_variables.scss`       | Рефакторинг: оставить только spacing, radius, typography, breakpoints; цвета убрать      |
| `index.scss`            | Загрузка токенов, применение переменных через `:root` / `[data-theme]`                   |
| `_mixins.scss`          | focus-outline, focus-shadow: использовать `var(--color-primary)` вместо `$color-primary` |
| `TodoApp.scss`          | Заменить `$color-*` на `var(--color-*)`                                                  |
| `TodoItem.scss`         | То же                                                                                    |
| `TodoInput.scss`        | То же                                                                                    |
| `TodoFilter.scss`       | То же                                                                                    |
| `TodoFooter.scss`       | То же                                                                                    |
| `TodoList.scss`         | То же                                                                                    |
| `LanguageSwitcher.scss` | То же                                                                                    |
| `App.tsx`               | Обернуть в `ThemeProvider`                                                               |
| `TodoApp.tsx`           | Добавить `ThemeSettings` / `ThemeToggle` в header                                        |

### Взаимодействия

```
App.tsx
  └── ThemeProvider (новый)
        └── TodoProvider
              └── TodoApp
                    ├── header: HeaderControls (ThemeToggle | LanguageSwitcher | SettingsButton)
                    ├── SettingsModal (при открытии)
                    ├── TodoInput, TodoList, TodoFooter
```

## Implementation Plan

### Phase 1: Дизайн-токены и структура тем

1. **Создать `src/styles/tokens/`**
   - [x] `_tokens.scss` — базовые имена переменных (без значений)
   - [x] Документировать схему: `--color-primary`, `--color-bg`, `--color-text` и т.д.

2. **Создать `src/styles/themes/`**
   - [x] `theme-types.ts` — типы: `ColorScheme`, `ThemeVariant`, `ThemeConfig`
   - [x] `theme-definitions.ts` — объекты с цветами для каждой комбинации (5 тем × 2 схемы = 10 наборов)
   - [x] Пример структуры: `{ default: { light: {...}, dark: {...} }, ocean: {...}, forest: {...}, ... }`
   - [x] `default` — текущая палитра Option B (light + dark варианты)

3. **Определить палитры для 5 тем**
   - [x] Default: Option B light/dark (см. creative-theming-palettes.md)
   - [x] Ocean, Forest, Sunset, Lavender: light и dark варианты утверждены

### Phase 2: ThemeContext и useTheme

4. **Создать `src/contexts/ThemeProvider.tsx`**
   - [x] Состояние: `colorScheme`, `themeVariant`
   - [x] Определение эффективной схемы: при `auto` — `prefers-color-scheme`
   - [x] Применение переменных: `document.documentElement.style.setProperty(...)`
   - [x] Персистентность: `loadFromStorage`/`saveToStorage`
   - [x] Синхронизация между вкладками: `window.addEventListener('storage', ...)`

5. **Создать `src/hooks/use-theme.ts`**
   - [x] `useTheme()` → `{ colorScheme, themeVariant, setColorScheme, setThemeVariant, effectiveScheme }`
   - [x] Реэкспорт типов из theme-types

### Phase 3: Рефакторинг стилей

6. **Обновить `_variables.scss`**
   - [x] Удалить цветовые переменные (`$color-*`, `$gradient-bg`)
   - [x] Оставить: spacing, radius, typography, breakpoints, shadows

7. **Обновить `_mixins.scss`**
   - [x] `focus-outline`, `focus-shadow`: использовать `var(--color-primary)` и т.д.

8. **Обновить `index.scss`**
   - [x] Fallback в `:root` (до монтирования ThemeProvider)
   - [x] `body` и глобальные стили — через `var(--color-text)`

9. **Рефакторинг компонентных SCSS**
   - [x] TodoApp, TodoItem, TodoInput, TodoFilter, TodoFooter, TodoList, LanguageSwitcher
   - [x] Заменить все `$color-*` на `var(--color-*)`

### Phase 4: UI компоненты

10. **Создать `ThemeToggle`**
    - [x] Кнопка: sun.svg / moon.svg в зависимости от темы
    - [x] Цвет меняется при переключении
    - [x] Доступность: aria-label, keyboard nav

11. **Создать `SettingsButton` и `SettingsModal`**
    - [x] SettingsButton: иконка settings.svg, открывает модалку
    - [x] SettingsModal: overlay (непрозрачный/размытый, блокирует события), размер как todo-app
    - [x] Кнопка закрытия (close.svg), подтверждение при несохранённых изменениях
    - [x] Табы: ThemeSelectionTab (мини-карточки тем, индикатор, Принять/Отказаться)

12. **Создать `HeaderControls` и интегрировать**
    - [x] Контейнер с flex: ThemeToggle | LanguageSwitcher | SettingsButton
    - [x] Позиционирование в header (top-right)
    - [x] Обернуть App в ThemeProvider

### Phase 5: Тестирование и доработка

13. **Тесты**
    - [x] `use-theme.test.ts` — проверка смены схемы и варианта
    - [x] `ThemeToggle.test.tsx` — переключение, accessibility
    - [ ] E2E: смена темы, персистентность (опционально)

14. **Проверка**
    - [x] Сборка: `pnpm build`
    - [x] Линт: `pnpm lint`
    - [x] Тесты: useTheme, ThemeToggle проходят
    - [x] Ручная проверка всех тем и схем

## Creative Phases

- [x] **UI/UX Design** — ✅ ЗАВЕРШЕНО  
       **Документ:** [`memory-bank/creative/creative-theming-uiux.md`](creative/creative-theming-uiux.md)  
       **Решения:** ThemeToggle (sun/moon) слева от LanguageSwitcher; SettingsButton справа; контейнер HeaderControls с flex; SettingsModal с overlay (блокирует события), табами, подтверждением при несохранённых изменениях; ThemeSelectionTab — мини-карточки тем, индикатор выбора через цвета палитры текущей темы (light/dark); кнопки Принять/Отказаться.
- [x] **Цветовые палитры** — ✅ ЗАВЕРШЕНО  
       **Документ:** [`memory-bank/creative/creative-theming-palettes.md`](creative/creative-theming-palettes.md)  
       **Превью:** [`memory-bank/creative/theme-palettes-preview.html`](creative/theme-palettes-preview.html)  
       **Решения:** Default (Option B light/dark), Ocean, Forest, Sunset, Lavender — полные палитры с токенами bg, surface, text, text-muted, border, primary и др.

## Dependencies

- Существующие: `storage.ts`, `useLocalStorage`, `TodoProvider`, `LanguageSwitcher`
- Внешние: `prefers-color-scheme` (Media Query API), `localStorage`, `storage` event

## Challenges & Mitigations

| Вызов                                             | Митигация                                                                                                                          |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **FOUC (Flash of Unstyled Content)** при загрузке | Применять тему синхронно в `ThemeProvider` до первого рендера; блокирующий скрипт в `<head>` для чтения localStorage (опционально) |
| **SCSS переменные vs CSS variables**              | Mixins принимают `var(--...)`; в компонентах везде `var(--color-*)`                                                                |
| **Синхронизация между вкладками**                 | `storage` event в ThemeProvider; при изменении в другой вкладке — обновить state и переприменить переменные                        |
| **Типизация CSS переменных**                      | TypeScript интерфейсы для theme config; в runtime — строки                                                                         |
| **Контраст и доступность**                        | Проверка WCAG AA для каждой палитры; при необходимости — корректировка цветов в Creative phase                                     |

## Status

- [x] Инициализация (VAN)
- [x] Планирование (PLAN)
- [x] Creative phase UI/UX (см. creative-theming-uiux.md)
- [x] Creative phase Цветовые палитры (см. creative-theming-palettes.md)
- [x] Phase 1: Токены и темы
- [x] Phase 2: ThemeContext, useTheme
- [x] Phase 3: Рефакторинг стилей
- [x] Phase 4: UI компоненты
- [x] Phase 5: Тестирование
- [x] Рефлексия (REFLECT)
- [ ] Архивация (ARCHIVE)

## Reflection Highlights

- **What Went Well:** Creative phase до реализации; Challenges & Mitigations в плане; структура theme-definitions; draft-паттерн с подтверждением; поэтапный рефакторинг SCSS.
- **Challenges:** Типизация draftScheme vs ColorScheme; минорные расхождения в bg-hover между палитрами и кодом.
- **Lessons Learned:** CSS Custom Properties на documentElement; storage event для синхронизации вкладок; matchMedia mock в тестах; draft-паттерн для модалок настроек.
- **Next Steps:** Добавить UI для выбора «авто» (опционально); сверка палитр с кодом; расширить тесты для SettingsModal/ThemeSelectionTab.

## Next Steps

1. **Реализация:** ✅ BUILD завершён.
2. **Рефлексия:** ✅ REFLECT завершён — [`memory-bank/reflection/reflection-theming-001.md`](reflection/reflection-theming-001.md)
3. **Архивация:** перейти к `/archive` для финализации документации задачи.

---

## Last Completed Task

**Task ID:** drag-drop-001  
**Название:** Drag & Drop для сортировки задач  
**Дата:** 2026-02-17  
**Статус:** ✅ COMPLETED & ARCHIVED  
**Архив:** [`memory-bank/archive/archive-drag-drop-001.md`](archive/archive-drag-drop-001.md)  
**Рефлексия:** [`memory-bank/reflection/reflection-drag-drop-001.md`](reflection/reflection-drag-drop-001.md)

**Completed:** [`memory-bank/completed-tasks/2025/12/drag-drop-001_2026-02-17.md`](completed-tasks/2025/12/drag-drop-001_2026-02-17.md)

**Следующий шаг:** `/van` для инициализации новой задачи.
