# Memory Bank: Tasks

## Current Task

**Task ID:** perf-todo-filter-redundant  
**Источник:** backlog.md — TodoFilter: Оптимизация повторной фильтрации  
**Уровень сложности:** Level 1 (Quick Fix)

**Проблема:** При клике на активный фильтр происходит повторная фильтрация списка, хотя результат не меняется.

**План решения (из backlog):**

1. Мемоизация отфильтрованного списка — уже есть в `useFilter.ts` через `useMemo` (без изменений).
2. Добавить `disabled={currentFilter === filter}` для активной кнопки в `TodoFilter.tsx`.
3. Добавить стили для disabled-состояния в `TodoFilter.scss`.
4. В обработчике смены фильтра не вызывать `setFilter`, если выбран тот же фильтр — защита от лишнего ре-рендера.

**Файлы для изменения:**

- [ ] `src/components/TodoFilter/TodoFilter.tsx`
- [ ] `src/components/TodoFilter/TodoFilter.scss`
- [ ] при необходимости: `src/hooks/use-filter.ts` (guard в setFilter)

**Чеклист:**

- [ ] INIT: Задача определена, окружение готово
- [ ] BUILD: Реализация и проверка
- [ ] REFLECT: Обновить tasks.md, при необходимости reflection
- [ ] REFLECT: Обновить backlog.md (если задача из backlog): отметить [x], перенести в раздел «✅ Завершено», добавить дату и ссылки (рефлексия/архив)

---

## Last Completed Task

**Task ID:** perf-todo-helpers-active-count  
**Название:** Оптимизация подсчёта элементов: getActiveCount → reduce()

**Status:** COMPLETED (без архива)

- [x] Реализация (BUILD)
- [x] Рефлексия (REFLECT)
- [x] Задача перенесена в backlog → Завершено

**Reflection:** [memory-bank/reflection/reflection-perf-todo-helpers-active-count.md](reflection/reflection-perf-todo-helpers-active-count.md)  
**Date:** 2026-02-02

---

## Previous Completed Task

**Task ID:** context-api-todo-001  
**Название:** Context API вместо props drilling (Architecture Improvements)

**Status:** COMPLETED & ARCHIVED

- [x] Инициализация
- [x] Планирование
- [x] Реализация (BUILD)
- [x] Рефлексия (REFLECT)
- [x] Архивирование

**Archive:** [memory-bank/archive/archive-context-api-todo-001.md](archive/archive-context-api-todo-001.md)  
**Date Archived:** 2026-02-02  
**Branch:** refactor/todo-context-api
