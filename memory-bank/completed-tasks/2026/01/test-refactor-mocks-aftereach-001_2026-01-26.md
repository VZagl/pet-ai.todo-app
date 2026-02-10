# test-refactor-mocks-aftereach-001

- **Название:** Рефакторинг тестов: использование afterEach для очистки моков
- **Дата создания:** 2026-01-16
- **Дата завершения:** 2026-01-26
- **Уровень сложности:** Level 1 — Quick Fix
- **Тип:** Code Quality

## Задание

Автоматизация очистки моков через `afterEach` hook вместо ручных вызовов `mockRestore()`.

## Результат

- Добавлен `afterEach(() => { vi.restoreAllMocks(); })` в `src/utils/storage.test.ts` и `src/components/TodoList/TodoList.test.tsx`
- Удалены все ручные вызовы `spy.mockRestore()` и `consoleErrorSpy.mockRestore()`
- Все 12 тестов в изменённых файлах проходят успешно (7/7 + 5/5)
- Повышение надёжности тестов — автоматическая очистка моков даже при падении теста
- Время: ~15 минут

## Ссылки

- **Архив:** memory-bank/archive/archive-test-refactor-mocks-aftereach-001.md
- **Рефлексия:** memory-bank/reflection/reflection-test-refactor-mocks-aftereach-001.md
- **Ветка:** —
- **Коммит:** —
