# TASK ARCHIVE: Context API вместо props drilling

## METADATA

- **Task ID:** context-api-todo-001
- **Complexity Level:** Level 3 — Intermediate Feature
- **Date Archived:** 2026-02-02
- **Status:** COMPLETED & ARCHIVED
- **Branch:** refactor/todo-context-api
- **Source:** memory-bank/backlog.md (Architecture Improvements)

---

## SUMMARY

Реализован переход от передачи обработчиков через пропсы (props drilling) к единому источнику истины на базе React Context API. Созданы `TodoContext`, `TodoProvider` и хук `useTodoContext()`; компоненты `TodoApp`, `TodoList`, `TodoItem` и точка входа `App.tsx` отрефакторены под использование контекста. Фильтрация остаётся в `TodoApp` через `useFilter(todos)`. Все тесты обновлены (обёртка в `TodoProvider`, мок `useTodoContext` где нужно), сборка и линт проходят. Цель достигнута: props drilling устранён, интерфейсы компонентов упрощены.

---

## REQUIREMENTS

**Функциональные:**

- TodoContext предоставляет состояние задач и действия (addTodo, toggleTodo, deleteTodo, updateTodo, activeCount).
- TodoProvider инкапсулирует логику useTodos() и передаёт значение в контекст.
- useTodoContext() возвращает полное значение контекста; компоненты деструктурируют нужное.
- TodoApp получает данные из контекста, фильтрация через useFilter(todos).
- TodoList принимает только `todos` (без onToggle, onDelete).
- TodoItem получает только проп `todo`, вызывает toggleTodo/deleteTodo через useTodoContext().

**Технические:**

- Один источник истины: useTodos вызывается только внутри TodoProvider; доступ к состоянию и действиям — только через useTodoContext().
- Сохранены типы `i_todo`, импорты из существующих модулей (constants, utils, types).

---

## IMPLEMENTATION

### Approach

Четыре фазы: (1) контекст и провайдер, (2) обёртка в App, (3) рефакторинг компонентов, (4) тесты и проверки.

### Key Components and Files

**Созданы:**

- `src/contexts/todo-context.ts` — createContext, тип i_todoContextValue, значение по умолчанию null.
- `src/contexts/TodoProvider.tsx` — TodoProvider использует useTodos(), передаёт value в Context.Provider.
- `src/hooks/use-todo-context.ts` — useTodoContext(): useContext(TodoContext), проверка на null с выбросом ошибки, возврат полного value.

**Отрефакторены:**

- `App.tsx` — TodoApp обёрнут в `<TodoProvider>`.
- `TodoApp.tsx` — useTodoContext() вместо useTodos(); в TodoList передаётся только todos={filteredTodos}.
- `TodoList.tsx` — пропсы только todos; не передаёт onToggle, onDelete в TodoItem.
- `TodoItem.tsx` — проп только todo; useTodoContext() с деструктуризацией { toggleTodo, deleteTodo }.

### Design Decisions

- **Архитектура контекста:** В контексте хранятся и состояние (todos, activeCount), и действия. useTodoContext() — единственный публичный хук доступа.
- **Граница Provider:** TodoProvider оборачивает TodoApp в App.tsx (корень дерева TODO внутри контекста).
- **Фильтрация:** Остаётся в TodoApp: useFilter(todos), filteredTodos передаётся в TodoList; контекст не дублирует фильтр.

### Key Files and Components Affected

| Файл / компонент    | Тип         | Изменения                                           |
| ------------------- | ----------- | --------------------------------------------------- |
| todo-context.ts     | Новый       | createContext, тип value                            |
| TodoProvider.tsx    | Новый       | useTodos(), Context.Provider                        |
| use-todo-context.ts | Новый       | useTodoContext(), проверка null                     |
| App.tsx             | Рефакторинг | Обёртка TodoProvider                                |
| TodoApp.tsx         | Рефакторинг | useTodoContext(), упрощённые пропсы в TodoList      |
| TodoList.tsx        | Рефакторинг | Только todos                                        |
| TodoItem.tsx        | Рефакторинг | Только todo, useTodoContext()                       |
| TodoApp.test.tsx    | Обновлён    | renderTodoApp() с TodoProvider                      |
| TodoList.test.tsx   | Обновлён    | TodoProvider, без onToggle/onDelete                 |
| TodoItem.test.tsx   | Обновлён    | TodoProvider и мок useTodoContext для toggle/delete |

---

## TESTING

- **Стратегия:** Интеграционные тесты TodoApp — с реальным TodoProvider; компонентные тесты TodoList и TodoItem — с обёрткой в TodoProvider или с моком useTodoContext для проверки только вызовов (toggle/delete в TodoItem).
- **Результат:** Все 121 тест проходят; регрессий нет. pnpm run build и pnpm test без ошибок.
- **Проверка:** Линт и сборка успешны.

---

## LESSONS LEARNED

- Context API с одним провайдером и одним хуком доступа хорошо устраняет props drilling без внешних библиотек состояния.
- Проверка value === null в useTodoContext() и выброс ошибки улучшают отладку и делают контракт явным.
- В тестах комбинация реального Provider (интеграция) и мока useTodoContext (unit-подобные сценарии) даёт баланс реалистичности и изоляции.
- Для рефакторинга без смены UX план «сначала контекст и провайдер, потом потребители» снижает риск пропустить обёртку или зависимость.

---

## KNOWN ISSUES / FUTURE CONSIDERATIONS

- В плане тестирования явно не было зафиксировано использование мока useTodoContext в тестах TodoItem для toggle/delete — решено по ходу реализации; на будущее — указывать в плане, где реальный провайдер, где мок хука.
- Рекомендация из рефлексии: при Level 3+ добавлять в чеклист BUILD пункт «ручная проверка ключевых сценариев в браузере».
- Краткий комментарий в todo-context.ts или в docs о том, что контекст — единственная точка доступа к состоянию задач, может помочь новым участникам.

---

## REFERENCES

- **Рефлексия:** [memory-bank/reflection/reflection-context-api-todo-001.md](../reflection/reflection-context-api-todo-001.md)
- **План и чеклисты:** memory-bank/tasks.md (на момент архивирования)
- **Creative phases:** Не применялись (типовой паттерн React Context)
- **Связанная задача:** todo-app-001 (базовая архитектура приложения)
