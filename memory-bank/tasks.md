# Memory Bank: Tasks

## Current Task

**Task ID:** drag-drop-001  
**Название:** Drag & Drop для сортировки задач  
**Уровень:** Level 2 — Simple Enhancement  
**Ветка:** `feat/drag-drop-sort-tasks`  
**Статус:** В работе

**Требования (из backlog):**

- Перетаскивание задач для изменения порядка
- Визуальный feedback при перетаскивании
- Сохранение порядка в localStorage

---

## Implementation Plan (PLAN complete)

### Description

Добавление возможности перетаскивания задач для изменения их порядка. **UX:** привычный вариант — всегда видимый grip (⋮⋮) слева от чекбокса, без режима вкл/выкл. Порядок сохраняется в localStorage через `useLocalStorage`. При фильтрации перестановка влияет только на видимые элементы.

### Technology Stack

- **Библиотека DnD:** `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
- **Причина выбора:** Современная, лёгкая, доступная (a11y), совместима с React 19. `react-beautiful-dnd` устарела и не поддерживается Atlassian.

### Technology Validation Checkpoints

- [ ] Зависимости установлены (`pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`)
- [ ] Сборка проходит (`pnpm build`)
- [ ] Тесты проходят (`pnpm test`)

### Affected Components

| Файл                                    | Изменения                                                    |
| --------------------------------------- | ------------------------------------------------------------ |
| `src/hooks/use-todos.ts`                | Добавить `reorderTodos(reorderedItems)`                      |
| `src/contexts/todo-context.ts`          | Добавить `reorderTodos` в интерфейс контекста                |
| `src/utils/todo-helpers.ts`             | Добавить `mergeReorderedItems` (по id)                       |
| `src/components/TodoList/TodoList.tsx`  | Обернуть в DndContext, SortableContext; обработка onDragEnd  |
| `src/components/TodoItem/TodoItem.tsx`  | Добавить `onEditModeChange?`; grip; обёртка SortableTodoItem |
| `src/assets/grip.svg`                   | Иконка grip для drag-handle                                  |
| `src/components/TodoApp/TodoApp.tsx`    | Передать `reorderTodos` в TodoList (через контекст)          |
| `src/components/TodoItem/TodoItem.scss` | Стили для состояния перетаскивания (opacity, cursor)         |

### Implementation Steps

1. **Установка зависимостей**
   - `pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`
   - Проверить сборку

2. **Утилита mergeReorderedItems**
   - Файл: `src/utils/todo-helpers.ts`
   - Функция: `mergeReorderedItems(todos, reorderedItems): i_todo[]`
   - Логика (по id): итерация по `todos`; если `todo.id` есть в `reorderedItems` — подставить следующий элемент из `reorderedItems`; иначе оставить элемент без изменений. Порядок подстановки — порядок появления id в исходном `todos`.
   - Добавить тесты в `todo-helpers.test.ts`

3. **reorderTodos в use-todos**
   - Файл: `src/hooks/use-todos.ts`
   - Сигнатура: `reorderTodos(reorderedItems: i_todo[]): void`
   - Вызов `mergeReorderedItems(todos, reorderedItems)` и `setTodos`
   - Добавить тесты в `use-todos.test.ts`

4. **Обновление контекста**
   - Файл: `src/contexts/todo-context.ts`
   - Добавить `reorderTodos` в `i_todoContextValue`

5. **Интеграция DnD в TodoList**
   - Файл: `src/components/TodoList/TodoList.tsx`
   - Обернуть список в `DndContext` (sensors: PointerSensor, KeyboardSensor)
   - Обернуть в `SortableContext` (items: ids, strategy: verticalListSortingStrategy)
   - В `onDragEnd`: вычислить новый порядок через `arrayMove`, вызвать `reorderTodos(newOrder)`
   - TodoList получает `reorderTodos` через контекст

6. **SortableTodoItem и drag-handle**
   - UX: **привычный вариант** — всегда видимый grip (⋮⋮) слева от чекбокса, без режима вкл/выкл
   - Создать `SortableTodoItem`, который рендерит TodoItem с `ref`, `style` (transform), `attributes`, `listeners` от useSortable
   - Grip: SVG-иконка слева от чекбокса; `listeners` и `setActivatorNodeRef` только на grip — чекбокс и кнопки не затрагиваются
   - Добавить `grip.svg` в `assets/` (или inline SVG)
   - **Вариант A (isEditing):** TodoItem принимает `onEditModeChange?: (editing: boolean) => void`, вызывает при входе/выходе из режима редактирования. SortableTodoItem хранит `isEditing`, передаёт в `useSortable({ disabled: isEditing })`

7. **Визуальный feedback**
   - При `isDragging`: opacity, cursor, возможно scale
   - Стили в `TodoItem.scss`: `.todo-item--dragging`

8. **TodoApp**
   - TodoList получает `reorderTodos` из контекста
   - При onDragEnd вызывать `reorderTodos(arrayMove(filteredTodos, oldIndex, newIndex))` — filter не нужен

9. **Тесты**
   - Unit: `mergeReorderedItems`, `reorderTodos` в use-todos
   - TodoList: рендер с DnD (можно мокать DndContext)
   - E2E (опционально): перетаскивание в Playwright

### Dependencies

- `@dnd-kit/core` — ядро DnD
- `@dnd-kit/sortable` — preset для сортируемых списков
- `@dnd-kit/utilities` — CSS transform утилиты

### Challenges & Mitigations

| Вызов                                  | Решение                                                                                                               |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Конфликт drag с чекбоксом/кнопками     | Grip (⋮⋮) слева от чекбокса — `setActivatorNodeRef` только на grip, чекбокс и кнопки не затрагиваются                 |
| Фильтрация: reorder только видимых     | `mergeReorderedItems` — по id: заменяем элементы, чьи id есть в `reorderedItems`, filter не нужен                     |
| Совместимость с inline-редактированием | Вариант A: TodoItem `onEditModeChange` → SortableTodoItem хранит `isEditing` → `useSortable({ disabled: isEditing })` |

### Creative Phases Required

- Нет. Стандартная интеграция @dnd-kit.

---

**Чеклист:**

- [x] PLAN: Составить план реализации
- [ ] Выбрать библиотеку DnD — **@dnd-kit** (выбрано)
- [ ] Установить зависимости @dnd-kit
- [ ] Добавить `mergeReorderedItems` в todo-helpers
- [ ] Добавить `reorderTodos` в use-todos и контекст
- [ ] Интегрировать DnD в TodoList (DndContext, SortableContext)
- [ ] Создать SortableTodoItem с grip (⋮⋮) слева от чекбокса
- [ ] Визуальный feedback при перетаскивании
- [ ] Сохранение порядка (автоматически через useLocalStorage)
- [ ] Тесты
- [ ] CLOSE: Финализировать задачу командой /close-task

---

## Last Completed Task

**Task ID:** edit-task-001  
**Название:** Редактирование текста задачи  
**Дата:** 2026-02-17  
**Статус:** ✅ COMPLETED & ARCHIVED  
**Запись:** [`memory-bank/completed-tasks/2025/12/edit-task-001_2026-02-17.md`](completed-tasks/2025/12/edit-task-001_2026-02-17.md)  
**Архив:** [`memory-bank/archive/archive-edit-task-001.md`](archive/archive-edit-task-001.md)  
**Рефлексия:** [`memory-bank/reflection/reflection-edit-task-001.md`](reflection/reflection-edit-task-001.md)

**Следующий шаг:** `/van` для инициализации новой задачи.
