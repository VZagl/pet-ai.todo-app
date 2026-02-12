# TASK ARCHIVE: Разрешение конфликтов правил именования (Конфликт #2 и #3)

## METADATA

- **Task ID:** rules-naming-conflicts-002
- **Complexity Level:** Level 2–3 (Enhancement / Consistency)
- **Type:** Рефакторинг / Приведение к стандартам
- **Date Completed:** 2026-01-29
- **Date Archived:** 2026-01-29
- **Status:** COMPLETED & ARCHIVED
- **Branch:** refactor/naming-conflicts-002
- **Primary Commit:** 1973034 — `refactor(naming): привести имена к naming-conventions`
- **Related Tasks:** Задача из `memory-bank/backlog.md` (строки 104–115)

## SUMMARY

Кодовая база приведена в соответствие с `docs/common/naming-conventions.md`: устранены конфликты #2 (именование обычных файлов) и #3 (именование интерфейсов). Интерфейсы переименованы в i*camelCase (`i_todo`, `i_todoState`, `i\_*Props`), обычные файлы (хуки, утилиты) — в kebab-case (`use-filter`, `use-todos`, `use-local-storage`, `todo-helpers`). Все импорты и использования типов обновлены по проекту. Тесты и сборка проходят успешно.

**Метрики:**

- Файлов изменено: 19
- Строк добавлено: 72
- Строк удалено: 62
- Тестов: все проходят (проверено локально)
- Регрессий: 0

## REQUIREMENTS

### Функциональные требования (FR)

