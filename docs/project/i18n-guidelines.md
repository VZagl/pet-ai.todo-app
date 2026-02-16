# i18n Guidelines (pet.todo)

## Общие правила

- **Русский — основной язык приложения.** Язык по умолчанию и fallback (`fallbackLng: 'ru'`).
- Другие языки (английский и т.д.) — второстепенные.
- При добавлении новых строк в UI: сначала русская локаль (`src/locales/ru/translation.json`), затем остальные.

## Структура локалей

```
src/locales/
├── ru/
│   └── translation.json
└── en/
    └── translation.json
```

## Ключи переводов

- Использовать вложенную структуру: `app.title`, `todoInput.placeholder`, `todoFooter.task`.
- Плюрализация: `task_one`, `task_few`, `task_many` (RU), `task_one`, `task_other` (EN).
- Интерполяция: `{{max}}`, `{{count}}`, `{{text}}`.

## Тестирование

- **Язык по умолчанию в тестах:** `ru` — Vitest/Playwright без переключения языка.
- **`data-testid`** — для поиска интерактивных элементов (кнопки, поля, контейнеры).
- Текст — только где проверяем контент: `getByText(/нет задач/i)`.
- Добавлять `data-testid` в интерактивные элементы при рефакторинге под i18n.

## Конфигурация

- Файл: `src/i18n/config.ts`
- Детектор: `i18next-browser-languagedetector` (localStorage → navigator).
- Ключ localStorage: `i18nextLng`.

## Обновление `lang` в HTML

При смене языка обновляется `document.documentElement.lang` через событие `languageChanged`.
