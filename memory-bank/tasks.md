# Memory Bank: Tasks

## Current Task

Заменить props drilling на Context API (задача из backlog: Architecture Improvements)

## Task ID

context-api-todo-001

## Complexity Level

Level 3 — Intermediate Feature

## Status

Планирование завершено (PLAN). Ветка `refactor/todo-context-api`. Ожидает BUILD (или CREATIVE при необходимости).

## Source

`memory-bank/backlog.md` (строки 82–99), раздел Architecture Improvements

## Description

- Создать `TodoContext` и `TodoProvider` для управления действиями с задачами (toggleTodo, deleteTodo, updateTodo и т.д.)
- Создать хук `useTodoActions()` для доступа к действиям из контекста
- Рефакторинг компонентов:
  - `TodoApp` — обернуть в TodoProvider
  - `TodoList` — убрать пропсы onToggle, onDelete
  - `TodoItem` — убрать пропсы обработчиков; использовать useTodoActions() напрямую
- Цель: устранение props drilling, упрощение добавления новых вложенных компонентов

## Technology Stack

- Framework: React 19
- API: Context API (встроенный)
- Language: TypeScript 5.9
- Новые зависимости: не требуются

## Requirements

- Файлы для создания: `src/contexts/TodoContext.tsx`, `src/hooks/use-todo-actions.ts` (конвенция: обычные файлы — kebab-case; React-компоненты — PascalCase)
- Файлы для рефакторинга: `TodoApp.tsx`, `TodoList.tsx`, `TodoItem.tsx`, `App.tsx`
- Связано с: todo-app-001

---

## Implementation Plan (PLAN)

### Requirements Analysis

**Функциональные требования:**

- [ ] TodoContext предоставляет состояние задач и действия (addTodo, toggleTodo, deleteTodo, updateTodo, activeCount).
- [ ] TodoProvider инкапсулирует логику useTodos() и передаёт значение в контекст.
- [ ] useTodoActions() возвращает только действия { addTodo, toggleTodo, deleteTodo, updateTodo } для компонентов, которым не нужны todos/activeCount.
- [ ] TodoApp получает данные из контекста (todos, activeCount, addTodo и т.д.), фильтрация остаётся в TodoApp через useFilter(todos).
- [ ] TodoList принимает только `todos` (без onToggle, onDelete).
- [ ] TodoItem получает только проп `todo`, вызывает toggleTodo/deleteTodo через useTodoActions().

**Технические ограничения:**

- [ ] **Один источник истины:** useTodos вызывается только внутри TodoProvider (в `TodoContext.tsx`) как реализация состояния. Все компоненты приложения получают данные и действия только через контекст (useTodo / useTodoActions). Никакой мешанины: не оставлять useTodos как альтернативный публичный API «для тестов или вне контекста».
- [ ] Сохранить типы `i_todo`, импорты из существующих модулей (constants, utils, types).

### Component Analysis

| Компонент               | Тип         | Изменения                                                                                                                      | Зависимости                |
| ----------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| **TodoContext.tsx**     | Новый       | createContext, TodoProvider использует useTodos(), value = { todos, activeCount, addTodo, toggleTodo, deleteTodo, updateTodo } | useTodos, types, constants |
| **use-todo-actions.ts** | Новый       | useContext(TodoContext), возврат только действий; бросает, если вне Provider                                                   | TodoContext                |
| **App.tsx**             | Рефакторинг | Обернуть \<TodoApp /> в \<TodoProvider>                                                                                        | TodoContext                |
| **TodoApp.tsx**         | Рефакторинг | Использовать useTodo() из контекста вместо useTodos(); убрать передачу onToggle, onDelete в TodoList                           | TodoContext, useFilter     |
| **TodoList.tsx**        | Рефакторинг | Убрать пропсы onToggle, onDelete; интерфейс только { todos }                                                                   | TodoItem                   |
| **TodoItem.tsx**        | Рефакторинг | Убрать onToggle, onDelete из пропсов; использовать useTodoActions() внутри                                                     | use-todo-actions, types    |

### Design Decisions

**Архитектура контекста:**

- В контексте хранятся и состояние (todos, activeCount), и действия. TodoProvider внутри вызывает useTodos() и передаёт весь результат в value. Это позволяет TodoApp брать todos/activeCount и addTodo, а TodoItem — только действия через useTodoActions().
- useTodo() — хук для доступа к полному значению контекста (todos, activeCount, addTodo, toggleTodo, deleteTodo, updateTodo). Используется в TodoApp.
- useTodoActions() — хук, возвращающий только { addTodo, toggleTodo, deleteTodo, updateTodo }. Используется в TodoItem (и при необходимости в TodoInput, если решим убрать проп onAdd).

**Граница Provider:** TodoProvider оборачивает TodoApp в App.tsx (не внутри TodoApp), чтобы корень дерева TODO был внутри контекста.

