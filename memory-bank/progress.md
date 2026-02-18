# Memory Bank: Progress

## Overall Progress

**Активная задача:** theming-001  
**Статус:** Инициализация → PLAN mode

## 2026-02-18: theming-001 — BUILD ЗАВЕРШЁН

**Название:** Двухслойная система тематизации (Color Scheme + Theme Variants)  
**Уровень:** Level 3 — Intermediate Feature  
**Ветка:** `feat/theming-001-two-layer-theming`  
**Статус:** ✅ BUILD complete → REFLECT

**Creative phase UI/UX:** ✅ завершён — [`creative-theming-uiux.md`](creative/creative-theming-uiux.md)  
**Creative phase Цветовые палитры:** ✅ завершён — [`creative-theming-palettes.md`](creative/creative-theming-palettes.md)

**Реализовано:**

- Phase 1: `src/styles/tokens/`, `src/styles/themes/` (theme-types, theme-definitions)
- Phase 2: ThemeProvider, useTheme, персистентность, синхронизация вкладок
- Phase 3: Рефакторинг \_variables, \_mixins, index.scss, компонентных SCSS
- Phase 4: ThemeToggle, SettingsButton, SettingsModal, ThemeSelectionTab, HeaderControls
- Phase 5: use-theme.test.ts, ThemeToggle.test.tsx, matchMedia mock в vitest.setup

**Файлы:** ThemeProvider, use-theme, ThemeToggle, SettingsButton, SettingsModal, ThemeSelectionTab, HeaderControls; sun.svg, moon.svg, settings.svg; переводы theme.\*

**Сборка:** ✅ pnpm build  
**Линт:** ✅ pnpm lint  
**Тесты:** useTheme (3), ThemeToggle (2) — проходят

**Следующий шаг:** `/reflect` для ревью задачи

---

## 2026-02-17: drag-drop-001 — ЗАВЕРШЕНО

**Название:** Drag & Drop для сортировки задач  
**Уровень:** Level 2 — Simple Enhancement  
**Ветка:** `feat/drag-drop-sort-tasks`  
**Статус:** ✅ COMPLETED & ARCHIVED

**Итог:** Перетаскивание задач реализовано через @dnd-kit. Grip (⋮⋮) слева от чекбокса — единственный drag-handle. mergeReorderedItems по id для корректной работы при фильтрации. Inline-редактирование отключает DnD. 30 тестов проходят, сборка успешна.

**Запись:** [`memory-bank/completed-tasks/2025/12/drag-drop-001_2026-02-17.md`](completed-tasks/2025/12/drag-drop-001_2026-02-17.md)  
**Архив:** [`memory-bank/archive/archive-drag-drop-001.md`](archive/archive-drag-drop-001.md)  
**Рефлексия:** [`memory-bank/reflection/reflection-drag-drop-001.md`](reflection/reflection-drag-drop-001.md)

**Следующий шаг:** `/van` для инициализации новой задачи
