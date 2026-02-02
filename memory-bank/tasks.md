# Memory Bank: Tasks

## Current Task

Заменить props drilling на Context API (задача из backlog: Architecture Improvements)

## Task ID

context-api-todo-001

## Complexity Level

Level 3 — Intermediate Feature

## Status

BUILD завершён. REFLECT завершён. Готово к ARCHIVE.

- [x] Инициализация
- [x] Планирование
- [x] Реализация (BUILD)
- [x] Рефлексия (REFLECT)
- [ ] Архивирование

**Ветка:** `refactor/todo-context-api`

## Source

`memory-bank/backlog.md` (строки 82–99), раздел Architecture Improvements

## Description

- Создать `TodoContext` и `TodoProvider` для управления действиями с задачами (toggleTodo, deleteTodo, updateTodo и т.д.)
- Создать хук `useTodoContext()` для доступа к значению контекста (состояние и действия)
- Рефакторинг компонентов:
  - `TodoApp` — обернуть в TodoProvider
  - `TodoList` — убрать пропсы onToggle, onDelete
  - `TodoItem` — убрать пропсы обработчиков; использовать useTodoContext() и деструктурировать нужные действия
- Цель: устранение props drilling, упрощение добавления новых вложенных компонентов

## Technology Stack

- Framework: React 19
- API: Context API (встроенный)
- Language: TypeScript 5.9
- Новые зависимости: не требуются

## Requirements

- Файлы для создания: `src/contexts/todo-context.ts`, `src/contexts/TodoProvider.tsx`, `src/hooks/use-todo-context.ts` (конвенция: обычные файлы — kebab-case; React-компоненты — PascalCase)
- Файлы для рефакторинга: `TodoApp.tsx`, `TodoList.tsx`, `TodoItem.tsx`, `App.tsx`
- Связано с: todo-app-001

---

## Implementation Plan (PLAN)

### Requirements Analysis

**Функциональные требования:**

- [ ] TodoContext предоставляет состояние задач и действия (addTodo, toggleTodo, deleteTodo, updateTodo, activeCount).
- [ ] TodoProvider инкапсулирует логику useTodos() и передаёт значение в контекст.
- [ ] useTodoContext() возвращает полное значение контекста (todos, activeCount, addTodo, toggleTodo, deleteTodo, updateTodo); компоненты деструктурируют нужное.
- [ ] TodoApp получает данные из контекста (todos, activeCount, addTodo и т.д.), фильтрация остаётся в TodoApp через useFilter(todos).
- [ ] TodoList принимает только `todos` (без onToggle, onDelete).
- [ ] TodoItem получает только проп `todo`, вызывает toggleTodo/deleteTodo через useTodoContext() (деструктурирует { toggleTodo, deleteTodo }).

**Технические ограничения:**

- [ ] **Один источник истины:** useTodos вызывается только внутри TodoProvider (в `TodoProvider.tsx`) как реализация состояния. Все компоненты приложения получают данные и действия только через useTodoContext(). Никакой мешанины: не оставлять useTodos как альтернативный публичный API «для тестов или вне контекста».
- [ ] Сохранить типы `i_todo`, импорты из существующих модулей (constants, utils, types).

### Component Analysis

| Компонент               | Тип         | Изменения                                                                                                          | Зависимости                 |
| ----------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| **todo-context.ts**     | Новый       | createContext, тип i_todoContextValue                                                                              | types                       |
| **TodoProvider.tsx**    | Новый       | TodoProvider использует useTodos(), value в Context.Provider                                                       | todo-context, useTodos      |
| **use-todo-context.ts** | Новый       | useTodoContext() — useContext(todo-context), ошибка вне Provider; возврат полного value                            | todo-context                |
| **App.tsx**             | Рефакторинг | Обернуть \<TodoApp /> в \<TodoProvider>                                                                            | TodoProvider                |
| **TodoApp.tsx**         | Рефакторинг | Использовать useTodoContext() вместо useTodos(); убрать передачу onToggle, onDelete в TodoList                     | use-todo-context, useFilter |
| **TodoList.tsx**        | Рефакторинг | Убрать пропсы onToggle, onDelete; интерфейс только { todos }                                                       | TodoItem                    |
| **TodoItem.tsx**        | Рефакторинг | Убрать onToggle, onDelete из пропсов; использовать useTodoContext() и деструктурировать { toggleTodo, deleteTodo } | use-todo-context, types     |

### Design Decisions

**Архитектура контекста:**

- В контексте хранятся и состояние (todos, activeCount), и действия. TodoProvider внутри вызывает useTodos() и передаёт весь результат в value.
- useTodoContext() — единственный хук доступа к значению контекста (todos, activeCount, addTodo, toggleTodo, deleteTodo, updateTodo). Компоненты деструктурируют нужное: TodoApp — { todos, activeCount, addTodo }; TodoItem — { toggleTodo, deleteTodo }.

**Граница Provider:** TodoProvider оборачивает TodoApp в App.tsx (не внутри TodoApp), чтобы корень дерева TODO был внутри контекста.

**Один источник истины:** В приложении единственная точка доступа к состоянию и действиям задач — useTodoContext(). useTodos — внутренняя реализация TodoProvider, компоненты его не импортируют. Тесты компонентов оборачивают дерево в TodoProvider (или мокают useTodoContext), а не вызывают useTodos напрямую.

