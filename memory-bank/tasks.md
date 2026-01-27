# Memory Bank: Tasks

## Current Task

Замена жёстко прописанных ключей storage на константы

## Task ID

storage-keys-refactor-001

## Complexity Level

**Level 1** - Quick Fix

**Обоснование:**

- Изменения только в тестах (2 файла)
- Быстрое выполнение (минуты)
- Низкий риск регрессий
- Изолированное изменение
- Не требует архитектурных решений
- Простой рефакторинг: замена строк на константу

**Workflow:** VAN → BUILD → DOCUMENTATION

## Status

✅ **PLANNED** - Planning Complete (2026-01-27)

**Ветка:** `refactor/replace-hardcoded-storage-keys`

- [x] Инициализация Memory Bank
- [x] Определение уровня сложности
- [x] Анализ текущего состояния кода
- [x] Планирование изменений
- [ ] Реализация изменений (BUILD mode)
- [ ] Тестирование изменений
- [ ] Обновление документации

## Description

Замена жёстко прописанных ключей storage на константы для единого источника истины.

**Проблема:** В коде встречаются строковые ключи вроде `'todos'`, хотя есть константа `STORAGE_KEY` из `src/constants/todo.ts`. Константа уже используется в основном коде (`src/hooks/useTodos.ts`), но в тестах используются жёстко прописанные строки.

**Решение:**

- Найти все жёстко прописанные ключи storage в тестах
- Заменить их на константу `STORAGE_KEY` из `src/constants/todo.ts`
- Файлы для изменения:
  - `src/hooks/useTodos.test.ts` - строки 156 и 174
  - `src/components/TodoApp/TodoApp.test.tsx` - строка 235

## Technology Stack

- Framework: React 19.2.3
- Build Tool: Vite 7.3.0
- Language: TypeScript 5.9.3
- Testing: Vitest 4.0.16 + Testing Library
- Package Manager: pnpm 10.26.2

## Technology Validation

✅ **Технологический стек валидирован** - все зависимости уже установлены и работают в проекте:

- Testing Library с поддержкой `within()` для ограничения области поиска
- Vitest 4.0.16 настроен и используется в других тестах
- React 19.2.3
- TypeScript 5.9.3 для типизации

**Дополнительная валидация не требуется** - задача использует существующий стек без новых зависимостей.

## Requirements

### Функциональные требования (FR)

1. **FR-01**: Добавить проверку сохранения `false` в тест "должен сохранять примитивные типы" (`src/utils/storage.test.ts`, строка ~30)
2. **FR-02**: Добавить проверку загрузки `false` в тест "должен загружать примитивные типы" (`src/utils/storage.test.ts`, строка ~79)
3. **FR-03**: Убедиться, что все тесты проходят успешно после изменений

### Нефункциональные требования (NFR)

1. **NFR-01**: Полное покрытие логики обработки boolean значений (`true` и `false`)
2. **NFR-02**: Все существующие тесты должны пройти успешно
3. **NFR-03**: Соответствие требованиям из backlog (полное покрытие boolean значений)

## Files to Modify

### Тестовые файлы:

- `src/hooks/useTodos.test.ts` - заменить `'todos'` на `STORAGE_KEY` (строки 156 и 174)
- `src/components/TodoApp/TodoApp.test.tsx` - заменить `'todos'` на `STORAGE_KEY` (строка 235)

## Implementation Plan

### Детальный план реализации

#### Шаг 1: Рефакторинг `src/hooks/useTodos.test.ts`

**Файл:** `src/hooks/useTodos.test.ts`

**Изменения:**

1. Добавить импорт `STORAGE_KEY` из `'../constants/todo'` в начало файла
2. Заменить `localStorage.getItem('todos')` на `localStorage.getItem(STORAGE_KEY)` (строка 156)
3. Заменить `localStorage.setItem('todos', ...)` на `localStorage.setItem(STORAGE_KEY, ...)` (строка 174)

**Ожидаемый результат:**

- Тест использует константу `STORAGE_KEY` вместо жёстко прописанной строки
- Единый источник истины для ключей хранения данных

#### Шаг 2: Рефакторинг `src/components/TodoApp/TodoApp.test.tsx`

**Файл:** `src/components/TodoApp/TodoApp.test.tsx`

**Изменения:**

1. Добавить импорт `STORAGE_KEY` из `'../../constants/todo'` в начало файла
2. Заменить `localStorage.getItem('todos')` на `localStorage.getItem(STORAGE_KEY)` (строка 235)

**Ожидаемый результат:**

- Тест использует константу `STORAGE_KEY` вместо жёстко прописанной строки
- Единый источник истины для ключей хранения данных

#### Шаг 3: Проверка изменений

**Действия:**

1. Запустить все тесты: `pnpm test`
2. Убедиться, что все тесты проходят успешно
3. Проверить, что нет предупреждений или ошибок
4. Убедиться, что все жёстко прописанные ключи заменены на константу

**Критерии успеха:**

- ✅ Все существующие тесты проходят
- ✅ Все жёстко прописанные ключи заменены на `STORAGE_KEY`
- ✅ Единый источник истины для ключей хранения данных
- ✅ Нет новых ошибок или предупреждений

### Детализация изменений по файлам

#### Файл: `src/hooks/useTodos.test.ts`

**Текущее состояние:**

