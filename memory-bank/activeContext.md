# Memory Bank: Active Context

## Current Focus

Рефакторинг тестов: использование `afterEach` для очистки моков

## Current Mode

BUILD - Готов к реализации через `/build`

## Current Phase

PLAN → BUILD - Планирование завершено, готов к реализации

## Task ID

test-refactor-mocks-aftereach-001

## Recently Completed

- ✅ **Проверка тестов на ложные совпадения по тексту** (test-false-positive-matches-001) - COMPLETED (2026-01-23)
  - Все 116 тестов прошли успешно
  - Использование `within()` для ограничения области поиска

## Next Steps

1. ✅ Выполнить команду `/plan` для детального планирования - **ЗАВЕРШЕНО**
2. Выполнить команду `/build` для реализации рефакторинга тестов
3. Проверить, что все тесты проходят успешно
4. Обновить документацию (опционально)

## Context for AI

- Проект: pet.todo - TO-DO Application
- Стек: React 19, Vite 7, TypeScript 5.9, SCSS (sass-embedded)
- Текущие тесты: 116 (все проходят)
- Задача: Level 1 - Quick Fix
- Проблема: Ручные вызовы `spy.mockRestore()` могут не выполниться при падении теста
- Решение: Использовать `afterEach(() => { vi.restoreAllMocks(); })` для автоматической очистки моков
- Файлы для изменения:
  - `src/utils/storage.test.ts` - добавить `afterEach`, убрать `spy.mockRestore()` (строка 42)
  - `src/components/TodoList/TodoList.test.tsx` - добавить `afterEach`, убрать `consoleErrorSpy.mockRestore()` (строка 88)