**Фильтрация:** Остаётся в TodoApp: useFilter(todos) по-прежнему вызывается в TodoApp, filteredTodos передаётся в TodoList. Контекст не дублирует фильтр.

### Implementation Strategy

**Фаза 1: Контекст и провайдер**

1. Создать директорию `src/contexts/`.
2. Создать `src/contexts/todo-context.ts` и `src/contexts/TodoProvider.tsx`:
   - Определить тип значения контекста (todos, activeCount, addTodo, toggleTodo, deleteTodo, updateTodo).
   - createContext с дефолтом null или заглушкой (с проверкой в хуках).
   - Компонент TodoProvider: внутри useTodos(), передать value в Context.Provider.
   - Создать `src/hooks/use-todo-context.ts`: useTodoContext() — useContext(TodoContext); если null — выбросить ошибку; вернуть полное value.

**Фаза 2: Точка оборачивания**

4. В `App.tsx`: импорт TodoProvider, обернуть \<TodoApp /> в \<TodoProvider>.

**Фаза 3: Рефакторинг компонентов**

5. **TodoApp.tsx**: заменить useTodos() на useTodoContext(). Убрать передачу onToggle, onDelete в TodoList (оставить todos={filteredTodos}).
6. **TodoList.tsx**: убрать из интерфейса onToggle, onDelete; оставить только todos. Убрать передачу onToggle, onDelete в TodoItem.
7. **TodoItem.tsx**: убрать onToggle, onDelete из пропсов; внутри вызвать useTodoContext(), деструктурировать { toggleTodo, deleteTodo }, использовать по todo.id.

**Фаза 4: Тесты и проверки**

8. Обновить тесты: TodoApp.test.tsx, TodoList.test.tsx, TodoItem.test.tsx — обернуть в TodoProvider там, где нужен контекст; убрать передачу onToggle/onDelete в моках для TodoList/TodoItem; при необходимости мокать useTodoContext.
9. Запустить линтер и тесты (pnpm test, pnpm run build).

### Technology Validation

- [x] Стек определён: React 19, Context API, TypeScript 5.9.
- [x] Новые зависимости не требуются (Context API встроен в React).
- [x] Инициализация и сборка проекта уже работают (Vite 7).
- [x] Конфигурация (tsconfig, vite) не требует изменений для контекста.

**Итог:** технологическая валидация пройдена, к BUILD можно приступать без отдельного POC.

### Dependencies

- Существующие: useTodos, useFilter, useLocalStorage, types (i_todo), constants (STORAGE_KEY), utils (generateId, getActiveCount).
- Внутри контекста: todo-context.ts экспортирует TodoContext; TodoProvider использует useTodos; useTodoContext зависит от todo-context. Циклов нет.

---

## Challenges & Mitigations

| Вызов                                                  | Митигация                                                                                                         |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Тесты падают из-за отсутствия Provider                 | Во всех тестах компонентов, использующих useTodoContext(), оборачивать дерево в \<TodoProvider>.                  |
| Типизация контекста (null по умолчанию)                | Тип value: \| null; в useTodoContext проверять значение и бросать понятную ошибку при использовании вне Provider. |
| Регрессия поведения (toggle/delete перестают работать) | Сохранить ту же логику в useTodos(); провайдер только передаёт её в контекст; E2E проверка после рефакторинга.    |

---

## Checklist реализации (BUILD)

- [x] **Контекст:** Созданы `src/contexts/todo-context.ts` (тип value, createContext), `src/contexts/TodoProvider.tsx` (TodoProvider), `src/hooks/use-todo-context.ts` (useTodoContext).
- [x] **App:** В App.tsx TodoApp обёрнут в TodoProvider.
- [x] **TodoApp:** Использует useTodoContext(), в TodoList передаёт только todos={filteredTodos}.
- [x] **TodoList:** Пропсы только todos; не передаёт onToggle, onDelete в TodoItem.
- [x] **TodoItem:** Проп только todo; useTodoContext() с деструктуризацией { toggleTodo, deleteTodo }.
- [x] **Тесты:** TodoApp, TodoList, TodoItem обновлены (Provider, без лишних пропсов), все проходят.
- [x] **Линт и сборка:** pnpm run build и pnpm test без ошибок.

---

## Reflection Highlights (REFLECT завершён)

- **Документ рефлексии:** `memory-bank/reflection/reflection-context-api-todo-001.md`
- **What Went Well:** Чёткий план из четырёх фаз; единый источник истины через useTodoContext(); минимальные контракты компонентов; типизация и проверка null в useTodoContext(); согласованное обновление тестов (Provider + мок хука).
- **Challenges:** Явно не было зафиксировано в плане использование мока useTodoContext в тестах TodoItem для toggle/delete — решено по ходу реализации.
- **Lessons Learned:** Context API с одним провайдером и одним хуком хорошо устраняет props drilling; проверка null в хуке контекста улучшает отладку; комбинация реального Provider и мока хука в тестах даёт баланс реалистичности и изоляции.
- **Next Steps:** Выполнить /archive; при следующих задачах по состоянию опираться на текущий контекст.

---

## Creative Phases Required

**Не требуются.** Дизайн контекста (одно хранилище состояния + действий, один хук useTodoContext) соответствует типовому паттерну React Context и задаче из backlog; отдельная креативная фаза не нужна.
