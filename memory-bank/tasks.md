# Memory Bank: Tasks

## Current Task

Разрешить конфликты правил именования (Конфликт #2 и #3)

## Task ID

rules-naming-conflicts-002

## Complexity Level

**Level 2–3** — Enhancement / Consistency (требует PLAN)

**Обоснование:**

- Затрагивает множество файлов: переименование обычных файлов в kebab-case и интерфейсов в i_camelCase
- Все импорты и ссылки на типы во всём `src/` нужно обновить
- Есть несколько подходов (привести код к документации vs изменить документацию под код)
- Влияет на единую политику именования и AGENTS.md
- Риск регрессий: сборка, тесты, поиск по проекту

**Workflow:** VAN → **PLAN** (детальное планирование перед реализацией)

## Status

✅ **REFLECT ЗАВЕРШЁН** — минимальная рефлексия выполнена; готовность к ARCHIVE

**Ветка:** `refactor/naming-conflicts-002` (текущая)
**Коммит:** `1973034` — refactor(naming): привести имена к naming-conventions

**Прогресс:**

- [x] VAN: инициализация и определение сложности (Level 2–3)
- [x] PLAN: анализ кодовой базы, список файлов и интерфейсов
- [x] PLAN: детальный план реализации зафиксирован в tasks.md
- [x] BUILD Фаза 1: интерфейсы i*camelCase (i_todo, i_todoState, i*\*Props)
- [x] BUILD Фаза 2: файлы kebab-case (use-filter, use-todos, use-local-storage, todo-helpers)
- [x] BUILD: коммиты выполнены (коммит 1973034; в среде — один коммит)
- [x] BUILD: запуск тестов и сборки **локально** — выполнено без ошибок
- [x] Фаза 3: финальный прогон тестов и сборки локально выполнен; Memory Bank обновлён
- [x] REFLECT: минимальная рефлексия — `memory-bank/reflection/reflection-rules-naming-conflicts-002.md`

## Source

Задача из `memory-bank/backlog.md` (строки 104–115):

- Разрешить конфликты правил именования (Конфликт #2 и #3)
- **Конфликт #2:** Обычные файлы — правило kebab-case, в коде camelCase
- **Конфликт #3:** Интерфейсы — правило i_camelCase, в коде PascalCase
- **Результат:** Единая политика именования; файлы и типы в `src/` по `docs/common/naming-conventions.md`

## Description

Привести кодовую базу в соответствие с `docs/common/naming-conventions.md`: устранить конфликты #2 (именование файлов) и #3 (именование интерфейсов).

**Конфликт #2 — обычные файлы:**

- Правило: обычные файлы в `kebab-case` (например `todo-helpers.ts`)
- Сейчас в `src/`: camelCase — `todoHelpers.ts`, `useFilter.ts`, `useTodos.ts`, `useLocalStorage.ts`, `storage.ts` и соответствующие `.test.ts`
- Компоненты React остаются в PascalCase по правилам

**Конфликт #3 — интерфейсы:**

- Правило: интерфейсы в `i_camelCase` (например `i_todoListProps`)
- Сейчас: `Todo`, `TodoState`, `TodoListProps`, `TodoItemProps`, `TodoInputProps`, `TodoFooterProps`, `TodoFilterProps` в `src/types/todo.ts` и компонентах

**Scope (оценка):**

- Переименование файлов: хуки, утилиты, типы, константы (и их тесты) — десятки импортов
- Переименование интерфейсов и обновление всех использований по проекту

**План реализации:** будет составлен в режиме **PLAN** (список файлов, порядок переименований, стратегия коммитов).

## Technology Stack

- Markdown для документации
- Git для контроля версий

## Requirements

### Функциональные требования (FR)

1. **FR-01**: Обычные файлы в `src/` переименованы в kebab-case (конфликт #2).
2. **FR-02**: Интерфейсы переименованы в i_camelCase (конфликт #3).
3. **FR-03**: Все импорты путей и типов обновлены после переименований.
4. **FR-04**: Сборка (`pnpm build`) и все тесты (`pnpm test`) проходят после изменений.

### Нефункциональные требования (NFR)

1. **NFR-01**: Единая политика именования по `docs/common/naming-conventions.md`.
2. **NFR-02**: Минимизация риска регрессий (пошаговая проверка, коммиты по фазам).

---

## Implementation Plan (PLAN)

**Подход:** Код приводится к документации (`docs/common/naming-conventions.md`). Компоненты React остаются в PascalCase; переименовываются только обычные файлы (хуки, утилиты, типы, константы) и интерфейсы.

### Фаза 1: Переименование интерфейсов (Конфликт #3)

**Интерфейсы для переименования:**

| Текущее имя       | Целевое имя         | Где определён / используется                      |
| ----------------- | ------------------- | ------------------------------------------------- |
| `Todo`            | `i_todo`            | `src/types/todo.ts`; импорт/тип в 12+ файлах      |
| `TodoState`       | `i_todoState`       | `src/types/todo.ts` (пока не используется в коде) |
| `TodoListProps`   | `i_todoListProps`   | `TodoList.tsx` (определение + использование)      |
| `TodoItemProps`   | `i_todoItemProps`   | `TodoItem.tsx`                                    |
| `TodoInputProps`  | `i_todoInputProps`  | `TodoInput.tsx`                                   |
| `TodoFooterProps` | `i_todoFooterProps` | `TodoFooter.tsx`                                  |
| `TodoFilterProps` | `i_todoFilterProps` | `TodoFilter.tsx`                                  |

**Примечание:** Тип-алиас `FilterType` по конвенции не переименовывается (правило касается интерфейсов и enum).

**Порядок действий:**

1. **`src/types/todo.ts`**: переименовать `Todo` → `i_todo`, `TodoState` → `i_todoState`; в `i_todoState` поле `todos: Todo[]` заменить на `todos: i_todo[]`.
2. Обновить импорты и использования типа `Todo` во всех файлах на `i_todo`:
   - `src/constants/todo.ts`, `src/utils/todoHelpers.ts`, `src/utils/todoHelpers.test.ts`
   - `src/hooks/useFilter.ts`, `src/hooks/useFilter.test.ts`, `src/hooks/useTodos.ts`, `src/hooks/useTodos.test.ts`
   - `src/components/TodoList/TodoList.tsx`, `src/components/TodoList/TodoList.test.tsx`
   - `src/components/TodoItem/TodoItem.tsx`, `src/components/TodoItem/TodoItem.test.tsx`
3. В компонентах переименовать локальные интерфейсы `*Props` → `i_*Props` и обновить использование в сигнатурах компонентов.
4. Запустить `pnpm test` и `pnpm build`. Закоммитить: например, `refactor(naming): интерфейсы в i_camelCase (конфликт #3)`.

### Фаза 2: Переименование файлов (Конфликт #2)

**Файлы для переименования (camelCase → kebab-case):**

| Текущее имя                         | Целевое имя                           |
| ----------------------------------- | ------------------------------------- |
| `src/hooks/useFilter.ts`            | `src/hooks/use-filter.ts`             |
| `src/hooks/useFilter.test.ts`       | `src/hooks/use-filter.test.ts`        |
| `src/hooks/useTodos.ts`             | `src/hooks/use-todos.ts`              |
| `src/hooks/useTodos.test.ts`        | `src/hooks/use-todos.test.ts`         |
| `src/hooks/useLocalStorage.ts`      | `src/hooks/use-local-storage.ts`      |
| `src/hooks/useLocalStorage.test.ts` | `src/hooks/use-local-storage.test.ts` |
| `src/utils/todoHelpers.ts`          | `src/utils/todo-helpers.ts`           |
| `src/utils/todoHelpers.test.ts`     | `src/utils/todo-helpers.test.ts`      |

**Не переименовывать:** `storage.ts` / `storage.test.ts` (одно слово), `todo.ts` в `types/` и `constants/` (одно слово), компоненты React (PascalCase).

**Порядок действий:**

1. Переименовать файлы (через Git, чтобы сохранить историю: `git mv`).
2. Обновить все импорты:
   - В `TodoApp.tsx`: `useFilter` → путь `use-filter`, `useTodos` → путь `use-todos`.
   - В тестах хуков: взаимные импорты `./useFilter` → `./use-filter` и т.д.
   - В `useTodos.ts`: импорт `useLocalStorage` из `./use-local-storage`, `todoHelpers` из `../utils/todo-helpers`.
   - В `useFilter.ts`: `todoHelpers` из `../utils/todo-helpers`.
   - В `useLocalStorage.ts`: `storage` из `../utils/storage` (без изменений пути).
   - В `todoHelpers.test.ts`: `./todoHelpers` → `./todo-helpers`, типы из `../types/todo`.
3. Проверить `vitest.config.ts` / `vite.config.ts` на наличие жёстко заданных путей к файлам тестов (при необходимости поправить).
4. Запустить `pnpm test` и `pnpm build`. Закоммитить: например, `refactor(naming): обычные файлы в kebab-case (конфликт #2)`.

### Фаза 3: Финализация

1. Прогнать полный набор тестов и сборку ещё раз.
2. Обновить Memory Bank (`tasks.md`, `progress.md`, `backlog.md`).

---

## Technology Validation

- Стек уже используется (TypeScript, Vite, Vitest). Дополнительные зависимости не требуются.
- Проверка: после каждой фазы — `pnpm test`, `pnpm build`. Proof of concept не нужен.

---

## Challenges & Mitigations

| Риск                     | Митигация                                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| Пропуск импорта или типа | Поиск по проекту по старым именам (`Todo`, `useFilter`, `todoHelpers` и т.д.) перед коммитом             |
| Поломка сборки/тестов    | Запуск тестов и сборки после каждой фазы; два раздельных коммита (интерфейсы, файлы)                     |
| Пути в конфигах          | Проверить `vite.config.ts`, `vitest.config.ts`, `tsconfig.*.json` на явные пути к переименованным файлам |

---

## Возобновление BUILD (инструкция для ИИ)

**Когда продолжать задачу** (новая сессия, нехватка контекста или пользователь написал «продолжи», «продолжи BUILD», «продолжи rules-naming-conflicts-002»):

1. **Прочитать** `memory-bank/tasks.md` — разделы «Implementation Plan (PLAN)», «Checklist реализации (BUILD)», при необходимости «Requirements» и «Challenges & Mitigations».
2. **Найти** в чеклисте первый пункт с `[ ]` (не выполнен). Это следующий шаг. Пункты с `[x]` не перевыполнять.
3. **Выполнять** только этот шаг (или последовательно шаги до логической границы: конец фазы или коммит). После выполнения шага отметить его в чеклисте как `[x]` и сохранить `tasks.md`.
4. **Границы фаз:**
   - После последнего пункта **Фазы 1** — обязательно запустить `pnpm test` и `pnpm build`; если всё зелёное — закоммитить (refactor(naming): интерфейсы в i_camelCase). Затем можно остановиться или перейти к Фазе 2.
   - После последнего пункта **Фазы 2** — запустить тесты и сборку; закоммитить (refactor(naming): обычные файлы в kebab-case). Затем перейти к Фазе 3.
   - **Фаза 3** — финальная проверка и обновление Memory Bank.
5. **Если контекста не хватает до конца фазы:** сохранить прогресс: обновить чеклист в `tasks.md` (отметить сделанные пункты `[x]`), сохранить файл. Сообщить пользователю: «Остановился после [конкретный пункт]. Продолжить в новой сессии: напиши «Продолжить rules-naming-conflicts-002 по memory-bank/tasks.md».»
6. **Не дублировать работу:** перед правками по текущему пункту быстрым поиском по коду убедиться, что переименования/правки этого пункта ещё не применены (например, уже есть `i_todo` или уже есть файл `use-filter.ts`). Если уже есть — отметить пункт `[x]` и перейти к следующему.

**Идентификатор задачи:** `rules-naming-conflicts-002`. Источник требований и списка файлов — этот файл (`memory-bank/tasks.md`) и `docs/common/naming-conventions.md`.

---

## Checklist реализации (BUILD)

### Фаза 1: Интерфейсы (i_camelCase)

- [x] Переименовать в `src/types/todo.ts`: `Todo` → `i_todo`, `TodoState` → `i_todoState`
- [x] Заменить все использования `Todo` на `i_todo` (импорты и типы) по проекту
- [x] Переименовать в компонентах: `TodoListProps` → `i_todoListProps`, `TodoItemProps` → `i_todoItemProps`, `TodoInputProps` → `i_todoInputProps`, `TodoFooterProps` → `i_todoFooterProps`, `TodoFilterProps` → `i_todoFilterProps`
- [x] Запустить `pnpm test` и `pnpm build` (tsc -b успешен; Vitest/Vite — EPERM в окружении, проверить локально)
- [x] Коммит (выполнен: 1973034 refactor(naming): привести имена к naming-conventions)

### Фаза 2: Файлы (kebab-case)

- [x] Переименовать 6 файлов в `src/hooks/` (use-filter, use-todos, use-local-storage + .test)
- [x] Переименовать 2 файла в `src/utils/` (todo-helpers + .test)
- [x] Обновить все импорты путей к переименованным файлам
- [x] Проверить конфиги (Vite, Vitest, TS) на пути — явных путей нет
- [x] Запустить `pnpm test` и `pnpm build` **локально** — выполнено без ошибок
- [x] Коммит (изменения в коммите 1973034)

### Фаза 3: Финализация

- [x] Финальный прогон тестов и сборки **локально** — выполнено без ошибок
- [x] Обновить `memory-bank/tasks.md`, `progress.md`, `backlog.md`

---

## Creative Phases Required

Не требуются — задача рефакторинга именования по существующим правилам.
