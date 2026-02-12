> **Правила для ИИ:** написание и организация тестов

# Настройки тестирования

## Стек тестирования

- **Vitest** — фреймворк тестирования
- **@testing-library/react** — тестирование React-компонентов
- **@testing-library/jest-dom** — матчеры для DOM
- **@testing-library/user-event** — симуляция пользовательских событий
- **jsdom** — окружение DOM
- **@vitest/ui** — UI для отладки

## Конфигурация

В `vite.config.ts`:

- `globals: true` — функции `test`, `expect`, `describe` доступны без импорта
- `environment: 'jsdom'` — эмуляция браузерного окружения
- `setupFiles: ['./vitest.setup.ts']` — настройка матчеров jest-dom

## Скрипты

- `pnpm test` — watch-режим
- `pnpm test:ui` — UI-интерфейс
- `pnpm test:coverage` — отчёт о покрытии

## Структура тестов

Размещать тесты рядом с тестируемыми файлами:

- `Component.test.tsx` — рядом с компонентом
- `__tests__/Component.test.tsx` — в отдельной директории

## Правила пользовательских событий

- Ввод текста и нажатие Enter выполнять раздельно:
  - `await user.type(input, 'Текст')`
  - `await user.keyboard('{Enter}')`
  - Не использовать `{Enter}` внутри `user.type` для отправки формы

## Избегание ложноположительных совпадений

Ограничивать область поиска элементов с помощью `within()` для предотвращения ложных совпадений.

**❌ Неправильно:**

```typescript
// Может найти число/текст в неожиданном месте
expect(screen.getByText('5')).toBeInTheDocument();
```

**✅ Правильно:**

```typescript
// Ограничение поиска до конкретной области
const footer = screen.getByRole('contentinfo');
expect(within(footer).getByText('5')).toBeInTheDocument();
```

**Правило:** При тестировании использовать `within()` для ограничения области поиска и предотвращения ложных совпадений. Создавать конфликтные сценарии (где значение присутствует в разных местах) для проверки корректности тестов.

## Работа с моками

**КРИТИЧНО:** Всегда использовать `afterEach` с `vi.restoreAllMocks()` для автоматической очистки моков.

**✅ Правильно:**

```typescript
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('storage utils', () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks(); // Очистка истории вызовов
	});

	afterEach(() => {
		vi.restoreAllMocks(); // Восстановление оригинальных реализаций
	});

	it('тест с моком', () => {
		vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
			throw new Error('QuotaExceededError');
		});
		expect(() => saveToStorage('key', 'data')).toThrow();
	});
});
```

**Разница методов:**

- `vi.clearAllMocks()` — очищает историю вызовов (использовать в `beforeEach`)
- `vi.restoreAllMocks()` — восстанавливает оригинальные реализации (использовать в `afterEach`)

## Использование констант в тестах

**КРИТИЧНО:** Всегда использовать константы вместо жёстко прописанных значений, если константа существует в основном коде.

**❌ Неправильно:**

```typescript
const stored = localStorage.getItem('todos'); // Жёстко прописанная строка
```

**✅ Правильно:**

```typescript
import { STORAGE_KEY } from '../constants/todo';
const stored = localStorage.getItem(STORAGE_KEY);
```

**Правило:** Всегда проверять наличие констант в `src/constants/` перед использованием жёстко прописанных значений. Импортировать и использовать константы во всех местах теста.

## Тестирование хуков: деструктуризация result.current

**КРИТИЧНО:** При тестировании кастомных хуков предпочитать деструктуризацию `result.current` с осмысленными именами переменных вместо индексного доступа.

**❌ Неправильно:**

```typescript
it('должен обновить значение', () => {
	const { result } = renderHook(() => useLocalStorage('key', []));
	act(() => {
		result.current[1](['new value']); // Неясно, что это за функция
	});
	expect(result.current[0]).toEqual(['new value']);
});
```

**✅ Правильно:**

```typescript
it('должен обновить значение', () => {
	const { result } = renderHook(() => useLocalStorage('key', []));
	const [storedValue, setStoredValue] = result.current; // Осмысленные имена
	act(() => {
		setStoredValue(['new value']);
	});
	const [updatedValue] = result.current;
	expect(updatedValue).toEqual(['new value']);
});
```

**Правило:** Всегда деструктурировать `result.current` в отдельную строку с осмысленными именами перед использованием в тесте.

## Ввод текста

**Правило:** Использовать `user.type()` для строк < 50 символов, `user.paste()` для строк ≥ 50 символов.

```typescript
// Короткие строки
await user.type(input, 'Купить молоко');

// Длинные строки
const longText = 'a'.repeat(501);
await user.click(input); // Установить фокус
await user.paste(longText);
```

## Изоляция тестов

Добавлять `beforeEach` если:

- Используется localStorage/sessionStorage
- Используются моки через `vi.spyOn()`
- Есть риск side effects между тестами

```typescript
describe('Component', () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});
	// tests...
});
```

**НЕ очищать** `cleanup()` — Testing Library делает это автоматически.

## E2E тестирование (Playwright)

- **Инструмент:** Playwright (`@playwright/test`)
- **Сервер:** Vite dev (`pnpm dev`) — запускается автоматически через `webServer` в `playwright.config.ts`
- **Браузеры:** Chromium, Firefox, WebKit (через `projects` в конфиге)

### Скрипты E2E

- `pnpm test:e2e` — headless-режим
- `pnpm test:e2e:ui` — UI mode для отладки

### Структура E2E тестов

- Директория: `e2e/`
- Файлы: `*.spec.ts`
- Fixtures: `e2e/fixtures.ts` — изоляция localStorage между тестами

### Правила E2E

- **Русский язык** в `describe`, `it`, `test` — как в unit-тестах
- **Селекторы:** предпочитать `getByRole` с `aria-label` (например, `getByRole('button', { name: 'Добавить задачу' })`)
- **Константы:** использовать `STORAGE_KEY`, `MAX_TODO_LENGTH` из `src/constants/todo.ts`
- **Изоляция:** каждый тест получает очищенный localStorage через fixture

### Установка браузеров

При первом запуске или после обновления Playwright:

```bash
pnpm exec playwright install
```

---

## Чеклист тестирования

- [ ] Использован `within()` для ограничения области поиска
- [ ] Применён `waitFor()` для асинхронных проверок
- [ ] Добавлен `afterEach(() => { vi.restoreAllMocks(); })` при использовании моков
- [ ] Добавлен `beforeEach` для очистки localStorage/моков
- [ ] Использованы семантические запросы (`getByRole`)
- [ ] Использованы константы вместо жёстко прописанных значений
- [ ] Для строк ≥50 символов использован `user.paste()` вместо `user.type()`
- [ ] При тестировании хуков использована деструктуризация `result.current` с осмысленными именами
