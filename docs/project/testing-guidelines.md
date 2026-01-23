# Настройки тестирования

## Фреймворк тестирования

- **Vitest**: `^4.0.16` — быстрый фреймворк тестирования, совместимый с Vite.

## Зависимости для тестирования

- **@testing-library/react**: `^16.3.1` — утилиты для тестирования React-компонентов.
- **@testing-library/jest-dom**: `^6.9.1` — дополнительные матчеры для DOM-элементов (например, `toBeInTheDocument`, `toHaveClass`).
- **@testing-library/user-event**: `^14.6.1` — симуляция пользовательских событий (клики, ввод текста и т.д.).
- **jsdom**: `^27.3.0` — окружение DOM для тестов.
- **@vitest/ui**: `^4.0.16` — UI для просмотра и отладки тестов.

## Конфигурация

Конфигурация Vitest находится в `vite.config.ts`:

- `globals: true` — глобальные функции тестирования (`test`, `expect`, `describe` и т.д.) доступны без импорта.
- `environment: 'jsdom'` — использование jsdom для эмуляции браузерного окружения.
- `setupFiles: ['./vitest.setup.ts']` — файл настройки, который выполняется перед каждым тестом (настраивает `@testing-library/jest-dom`).

## Скрипты

- `pnpm test` — запуск тестов в watch-режиме.
- `pnpm test:ui` — запуск тестов с UI-интерфейсом для просмотра результатов.
- `pnpm test:coverage` — запуск тестов с генерацией отчёта о покрытии кода.

## Структура тестов

Тесты должны находиться рядом с тестируемыми файлами или в директории `__tests__`:

- `Component.test.tsx` или `Component.spec.tsx` — рядом с компонентом.
- `__tests__/Component.test.tsx` — в отдельной директории для тестов.

## Правила пользовательских событий

- Ввод текста и нажатие Enter выполняются раздельно:
  - Сначала `await user.type(input, 'Текст')`
  - Затем `await user.keyboard('{Enter}')`
  - Не использовать `{Enter}` внутри `user.type`, если цель — отправка формы

## Избегание ложноположительных совпадений

При поиске элементов в тестах важно ограничивать область поиска, чтобы избежать ложноположительных совпадений. Это особенно критично при работе с числами и общими текстовыми фразами.

### Проблема с поиском по числам

Поиск по "голым" числам (например, `getByText('5')`) может найти элемент в любой части документа, включая названия задач, что приводит к ложноположительным совпадениям.

**❌ Неправильно:**

```typescript
// Поиск может найти число в названии задачи, а не в счетчике
expect(screen.getByText('5')).toBeInTheDocument();
```

**✅ Правильно:**

```typescript
// Ограничение поиска до конкретной области (footer)
const footer = screen.getByRole('contentinfo');
expect(within(footer).getByText('5')).toBeInTheDocument();
```

### Проблема с общими текстовыми совпадениями

Текстовые фразы, которые могут встречаться в разных частях интерфейса (например, "осталось"), также требуют ограничения области поиска.

**❌ Неправильно:**

```typescript
// Поиск может найти текст в названии задачи
expect(screen.getByText('осталось')).toBeInTheDocument();
```

**✅ Правильно:**

```typescript
// Ограничение поиска до footer элемента
const footer = screen.getByRole('contentinfo');
expect(within(footer).getByText('осталось')).toBeInTheDocument();
```

### Использование `within()` для ограничения области поиска

`within()` из `@testing-library/react` позволяет ограничить поиск элементов до конкретного контейнера:

```typescript
import { render, screen, within } from '@testing-library/react';

test('проверяет счетчик в footer', () => {
  render(<Component />);

  // Получаем контейнер (footer, section, div и т.д.)
  const footer = screen.getByRole('contentinfo');

  // Ищем элементы только внутри этого контейнера
  expect(within(footer).getByText('5')).toBeInTheDocument();
  expect(within(footer).getByText('задач осталось')).toBeInTheDocument();
});
```

### Проверка отсутствия ложноположительных совпадений

**КРИТИЧЕСКИ ВАЖНО:** Для убедительной проверки отсутствия ложноположительных совпадений недостаточно проверять только наличие значения в нужном месте. Необходимо создавать тестовые сценарии, где искомое значение присутствует в других местах интерфейса, и проверять, что:

