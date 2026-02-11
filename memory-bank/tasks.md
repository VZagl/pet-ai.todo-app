# Memory Bank: Tasks

## Current Task

**Task ID:** e2e-tests-001  
**Название:** Добавить E2E тесты (Playwright/Cypress)  
**Уровень:** Level 3 — Intermediate Feature  
**Ветка:** `feat/e2e-tests-001`  
**Статус:** CREATIVE COMPLETE → BUILD

**Требования (из backlog):**

- Полный user flow тестирование
- Тестирование на разных браузерах
- Автоматизация критических сценариев

**Workflow:** VAN → PLAN → CREATIVE → BUILD → REFLECT

---

## План реализации (PLAN Mode Output)

### 1. Анализ требований

**Функциональные требования:**

- Полный user flow: добавление → переключение → удаление → фильтрация задач
- Тестирование на разных браузерах (Chrome, Firefox, WebKit/Edge)
- Автоматизация критических сценариев

**Технические ограничения:**

- Существующий стек: React 19, Vite 7, TypeScript 5.9
- Unit-тесты: Vitest + Testing Library (оставить без изменений)
- Dev-сервер: `pnpm dev` → `http://localhost:5173`
- Build: `pnpm build` → `dist/`, preview: `pnpm preview`

### 2. Анализ компонентов

**Затронутые компоненты приложения (pet.todo):**

| Компонент           | Роль в E2E                              | User flow                 |
| ------------------- | --------------------------------------- | ------------------------- |
| TodoInput           | Ввод задачи, кнопка «Добавить»          | Добавление задачи         |
| TodoList / TodoItem | Список задач, чекбокс, кнопка удаления  | Toggle, Delete            |
| TodoFilter          | Кнопки «Все», «Активные», «Завершенные» | Фильтрация                |
| TodoFooter          | Счётчик задач                           | Проверка состояния        |
| localStorage        | Персистентность                         | Сохранение между сессиями |

**User flows для тестирования:**

1. **Добавление задачи** — input → Enter / кнопка «Добавить»
2. **Переключение задачи** — клик по чекбоксу
3. **Удаление задачи** — клик по кнопке ×
4. **Фильтрация** — клик по «Все», «Активные», «Завершенные»
5. **Валидация** — пустая строка, превышение 500 символов
6. **Персистентность** — перезагрузка страницы, проверка сохранённых данных

### 3. Creative Phase — ✅ COMPLETE

**Выбор инструмента E2E: Playwright vs Cypress**

**Решение:** Playwright  
**Документ:** [`memory-bank/creative/creative-e2e-tool-selection.md`](creative/creative-e2e-tool-selection.md)

Критерии учтены:

- Совместимость с Vite + React (webServer)
- Multi-browser (Chrome, Firefox, WebKit) — нативно
- DX (trace, скриншоты, UI mode)
- Интеграция в CI/CD
- Соответствие `testing-guidelines.md` (русский язык в тестах)

### 4. Технологическая валидация (Technology Validation)

**Checkpoints:**

- [x] Выбран инструмент: **Playwright**
- [ ] Установка: `pnpm add -D @playwright/test` или `pnpm add -D cypress`
- [ ] Конфигурация (playwright.config.ts / cypress.config.ts)
- [ ] Hello World тест проходит
- [ ] Запуск против `pnpm dev` или `pnpm build && pnpm preview`
- [ ] Все зависимости совместимы с package.json

### 5. План реализации

#### Фаза 1: Setup (после CREATIVE)

1. Установить выбранный E2E-инструмент
2. Создать конфигурационный файл
3. Настроить baseURL (localhost:5173 для dev)
4. Добавить скрипты в `package.json` (e.g. `test:e2e`, `test:e2e:ui`)
5. Создать директорию `e2e/` или `tests/e2e/`

#### Фаза 2: Page Object / Fixtures

1. Определить базовые селекторы (data-testid или aria-label)
2. Создать Page Object для TodoApp (опционально, по выбранному подходу)
3. Fixtures для изоляции localStorage между тестами

#### Фаза 3: Критические сценарии

1. **todo-add.spec** — добавление задачи (валидная, пустая, длинная)
2. **todo-crud.spec** — полный flow: add → toggle → delete
3. **todo-filter.spec** — фильтры «Все», «Активные», «Завершенные»
4. **todo-persistence.spec** — localStorage, перезагрузка страницы

#### Фаза 4: Multi-browser

1. Настроить проекты для Chrome, Firefox, WebKit (Playwright) или browsers (Cypress)
2. Запуск всего набора в headless-режиме

#### Фаза 5: Интеграция

1. Обновить `docs/project/testing-guidelines.md` — раздел E2E
2. Опционально: GitHub Actions / CI для E2E

### 6. Зависимости

- **E2E-инструмент:** Playwright (`@playwright/test`)
- **Сервер:** Vite dev или preview (рекомендуется dev для скорости)
- **Константы:** `STORAGE_KEY`, `MAX_TODO_LENGTH` из `src/constants/todo.ts`

### 7. Трудности и митигации

| Проблема                                 | Митигация                                                                    |
| ---------------------------------------- | ---------------------------------------------------------------------------- |
| Конфликт портов при параллельном запуске | Использовать `webServer` в Playwright или `baseUrl` в Cypress с явным портом |
| localStorage между тестами               | Очистка в `beforeEach` или через context/fixtures                            |
| Кириллица в селекторах                   | Использовать `data-testid` или `aria-label` для стабильности                 |
| Flaky-тесты из-за анимаций               | Увеличить timeout или отключить анимации в тестах                            |

### 8. Статус и чеклисты

**Status:**

- [x] Initialization complete (VAN)
- [x] Planning complete (PLAN)
- [x] Creative phase (выбор инструмента — Playwright)
- [ ] Technology validation
- [ ] Implementation (BUILD)

**Implementation Checklist:**

- [ ] E2E-инструмент установлен и настроен
- [ ] Hello World тест проходит
- [ ] todo-add.spec реализован
- [ ] todo-crud.spec реализован
- [ ] todo-filter.spec реализован
- [ ] todo-persistence.spec реализован
- [ ] Multi-browser конфигурация
- [ ] testing-guidelines.md обновлён

---

## Last Completed Task

**Task ID:** completed-tasks-journal-001  
**Название:** Ввести журнал завершённых задач в `memory-bank/completed-tasks/`  
**Дата:** 2026-02-10  
**Статус:** ✅ COMPLETED  
**Запись:** [`memory-bank/completed-tasks/2026/02/completed-tasks-journal-001_2026-02-10.md`](completed-tasks/2026/02/completed-tasks-journal-001_2026-02-10.md)
