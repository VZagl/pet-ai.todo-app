# CREATIVE PHASE: Цветовые палитры тем (theming-001)

> **Тип:** Color Design  
> **Задача:** Двухслойная система тематизации — палитры для 5 тем  
> **Дата:** 2026-02-18  
> **Статус:** ✅ Утверждено

---

## Обзор

5 тем: Default, Ocean, Forest, Sunset, Lavender. Каждая тема имеет light и dark варианты.  
**Визуальное превью:** [`theme-palettes-preview.html`](theme-palettes-preview.html)

---

## Структура токенов (набор для каждой схемы)

- `--color-bg` — основной фон
- `--color-surface` — фон карточек/поверхностей
- `--color-text` — основной текст
- `--color-text-muted` — приглушённый текст
- `--color-border` — границы
- `--color-border-light` — светлые границы
- `--color-primary` — акцентный цвет
- `--color-primary-hover` — hover для primary
- `--color-on-primary` — текст на primary-фоне (обычно #fff)
- `--color-bg-hover` — фон при hover
- `--gradient-bg` — градиент фона
- `--color-success`, `--color-danger` — семантические (общие или настраиваемые)

---

## Default (Option B)

### Light

| Токен         | Значение                                          |
| ------------- | ------------------------------------------------- |
| bg            | #f8fafc                                           |
| surface       | #ffffff                                           |
| text          | #1e293b                                           |
| text-muted    | #64748b                                           |
| border        | #cbd5e1                                           |
| border-light  | #e2e8f0                                           |
| primary       | #3b82f6                                           |
| primary-hover | #2563eb                                           |
| on-primary    | #ffffff                                           |
| bg-hover      | #f1f5f9                                           |
| gradient-bg   | linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%) |

### Dark (текущая палитра)

| Токен         | Значение                                          |
| ------------- | ------------------------------------------------- |
| bg            | #1e293b                                           |
| surface       | #0f172a                                           |
| text          | #f1f5f9                                           |
| text-muted    | #94a3b8                                           |
| border        | #334155                                           |
| border-light  | #475569                                           |
| primary       | #3b82f6                                           |
| primary-hover | #2563eb                                           |
| on-primary    | #ffffff                                           |
| bg-hover      | #334155                                           |
| gradient-bg   | linear-gradient(180deg, #1e293b 0%, #17202e 100%) |

---

## Ocean

### Light

| Токен         | Значение                                          |
| ------------- | ------------------------------------------------- |
| bg            | #f0f9ff                                           |
| surface       | #ffffff                                           |
| text          | #0c4a6e                                           |
| text-muted    | #0369a1                                           |
| border        | #7dd3fc                                           |
| border-light  | #bae6fd                                           |
| primary       | #0ea5e9                                           |
| primary-hover | #0284c7                                           |
| on-primary    | #ffffff                                           |
| bg-hover      | #e0f2fe                                           |
| gradient-bg   | linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%) |

### Dark

| Токен         | Значение                                          |
| ------------- | ------------------------------------------------- |
| bg            | #0c4a6e                                           |
| surface       | #075985                                           |
| text          | #f0f9ff                                           |
| text-muted    | #7dd3fc                                           |
| border        | #0e7490                                           |
| border-light  | #155e75                                           |
| primary       | #38bdf8                                           |
| primary-hover | #0ea5e9                                           |
| on-primary    | #0c4a6e                                           |
| bg-hover      | #075985                                           |
| gradient-bg   | linear-gradient(180deg, #0c4a6e 0%, #075985 100%) |

---

## Forest

### Light

| Токен         | Значение                                          |
| ------------- | ------------------------------------------------- |
| bg            | #f0fdf4                                           |
| surface       | #ffffff                                           |
| text          | #052e16                                           |
| text-muted    | #15803d                                           |
| border        | #86efac                                           |
| border-light  | #bbf7d0                                           |
| primary       | #22c55e                                           |
| primary-hover | #16a34a                                           |
| on-primary    | #ffffff                                           |
| bg-hover      | #dcfce7                                           |
| gradient-bg   | linear-gradient(180deg, #f0fdf4 0%, #dcfce7 100%) |

### Dark

| Токен         | Значение                                          |
| ------------- | ------------------------------------------------- |
| bg            | #052e16                                           |
| surface       | #14532d                                           |
| text          | #f0fdf4                                           |
| text-muted    | #86efac                                           |
| border        | #166534                                           |
| border-light  | #15803d                                           |
| primary       | #4ade80                                           |
| primary-hover | #22c55e                                           |
| on-primary    | #052e16                                           |
| bg-hover      | #14532d                                           |
| gradient-bg   | linear-gradient(180deg, #052e16 0%, #14532d 100%) |

---

## Sunset

### Light

| Токен         | Значение                                          |
| ------------- | ------------------------------------------------- |
| bg            | #fffbeb                                           |
| surface       | #ffffff                                           |
| text          | #451a03                                           |
| text-muted    | #b45309                                           |
| border        | #fcd34d                                           |
| border-light  | #fde68a                                           |
| primary       | #f59e0b                                           |
| primary-hover | #d97706                                           |
| on-primary    | #ffffff                                           |
| bg-hover      | #fef3c7                                           |
| gradient-bg   | linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%) |

### Dark

| Токен         | Значение                                          |
| ------------- | ------------------------------------------------- |
| bg            | #451a03                                           |
| surface       | #78350f                                           |
| text          | #fffbeb                                           |
| text-muted    | #fcd34d                                           |
| border        | #92400e                                           |
| border-light  | #b45309                                           |
| primary       | #fbbf24                                           |
| primary-hover | #f59e0b                                           |
| on-primary    | #451a03                                           |
| bg-hover      | #78350f                                           |
| gradient-bg   | linear-gradient(180deg, #451a03 0%, #78350f 100%) |

---

## Lavender

### Light

| Токен         | Значение                                          |
| ------------- | ------------------------------------------------- |
| bg            | #f5f3ff                                           |
| surface       | #ffffff                                           |
| text          | #3b0764                                           |
| text-muted    | #6d28d9                                           |
| border        | #c4b5fd                                           |
| border-light  | #ddd6fe                                           |
| primary       | #8b5cf6                                           |
| primary-hover | #7c3aed                                           |
| on-primary    | #ffffff                                           |
| bg-hover      | #ede9fe                                           |
| gradient-bg   | linear-gradient(180deg, #f5f3ff 0%, #ede9fe 100%) |

### Dark

| Токен         | Значение                                          |
| ------------- | ------------------------------------------------- |
| bg            | #3b0764                                           |
| surface       | #581c87                                           |
| text          | #f5f3ff                                           |
| text-muted    | #c4b5fd                                           |
| border        | #7c3aed                                           |
| border-light  | #6d28d9                                           |
| primary       | #a78bfa                                           |
| primary-hover | #8b5cf6                                           |
| on-primary    | #3b0764                                           |
| bg-hover      | #581c87                                           |
| gradient-bg   | linear-gradient(180deg, #3b0764 0%, #581c87 100%) |

---

## Семантические цвета

**success:** #16a34a (или #28a745) — общий для всех тем  
**danger:** #dc3545 (или #dc2626) — общий для всех тем

При необходимости — переопределить в theme-definitions для каждой темы.

---

## Имплементация

- Использовать в `src/styles/themes/theme-definitions.ts`
- Структура: `{ [themeVariant]: { light: {...}, dark: {...} } }`
- Применение через `document.documentElement.style.setProperty(...)` в ThemeProvider
