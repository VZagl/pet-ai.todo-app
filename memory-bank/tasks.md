# Memory Bank: Tasks

## Current Task

**Task ID:** theming-001  
**Название:** Двухслойная система тематизации (Color Scheme + Theme Variants)  
**Уровень:** Level 3 — Intermediate Feature  
**Ветка:** `feat/theming-001-two-layer-theming`  
**Источник:** [`memory-bank/backlog.md`](backlog.md) (строки 25–60)

**Статус:** PLAN complete → CREATIVE / BUILD mode

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

| Компонент                     | Назначение                                                            | Зависимости                |
| ----------------------------- | --------------------------------------------------------------------- | -------------------------- |
| `ThemeProvider`               | Контекст тем, применение CSS переменных на `document.documentElement` | storage, media query       |
| `useTheme`                    | Хук доступа к theme state и setters                                   | ThemeProvider              |
| `ThemeToggle`                 | Переключатель Color Scheme (авто/light/dark)                          | useTheme                   |
| `ThemeSelector`               | Селектор Theme Variant с превью                                       | useTheme                   |
| `ThemeSettings` (опционально) | Обёртка: ThemeToggle + ThemeSelector в dropdown                       | ThemeToggle, ThemeSelector |

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
                    ├── header: LanguageSwitcher, ThemeSettings
                    ├── TodoInput, TodoList, TodoFooter
```

## Implementation Plan

### Phase 1: Дизайн-токены и структура тем

1. **Создать `src/styles/tokens/`**
   - [ ] `colors.css` или `_tokens.scss` — базовые имена переменных (без значений)
   - [ ] Документировать схему: `--color-primary`, `--color-bg`, `--color-text` и т.д.

2. **Создать `src/styles/themes/`**
   - [ ] `theme-types.ts` — типы: `ColorScheme`, `ThemeVariant`, `ThemeConfig`
   - [ ] `theme-definitions.ts` — объекты с цветами для каждой комбинации (5 тем × 2 схемы = 10 наборов)
   - [ ] Пример структуры: `{ default: { light: {...}, dark: {...} }, ocean: {...}, forest: {...}, ... }`
   - [ ] `default` — текущая палитра Option B (light + dark варианты)

3. **Определить палитры для 5 тем**
   - [ ] Default: текущая палитра Option B (сохранить как есть)
   - [ ] Ocean: синие/голубые акценты
   - [ ] Forest: зелёные акценты
   - [ ] Sunset: оранжевые/янтарные акценты
   - [ ] Lavender: фиолетовые акценты

### Phase 2: ThemeContext и useTheme

4. **Создать `src/contexts/ThemeProvider.tsx`**
   - [ ] Состояние: `colorScheme`, `themeVariant`
   - [ ] Определение эффективной схемы: при `auto` — `prefers-color-scheme`
   - [ ] Применение переменных: `document.documentElement.style.setProperty(...)` или класс/атрибут
   - [ ] Персистентность: `useLocalStorage` или прямой вызов storage
   - [ ] Синхронизация между вкладками: `window.addEventListener('storage', ...)`

5. **Создать `src/hooks/use-theme.ts`**
   - [ ] `useTheme()` → `{ colorScheme, themeVariant, setColorScheme, setThemeVariant, effectiveScheme }`
   - [ ] Реэкспорт типов из theme-types

### Phase 3: Рефакторинг стилей

6. **Обновить `_variables.scss`**
   - [ ] Удалить цветовые переменные (`$color-*`, `$gradient-bg`)
   - [ ] Оставить: spacing, radius, typography, breakpoints, shadows (если не зависят от темы)

7. **Обновить `_mixins.scss`**
   - [ ] `focus-outline`, `focus-shadow`: использовать `var(--color-primary)` и т.д.

8. **Обновить `index.scss`**
   - [ ] Импорт токенов/тем
   - [ ] Начальные значения в `:root` (fallback до монтирования ThemeProvider)
   - [ ] `body` и глобальные стили — через `var(--color-text)` и т.д.

9. **Рефакторинг компонентных SCSS**
   - [ ] TodoApp, TodoItem, TodoInput, TodoFilter, TodoFooter, TodoList, LanguageSwitcher
   - [ ] Заменить все `$color-*` на `var(--color-*)`

### Phase 4: UI компоненты

10. **Создать `ThemeToggle`**
    - [ ] Кнопка или сегментированный контрол: авто / светлая / тёмная
    - [ ] Иконки: солнце, луна, авто (опционально)
    - [ ] Доступность: aria-label, keyboard nav

11. **Создать `ThemeSelector`**
    - [ ] Список тем с превью: Default (по умолчанию) + Ocean, Forest, Sunset, Lavender
    - [ ] Вариант «По умолчанию» — текущая палитра Option B
    - [ ] Выбор темы по клику
    - [ ] Стили в духе LanguageSwitcher (dropdown)

12. **Интеграция в TodoApp**
    - [ ] Добавить `ThemeSettings` (или отдельно ThemeToggle + ThemeSelector) в header
    - [ ] Обернуть App в ThemeProvider

### Phase 5: Тестирование и доработка

13. **Тесты**
    - [ ] `useTheme.test.ts` — проверка смены схемы и варианта
    - [ ] `ThemeProvider.test.tsx` — применение переменных
    - [ ] `ThemeToggle.test.tsx` — переключение, accessibility
    - [ ] `ThemeSelector.test.tsx` — выбор темы
    - [ ] E2E: смена темы, персистентность

14. **Проверка**
    - [ ] Сборка: `pnpm build`
    - [ ] Линт: `pnpm lint`
    - [ ] Тесты: `pnpm test`
    - [ ] Ручная проверка всех тем и схем

## Creative Phases Required

- [ ] **UI/UX Design** — уточнение требований к UI компонентам (см. Requirements → UI компоненты):
  - Переключатель Color Scheme: формат (кнопки, сегменты, иконки), расположение
  - Селектор Theme Variant: формат превью (полоски, круги, карточки), способ выбора; обязательно включить вариант «По умолчанию» (Default) — текущие цвета
  - Компонент настроек тем: компоновка в header (рядом с LanguageSwitcher, объединённый dropdown, два отдельных контрола и т.д.)
  - Поведение dropdown / popover, accessibility
- [ ] **Цветовые палитры** — финальные значения для Ocean, Forest, Sunset, Lavender (light + dark):
  - Default: текущая палитра Option B — сохранить как есть (dark уже есть; light — определить или использовать как копию для light-режима)
  - Ocean, Forest, Sunset, Lavender: определить light и dark варианты, акценты для каждой темы.

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
- [ ] Creative phases (если требуется)
- [ ] Phase 1: Токены и темы
- [ ] Phase 2: ThemeContext, useTheme
- [ ] Phase 3: Рефакторинг стилей
- [ ] Phase 4: UI компоненты
- [ ] Phase 5: Тестирование

## Next Steps

1. **Если нужны Creative phases:** запустить `/creative` для дизайна UI переключателей и цветовых палитр.
2. **Если Creative не требуется:** перейти к `/build` и начать с Phase 1.

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
