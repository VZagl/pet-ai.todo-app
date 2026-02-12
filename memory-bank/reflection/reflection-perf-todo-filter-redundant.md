# Quick Fix: TodoFilter — устранение повторной фильтрации (perf-todo-filter-redundant)

## Issue

При клике по активному фильтру повторно запускалась фильтрация/обновление состояния, хотя результат не менялся.

## Root Cause

Не было защиты от повторного выбора того же фильтра: обработчик клика и setter фильтра выполнялись даже при совпадении значений.

## Solution

Добавлено отключение активной кнопки фильтра и логический guard, который не вызывает обновление состояния при выборе текущего фильтра. Дополнительно обновлены тесты под новый UX и доступность (disabled-кнопка не должна быть в tab-порядке).

## Files Changed

- src/components/TodoFilter/TodoFilter.tsx
- src/components/TodoFilter/TodoFilter.scss
- src/hooks/use-filter.ts
- src/components/TodoFilter/TodoFilter.test.tsx

## Verification

Тесты пройдены: `TodoFilter.test.tsx` (17/17), `use-filter.test.ts` (7/7). Регрессий не обнаружено.

## Notes

Защита реализована на двух уровнях (UI + setter), чтобы исключить лишние обновления состояния даже при будущих изменениях разметки/обработчиков.