- Строка 156: `const stored = localStorage.getItem('todos');`
- Строка 174: `localStorage.setItem('todos', JSON.stringify(existingTodos));`
- Нет импорта `STORAGE_KEY`

**Целевое состояние:**

- Добавлен импорт: `import { STORAGE_KEY } from '../constants/todo';`
- Строка 156: `const stored = localStorage.getItem(STORAGE_KEY);`
- Строка 174: `localStorage.setItem(STORAGE_KEY, JSON.stringify(existingTodos));`

#### Файл: `src/components/TodoApp/TodoApp.test.tsx`

**Текущее состояние:**

- Строка 235: `const stored = localStorage.getItem('todos');`
- Нет импорта `STORAGE_KEY`

**Целевое состояние:**

- Добавлен импорт: `import { STORAGE_KEY } from '../../constants/todo';`
- Строка 235: `const stored = localStorage.getItem(STORAGE_KEY);`

### Риски и митигации

**Риск 1:** Изменение может сломать существующие тесты

- **Митигация:** Все тесты должны пройти успешно, так как мы только заменяем строку на константу с тем же значением. Константа `STORAGE_KEY` уже используется в основном коде и имеет значение `'todos'`.

**Риск 2:** Неправильный путь импорта

- **Митигация:** Проверить относительные пути импорта:
  - Для `src/hooks/useTodos.test.ts`: `'../constants/todo'`
  - Для `src/components/TodoApp/TodoApp.test.tsx`: `'../../constants/todo'`

### Зависимости

- ✅ Константа `STORAGE_KEY` уже определена в `src/constants/todo.ts`
- ✅ Константа уже используется в основном коде (`src/hooks/useTodos.ts`)
- ✅ Нет новых зависимостей

### Технические детали

**Почему заменяем строки на константу:**

- Единый источник истины для ключей хранения данных
- Упрощение рефакторинга в будущем (изменение ключа в одном месте)
- Соответствие best practices (DRY принцип)
- Улучшение читаемости и поддерживаемости кода

**Текущее использование константы:**

- `src/hooks/useTodos.ts` - уже использует `STORAGE_KEY`
- `src/constants/todo.ts` - определение константы
- Тесты - требуют рефакторинга для использования константы

### Чеклист реализации

- [ ] Шаг 1.1: Добавить импорт `STORAGE_KEY` в `src/hooks/useTodos.test.ts`
- [ ] Шаг 1.2: Заменить `localStorage.getItem('todos')` на `localStorage.getItem(STORAGE_KEY)` в строке 156
- [ ] Шаг 1.3: Заменить `localStorage.setItem('todos', ...)` на `localStorage.setItem(STORAGE_KEY, ...)` в строке 174
- [ ] Шаг 2.1: Добавить импорт `STORAGE_KEY` в `src/components/TodoApp/TodoApp.test.tsx`
- [ ] Шаг 2.2: Заменить `localStorage.getItem('todos')` на `localStorage.getItem(STORAGE_KEY)` в строке 235
- [ ] Шаг 3.1: Запустить `pnpm test` и проверить, что все тесты проходят
- [ ] Шаг 3.2: Убедиться, что нет ошибок или предупреждений
- [ ] Шаг 3.3: Убедиться, что все жёстко прописанные ключи заменены на константу

## Build Results

(Реализация ещё не начата)

## Technical Details

### Используемые инструменты

- **Vitest**: Существующий тестовый фреймворк
- **TypeScript**: Типизация для безопасности типов

### Структура изменений

Изменения будут добавлены в существующие тесты без изменения их структуры:

```typescript
it('должен сохранять примитивные типы', () => {
	saveToStorage('string', 'test');
	saveToStorage('number', 123);
	saveToStorage('boolean', true);
	saveToStorage('boolean-false', false); // НОВОЕ

	expect(localStorage.getItem('string')).toBe('"test"');
	expect(localStorage.getItem('number')).toBe('123');
	expect(localStorage.getItem('boolean')).toBe('true');
	expect(localStorage.getItem('boolean-false')).toBe('false'); // НОВОЕ
});
```

## Requirements

### Функциональные требования (FR)

1. **FR-01**: Заменить `localStorage.getItem('todos')` на `localStorage.getItem(STORAGE_KEY)` в `src/hooks/useTodos.test.ts` (строка 156)
2. **FR-02**: Заменить `localStorage.setItem('todos', ...)` на `localStorage.setItem(STORAGE_KEY, ...)` в `src/hooks/useTodos.test.ts` (строка 174)
3. **FR-03**: Заменить `localStorage.getItem('todos')` на `localStorage.getItem(STORAGE_KEY)` в `src/components/TodoApp/TodoApp.test.tsx` (строка 235)
4. **FR-04**: Добавить импорты `STORAGE_KEY` в оба тестовых файла
5. **FR-05**: Убедиться, что все тесты проходят успешно после изменений

### Нефункциональные требования (NFR)

1. **NFR-01**: Единый источник истины для ключей хранения данных
2. **NFR-02**: Все существующие тесты должны пройти успешно
3. **NFR-03**: Соответствие требованиям из backlog (замена жёстко прописанных ключей на константы)

## Success Metrics

(Метрики будут заполнены после реализации)

## Task Summary

✅ **Планирование завершено** (2026-01-27)

**Текущий статус:** План реализации готов, все детали проработаны. Готово к реализации (BUILD mode).
