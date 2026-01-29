# Memory Bank: Active Context

## Current Focus

Разрешить конфликты правил именования (Конфликт #2 и #3) — backlog 104–115

## Current Mode

PLAN — планирование завершено. Готовность к **BUILD** (Level 2–3).

## Current Phase

PLANNING COMPLETE — детальный план в `memory-bank/tasks.md`: фаза 1 (интерфейсы i_camelCase), фаза 2 (файлы kebab-case), фаза 3 (финализация). Creative phases не требуются.

## Next Steps

1. **Перейти в режим BUILD** — выполнять план из `memory-bank/tasks.md` по фазам.
2. Фаза 1: переименовать интерфейсы в `src/types/todo.ts` и во всех использованиях; коммит.
3. Фаза 2: переименовать файлы в `src/hooks/` и `src/utils/`, обновить импорты; коммит.
4. Фаза 3: финальная проверка тестов и сборки, обновление Memory Bank.

## Context for AI

- Проект: pet.todo - TO-DO Application
- Стек: React 19, Vite 7, TypeScript 5.9, SCSS (sass-embedded)
- **Текущая задача:** `rules-naming-conflicts-002` — разрешить конфликты именования (#2 файлы, #3 интерфейсы)
- **Источник:** `memory-bank/backlog.md` (строки 104–115)
- **Конфликт #2:** обычные файлы — в коде camelCase, в правилах kebab-case (файлы: хуки, utils, types, constants + тесты)
- **Конфликт #3:** интерфейсы — в коде PascalCase, в правилах i_camelCase (Todo, TodoState, \*Props в types и компонентах)
- **Сложность:** Level 2–3 — много файлов, обновление импортов и типов, выбор стратегии
- **Статус:** Ожидается команда PLAN для составления плана
