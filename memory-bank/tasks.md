# Memory Bank: Tasks

## Current Task

**Task ID:** completed-tasks-journal-001  
**Источник:** `memory-bank/backlog.md` → Memory Bank / Process  
**Уровень сложности:** Level 2 — Simple Enhancement  
**Ветка:** `docs/completed-tasks-journal`

**Проблема:** В проекте нет единого журнала завершённых задач. История разбросана по `progress.md`, `backlog.md` и `tasks.md`. Нужно создать каталог `memory-bank/completed-tasks/` с чёткой структурой, шаблонами и связями с archive/reflection.

**Требования:**

Функциональные:

- FR-01: Создать каталог `memory-bank/completed-tasks/`
- FR-02: Спроектировать шаблон файла (обязательные/опциональные поля)
- FR-03: Формат имён: `[task_id]_YYYY-MM-DD.md`
- FR-04: Определить связи completed ↔ archive ↔ reflection
- FR-05: Обновить `docs/common/memory-bank-usage.md` (описание каталога + процесс)
- FR-06: Обновить `memory-bank/backlog.md` (роль как планировщик без истории)

Нефункциональные:

- NFR-01: Записи лёгкие (не дублировать archive/reflection)
- NFR-02: Шаблон минимальный, но навигируемый
- NFR-03: Совместимость с существующим workflow

**План реализации:**

1. CREATIVE: Принять дизайн-решения (организация каталога, шаблон, связи, ретроспектива)
2. BUILD: Создать каталог + шаблон, обновить memory-bank-usage.md и backlog.md
3. REFLECT: Зафиксировать результаты, закрыть задачу

**Дизайн-решения для CREATIVE-фазы:**

1. Организация каталога — плоский / по годам / по доменам / комбинированный
2. Шаблон файла — минимальный (метаданные + ссылки) vs расширенный (+ описание + метрики)
3. Связи — односторонние (completed → archive/reflection) или двусторонние?
4. Ретроспектива — создавать записи для 13 существующих задач или начать с чистого листа?

**Файлы для изменения:**

- [ ] `memory-bank/completed-tasks/` — создать каталог
- [ ] `memory-bank/completed-tasks/_template.md` — шаблон файла
- [ ] `docs/common/memory-bank-usage.md` — добавить описание каталога и процесс
- [ ] `memory-bank/backlog.md` — зафиксировать роль как планировщик без истории

**Вызовы и митигации:**

| Вызов                                | Митигация                                                        |
| ------------------------------------ | ---------------------------------------------------------------- |
| Неконсистентные имена archive-файлов | completed-tasks использует свой стандарт `[task_id]_YYYYMMDD.md` |
| Дублирование информации              | Шаблон как "карточка-реестр" — только метаданные и ссылки        |
| 13 уже завершённых задач             | Решить в CREATIVE: ретроспективное заполнение или чистый старт   |
| Обновление workflow                  | Добавить шаг в секцию "Перенос задач", не ломать остальное       |
| Роль backlog.md                      | Определить: сохранить сокращённый список или полностью перенести |

**Оценка:** ~1–2 часа (CREATIVE 30 мин + BUILD 30–60 мин + REFLECT 15 мин)

**Чеклист:**

- [x] INIT (VAN): Задача определена, ветка создана, окружение готово
- [x] PLAN: Определить требования (FR-01..06, NFR-01..03)
- [x] PLAN: Спроектировать шаблон файла — вынесено в CREATIVE (варианты определены)
- [x] PLAN: Выбрать дерево каталогов — вынесено в CREATIVE (3 варианта)
- [x] PLAN: Определить связи completed ↔ archive ↔ reflection — вынесено в CREATIVE
- [x] PLAN: Зафиксировать вызовы и митигации (5 пунктов)
- [x] CREATIVE: Принять решения по дизайну структуры
  - Организация: YYYY/MM по дате создания, дата завершения в имени файла
  - Шаблон: полный перенос задачи из backlog + метаданные + дата создания + ссылки
  - Связи: односторонние (completed → archive/reflection)
  - Archive/reflection: остаются в текущих каталогах (пути зашиты в .cursor/)
  - Ретроспектива: полное заполнение всех 17 задач (16 из backlog + todo-app-001)
  - Документ: `memory-bank/creative/creative-completed-tasks-journal.md`
- [ ] BUILD: Создать каталог и шаблон
- [ ] BUILD: Обновить `docs/common/memory-bank-usage.md`
- [ ] BUILD: Обновить `memory-bank/backlog.md`
- [ ] REFLECT: Обновить tasks.md, при необходимости reflection
- [ ] REFLECT: Закрыть задачу в backlog.md по правилам docs/common/memory-bank-usage.md

---

## Last Completed Task

**Task ID:** perf-todo-filter-redundant  
**Название:** TodoFilter — устранение повторной фильтрации

**Status:** COMPLETED (без архива)

- [x] Реализация (BUILD)
- [x] Рефлексия (REFLECT)
- [x] Задача перенесена в backlog → Завершено

**Reflection:** [memory-bank/reflection/reflection-perf-todo-filter-redundant.md](reflection/reflection-perf-todo-filter-redundant.md)  
**Date:** 2026-02-04
