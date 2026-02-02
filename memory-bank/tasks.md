# Memory Bank: Tasks

## Current Task

**Источник:** backlog (оптимизация подсчёта элементов)  
**Название:** Оптимизация подсчёта элементов: заменить `filter().length` на `reduce()`  
**Сложность:** Level 1 (локальное изменение, один файл)

### Цель

- Файл: `src/utils/todo-helpers.ts`, функция `getActiveCount` (стр. 35)
- Текущая реализация: `todos.filter((todo) => !todo.completed).length`
- Целевая реализация: `todos.reduce((count, todo) => count + (!todo.completed ? 1 : 0), 0)`
- Причина: избежать создания промежуточного массива при подсчёте

### Чеклист

- [x] Заменить реализацию `getActiveCount` на `reduce()`
- [x] Убедиться, что тесты `todo-helpers.test.ts` проходят
- [x] Обновить `memory-bank/backlog.md`

---

## Last Completed Task

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
