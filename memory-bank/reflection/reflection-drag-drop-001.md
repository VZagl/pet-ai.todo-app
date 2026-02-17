# Рефлексия: Drag & Drop для сортировки задач

**Task ID:** drag-drop-001  
**Название:** Drag & Drop для сортировки задач  
**Дата рефлексии:** 2026-02-17  
**Уровень:** Level 2 — Simple Enhancement

---

## Краткое резюме

Реализовано перетаскивание задач для изменения их порядка. Использована библиотека @dnd-kit (core, sortable, utilities). Grip (⋮⋮) слева от чекбокса — единственная зона для инициации drag; чекбокс и кнопки не затрагиваются. При фильтрации (active/completed/all) перестановка влияет только на видимые элементы благодаря `mergeReorderedItems` по id. Inline-редактирование отключает DnD через `onEditModeChange`. Визуальный feedback: opacity 0.5, cursor grabbing при перетаскивании. Порядок сохраняется в localStorage через useLocalStorage. 30 тестов проходят, сборка успешна.

---

## Что сработало хорошо

1. **Challenges & Mitigations в плане** — заранее определённые риски (конфликт drag с чекбоксом/кнопками, фильтрация, совместимость с inline-редактированием) позволили применить решения без неожиданных блокеров. Grip как единственный drag-handle, `mergeReorderedItems` по id, `onEditModeChange` + `disabled: isEditing` — всё было предусмотрено.
2. **Разделение SortableTodoItem и TodoItem** — обёртка SortableTodoItem инкапсулирует логику useSortable; TodoItem остаётся презентационным с опциональными props (grip, isDragging, onEditModeChange). Чистая интеграция без загрязнения базового компонента.
3. **mergeReorderedItems по id** — при фильтрации TodoList получает отфильтрованный массив; после arrayMove вызывается reorderTodos(reordered). mergeReorderedItems объединяет полный список из localStorage с переупорядоченным подмножеством, сохраняя порядок невидимых элементов. Решение элегантно и покрыто тестами.
4. **setActivatorNodeRef на grip** — стандартный паттерн @dnd-kit для drag-handle; listeners и attributes только на grip, чекбокс и кнопки редактирования/удаления не реагируют на drag.
5. **Sensors** — PointerSensor с distance: 8 предотвращает случайный drag при клике; TouchSensor с delay: 250, tolerance: 5 улучшает UX на touch-устройствах; KeyboardSensor обеспечивает accessibility.

---

## Сложности

1. **Выбор библиотеки** — react-beautiful-dnd устарела и не поддерживается Atlassian; @dnd-kit выбран как современная, лёгкая, доступная альтернатива. Документация @dnd-kit достаточная, но примеры для sortable preset менее многочисленны.
2. **Настройка sensors** — значения distance и delay подбирались эмпирически; для PointerSensor distance: 8 — компромисс между отзывчивостью и предотвращением случайного drag при клике по grip.
3. **Структура DOM** — TodoItem рендерится как `div` внутри `li` (SortableTodoItem), потому что useSortable требует ref на sortable-элемент; `as='div'` в TodoItem позволил сохранить семантику списка (`ul` > `li`).

---

## Применённые решения

1. **Конфликт drag с чекбоксом/кнопками** — grip с setActivatorNodeRef; listeners и attributes только на grip; чекбокс, кнопки редактирования и удаления не участвуют в drag.
2. **Фильтрация** — mergeReorderedItems(todos, reorderedItems): итерация по todos, подстановка элементов из reorderedItems по id в порядке появления id в todos; остальные элементы без изменений.
3. **Inline-редактирование** — TodoItem вызывает onEditModeChange(true/false) при входе/выходе из edit; SortableTodoItem хранит isEditing и передаёт disabled: isEditing в useSortable.
4. **Визуальный feedback** — класс todo-item--dragging при isDragging: opacity 0.5, cursor grabbing.

---

## Технические выводы

1. **setActivatorNodeRef** — при необходимости ограничить drag-handle одной зоной (grip, handle) — стандартный подход @dnd-kit; избегает конфликтов с чекбоксами, кнопками, input.
2. **arrayMove + mergeReorderedItems** — при фильтрованном списке: arrayMove даёт новый порядок видимых элементов; mergeReorderedItems сливает с полным списком; filter не нужен для reorder.
3. **Обёртка для sortable** — отдельный компонент (SortableTodoItem) с useSortable, рендерящий презентационный компонент (TodoItem) с передачей ref, style, transform, attributes, listeners — удобный паттерн для интеграции @dnd-kit/sortable.
4. **as prop для flex-семантики** — TodoItem с as: 'li' | 'div' позволяет использовать его и как standalone item, и внутри обёртки, где корневой элемент — li от SortableTodoItem.

---

## Процессные выводы

1. **Implementation Plan с чекбоксами** — пошаговый план с чётким порядком (dependency, mergeReorderedItems, reorderTodos, контекст, DnD, SortableTodoItem, grip, feedback) ускорил реализацию без пропусков.
2. **Technology Validation Checkpoints** — проверка зависимостей, сборки, тестов в конце плана — полезный reminder для финальной валидации.
3. **Совместимость с предыдущей задачей** — edit-task-001 добавил onEditModeChange; drag-drop-001 использовал этот callback без изменений в TodoItem (только расширение интерфейса).

---

## Рекомендации для будущих задач

1. **DnD с фильтрацией** — при переупорядочивании отфильтрованного списка всегда использовать merge по id; не полагаться на индексы в отфильтрованном массиве.
2. **Drag-handle** — для списков с чекбоксами, кнопками, input — всегда выделять отдельный grip/handle; setActivatorNodeRef на нём.
3. **@dnd-kit** — при выборе DnD-библиотеки для React: @dnd-kit — современная альтернатива react-beautiful-dnd; поддерживает a11y, touch, keyboard.

---

## Метрики

| Метрика            | Значение                                                             |
| ------------------ | -------------------------------------------------------------------- |
| Файлов создано     | 2 (SortableTodoItem.tsx, grip.svg)                                   |
| Файлов изменено    | 7 (TodoList, TodoItem, todo-helpers, use-todos, todo-context, тесты) |
| Тестов добавлено   | mergeReorderedItems, reorderTodos, TodoList проверки grip            |
| Соответствие плану | 100%                                                                 |
| Отклонения         | Нет                                                                  |

---

## Следующий шаг

REFLECT завершён. Готово к команде `/archive`.
