# Memory Bank: Active Context

## Current Focus

**Задача:** testing-fixes-001 — Исправить падающие тесты  
**Ветка:** `fix/testing-fixes-001-i18n-in-tests`  
**Решение:** Добавить `await i18n.changeLanguage('ru')` в beforeEach падающих тестовых файлов.

## Current Mode

BUILD — реализация завершена

## Next Steps

1. ~~Добавить i18n.changeLanguage('ru') в 4 тестовых файла~~ ✅
2. ~~Запустить тесты и проверить прохождение~~ ✅ (136/136 passed)
3. Закоммитить изменения

## Context for AI

- Проект: pet.todo — TO-DO Application
- Стек: React 19, Vite 7, TypeScript 5.9, SCSS (sass-embedded), i18next
- Активная задача: testing-fixes-001 (исправление падающих тестов)
- Причина падений: LanguageDetector в jsdom выбирает язык, отличный от русского; тесты ищут русские строки
- Референс: `TodoItem.test.tsx` — использует `await i18n.changeLanguage('ru')` в beforeEach
- Последняя завершённая задача: theming-001 (Двухслойная система тематизации)
