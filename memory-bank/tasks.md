# Memory Bank: Tasks

## Current Task

**Task ID:** app-redesign-001  
**Название:** Редизайн оформления приложения  
**Уровень:** Level 3–4 — Intermediate Feature / Complex System  
**Ветка:** `feat/app-redesign-001`  
**Статус:** 🟢 REFLECT COMPLETE — готов к ARCHIVE

### Чеклист

- [x] VAN: инициализация, определение сложности
- [x] Создана ветка feat/app-redesign-001
- [x] PLAN: детальное планирование
- [x] CREATIVE: дизайн-решения (creative-app-redesign)
- [x] VAN QA: техническая валидация
- [x] BUILD: реализация
- [x] REFLECT: рефлексия (reflection-app-redesign-001)

### Области для рассмотрения

- Цвета: палитра, контраст, акценты
- Позиционирование и размеры элементов
- Логика счётчика (в т.ч. вариант в TodoFooter) и формат отображения

### Ссылки

- **Backlog:** [`memory-bank/backlog.md`](../backlog.md) — App Redesign
- **CREATIVE:** `memory-bank/creative/creative-app-redesign.md` ✅

---

## Plan: Implementation Plan

### 1. Requirements Analysis

#### Core Requirements

- Редизайн оформления приложения в целом (не отдельных компонентов)
- Цветовая палитра: палитра, контраст, акценты
- Позиционирование и размеры элементов
- Логика счётчика и формат отображения в TodoFooter
- Единый визуальный язык
- Соответствие style-guide (минимализм, usability, accessibility, consistency)

#### Technical Constraints

- Оставить существующий стек: React 19, Vite 7, TypeScript 5.9, SCSS (sass-embedded)
- Не использовать внешние UI библиотеки на начальном этапе
- Следовать установленным конвенциям проекта

### 2. Component Analysis

| Компонент            | Изменения                           | Зависимости                     |
| -------------------- | ----------------------------------- | ------------------------------- |
| **TodoApp**          | Фон, layout, заголовок, subtitle    | \_variables.scss, \_mixins.scss |
| **TodoInput**        | Input, button, focus                | \_variables.scss                |
| **TodoList**         | Контейнер, карточки                 | \_variables.scss, \_mixins.scss |
| **TodoItem**         | Элемент списка, hover, delete       | \_variables.scss                |
| **TodoFooter**       | Счётчик, layout, формат отображения | TodoFilter, \_variables.scss    |
| **TodoFilter**       | Кнопки фильтров                     | \_variables.scss                |
| **\_variables.scss** | Цвета, spacing, radius, shadows     | —                               |
| **index.scss**       | CSS переменные :root                | \_variables.scss                |

**Примечание:** CREATIVE фаза определит, какие компоненты затронуть.

### 3. Design Decisions (CREATIVE Complete)