1. **Значение присутствует в правильном месте** (позитивная проверка)
2. **Значение отсутствует в неправильных местах** (негативная проверка)

Это гарантирует, что тест действительно проверяет конкретный элемент, а не случайное совпадение.

**Пример правильного теста:**

```typescript
test('счетчик отображается только в footer, а не в названиях задач', async () => {
  const user = userEvent.setup();
  render(<TodoApp />);

  // Создаем ситуацию, когда число "5" может быть в разных местах
  const input = screen.getByPlaceholderText(/что нужно сделать/i);
  await user.type(input, 'Задача номер 5');
  await user.click(screen.getByRole('button', { name: /добавить/i }));

  // Добавляем еще задачи, чтобы счетчик стал "5"
  for (let i = 1; i <= 4; i++) {
    await user.type(input, `Задача ${i}`);
    await user.click(screen.getByRole('button', { name: /добавить/i }));
  }

  // Позитивная проверка: число "5" есть в footer (счетчик)
  const footer = screen.getByRole('contentinfo');
  expect(within(footer).getByText('5')).toBeInTheDocument();

  // Негативная проверка: число "5" НЕ находится в других местах через общий поиск
  // (это подтверждает, что within() действительно ограничивает поиск)
  const allFives = screen.queryAllByText('5');
  // Должно быть ровно 2 вхождения: одно в названии задачи, одно в счетчике
  expect(allFives).toHaveLength(2);

  // Проверяем, что счетчик действительно в footer, а не в списке задач
  const taskList = screen.getByRole('list');
  expect(within(taskList).getByText('5')).toBeInTheDocument(); // В названии задачи
  expect(within(footer).getByText('5')).toBeInTheDocument(); // В счетчике
  // Оба элемента существуют, но within() позволяет различить их
});
```

**Правило для ИИ:**

При написании тестов для проверки элементов, которые могут иметь ложноположительные совпадения (числа, общие фразы):

1. **Создайте конфликтную ситуацию**: добавьте в тест данные, где искомое значение (число, текст) присутствует в других местах интерфейса
2. **Проверьте наличие в правильном месте**: используйте `within()` для проверки, что значение есть в нужном контейнере
3. **Проверьте контекст**: убедитесь, что значение находится именно там, где ожидается, а не в других местах
4. **Используйте негативные проверки**: при необходимости проверяйте, что значение не находится в неправильных местах через `queryByText` или `queryAllByText`

Это правило гарантирует, что тесты действительно проверяют конкретные элементы, а не случайные совпадения по всему документу.

### Рекомендации

- **Всегда используйте `within()`** при поиске чисел или общих текстовых фраз, если они могут встречаться в разных частях интерфейса
- **Используйте семантические роли** (`getByRole`) для получения контейнеров, когда это возможно
- **Комбинируйте `within()` с другими методами поиска** для более точных проверок
- **Создавайте конфликтные тестовые сценарии**: добавляйте данные, где искомое значение может присутствовать в разных местах, чтобы убедиться, что тест проверяет правильный элемент

## Примеры использования

### Базовый тест компонента

```typescript
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import Component from './Component'

test('отображает текст', () => {
  render(<Component />)
  expect(screen.getByText('Текст')).toBeInTheDocument()
})
```

### Тест с пользовательскими событиями

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import Button from './Button'

test('обрабатывает клик', async () => {
  const user = userEvent.setup()
  render(<Button onClick={() => alert('Клик!')} />)

  const button = screen.getByRole('button')
  await user.click(button)

  // Проверка результата клика
})
```

### Тест с асинхронными операциями

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import { expect, test } from 'vitest'
import AsyncComponent from './AsyncComponent'

test('загружает данные', async () => {
  render(<AsyncComponent />)

  await waitFor(() => {
    expect(screen.getByText('Данные загружены')).toBeInTheDocument()
  })
})
```

## Дополнительные ресурсы

- [Документация Vitest](https://vitest.dev/)
- [Документация Testing Library](https://testing-library.com/)
- [React Testing Library](https://testing-library.com/react)
