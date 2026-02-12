# Task Archive: E2E тесты (Playwright)

## Metadata

- **Task ID:** e2e-tests-001
- **Complexity:** Level 3 — Intermediate Feature
- **Type:** Feature / Testing Enhancement
- **Date Completed:** 2026-02-11
- **Branch:** `feat/e2e-tests-001`
- **Status:** COMPLETED & ARCHIVED

## Summary

Реализован полный набор E2E тестов для pet.todo на Playwright: добавление, CRUD, фильтрация, персистентность в localStorage. 4 spec-файла, 16 тестов. Multi-browser (Chromium, Firefox, WebKit) настроен через `projects`. Обновлён `docs/project/testing-guidelines.md` — раздел E2E.

## Requirements Addressed

### Функциональные

- **Полный user flow:** ✅ добавление → переключение → удаление → фильтрация
- **Multi-browser:** ✅ Chromium, Firefox, WebKit в `projects` (playwright.config.ts)
- **Автоматизация критических сценариев:** ✅ 4 spec-файла, 16 тестов

### Соответствие плану

Реализация соответствует плану из `tasks.md` и `creative-e2e-tool-selection.md`. Функциональные требования выполнены на 100%.

## Design Decisions & Creative Outputs

### Выбор инструмента: Playwright

**Обоснование:** Multi-browser нативно, встроенный `webServer` для Vite, бесплатный параллельный запуск, `getByRole` хорошо сочетается с `aria-label` в компонентах.

**Creative Phase:** [`memory-bank/creative/creative-e2e-tool-selection.md`](creative/creative-e2e-tool-selection.md)

### Ключевые решения

1. **Fixture с изоляцией localStorage** — `page.evaluate(() => localStorage.clear())` перед `run`; без `addInitScript` для корректной работы с `page.reload()`.
2. **Селекторы** — `getByRole('button', { name: 'Добавить задачу' })`, `getByLabel('Новая задача')` — использование существующих `aria-label`.
3. **Константы** — `STORAGE_KEY`, `MAX_TODO_LENGTH` из `src/constants/todo.ts`.
4. **Валидация пустой строки** — `form.requestSubmit()` для программной отправки формы при отключённой кнопке.

## Implementation Summary

### Approach

Пятифазный план: Setup → Fixtures → Сценарии → Multi-browser → Документация. Technology validation (Hello World) предшествовал основной реализации.

### Key Components

| Файл                           | Назначение                                                     |
| ------------------------------ | -------------------------------------------------------------- |
| `e2e/fixtures.ts`              | Fixture с изоляцией localStorage (goto → clear → reload → run) |
| `e2e/todo-add.spec.ts`         | Добавление: валидная, пустая, длинная задача                   |
| `e2e/todo-crud.spec.ts`        | add → toggle → delete flow                                     |
| `e2e/todo-filter.spec.ts`      | Фильтры: Все, Активные, Завершенные                            |
| `e2e/todo-persistence.spec.ts` | localStorage, перезагрузка страницы                            |

### Key Files Changed

- `playwright.config.ts` — webServer, projects (chromium, firefox, webkit), baseURL
- `package.json` — скрипты `test:e2e`, `test:e2e:ui`
- `docs/project/testing-guidelines.md` — раздел E2E (Playwright)

### Technologies

- **@playwright/test** — E2E-фреймворк
- **Vite webServer** — автоматический запуск `pnpm dev` в конфиге

## Testing Overview

- **Стратегия:** 4 spec-файла по сценариям; общий fixture для изоляции localStorage
- **Результат:** 16/16 тестов passed (Chromium)
- **Команда:** `pnpm test:e2e --project=chromium --workers=1`
- **Firefox/WebKit:** требуют `pnpm exec playwright install`

## Reflection & Lessons Learned

**Рефлексия:** [`memory-bank/reflection/reflection-e2e-tests-001.md`](reflection/reflection-e2e-tests-001.md)

### Ключевые выводы

1. **Creative phase и выбор Playwright** — обоснованное решение подтвердилось на практике (webServer, multi-browser, getByRole).
2. **Fixture с localStorage** — простой подход без побочных эффектов при `reload`.
3. **`form.requestSubmit()`** — способ обойти disabled кнопку при проверке валидации пустой строки.
4. **План «Трудности и митигации»** — помог предусмотреть localStorage, порты, кириллицу до реализации.

## Known Issues / Future Considerations

- **CI pipeline** — по умолчанию используется `--project=chromium`; для multi-browser нужен отдельный CI workflow (GitHub Actions).
- **`playwright install`** — явно указать в README или `run-and-build.md` необходимость установки браузеров для новых разработчиков.
- **Page Object** — при росте до 20+ тестов рассмотреть выделение общих действий (addTask, toggleTask и т.д.).

## Key Files and Components Affected

### Созданные

- `e2e/fixtures.ts`
- `e2e/todo-add.spec.ts`
- `e2e/todo-crud.spec.ts`
- `e2e/todo-filter.spec.ts`
- `e2e/todo-persistence.spec.ts`

### Обновлённые

- `playwright.config.ts` — webServer, projects
- `package.json` — test:e2e скрипты
- `docs/project/testing-guidelines.md` — раздел E2E

## Metrics

| Метрика                  | Значение                      |
| ------------------------ | ----------------------------- |
| Spec-файлов              | 4                             |
| Тестов                   | 16                            |
| Браузеров в конфиге      | 3 (Chromium, Firefox, WebKit) |
| Статус Chromium          | 16/16 passed                  |
| Соответствие требованиям | 100%                          |

## References

- [`memory-bank/tasks.md`](../tasks.md) — план задачи
- [`memory-bank/reflection/reflection-e2e-tests-001.md`](../reflection/reflection-e2e-tests-001.md) — рефлексия
- [`memory-bank/creative/creative-e2e-tool-selection.md`](../creative/creative-e2e-tool-selection.md) — creative phase
- [`docs/project/testing-guidelines.md`](../../docs/project/testing-guidelines.md) — правила тестирования
