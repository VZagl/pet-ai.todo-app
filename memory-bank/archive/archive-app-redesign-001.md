# Task Archive: Редизайн оформления приложения pet.todo

## Metadata

- **Task ID:** app-redesign-001
- **Complexity:** Level 3–4 — Intermediate Feature / Complex System
- **Type:** UI/UX Enhancement
- **Date Completed:** 2026-02-12
- **Branch:** `feat/app-redesign-001`
- **Status:** COMPLETED & ARCHIVED

## Summary

Реализован полный редизайн приложения pet.todo: тёмная палитра Option B (creative-app-redesign), фиксированный layout (100vh, footer прижат к низу, скролл только списка), динамический счётчик по фильтру в TodoFooter. Обновлены стили всех компонентов, unit-тесты TodoFooter и E2E тест стабильности layout.

## Requirements Addressed

### Функциональные

- **Цветовая палитра Option B — тёмный вариант:** ✅ `_variables.scss` — #1e293b, #17202e, градиент ~10%
- **Layout:** ✅ App 100vh, TodoApp flex column, TodoList scroll-only (`todo-app__list-area` overflow-y: auto)
- **Footer приклеен к низу:** ✅ Footer не смещается при смене количества задач
- **Динамический счётчик по фильтру:** ✅ «X задач осталось из Y» / «X задач осталось» / «X задач завершено»
- **Склонение:** ✅ getTaskWord для задачи/задачи/задач во всех формулировках
- **Props TodoFooter:** ✅ activeCount, completedCount, currentFilter

### Соответствие плану

Реализация соответствует плану из `tasks.md` и `creative-app-redesign.md`. Функциональные и визуальные требования выполнены на 100%.

## Design Decisions & Creative Outputs

### Creative Phase: UI/UX Design

**Обоснование:** Определение визуальных решений, единого визуального языка и формата счётчика до реализации.

**Creative Phase:** [`memory-bank/creative/creative-app-redesign.md`](../creative/creative-app-redesign.md)

### Ключевые решения

1. **Option B — тёмный вариант** — палитра #1e293b, #17202e, градиент ~10%; единая тёмная палитра, подготовка к будущей системе тем.
2. **Layout Variant A** — footer sticky: flex column, overflow-y на list-area; header, input, footer фиксированы; скролл только списка.
3. **Динамический счётчик по фильтру** — «X из Y» (все), «X осталось» (активные), «X завершено» (завершённые).
4. **completedCount в context** — добавлен в useTodos/TodoContext, передан в TodoFooter без props drilling.

### Style Guide

Соответствие `memory-bank/style-guide.md`: минимализм, usability, accessibility (WCAG AA), consistency.

## Implementation Summary

### Approach

Семифазный план: Variables → Layout → TodoApp → Input/List/Item → Footer/Filter → Тесты → Verification. Technology validation предшествовал BUILD.

### Key Components

| Компонент        | Изменения                                                        |
| ---------------- | ---------------------------------------------------------------- |
| App              | 100vh, flex layout                                               |
| TodoApp          | Фон градиент, flex layout, list-area (flex: 1, overflow-y: auto) |
| TodoInput        | Input/button стили, accent, focus                                |
| TodoList         | flex-grow, overflow-y: auto, dividers                            |
| TodoItem         | Hover, border, spacing                                           |
| TodoFooter       | Layout sticky bottom, новая логика счётчика getCounterText       |
| TodoFilter       | Кнопки: secondary, active state                                  |
| \_variables.scss | Тёмная палитра, gradient-bg, удаление gradient-purple            |
| index.scss       | :root переменные                                                 |

### Key Files Changed

- `src/styles/_variables.scss` — тёмная палитра Option B
- `src/index.scss` — CSS переменные :root
- `src/app.scss` — корневой layout 100vh
- `src/components/TodoApp/TodoApp.tsx` — completedCount, list-area wrapper
- `src/components/TodoApp/TodoApp.scss` — фон градиент, layout
- `src/components/TodoInput/TodoInput.scss` — стили input/button
- `src/components/TodoList/TodoList.scss` — контейнер, dividers
- `src/components/TodoItem/TodoItem.scss` — hover, border
- `src/components/TodoFooter/TodoFooter.tsx` — getCounterText по фильтру
- `src/components/TodoFooter/TodoFooter.scss` — layout
- `src/components/TodoFilter/TodoFilter.scss` — кнопки
- `src/contexts/todo-context.ts`, `src/hooks/use-todos.ts` — completedCount
- `vitest.config.ts` — exclude node_modules (совместимость с E2E)

