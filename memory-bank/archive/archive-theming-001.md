# Task Archive: Двухслойная система тематизации (Color Scheme + Theme Variants)

## Metadata

- **Task ID:** theming-001
- **Complexity:** Level 3 — Intermediate Feature
- **Type:** Feature — новая функциональность, затрагивающая несколько компонентов
- **Date Completed:** 2026-02-18
- **Branch:** `feat/theming-001-two-layer-theming`
- **Status:** COMPLETED & ARCHIVED

## Summary

Реализована двухслойная система тематизации: слой 1 — Color Scheme (светлый/тёмный/auto), слой 2 — Theme Variants (Default, Ocean, Forest, Sunset, Lavender). Каждая тема имеет light и dark варианты. Технический стек: CSS Custom Properties, дизайн-токены в `src/styles/tokens/` и `src/styles/themes/`, ThemeProvider с применением переменных на `document.documentElement`, useTheme, персистентность в localStorage, синхронизация между вкладками. UI: ThemeToggle (sun/moon), SettingsButton, SettingsModal с ThemeSelectionTab (мини-карточки тем, Принять/Отказаться), HeaderControls. Рефакторинг всех компонентных SCSS с `$color-*` на `var(--color-*)`. Сборка, линт и тесты проходят.

## Requirements Addressed

### Слой 1 — Color Scheme

- **Автоматическое определение системных настроек:** ✅ `prefers-color-scheme` при `colorScheme: 'auto'`
- **Ручное переключение:** ✅ ThemeToggle (light/dark)
- **Базовые цветовые переменные:** ✅ bg, surface, text, text-muted, border, primary и др.

### Слой 2 — Theme Variants

- **5 вариантов тем:** ✅ Default, Ocean, Forest, Sunset, Lavender
- **Light и dark для каждой темы:** ✅ 10 наборов цветов в theme-definitions
- **Accent и семантические цвета:** ✅ primary, success, danger

### Техническая реализация

- **CSS Custom Properties:** ✅ Применение на `document.documentElement`
- **Дизайн-токены:** ✅ `src/styles/tokens/`, `src/styles/themes/`
- **useTheme, ThemeContext:** ✅ ThemeProvider, useTheme()
- **Персистентность и синхронизация вкладок:** ✅ localStorage, storage event

### UI компоненты

- **ThemeToggle:** ✅ sun.svg / moon.svg, aria-label
- **SettingsButton, SettingsModal:** ✅ overlay, блокировка событий, подтверждение при несохранённых изменениях
- **ThemeSelectionTab:** ✅ мини-карточки тем, индикатор выбора (цвета палитры текущей темы), Принять/Отказаться
- **HeaderControls:** ✅ ThemeToggle | LanguageSwitcher | SettingsButton

## Design Decisions & Creative Outputs

- **Creative phase UI/UX:** [`memory-bank/creative/creative-theming-uiux.md`](../creative/creative-theming-uiux.md) — HeaderControls, ThemeToggle (sun/moon), SettingsModal с overlay, ThemeSelectionTab с мини-карточками и draft-паттерном
- **Creative phase Палитры:** [`memory-bank/creative/creative-theming-palettes.md`](../creative/creative-theming-palettes.md) — 5 тем × 2 схемы, структура токенов, превью [`theme-palettes-preview.html`](../creative/theme-palettes-preview.html)

## Implementation Details

### Архитектура

```
App.tsx
  └── ThemeProvider (применяет CSS vars на document.documentElement)
        └── TodoProvider
              └── TodoApp
                    ├── header: HeaderControls (ThemeToggle | LanguageSwitcher | SettingsButton)
                    ├── SettingsModal (при открытии)
                    ├── TodoInput, TodoList, TodoFooter
```

### Ключевые решения

- **effectiveScheme** — при `colorScheme: 'auto'` берётся из `prefers-color-scheme`
- **applyTheme(variant, scheme)** — применяет палитру через `document.documentElement.style.setProperty`
- **Draft-паттерн** — draftVariant, draftScheme в SettingsModal; hasUnsavedChanges; подтверждение при закрытии
- **Структура theme-definitions** — `{ [variant]: { light: {...}, dark: {...} } }` — плоский объект, легко расширяемый

### Key Files Created

