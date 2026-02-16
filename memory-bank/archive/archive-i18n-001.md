# Task Archive: Мультиязычность (i18n) — Русский и Английский

## Metadata

- **Task ID:** i18n-001
- **Complexity:** Level 3 — Feature
- **Type:** Internationalization (i18n)
- **Date Completed:** 2026-02-16
- **Branch:** `feat/i18n-001-language-settings`
- **Status:** COMPLETED & ARCHIVED

## Summary

Реализована полная мультиязычность приложения pet.todo: i18next + react-i18next, локали ru/en, плюрализация для счётчика задач, переключатель языка (кнопка с иконкой глобуса, dropdown) в правом верхнем углу. Язык сохраняется в localStorage, определяется по браузеру при первом запуске. Обновлены все компоненты под `t()`, создан `docs/project/i18n-guidelines.md`.

## Requirements Addressed

### Функциональные

- **Установка i18n:** ✅ i18next, react-i18next, i18next-browser-languagedetector
- **Структура локалей:** ✅ `src/locales/{ru,en}/translation.json`
- **Переводы:** ✅ Все текстовые элементы (placeholder, кнопки, ошибки, фильтры, ARIA)
- **Плюрализация:** ✅ RU (task_one/few/many), EN (task_one/other)
- **Переключатель:** ✅ Кнопка с иконкой глобуса (inline SVG, offline), dropdown «Русский»/«English» в правом верхнем углу
- **Сохранение:** ✅ localStorage (`i18nextLng`), детектор (localStorage → navigator)
- **document.documentElement.lang:** ✅ Обновляется при смене языка и при инициализации

### Отклонения от плана

- **Escape для закрытия dropdown:** Указано в creative, не реализовано. Dropdown закрывается при клике вне и при выборе.
- **Сортировка:** creative рекомендовал «English → Русский»; реализация использует `localeCompare(b.label, 'en')` — стабильный порядок.

## Design Decisions & Creative Outputs

### Creative Phase: UI/UX Design

**Обоснование:** Определение расположения, вида и обозначения языков переключателя до реализации.

**Creative Phase:** [`memory-bank/creative/creative-i18n-001.md`](../creative/creative-i18n-001.md)

### Ключевые решения

1. **Расположение:** Правый верхний угол (absolute positioning) — не нарушает центрирование заголовка.
2. **Вид:** Кнопка с иконкой глобуса + dropdown при клике — масштабируемо для 3+ языков.
3. **Иконка:** Inline SVG — локальный ресурс, offline.
4. **Обозначение:** «Русский», «English» — названия на родном языке.
5. **Сортировка:** `localeCompare(b.label, 'en')` — стабильный порядок English → Русский.
6. **Модал:** Отложен.

### Style Guide

Соответствие `memory-bank/style-guide.md`: минимализм, тёмная палитра, accessibility (focus-visible, aria-label, role="listbox").

## Implementation Summary

### Approach

Пятифазный план: Setup → Core Translations → UI (LanguageSwitcher) → Persistence → Documentation & Testing.

### Key Components

| Компонент                  | Изменения                                                       |
| -------------------------- | --------------------------------------------------------------- |
| `main.tsx`                 | Импорт i18n, обёртка I18nextProvider                            |
| `TodoApp`                  | Заголовок, подзаголовок, LanguageSwitcher в правом верхнем углу |
| `TodoInput`                | `t()` для placeholder, кнопки, ошибок                           |
| `TodoFooter`               | `t()` для счётчика, плюрализация через i18n                     |
| `TodoFilter`               | `t()` для FILTER_LABELS, aria-label                             |
| `TodoItem`                 | `t()` для aria-label                                            |
| `TodoList`                 | `t()` для пустого состояния                                     |
| `LanguageSwitcher` (новый) | Кнопка с иконкой глобуса, dropdown ru/en                        |

### Key Files Changed

**Созданные файлы:**

- `src/i18n/config.ts` — инициализация i18n
- `src/locales/ru/translation.json` — русские переводы
- `src/locales/en/translation.json` — английские переводы
- `src/components/LanguageSwitcher/LanguageSwitcher.tsx`
- `src/components/LanguageSwitcher/LanguageSwitcher.scss`
- `src/components/LanguageSwitcher/LanguageSwitcher.test.tsx`
- `docs/project/i18n-guidelines.md`

