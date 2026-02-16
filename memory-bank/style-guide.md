# Memory Bank: Style Guide

## Code Style

### TypeScript/React

- Использовать функциональные компоненты
- Использовать хуки для управления состоянием
- Явная типизация props и state
- Использовать interface для props компонентов
- Использовать type для union types и утилитарных типов

### Naming Conventions

- **Компоненты**: PascalCase (например, `TodoItem`, `TodoList`)
- **Файлы компонентов**: PascalCase.tsx (например, `TodoItem.tsx`)
- **Хуки**: camelCase с префиксом "use" (например, `useTodos`, `useLocalStorage`)
- **Константы**: UPPER_SNAKE_CASE (например, `MAX_TODO_LENGTH`)
- **Переменные/функции**: camelCase (например, `todoItems`, `handleAddTodo`)

### File Organization

```
src/
  ├── components/       # React компоненты
  │   ├── TodoItem/
  │   │   ├── TodoItem.tsx
  │   │   ├── TodoItem.test.tsx
  │   │   └── TodoItem.css
  │   └── TodoList/
  │       ├── TodoList.tsx
  │       ├── TodoList.test.tsx
  │       └── TodoList.css
  ├── hooks/           # Кастомные хуки
  ├── types/           # TypeScript типы
  ├── utils/           # Утилитарные функции
  ├── constants/       # Константы
  └── App.tsx
```

### Comments

- JSDoc для публичных функций и компонентов
- Комментарии на русском языке для объяснения логики
- Избегать очевидных комментариев

### Testing

- Тестовые файлы рядом с компонентами: `Component.test.tsx`
- Использовать Testing Library best practices
- Тестировать поведение, а не реализацию
- Стремиться к покрытию >80%
- Для i18n: использовать `data-testid` для поиска интерактивных элементов (см. `docs/project/i18n-guidelines.md`)

### i18n / Языки

- **Русский — основной язык приложения.** Язык по умолчанию и fallback.
- Другие языки (английский и т.д.) — второстепенные.
- При добавлении новых строк в UI: сначала русская локаль, затем остальные.
- Подробнее: `docs/project/i18n-guidelines.md`

## UI/UX Guidelines

### Дизайн-философия

- **Минимализм**: Чистый, профессиональный дизайн без лишних элементов
- **Usability First**: Приоритет удобству использования над визуальными эффектами
- **Accessibility**: WCAG AA compliance, высокий контраст, keyboard navigation
- **Consistency**: Единообразие во всех компонентах

### Цветовая палитра

```css
/* Основные цвета */
--color-bg: #ffffff;
--color-surface: #f8f9fa;
--color-text-primary: #212529;
--color-text-secondary: #6c757d;
--color-text-muted: #adb5bd;
--color-border: #dee2e6;
--color-border-light: #e9ecef;

/* Акцентный цвет */
--color-accent: #0d6efd;
--color-accent-hover: #0b5ed7;
--color-accent-active: #0a58ca;

/* Статусные цвета */
--color-success: #198754;
--color-success-bg: #d1e7dd;
--color-danger: #dc3545;
--color-danger-hover: #bb2d3b;
```

### Типографика

```css
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;

/* Размеры */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.5rem; /* 24px */
--text-2xl: 2rem; /* 32px */

/* Веса */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing System

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
```

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-full: 9999px;
```

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 2px 4px rgba(0, 0, 0, 0.08);
```

### Transitions

```css
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
```

### Компоненты

#### Buttons

- Без фона для вторичных действий
- Акцентный цвет для primary actions
- Hover: изменение цвета
- Transition: 200ms ease

#### Inputs

- Высота: 48px
- Border: 2px solid
- Border-radius: 8px
- Focus: акцентный цвет границы

#### Lists

- Разделители: 1px solid border-light
- Hover: фон surface
- Padding: 1rem

### Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 639px) {
}

/* Tablet */
@media (min-width: 640px) {
}

/* Desktop */
@media (min-width: 1024px) {
}
```

### Animations

- Используйте transitions для hover/focus состояний
- Длительность: 150-200ms
- Easing: ease или ease-in-out
- Избегайте сложных animations для производительности

## Accessibility

- Использовать семантические HTML элементы
- Добавлять ARIA атрибуты где необходимо
- Обеспечить keyboard navigation
- Достаточный цветовой контраст

## Performance

- Использовать React.memo для оптимизации
- Использовать useCallback и useMemo где уместно
- Избегать ненужных ре-рендеров