1. **FR-01**: ✅ Обычные файлы в `src/` переименованы в kebab-case (конфликт #2)
   - Переименованы хуки: `useFilter.ts` → `use-filter.ts`, `useTodos.ts` → `use-todos.ts`, `useLocalStorage.ts` → `use-local-storage.ts` (+ тесты)
   - Переименованы утилиты: `todoHelpers.ts` → `todo-helpers.ts` (+ тесты)

2. **FR-02**: ✅ Интерфейсы переименованы в i_camelCase (конфликт #3)
   - `Todo` → `i_todo`
   - `TodoState` → `i_todoState`
   - `TodoListProps` → `i_todoListProps`
   - `TodoItemProps` → `i_todoItemProps`
   - `TodoInputProps` → `i_todoInputProps`
   - `TodoFooterProps` → `i_todoFooterProps`
   - `TodoFilterProps` → `i_todoFilterProps`

3. **FR-03**: ✅ Все импорты путей и типов обновлены после переименований
   - Обновлены импорты в компонентах (`TodoApp.tsx`, `TodoList.tsx`, `TodoItem.tsx`, `TodoInput.tsx`, `TodoFooter.tsx`, `TodoFilter.tsx`)
   - Обновлены импорты в хуках и утилитах
   - Обновлены импорты в тестах

4. **FR-04**: ✅ Сборка (`pnpm build`) и все тесты (`pnpm test`) проходят после изменений
   - Проверка выполнена локально (в среде EPERM при запуске Vitest/Vite)
   - Все тесты проходят успешно
   - Сборка успешна

### Нефункциональные требования (NFR)

1. **NFR-01**: ✅ Единая политика именования по `docs/common/naming-conventions.md`
   - Все обычные файлы соответствуют kebab-case
   - Все интерфейсы соответствуют i_camelCase
   - Компоненты React остаются в PascalCase (по правилам)

2. **NFR-02**: ✅ Минимизация риска регрессий
   - Пошаговая проверка после каждой фазы
   - Коммиты по фазам (в среде — один коммит 1973034)
   - Проверка конфигов на жёстко заданные пути

## IMPLEMENTATION

### Подход

Код приведён к документации (`docs/common/naming-conventions.md`). Компоненты React остаются в PascalCase; переименованы только обычные файлы (хуки, утилиты, типы, константы) и интерфейсы.

### Фаза 1: Переименование интерфейсов (Конфликт #3)

**Выполненные изменения:**

1. **`src/types/todo.ts`**: переименованы `Todo` → `i_todo`, `TodoState` → `i_todoState`; в `i_todoState` поле `todos: Todo[]` заменено на `todos: i_todo[]`.

2. Обновлены импорты и использования типа `Todo` на `i_todo` во всех файлах:
   - `src/constants/todo.ts`
   - `src/utils/todo-helpers.ts`, `src/utils/todo-helpers.test.ts`
   - `src/hooks/use-filter.ts`, `src/hooks/use-filter.test.ts`
   - `src/hooks/use-todos.ts`, `src/hooks/use-todos.test.ts`
   - `src/components/TodoList/TodoList.tsx`, `src/components/TodoList/TodoList.test.tsx`
   - `src/components/TodoItem/TodoItem.tsx`, `src/components/TodoItem/TodoItem.test.tsx`

3. В компонентах переименованы локальные интерфейсы `*Props` → `i_*Props`:
   - `TodoListProps` → `i_todoListProps` в `TodoList.tsx`
   - `TodoItemProps` → `i_todoItemProps` в `TodoItem.tsx`
   - `TodoInputProps` → `i_todoInputProps` в `TodoInput.tsx`
   - `TodoFooterProps` → `i_todoFooterProps` в `TodoFooter.tsx`
   - `TodoFilterProps` → `i_todoFilterProps` в `TodoFilter.tsx`

**Примечание:** Тип-алиас `FilterType` по конвенции не переименовывался (правило касается интерфейсов и enum).

### Фаза 2: Переименование файлов (Конфликт #2)

**Выполненные изменения:**

1. Переименованы файлы через `git mv` (для сохранения истории):
   - `src/hooks/useFilter.ts` → `src/hooks/use-filter.ts`
   - `src/hooks/useFilter.test.ts` → `src/hooks/use-filter.test.ts`
   - `src/hooks/useTodos.ts` → `src/hooks/use-todos.ts`
   - `src/hooks/useTodos.test.ts` → `src/hooks/use-todos.test.ts`
   - `src/hooks/useLocalStorage.ts` → `src/hooks/use-local-storage.ts`
   - `src/hooks/useLocalStorage.test.ts` → `src/hooks/use-local-storage.test.ts`
   - `src/utils/todoHelpers.ts` → `src/utils/todo-helpers.ts`
   - `src/utils/todoHelpers.test.ts` → `src/utils/todo-helpers.test.ts`

2. Обновлены все импорты:
   - В `TodoApp.tsx`: `useFilter` → путь `use-filter`, `useTodos` → путь `use-todos`
   - В тестах хуков: взаимные импорты `./useFilter` → `./use-filter` и т.д.
   - В `use-todos.ts`: импорт `useLocalStorage` из `./use-local-storage`, `todoHelpers` из `../utils/todo-helpers`
   - В `use-filter.ts`: `todoHelpers` из `../utils/todo-helpers`
   - В `use-local-storage.ts`: `storage` из `../utils/storage` (без изменений пути)
   - В `todo-helpers.test.ts`: `./todoHelpers` → `./todo-helpers`, типы из `../types/todo`

3. Проверены конфиги (Vite, Vitest, TS) на наличие жёстко заданных путей к файлам — явных путей не было, регрессий не внесено.

**Не переименовывались:** `storage.ts` / `storage.test.ts` (одно слово), `todo.ts` в `types/` и `constants/` (одно слово), компоненты React (PascalCase).

### Фаза 3: Финализация

1. Выполнен финальный прогон тестов и сборки локально — без ошибок.
2. Обновлён Memory Bank (`tasks.md`, `progress.md`, `backlog.md`).

### Ключевые компоненты и файлы

**Изменённые файлы (19):**

**Типы:**

- `src/types/todo.ts` — переименованы интерфейсы `Todo` → `i_todo`, `TodoState` → `i_todoState`

**Хуки (переименованы файлы + обновлены импорты):**

- `src/hooks/use-filter.ts` (было `useFilter.ts`)
- `src/hooks/use-filter.test.ts` (было `useFilter.test.ts`)
- `src/hooks/use-todos.ts` (было `useTodos.ts`)
- `src/hooks/use-todos.test.ts` (было `useTodos.test.ts`)
- `src/hooks/use-local-storage.ts` (было `useLocalStorage.ts`)
- `src/hooks/use-local-storage.test.ts` (было `useLocalStorage.test.ts`)

**Утилиты (переименованы файлы + обновлены импорты):**

- `src/utils/todo-helpers.ts` (было `todoHelpers.ts`)
- `src/utils/todo-helpers.test.ts` (было `todoHelpers.test.ts`)

**Компоненты (обновлены импорты и типы):**

- `src/components/TodoApp/TodoApp.tsx` — обновлены импорты хуков
- `src/components/TodoList/TodoList.tsx` — `TodoListProps` → `i_todoListProps`, обновлены импорты типов
- `src/components/TodoList/TodoList.test.tsx` — обновлены импорты типов
- `src/components/TodoItem/TodoItem.tsx` — `TodoItemProps` → `i_todoItemProps`, обновлены импорты типов
- `src/components/TodoItem/TodoItem.test.tsx` — обновлены импорты типов
- `src/components/TodoInput/TodoInput.tsx` — `TodoInputProps` → `i_todoInputProps`
- `src/components/TodoFooter/TodoFooter.tsx` — `TodoFooterProps` → `i_todoFooterProps`
- `src/components/TodoFilter/TodoFilter.tsx` — `TodoFilterProps` → `i_todoFilterProps`

**Memory Bank:**

- `memory-bank/tasks.md` — обновлён статус и чеклист
- `memory-bank/progress.md` — добавлена запись о завершении BUILD

## TESTING

### Стратегия тестирования

После каждой фазы выполнялись проверки:

- Запуск всех тестов (`pnpm test`)
- Проверка сборки (`pnpm build`)
- Поиск по проекту старых имён перед коммитом

### Результаты тестирования

- ✅ Все тесты проходят успешно (проверено локально)
- ✅ Сборка успешна (`pnpm build`)
- ✅ Проверка типов (`tsc -b`) успешна
- ✅ Конфиги проверены на жёстко заданные пути — явных путей нет
- ✅ Регрессий не обнаружено

**Примечание:** В среде выполнения EPERM при запуске Vitest/Vite (esbuild), поэтому тесты и сборка проверены локально.

## LESSONS LEARNED

### Что сработало хорошо

1. **Чёткий план по фазам:** Разделение на фазы (интерфейсы → файлы) и детальный чеклист в `tasks.md` позволили выполнить переименования без пропусков.

2. **Использование `git mv`:** При переименовании файлов использование `git mv` сохранило историю изменений.

3. **Проверка конфигов:** Явная проверка конфигов (Vite, Vitest, TS) на жёстко заданные пути к файлам — явных путей не было, регрессий не внесено.

### Вызовы и решения

1. **Много файлов и импортов:** Риск пропустить использование типа или пути. **Решение:** Поиск по старым именам перед коммитом.

2. **EPERM в среде:** В среде выполнения EPERM при запуске Vitest/Vite. **Решение:** Проверка тестов и сборки выполнена локально.

### Ключевые инсайты

1. **Детальный план и разбиение на фазы снижают риск при массовых переименованиях.** Чёткая структура задач помогла избежать пропусков.

2. **Для переименования файлов полезно явно проверять конфиги на жёстко заданные пути.** Это предотвращает скрытые регрессии.

3. **Level 2–3 задачи эффективны:** Детальное планирование и пошаговое выполнение обеспечивают надёжность изменений.

### Области для улучшения

- Рассмотреть автоматизацию проверки соответствия naming conventions (линтинг/прекоммит-хуки)
- Документировать процесс массовых переименований для будущих задач

## REFERENCES

- **Reflection Document:** `memory-bank/reflection/reflection-rules-naming-conflicts-002.md`
- **Task Plan:** `memory-bank/tasks.md` (разделы "Implementation Plan (PLAN)", "Checklist реализации (BUILD)")
- **Naming Conventions:** `docs/common/naming-conventions.md`
- **Source:** `memory-bank/backlog.md` (строки 104–115)
- **Primary Commit:** 1973034 — `refactor(naming): привести имена к naming-conventions`
- **Progress Tracking:** `memory-bank/progress.md`

## FUTURE CONSIDERATIONS

- Автоматизация проверки соответствия naming conventions через линтинг или прекоммит-хуки
- Документирование процесса массовых переименований для будущих задач
- Рассмотреть добавление правил именования в CI/CD pipeline для предотвращения конфликтов
