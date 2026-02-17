# Memory Bank: Progress

## Overall Progress

**Активная задача:** Нет  
**Статус:** Ожидание новой задачи

## 2026-02-17: drag-drop-001 — ЗАВЕРШЕНО

**Название:** Drag & Drop для сортировки задач  
**Уровень:** Level 2 — Simple Enhancement  
**Ветка:** `feat/drag-drop-sort-tasks`  
**Статус:** ✅ COMPLETED & ARCHIVED

**Итог:** Перетаскивание задач реализовано через @dnd-kit. Grip (⋮⋮) слева от чекбокса — единственный drag-handle. mergeReorderedItems по id для корректной работы при фильтрации. Inline-редактирование отключает DnD. 30 тестов проходят, сборка успешна.

**Архив:** [`memory-bank/archive/archive-drag-drop-001.md`](archive/archive-drag-drop-001.md)  
**Рефлексия:** [`memory-bank/reflection/reflection-drag-drop-001.md`](reflection/reflection-drag-drop-001.md)

**Следующий шаг:** `/van` для инициализации новой задачи или `/close-task` для финализации.

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