- Architecture: Минимальные изменения — layout, стили, логика счётчика
- UI/UX: **Решено** — см. [`memory-bank/creative/creative-app-redesign.md`](creative/creative-app-redesign.md)
  - Палитра: Option B тёмный (#1e293b, #17202e, градиент ~10%)
  - Layout: App 100vh, футер приклеен к низу, скролл только списка
  - Счётчик: по фильтру — «X из Y» / «X осталось» / «X завершено»
- Тесты: unit TodoFooter + E2E layout stability

### 4. Implementation Strategy

#### Phase 1: CREATIVE Phase (следующий шаг)

1. Создать документ `memory-bank/creative/creative-app-redesign.md`
2. Определить:
   - Визуальные решения и mockup
   - Какие компоненты затронуть
   - Единый визуальный язык
   - Варианты для счётчика и формата отображения в TodoFooter

#### Phase 2: BUILD — Setup (после CREATIVE)

1. Обновить `src/styles/_variables.scss` — новые цвета, spacing, тени по creative
2. Обновить `src/index.scss` — CSS переменные :root
3. При необходимости обновить `src/styles/_mixins.scss`

#### Phase 3: BUILD — Core UI

1. TodoApp — layout, заголовок, фон
2. TodoInput — input/button стили
3. TodoList — контейнер списка
4. TodoItem — элементы списка

#### Phase 4: BUILD — Footer & Filter

1. TodoFooter — счётчик, формат отображения, layout
2. TodoFilter — кнопки фильтров

#### Phase 5: Verification

1. Проверить responsive на мобильном/планшете/десктопе
2. Проверить accessibility (WCAG AA)
3. Убедиться, что тесты проходят

### 5. Technology Validation

- **Technology stack:** React 19, Vite 7, TypeScript 5.9, SCSS (sass-embedded)
- **Новые зависимости:** не ожидаются (редизайн — только стили)
- **Проект инициализации:** `pnpm dev` — уже работает
- **Build:** `pnpm build` — успешно собирается

**Technology Validation Checkpoints:**

- [x] Project initialization command verified: `pnpm dev`
- [x] Required dependencies identified: sass-embedded, @fontsource-variable/inter — уже есть
- [x] Build configuration validated: Vite, SCSS
- [x] Test build passes: `pnpm build` успешен
- [x] Нет новых технологий — редизайн только изменяет стили

### 6. Creative Phases Required

| Компонент          | Creative Phase        | Статус       |
| ------------------ | --------------------- | ------------ |
| **UI/UX Design**   | creative-app-redesign | ✅ Complete  |
| Визуальный язык    | creative-app-redesign | ✅ Complete  |
| Счётчик TodoFooter | creative-app-redesign | ✅ Complete  |
| Архитектура        | —                     | Не требуется |

### 7. Dependencies

- **Внутренние:** `memory-bank/creative/creative-app-redesign.md` — создаётся в CREATIVE phase
- **Внешние:** нет

### 8. Challenges & Mitigations

| Вызов                                         | Митигация                                                     |
| --------------------------------------------- | ------------------------------------------------------------- |
| Сохранение accessibility при изменении цветов | Контроль контраста (WCAG AA), проверка после изменений        |
| Разнородность стилей между компонентами       | Единый creative документ, единый визуальный язык              |
| Риск регрессии в тестах                       | E2E и unit тесты покрывают структуру; проверка после BUILD    |
| Склонение счётчика при изменении формата      | CREATIVE phase определит формат; getTaskWord может измениться |

### 9. Plan Verification Checklist

- [x] Requirements clearly documented
- [x] Technology stack validated
- [x] Affected components identified
- [x] Implementation steps detailed
- [x] Dependencies documented
- [x] Challenges & mitigations addressed
- [x] Creative phases identified

---

## NEXT RECOMMENDED MODE: ARCHIVE MODE

**Следующий шаг:** Выполнить команду `/archive` для завершения задачи.

**Рефлексия:** [`memory-bank/reflection/reflection-app-redesign-001.md`](reflection/reflection-app-redesign-001.md)

---

## Последняя завершённая задача (e2e-tests-001)

**Запись:** [`memory-bank/completed-tasks/2025/12/e2e-tests-001_2026-02-11.md`](completed-tasks/2025/12/e2e-tests-001_2026-02-11.md)  
**Архив:** [`memory-bank/archive/archive-e2e-tests-001.md`](archive/archive-e2e-tests-001.md)  
**Рефлексия:** [`memory-bank/reflection/reflection-e2e-tests-001.md`](reflection/reflection-e2e-tests-001.md)

---

## Last Completed Task

**Task ID:** e2e-tests-001  
**Название:** Добавить E2E тесты (Playwright)  
**Дата:** 2026-02-11  
**Статус:** ✅ COMPLETED & ARCHIVED  
**Запись:** [`memory-bank/completed-tasks/2025/12/e2e-tests-001_2026-02-11.md`](completed-tasks/2025/12/e2e-tests-001_2026-02-11.md)
