# Memory Bank: Active Context

## Current Focus

Оптимизация подсчёта активных задач в `getActiveCount` (src/utils/todo-helpers.ts): замена `filter().length` на `reduce()` для устранения промежуточного массива.

## Current Mode

VAN (Level 1 → готов к BUILD)

## Current Phase

Инициализация завершена. Готовность к реализации.

## Next Steps

1. Применить изменение в `src/utils/todo-helpers.ts` (после подтверждения пользователя).
2. Запустить тесты для проверки.
3. После завершения задачи: обновить `memory-bank/backlog.md`.

## Context for AI

- **Ветка:** `perf/todo-helpers-active-count`
- Проект: pet.todo — TO-DO Application
- Стек: React 19, Vite 7, TypeScript 5.9, SCSS (sass-embedded)
- Активная задача: оптимизация getActiveCount (reduce вместо filter().length)
- Файл: `src/utils/todo-helpers.ts`, строки 34–36
- Тесты: `src/utils/todo-helpers.test.ts` — getActiveCount уже покрыт; изменение не меняет контракт функции.