**Обновлённые:**

- `src/main.tsx` — импорт i18n
- `src/components/TodoApp/TodoApp.tsx` — LanguageSwitcher
- `src/components/TodoApp/TodoApp.scss` — позиционирование switcher
- `src/components/TodoInput/TodoInput.tsx`
- `src/components/TodoFooter/TodoFooter.tsx`
- `src/components/TodoFilter/TodoFilter.tsx`
- `src/components/TodoItem/TodoItem.tsx`
- `src/components/TodoList/TodoList.tsx`
- `src/constants/todo.ts` — удалены FILTER_LABELS
- `index.html` — lang при инициализации

### Technologies

- **i18next** — ядро i18n
- **react-i18next** — интеграция с React
- **i18next-browser-languagedetector** — localStorage → navigator

## Testing Overview

### Стратегия

- **Unit LanguageSwitcher:** 3 теста — отображение кнопки, открытие dropdown, переключение языка.
- **Существующие тесты:** язык по умолчанию ru, data-testid для интерактивных элементов.
- **E2E:** 18 тестов — без переключения языка.

### Результат

- Unit: 119 (116 + 3 LanguageSwitcher)
- E2E: 18
- Команда: `pnpm test`, `pnpm test:e2e --project=chromium --workers=1`

## Reflection & Lessons Learned

**Рефлексия:** [`memory-bank/reflection/reflection-i18n-001.md`](../reflection/reflection-i18n-001.md)

### Ключевые выводы

1. **Creative phase и evaluation matrix** — обоснованный выбор расположения (правый верхний угол), вида (dropdown) и обозначения (Русский/English).
2. **i18next + LanguageDetector** — зрелое решение; localStorage даёт предсказуемое поведение.
3. **Inline SVG для иконки глобуса** — offline, без внешних зависимостей.
4. **События i18n (languageChanged, initialized)** — надёжное обновление `document.documentElement.lang`.
5. **i18n-guidelines.md** — компактный документ для будущих переводов и добавления языков.

## Known Issues / Future Considerations

- **Escape для закрытия dropdown** — указано в creative, не реализовано; добавить `onKeyDown` с `e.key === 'Escape'`.
- **Тест click outside** — явная проверка закрытия dropdown при клике вне.
- **Focus trap в dropdown** — при открытии фокус на первый пункт; при закрытии — возврат на кнопку.
- **Расширение языков** — при добавлении uk: обновить supportedLngs, LANGUAGES, translation.json.

## Key Files and Components Affected

### Созданные

- `src/i18n/config.ts`
- `src/locales/{ru,en}/translation.json`
- `src/components/LanguageSwitcher/` (tsx, scss, test)
- `docs/project/i18n-guidelines.md`

### Обновлённые

- `src/main.tsx`
- `src/components/TodoApp/TodoApp.tsx`, `TodoApp.scss`
- `src/components/TodoInput/TodoInput.tsx`
- `src/components/TodoFooter/TodoFooter.tsx`
- `src/components/TodoFilter/TodoFilter.tsx`
- `src/components/TodoItem/TodoItem.tsx`
- `src/components/TodoList/TodoList.tsx`
- `src/constants/todo.ts`
- `index.html`

## Metrics

| Метрика                      | Значение                    |
| ---------------------------- | --------------------------- |
| Файлов создано               | ~8                          |
| Файлов изменено              | ~12                         |
| Unit-тестов LanguageSwitcher | 3                           |
| Всего unit-тестов            | 119                         |
| E2E тестов                   | 18                          |
| Соответствие требованиям     | 100%                        |
| Соответствие creative        | ~95% (Escape не реализован) |

## References

- [`memory-bank/tasks.md`](../tasks.md) — план задачи
- [`memory-bank/reflection/reflection-i18n-001.md`](../reflection/reflection-i18n-001.md) — рефлексия
- [`memory-bank/creative/creative-i18n-001.md`](../creative/creative-i18n-001.md) — creative phase
- [`memory-bank/style-guide.md`](../style-guide.md) — руководство по стилю
- [`docs/project/i18n-guidelines.md`](../../docs/project/i18n-guidelines.md) — правила i18n