| Файл                                                     | Назначение                                       |
| -------------------------------------------------------- | ------------------------------------------------ |
| `src/contexts/ThemeProvider.tsx`                         | Контекст тем, applyTheme, storage, storage event |
| `src/hooks/use-theme.ts`                                 | useTheme(), реэкспорт типов                      |
| `src/styles/tokens/_tokens.scss`                         | Базовые имена CSS переменных                     |
| `src/styles/themes/theme-types.ts`                       | ColorScheme, ThemeVariant, ThemeConfig           |
| `src/styles/themes/theme-definitions.ts`                 | 5 тем × 2 схемы — палитры                        |
| `src/components/ThemeToggle/ThemeToggle.tsx`             | Переключатель sun/moon                           |
| `src/components/SettingsButton/SettingsButton.tsx`       | Кнопка настроек                                  |
| `src/components/SettingsModal/SettingsModal.tsx`         | Модалка с overlay, табами                        |
| `src/components/ThemeSelectionTab/ThemeSelectionTab.tsx` | Карточки тем, Принять/Отказаться                 |
| `src/components/HeaderControls/HeaderControls.tsx`       | Контейнер кнопок в header                        |
| `src/assets/sun.svg`, `moon.svg`, `settings.svg`         | Иконки                                           |

### Key Files Modified

| Файл                                                                                                                              | Изменения                                                |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `src/styles/_variables.scss`                                                                                                      | Удалены $color-\*, оставлены spacing, radius, typography |
| `src/styles/_mixins.scss`                                                                                                         | focus-outline, focus-shadow → var(--color-primary)       |
| `src/styles/index.scss`                                                                                                           | Fallback в :root, body через var(--color-\*)             |
| `TodoApp.scss`, `TodoItem.scss`, `TodoInput.scss`, `TodoFilter.scss`, `TodoFooter.scss`, `TodoList.scss`, `LanguageSwitcher.scss` | $color-_ → var(--color-_)                                |
| `src/App.tsx`                                                                                                                     | Обёрнут в ThemeProvider                                  |
| `src/components/TodoApp/TodoApp.tsx`                                                                                              | HeaderControls в header                                  |
| `vitest.setup.ts`                                                                                                                 | matchMedia mock для prefers-color-scheme                 |

### Challenges & Mitigations

| Вызов                                | Решение                                                            |
| ------------------------------------ | ------------------------------------------------------------------ |
| FOUC при загрузке                    | applyTheme в useEffect при монтировании; fallback в :root          |
| SCSS vs CSS variables                | Mixins принимают var(); компоненты — var(--color-\*)               |
| Синхронизация между вкладками        | storage event в ThemeProvider                                      |
| Типизация draftScheme vs ColorScheme | draftScheme = effectiveScheme (light \| dark) при открытии модалки |
| matchMedia в тестах                  | Mock в vitest.setup                                                |

## Testing Performed

- **Unit use-theme.test.ts:** 3 теста — начальные значения, setColorScheme, setThemeVariant
- **Unit ThemeToggle.test.tsx:** 2 теста — рендер, accessibility (aria-label)
- **Сборка:** `pnpm build` — успешно
- **Линт:** `pnpm lint` — успешно
- **E2E:** не реализованы (опционально в плане)

## Lessons Learned

1. **CSS Custom Properties на document.documentElement** — удобный способ глобальной тематизации; applyTheme в useEffect; fallback в :root до монтирования ThemeProvider.
2. **storage event** — синхронизация настроек между вкладками без дополнительных библиотек; важно обрабатывать JSON.parse для значений из localStorage.
3. **matchMedia в тестах** — mock `window.matchMedia` в vitest.setup обязателен для тестов, зависящих от prefers-color-scheme.
4. **Draft-паттерн в модалках** — локальный state (draftVariant, draftScheme), hasUnsavedChanges, подтверждение при закрытии — повторяемый паттерн для настроек.
5. **Creative phase для дизайна** — отдельные фазы для UI/UX и палитр снижают количество переделок при реализации.

## Known Issues & Future Considerations

- **Нет UI для выбора «авто»** — colorScheme: 'auto' только при отсутствии сохранённых настроек; ThemeToggle переключает только light/dark. Рекомендация: добавить опцию «Системная тема (авто)» в UI.
- **Минорные расхождения в bg-hover** — Default light, Ocean light: значения в theme-definitions отличаются от creative-theming-palettes; не влияют на UX.
- **Расширение тестов** — snapshot или визуальные тесты для ThemeSelectionTab, SettingsModal; тесты для подтверждения при закрытии.

## References

- [`memory-bank/reflection/reflection-theming-001.md`](../reflection/reflection-theming-001.md) — рефлексия
- [`memory-bank/creative/creative-theming-uiux.md`](../creative/creative-theming-uiux.md) — UI/UX решения
- [`memory-bank/creative/creative-theming-palettes.md`](../creative/creative-theming-palettes.md) — цветовые палитры
- [`memory-bank/tasks.md`](../tasks.md) — план задачи
