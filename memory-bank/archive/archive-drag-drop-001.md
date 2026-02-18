# Task Archive: Drag & Drop для сортировки задач

## Metadata

- **Task ID:** drag-drop-001
- **Complexity:** Level 2 — Simple Enhancement
- **Type:** Feature Enhancement (DnD sort)
- **Date Completed:** 2026-02-17
- **Branch:** `feat/drag-drop-sort-tasks`
- **Status:** COMPLETED & ARCHIVED

## Summary

Реализовано перетаскивание задач для изменения их порядка. Использована библиотека @dnd-kit (core, sortable, utilities). Grip (⋮⋮) слева от чекбокса — единственная зона для инициации drag; чекбокс и кнопки не затрагиваются. При фильтрации (active/completed/all) перестановка влияет только на видимые элементы благодаря `mergeReorderedItems` по id. Inline-редактирование отключает DnD через `onEditModeChange`. Визуальный feedback: opacity 0.5, cursor grabbing при перетаскивании. Порядок сохраняется в localStorage через useLocalStorage. 30 тестов проходят, сборка успешна.

## Requirements Addressed

- **Перетаскивание задач:** ✅ Grip (⋮⋮) слева от чекбокса — единственный drag-handle
- **Визуальный feedback:** ✅ opacity 0.5, cursor grabbing при перетаскивании (.todo-item--dragging)
- **Сохранение порядка в localStorage:** ✅ Автоматически через useLocalStorage
- **Фильтрация:** ✅ mergeReorderedItems по id — перестановка влияет только на видимые элементы
- **Совместимость с inline-редактированием:** ✅ onEditModeChange + disabled: isEditing в useSortable

## Implementation Details

### Design Decisions

- **SortableTodoItem как обёртка** — инкапсулирует useSortable; TodoItem остаётся презентационным с опциональными props (grip, isDragging, onEditModeChange).
- **setActivatorNodeRef на grip** — listeners и attributes только на grip; чекбокс, кнопки edit/delete не участвуют в drag.
- **mergeReorderedItems по id** — итерация по todos, подстановка элементов из reorderedItems по id в порядке появления id в todos; остальные элементы без изменений.
- **as='div' в TodoItem** — useSortable требует ref на sortable-элемент; SortableTodoItem рендерит `li`, внутри — TodoItem as `div`; семантика `ul` > `li` сохранена.

### Key Files Modified

| Файл                                                   | Изменения                                                       |
| ------------------------------------------------------ | --------------------------------------------------------------- |
| `src/components/SortableTodoItem/SortableTodoItem.tsx` | Создан — обёртка useSortable, grip, onEditModeChange            |
| `src/components/TodoList/TodoList.tsx`                 | DndContext, SortableContext, onDragEnd, arrayMove, reorderTodos |
| `src/components/TodoItem/TodoItem.tsx`                 | grip, isDragging, onEditModeChange, as='div'                    |
| `src/components/TodoItem/TodoItem.scss`                | .todo-item--dragging (opacity, cursor)                          |
| `src/utils/todo-helpers.ts`                            | mergeReorderedItems(todos, reorderedItems)                      |
| `src/hooks/use-todos.ts`                               | reorderTodos(reorderedItems)                                    |
| `src/contexts/todo-context.ts`                         | reorderTodos в i_todoContextValue                               |
| `src/assets/grip.svg`                                  | Создан — иконка grip для drag-handle                            |
| `src/utils/todo-helpers.test.ts`                       | Тесты mergeReorderedItems                                       |
| `src/hooks/use-todos.test.ts`                          | Тесты reorderTodos                                              |
| `src/components/TodoList/TodoList.test.tsx`            | Проверки grip, DndContext                                       |

### Challenges & Mitigations

| Вызов                                  | Решение                                                                |
| -------------------------------------- | ---------------------------------------------------------------------- |
| Конфликт drag с чекбоксом/кнопками     | Grip с setActivatorNodeRef; listeners только на grip                   |
| Фильтрация: reorder только видимых     | mergeReorderedItems по id; arrayMove + merge с полным списком          |
| Совместимость с inline-редактированием | onEditModeChange + useSortable({ disabled: isEditing })                |
| Настройка sensors                      | PointerSensor distance: 8; TouchSensor delay: 250; KeyboardSensor a11y |

## Testing Performed

- **Unit todo-helpers:** mergeReorderedItems — порядок по id, пустые/частичные списки
- **Unit use-todos:** reorderTodos — вызов mergeReorderedItems, setTodos
- **TodoList:** рендер с grip, DndContext, SortableContext
- **Билд:** `pnpm build` — успешно
- **Тесты:** `pnpm test` — 30 тестов проходят

## Lessons Learned

1. **setActivatorNodeRef** — при ограничении drag-handle одной зоной (grip) — стандартный подход @dnd-kit; избегает конфликтов с чекбоксами, кнопками.
2. **arrayMove + mergeReorderedItems** — при фильтрованном списке: arrayMove даёт новый порядок видимых; mergeReorderedItems сливает с полным списком; filter не нужен.
3. **Обёртка для sortable** — SortableTodoItem с useSortable, рендерящий TodoItem с ref, style, attributes, listeners — удобный паттерн для @dnd-kit/sortable.
4. **as prop для семантики** — TodoItem с as: 'li' | 'div' позволяет использовать внутри обёртки, где корневой элемент — li от SortableTodoItem.

## References

- [`memory-bank/reflection/reflection-drag-drop-001.md`](../reflection/reflection-drag-drop-001.md) — рефлексия
- [`memory-bank/tasks.md`](../tasks.md) — план задачи
- **Связано с:** edit-task-001 (onEditModeChange), todo-app-001
