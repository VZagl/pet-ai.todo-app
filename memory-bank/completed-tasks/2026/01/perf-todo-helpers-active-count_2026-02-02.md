# perf-todo-helpers-active-count

- **Название:** Оптимизация подсчёта элементов: getActiveCount → reduce()
- **Дата создания:** 2026-01-13
- **Дата завершения:** 2026-02-02
- **Уровень сложности:** Level 1 — Quick Fix
- **Тип:** Performance

## Задание

Замена `todos.filter((todo) => !todo.completed).length` на `todos.reduce((count, todo) => count + (!todo.completed ? 1 : 0), 0)` в `src/utils/todo-helpers.ts`.

## Результат

- Один файл изменён, тесты `todo-helpers.test.ts` 10/10 без изменений
- Устранено создание промежуточного массива при подсчёте активных задач

## Ссылки

- **Архив:** —
- **Рефлексия:** memory-bank/reflection/reflection-perf-todo-helpers-active-count.md
- **Ветка:** —
- **Коммит:** —
