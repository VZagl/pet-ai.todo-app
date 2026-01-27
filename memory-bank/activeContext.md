# Memory Bank: Active Context

## Current Focus

Исправление 3 провальных тестов в TodoInput.test.tsx

## Current Mode

PLAN - Планирование завершено

## Current Phase

PLANNING COMPLETE - Готов к переходу в BUILD mode

## Recently Completed

- ✅ **Замена жёстко прописанных ключей storage на константы** (storage-keys-refactor-001) - COMPLETED (2026-01-27)
  - Все тесты в изменённых файлах: 22/22 прошли успешно
  - Единый источник истины для ключей хранения данных

- ✅ **Проверки boolean в тестах: кейсы `true` и `false`** (test-boolean-coverage-001) - COMPLETED (2026-01-26)
  - Все тесты в `src/utils/storage.test.ts`: 7/7 прошли успешно
  - Полное покрытие логики обработки boolean значений

## Next Steps

Планирование завершено:

1. ✅ Определён уровень сложности: Level 1 - Quick Bug Fix
2. ✅ Проанализированы провальные тесты (3 теста)
3. ✅ Выявлены причины провалов (timeout + side effects)
4. ✅ Создан детальный план исправления (4 шага + чеклист)

**Следующий шаг:** Перейти к BUILD mode для внесения исправлений.

## Context for AI

- Проект: pet.todo - TO-DO Application
- Стек: React 19, Vite 7, TypeScript 5.9, SCSS (sass-embedded)
- Текущие тесты: 121 (118 проходят, 3 проваливаются)
- Текущая задача: test-todoinput-fixes-001 - Исправление 3 провальных тестов в TodoInput.test.tsx
- Complexity Level: Level 1 - Quick Bug Fix
- Файлы для изменения: 1 тестовый файл (`TodoInput.test.tsx`)
- Провальные тесты:
  1. "должен показывать ошибку при превышении максимальной длины" - timeout 5000ms
  2. "должен отключать кнопку при превышении максимальной длины" - timeout 5000ms
  3. "должен поддерживать отправку формы по Enter" - side effect ("aNaeawa ataaasakaaa" вместо "New task")
- Решение: заменить `user.type()` на `user.paste()` для длинных строк + добавить `beforeEach` для изоляции тестов
