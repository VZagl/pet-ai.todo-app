# Memory Bank: Tasks

## Current Task

Интеграция шрифтов в приложение

## Task ID

fonts-integration-001

## Complexity Level

**Level 2** - Simple Enhancement

**Обоснование:**

- Локальные изменения без архитектурных решений
- Требуются правки нескольких файлов и подключение зависимости
- Низкий риск регрессий

**Workflow:** VAN → PLAN → BUILD → REFLECT

## Status

- [x] Инициализация Memory Bank
- [x] Определение уровня сложности
- [x] Планирование задачи
- [x] Реализация (BUILD)
- [x] Тестирование (116 тестов прошли успешно)
- [x] Рефлексия (REFLECT)

## Description

Подключить шрифты через `@fontsource` с отдельным CSS-файлом, чтобы упростить переход на SCSS в будущем и обеспечить кэширование шрифтов браузером клиента.

## Technology Stack

- Framework: React
- Build Tool: Vite
- Language: TypeScript
- Package Manager: pnpm

## Requirements

- Подключить шрифты через `@fontsource` пакеты
- Импортировать шрифты через отдельный файл `src/styles/fonts.css`
- Подключить `fonts.css` в `src/main.tsx` до `index.css`
- Настроить fallback-шрифты и CSS-переменные
- Применить переменные в глобальных стилях

## Technology Validation Checkpoints

- [x] Команда установки зависимости задокументирована
- [x] Требуемые зависимости определены и добавлены
- [x] Импорт шрифта через отдельный CSS-файл подтверждён
- [x] Конфигурация CSS-переменных валидна
- [x] Минимальная сборка/рендер проходят

## Implementation Plan

1. Подготовить подключение шрифтов
   - Выбрать пакет `@fontsource-variable/inter` как предпочтительный
   - Определить необходимые оси/веса
2. Создать `src/styles/fonts.css`
   - Импортировать `@fontsource-variable/inter` (или веса по необходимости)
   - Определить CSS-переменную `--font-family-base` с fallback
3. Подключить `fonts.css` в `src/main.tsx`
   - Импорт до `index.css` для стабильного порядка загрузки
4. Обновить `src/index.css`
   - Использовать `var(--font-family-base)` в `body` и базовых элементах
5. Проверить результат
   - Убедиться в корректном fallback и кэшировании

## Dependencies

- `@fontsource-variable/inter` (предпочтительно)

## Challenges & Mitigations

- Возможные TypeScript предупреждения по импортам CSS/Fontsource: при необходимости добавить декларации модулей.
- Размер шрифтов: использовать variable-версию вместо нескольких статических весов.