**Один источник истины:** В приложении единственная точка доступа к состоянию и действиям задач — контекст (useTodo / useTodoActions). useTodos — внутренняя реализация TodoProvider, компоненты его не импортируют. Тесты компонентов оборачивают дерево в TodoProvider (или мокают контекст), а не вызывают useTodos напрямую.

**Фильтрация:** Остаётся в TodoApp: useFilter(todos) по-прежнему вызывается в TodoApp, filteredTodos передаётся в TodoList. Контекст не дублирует фильтр.

### Implementation Strategy

**Фаза 1: Контекст и провайдер**

1. Создать директорию `src/contexts/`.
2. Создать `src/contexts/TodoContext.tsx`:
   - Определить тип значения контекста (todos, activeCount, addTodo, toggleTodo, deleteTodo, updateTodo).
   - createContext с дефолтом null или заглушкой (с проверкой в хуках).
   - Компонент TodoProvider: внутри useTodos(), передать value в Context.Provider.
   - Экспорт useTodo(): useContext; если null — выбросить ошибку «useTodo must be used within TodoProvider».
3. Создать `src/hooks/use-todo-actions.ts`: useContext(TodoContext), вернуть только действия; если вне Provider — выбросить.

**Фаза 2: Точка оборачивания**

4. В `App.tsx`: импорт TodoProvider, обернуть \<TodoApp /> в \<TodoProvider>.

**Фаза 3: Рефакторинг компонентов**

5. **TodoApp.tsx**: заменить useTodos() на useTodo() из контекста. Убрать передачу onToggle, onDelete в TodoList (оставить todos={filteredTodos}).
6. **TodoList.tsx**: убрать из интерфейса onToggle, onDelete; оставить только todos. Убрать передачу onToggle, onDelete в TodoItem.
7. **TodoItem.tsx**: убрать onToggle, onDelete из пропсов; внутри вызвать useTodoActions(), использовать toggleTodo, deleteTodo по todo.id.

**Фаза 4: Тесты и проверки**

8. Обновить тесты: TodoApp.test.tsx, TodoList.test.tsx, TodoItem.test.tsx — обернуть в TodoProvider там, где нужен контекст; убрать передачу onToggle/onDelete в моках для TodoList/TodoItem; при необходимости мокать useTodoActions или контекст.
9. Запустить линтер и тесты (pnpm test, pnpm run build).

### Technology Validation

- [x] Стек определён: React 19, Context API, TypeScript 5.9.
- [x] Новые зависимости не требуются (Context API встроен в React).
- [x] Инициализация и сборка проекта уже работают (Vite 7).
- [x] Конфигурация (tsconfig, vite) не требует изменений для контекста.

**Итог:** технологическая валидация пройдена, к BUILD можно приступать без отдельного POC.

### Dependencies

- Существующие: useTodos, useFilter, useLocalStorage, types (i_todo), constants (STORAGE_KEY), utils (generateId, getActiveCount).
- Внутри контекста: TodoContext зависит от useTodos; useTodoActions зависит от TodoContext. Циклов нет.

---

## Challenges & Mitigations

| Вызов                                                  | Митигация                                                                                                                 |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Тесты падают из-за отсутствия Provider                 | Во всех тестах компонентов, использующих useTodo()/useTodoActions(), оборачивать дерево в \<TodoProvider>.                |
| Типизация контекста (null по умолчанию)                | Тип value: \| null; в useTodo/useTodoActions проверять значение и бросать понятную ошибку при использовании вне Provider. |
| Регрессия поведения (toggle/delete перестают работать) | Сохранить ту же логику в useTodos(); провайдер только передаёт её в контекст; E2E проверка после рефакторинга.            |

---

## Checklist реализации (BUILD)

- [ ] **Контекст:** Создан `src/contexts/TodoContext.tsx` (тип value, createContext, TodoProvider, useTodo).
- [ ] **Хук действий:** Создан `src/hooks/use-todo-actions.ts`, возвращает только действия, ошибка вне Provider.
- [ ] **App:** В App.tsx TodoApp обёрнут в TodoProvider.
- [ ] **TodoApp:** Использует useTodo(), в TodoList передаёт только todos={filteredTodos}.
- [ ] **TodoList:** Пропсы только todos; не передаёт onToggle, onDelete в TodoItem.
- [ ] **TodoItem:** Проп только todo; useTodoActions() для toggleTodo, deleteTodo.
- [ ] **Тесты:** TodoApp, TodoList, TodoItem обновлены (Provider, без лишних пропсов), все проходят.
- [ ] **Линт и сборка:** pnpm run build и pnpm test без ошибок.

---

## Creative Phases Required

**Не требуются.** Дизайн контекста (одно хранилище состояния + действий, два хука useTodo / useTodoActions) соответствует типовому паттерну React Context и задаче из backlog; отдельная креативная фаза не нужна.
