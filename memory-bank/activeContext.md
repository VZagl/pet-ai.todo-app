# Memory Bank: Active Context

## Current Focus

Замена жёстко прописанных ключей storage на константы

## Current Mode

PLAN - Планирование завершено

## Current Phase

PLAN COMPLETE - План реализации готов, переход к BUILD mode

## Recently Completed

- ✅ **Проверки boolean в тестах: кейсы `true` и `false`** (test-boolean-coverage-001) - COMPLETED (2026-01-26)
  - Все тесты в `src/utils/storage.test.ts`: 7/7 прошли успешно
  - Полное покрытие логики обработки boolean значений

- ✅ **Рефакторинг тестов: использование afterEach для очистки моков** (test-refactor-mocks-aftereach-001) - COMPLETED & ARCHIVED (2026-01-26)
  - Все 12 тестов в изменённых файлах прошли успешно
  - Автоматическая очистка моков через `afterEach` hook
  - Архивный документ: `memory-bank/archive/archive-test-refactor-mocks-aftereach-001.md`

## Next Steps

Планирование завершено:

1. ✅ Определён уровень сложности: Level 1 - Quick Fix
2. ✅ Проанализированы файлы с жёстко прописанными ключами
3. ✅ План реализации создан и проверен
4. ✅ Технологии валидированы

**Следующий шаг:** Реализация (BUILD mode) - замена строк на константу `STORAGE_KEY` в тестах

## Context for AI

- Проект: pet.todo - TO-DO Application
- Стек: React 19, Vite 7, TypeScript 5.9, SCSS (sass-embedded)
- Текущие тесты: 116 (все проходят)
- Текущая задача: storage-keys-refactor-001 - Замена жёстко прописанных ключей storage на константы
- Complexity Level: Level 1 - Quick Fix
- Файлы для изменения: 2 тестовых файла (`useTodos.test.ts`, `TodoApp.test.tsx`)
- Константа `STORAGE_KEY` уже определена в `src/constants/todo.ts` и используется в основном коде
