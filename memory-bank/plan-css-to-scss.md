# Plan: CSS to SCSS Migration (css-to-scss-migration-001)

## Анализ текущих стилей

### Обнаруженные паттерны для SCSS переменных

**Цвета (повторяются в разных файлах):**

- Primary: `#0d6efd` (7 раз)
- Primary Hover: `#0b5ed7` (4 раза)
- Danger: `#dc3545` (5 раз)
- Text: `#212529` (4 раза)
- Text Muted: `#6c757d` (10 раз)
- Border: `#dee2e6` (4 раза)
- Border Light: `#e9ecef` (1 раз)
- Background: `#ffffff` (8 раз)
- Background Hover: `#f8f9fa` (2 раза)

**Spacing (в index.css уже есть CSS custom properties):**

- Будут сохранены как CSS custom properties для динамической работы

**Border Radius (повторяющиеся значения):**

- `0.25rem` (1 раз)
- `0.375rem` (1 раз)
- `0.5rem` (7 раз)

**Transitions (повторяющиеся паттерны):**

- `0.15s ease` (много раз)
- Multi-property transitions

**Shadows:**

- `0 1px 3px rgba(0, 0, 0, 0.1)` (3 раза)
- `0 2px 4px rgba(0, 0, 0, 0.1)` (1 раз)
- Focus shadow: `0 0 0 0.2rem rgba(...)` (3 раза с разными цветами)

### Обнаруженные паттерны для SCSS миксинов

1. **Focus States** - повторяющийся паттерн outline для :focus
2. **Transitions** - повторяющиеся transition свойства
3. **Hover Effects** - паттерны для hover состояний кнопок
4. **Card Styles** - box-shadow + border-radius + background

## Структура SCSS

### 1. `src/styles/_variables.scss`

```scss
// === Цвета ===

// Primary
$color-primary: #0d6efd;
$color-primary-hover: #0b5ed7;

// Semantic
$color-danger: #dc3545;
$color-success: #28a745; // для будущего использования

// Text
$color-text: #212529;
$color-text-muted: #6c757d;

// Borders
$color-border: #dee2e6;
$color-border-light: #e9ecef;

// Backgrounds
$color-bg: #ffffff;
$color-bg-hover: #f8f9fa;

// Gradients
$gradient-purple: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

// === Spacing ===
// Оставляем CSS custom properties для динамического использования
// Определяем SCSS переменные для статических значений
$space-1: 0.25rem;
$space-2: 0.5rem;
$space-3: 0.75rem;
$space-4: 1rem;
$space-5: 1.25rem;
$space-6: 1.5rem;
$space-8: 2rem;
$space-10: 2.5rem;

// === Border Radius ===
$radius-sm: 0.25rem;
$radius-md: 0.375rem;
$radius-lg: 0.5rem;

// === Transitions ===
$transition-fast: 0.15s ease;
$transition-base: 0.2s ease;

// === Shadows ===
$shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
$shadow-md: 0 2px 4px rgba(0, 0, 0, 0.1);

// === Typography ===
$font-size-sm: 0.875rem;
$font-size-base: 1rem;
$font-size-lg: 1.25rem;
$font-size-xl: 2rem;
$font-size-2xl: 2.5rem;
$font-size-3xl: 3rem;

$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

// === Breakpoints ===
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
```

### 2. `src/styles/_mixins.scss`

```scss
// === Focus Mixin ===
@mixin focus-outline($color: $color-primary) {
	outline: 2px solid $color;
	outline-offset: 2px;
}

// === Focus Shadow Mixin ===
@mixin focus-shadow($color: $color-primary, $opacity: 0.25) {
	outline: none;
	box-shadow: 0 0 0 0.2rem rgba($color, $opacity);
	border-color: $color;
}

// === Transition Mixin ===
@mixin transition($properties...) {
	transition: #{$properties} $transition-fast;
}

// === Card Mixin ===
@mixin card($padding: $space-4, $radius: $radius-lg) {
	box-shadow: $shadow-sm;
	border-radius: $radius;
	background-color: $color-bg;
	padding: $padding;
}

// === Hover Button Mixin ===
@mixin button-hover($bg-color, $hover-color) {
	background-color: $bg-color;

	&:hover:not(:disabled) {
		background-color: $hover-color;
	}
}

// === Media Query Mixins ===
@mixin mobile {
	@media (max-width: $breakpoint-sm) {
		@content;
	}
}

@mixin tablet {
	@media (max-width: $breakpoint-md) {
		@content;
	}
}
```

## План преобразования файлов

### Phase 1: Подготовка (Setup)

**1.1. Установить sass-embedded**

```powershell
pnpm add -D sass-embedded
```

**1.2. Создать базовые SCSS файлы**

- Создать `src/styles/_variables.scss`
- Создать `src/styles/_mixins.scss`

### Phase 2: Глобальные стили

**2.1. Преобразовать `src/styles/fonts.css` → `fonts.scss`**

Изменения:

- Переименовать файл
- Минимальные изменения (только расширение)
- CSS custom property остаётся (нужна для динамического использования)

**2.2. Преобразовать `src/index.css` → `index.scss`**

Изменения:

- Импортировать `_variables.scss` в начале
- Заменить hardcoded цвета на SCSS переменные
- Оставить CSS custom properties для spacing (они используются в компонентах)
- Использовать вложенность для pseudo-элементов
- Использовать mixin для focus-visible

**2.3. Обновить `src/main.tsx`**

- Изменить импорты: `.css` → `.scss`

### Phase 3: Компоненты

