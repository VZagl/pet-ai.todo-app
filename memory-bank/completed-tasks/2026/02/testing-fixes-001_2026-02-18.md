# testing-fixes-001

- **Название:** Исправить падающие тесты
- **Дата создания:** 2026-02-18
- **Дата завершения:** 2026-02-18
- **Уровень сложности:** Level 1 — Quick Bug Fix
- **Тип:** Bug Fix

## Задание

53 падающих теста в 4 файлах из‑за несоответствия языка i18n. Тесты ожидают русские строки, а LanguageDetector в jsdom может выбрать `en`. Причина: CI/CD и стабильность разработки.

- TodoInput.test.tsx: 11/11 failed
- TodoFooter.test.tsx: 18/20 failed
- TodoFilter.test.tsx: 14/17 failed
- TodoApp.test.tsx: 10/11 failed

## Изменения в задании

[Нет]

## Результат

Добавлен `await i18n.changeLanguage('ru')` в beforeEach падающих тестовых файлов (TodoInput, TodoFooter, TodoFilter, TodoApp). Все 136 тестов проходят. Референс: TodoItem.test.tsx.

## Ссылки

- **Архив:** —
- **Рефлексия:** —
- **Ветка:** fix/testing-fixes-001-i18n-in-tests
- **Коммит:** 1df5d8d
