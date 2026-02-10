# context-api-todo-001

- **Название:** Заменить props drilling на Context API
- **Дата создания:** 2026-01-13
- **Дата завершения:** 2026-02-02
- **Уровень сложности:** Level 3 — Intermediate Feature
- **Тип:** Architecture

## Задание

Заменить props drilling на Context API:

- Создать `TodoContext`, `TodoProvider`, хук `useTodoContext()`
- Рефакторинг компонентов: App.tsx (обёртка TodoProvider), TodoApp, TodoList, TodoItem под контекст
- TodoList — только проп `todos`; TodoItem — только проп `todo`, действия через `useTodoContext()`

## Результат

- Файлы созданы: `src/contexts/todo-context.ts`, `src/contexts/TodoProvider.tsx`, `src/hooks/use-todo-context.ts`
- Файлы отрефакторены: App.tsx, TodoApp.tsx, TodoList.tsx, TodoItem.tsx и их тесты
- Все 121 тест проходят, `pnpm run build` успешен
- Props drilling устранён, единый источник истины через `useTodoContext()`

## Ссылки

- **Архив:** memory-bank/archive/archive-context-api-todo-001.md
- **Рефлексия:** memory-bank/reflection/reflection-context-api-todo-001.md
- **Ветка:** —
- **Коммит:** —