**3.1. TodoApp.css → TodoApp.scss**

Изменения:

- Импортировать `_variables.scss` и `_mixins.scss`
- Использовать вложенность для BEM модификаторов
- Заменить градиент на переменную
- Использовать переменные для цветов, spacing, font-sizes
- Использовать `@include tablet` и `@include mobile` для media queries
- Обновить импорт в `TodoApp.tsx`

**3.2. TodoInput.css → TodoInput.scss**

Изменения:

- Импортировать `_variables.scss` и `_mixins.scss`
- Использовать вложенность (`.todo-input { &__wrapper { ... } }`)
- Заменить цвета на переменные
- Использовать `@include transition()` и `@include focus-shadow()`
- Вложить модификаторы (`&--error`)
- Вложить pseudo-классы (`:hover`, `:focus`, `:disabled`)
- Обновить импорт в `TodoInput.tsx`

**3.3. TodoList.css → TodoList.scss**

Изменения:

- Импортировать `_variables.scss` и `_mixins.scss`
- Использовать `@include card()` для общих стилей
- Заменить цвета на переменные
- Использовать вложенность для `.todo-list-empty`
- Обновить импорт в `TodoList.tsx`

**3.4. TodoItem.css → TodoItem.scss**

Изменения:

- Импортировать `_variables.scss` и `_mixins.scss`
- Использовать вложенность для всех `&__` элементов
- Вложить `.completed` как `&.completed`
- Заменить цвета на переменные
- Использовать `@include transition()` и `@include focus-outline()`
- Вложить `:hover` и `:focus` внутрь родительских селекторов
- Обновить импорт в `TodoItem.tsx`

**3.5. TodoFilter.css → TodoFilter.scss**

Изменения:

- Импортировать `_variables.scss` и `_mixins.scss`
- Использовать вложенность для `.todo-filter__button`
- Вложить модификатор `&--active`
- Заменить цвета на переменные
- Использовать `@include transition()` и `@include focus-outline()`
- Вложить pseudo-классы внутрь
- Обновить импорт в `TodoFilter.tsx`

**3.6. TodoFooter.css → TodoFooter.scss**

Изменения:

- Импортировать `_variables.scss` и `_mixins.scss`
- Использовать вложенность для всех `&__` элементов
- Заменить цвета на переменные
- Использовать `@include card()` или переменные для shadow/radius
- Использовать `@include mobile` для media query
- Обновить импорт в `TodoFooter.tsx`

### Phase 4: Тестирование

**4.1. Визуальная проверка**

- Запустить `pnpm dev`
- Проверить, что все стили применяются корректно
- Проверить hover, focus, active состояния
- Проверить адаптивность (576px, 768px)

**4.2. Запуск тестов**

- Запустить `pnpm test`
- Все 116 тестов должны пройти

**4.3. Production build**

- Запустить `pnpm build`
- Проверить, что сборка проходит без ошибок

**4.4. Hot Reload**

- Проверить, что HMR работает для SCSS файлов

## Порядок выполнения (checklist)

- [ ] **Setup**: Установить `sass-embedded`
- [ ] **Setup**: Создать `_variables.scss`
- [ ] **Setup**: Создать `_mixins.scss`
- [ ] **Global**: Преобразовать `fonts.css` → `fonts.scss`
- [ ] **Global**: Преобразовать `index.css` → `index.scss`
- [ ] **Global**: Обновить импорты в `main.tsx`
- [ ] **Component**: Преобразовать `TodoApp.css` → `TodoApp.scss`
- [ ] **Component**: Преобразовать `TodoInput.css` → `TodoInput.scss`
- [ ] **Component**: Преобразовать `TodoList.css` → `TodoList.scss`
- [ ] **Component**: Преобразовать `TodoItem.css` → `TodoItem.scss`
- [ ] **Component**: Преобразовать `TodoFilter.css` → `TodoFilter.scss`
- [ ] **Component**: Преобразовать `TodoFooter.css` → `TodoFooter.scss`
- [ ] **Test**: Визуальная проверка (dev server)
- [ ] **Test**: Запуск тестов (116 tests)
- [ ] **Test**: Production build
- [ ] **Test**: Hot Reload проверка

## Риски и митигации

| Риск                                             | Вероятность | Влияние | Митигация                                                 |
| ------------------------------------------------ | ----------- | ------- | --------------------------------------------------------- |
| Визуальные регрессии                             | Средняя     | Высокое | Тщательная визуальная проверка после каждого файла        |
| Ошибки импорта переменных                        | Низкая      | Среднее | Проверка порядка импортов, компиляция после каждого файла |
| Конфликт CSS custom properties и SCSS переменных | Низкая      | Среднее | Оставить CSS custom properties для динамических значений  |
| Падение тестов                                   | Низкая      | Низкое  | Тесты не зависят от стилей, но проверить обязательно      |

## Критерии успеха

✅ Все 8 CSS файлов преобразованы в SCSS
✅ Создана структура переменных и миксинов
✅ Используется вложенность селекторов
✅ Визуальное отображение идентично оригиналу
✅ Все 116 тестов проходят
✅ Dev server и production build работают
✅ Hot Reload работает для SCSS

## Оценка времени

- **Setup (Phase 1)**: ~10 минут
- **Global styles (Phase 2)**: ~15 минут
- **Components (Phase 3)**: ~45 минут (6 файлов × ~7 минут)
- **Testing (Phase 4)**: ~15 минут

**Итого:** ~85 минут (1 час 25 минут)

**С учётом непредвиденных задержек:** ~100 минут (1 час 40 минут)
