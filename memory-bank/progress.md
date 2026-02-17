# Memory Bank: Progress

## Overall Progress

**Активная задача:** drag-drop-001  
**Статус:** В работе (ветка создана)

## 2026-02-17: drag-drop-001 — В РАБОТЕ

**Название:** Drag & Drop для сортировки задач  
**Уровень:** Level 2 — Simple Enhancement  
**Ветка:** `feat/drag-drop-sort-tasks`  
**Статус:** 🟡 В работе

**Текущий этап:** BUILD завершён.

**Реализовано:**

- Установлены @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities
- `mergeReorderedItems` в todo-helpers + тесты
- `reorderTodos` в use-todos и контекст + тесты
- DndContext, SortableContext в TodoList
- SortableTodoItem с grip (⋮⋮) слева от чекбокса
- Визуальный feedback (.todo-item--dragging)
- Порядок сохраняется через useLocalStorage

**Тесты:** TodoList, todo-helpers, use-todos — 30 тестов проходят. Сборка успешна.

---

## 2026-02-17: edit-task-001 — ЗАВЕРШЕНО

**Название:** Редактирование текста задачи  
**Уровень:** Level 2 — Simple Enhancement  
**Ветка:** `feat/inline-edit-todo-item`  
**Статус:** ✅ COMPLETED & ARCHIVED

**Итог:** Inline-редактирование реализовано в TodoItem. Кнопка редактирования (карандаш) — единственный способ входа. Валидация (пустая строка, MAX_TODO_LENGTH). Enter — сохранить, Escape — отменить. Кнопки Save/Cancel с иконками. Задержка 400 ms для action buttons после выхода. 15 тестов TodoItem проходят. Сборка успешна.

**Запись:** [`memory-bank/completed-tasks/2025/12/edit-task-001_2026-02-17.md`](completed-tasks/2025/12/edit-task-001_2026-02-17.md)  
**Архив:** [`memory-bank/archive/archive-edit-task-001.md`](archive/archive-edit-task-001.md)  
**Рефлексия:** [`memory-bank/reflection/reflection-edit-task-001.md`](reflection/reflection-edit-task-001.md)

**Следующий шаг:** `/van` для инициализации новой задачи