### Technologies

- **React 19, Vite 7, TypeScript 5.9** — без изменений стека
- **SCSS (sass-embedded)** — стили
- **Playwright** — E2E layout stability

## Testing Overview

### Стратегия

- **Unit TodoFooter:** обновлены ожидаемые тексты счётчика для фильтров all, active, completed
- **E2E layout:** два теста — стабильность позиций при разном количестве задач; footer прижат к низу, скролл только списка

### Результат

- Unit TodoFooter: обновлены под новый формат счётчика
- E2E `todo-layout.spec.ts`: 2 теста — layout stability, footer positioning
- Команда E2E: `pnpm test:e2e --project=chromium --workers=1`

### Раннее обнаружение проблем

- E2E выявил корректность layout и aria-ролей; регрессий не обнаружено.

## Reflection & Lessons Learned

**Рефлексия:** [`memory-bank/reflection/reflection-app-redesign-001.md`](../reflection/reflection-app-redesign-001.md)

### Ключевые выводы

1. **Creative phase и Option B** — обоснованный выбор палитры и layout; все решения применились без переделок.
2. **Flex layout для sticky footer** — `height: 100vh` + `flex: 1` + `overflow-y: auto` на list-area — надёжный паттерн.
3. **getCounterText + getTaskWord** — разделение логики формата и склонения улучшает читаемость и тестируемость.
4. **E2E layout stability** — тест защищает от регрессии при будущих изменениях layout.
5. **completedCount в context** — минимальное изменение архитектуры без props drilling.

## Known Issues / Future Considerations

- **axe-core для accessibility** — автоматическая проверка контраста при build или CI не реализована; можно добавить в будущем.
- **CSS переменные :root** — убедиться, что все компоненты используют переменные из \_variables.scss или :root.
- **Responsive E2E** — текущие тесты на фиксированном viewport 800×600; при росте требований к mobile — добавить отдельные сценарии.
- **Style-guide** — при смене палитры обновить style-guide.md с новыми токенами.
- **vitest exclude** — при добавлении E2E включать в план проверку vitest.config на exclude node_modules.

## Key Files and Components Affected

### Обновлённые

- `src/styles/_variables.scss` — тёмная палитра
- `src/index.scss` — :root переменные
- `src/app.scss` — layout 100vh
- `src/components/TodoApp/TodoApp.tsx`, `TodoApp.scss`
- `src/components/TodoInput/TodoInput.scss`
- `src/components/TodoList/TodoList.scss`
- `src/components/TodoItem/TodoItem.scss`
- `src/components/TodoFooter/TodoFooter.tsx`, `TodoFooter.scss`
- `src/components/TodoFilter/TodoFilter.scss`
- `src/contexts/todo-context.ts`
- `src/hooks/use-todos.ts`
- `vitest.config.ts`

### Созданные

- `e2e/todo-layout.spec.ts` — E2E layout stability

## Metrics

| Метрика                  | Значение                                     |
| ------------------------ | -------------------------------------------- |
| Файлов изменено          | ~12 (variables, index, 6 компонентов, тесты) |
| Новых E2E тестов         | 2 (layout stability)                         |
| Unit TodoFooter тестов   | Обновлены под новый формат счётчика          |
| Соответствие требованиям | 100%                                         |
| Соответствие creative    | 100%                                         |

## References

- [`memory-bank/tasks.md`](../tasks.md) — план задачи
- [`memory-bank/reflection/reflection-app-redesign-001.md`](../reflection/reflection-app-redesign-001.md) — рефлексия
- [`memory-bank/creative/creative-app-redesign.md`](../creative/creative-app-redesign.md) — creative phase
- [`memory-bank/style-guide.md`](../style-guide.md) — руководство по стилю
