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
