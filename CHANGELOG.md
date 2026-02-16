# История изменений

Все важные изменения в проекте документируются в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/),
проект придерживается [Semantic Versioning](https://semver.org/lang/ru/).

## [Unreleased]

## [1.2.0] - 2026-02-16

### Added

- Мультиязычность (i18n): русский, английский и украинский языки
- i18next + react-i18next + i18next-browser-languagedetector
- Переключатель языка (LanguageSwitcher): кнопка с иконкой глобуса, dropdown в правом верхнем углу
- Локали ru/en/uk: переводы всех текстов, плюрализация для счётчика задач
- Сохранение выбранного языка в localStorage
- Документация i18n-guidelines.md

### Changed

- Все компоненты переведены на t() для мультиязычности
- LanguageSwitcher: динамический список из supportedLngs с ключом language.name
- document.documentElement.lang обновляется при смене языка

## [1.1.0] - 2026-02-12

### Added

- Context API вместо props drilling для передачи состояния задач
- E2E-тесты на Playwright (todo-layout, smoke)
- Интеграция variable-шрифта Inter через @fontsource
- Миграция стилей с CSS на SCSS
- Pre-commit хуки для автоформатирования кода (Husky + lint-staged)
- Журнал завершённых задач в memory-bank

### Changed

- Редизайн оформления: тёмная палитра, фиксированный layout (100vh, footer прижат к низу)
- Счётчик активных задач в TodoFooter теперь динамический по выбранному фильтру
- Убрана избыточная смена фильтра при повторном клике по активному фильтру

### Fixed

- Исправлены провальные тесты компонента TodoInput
- Исправлена валидация key в тестах TodoList
- Устранены ложноположительные совпадения в тестах
- Обновлён путь к файлу карты режима сборки

### Refactored

- Имена файлов и импорты приведены к naming-conventions
- Оптимизирован подсчёт активных задач через `reduce` в todo-helpers
- Замена индексного доступа `result.current` на деструктуризацию в тестах хуков
- Использование константы STORAGE_KEY вместо hardcoded строк в тестах
- Перенос очистки моков в `afterEach` в тестах

---

## [1.0.0] - 2026-01-02

### Added

- Первый стабильный релиз TODO-приложения
- Создание, редактирование и удаление задач
- Отметка задач как выполненных
- Фильтрация: все / активные / завершённые
- Автосохранение в localStorage
- Поддержка доступности (WCAG AA)
- Адаптивный дизайн
- React 19 + TypeScript + Vite
- Vitest для unit-тестов (77 тестов, >80% покрытие)
- ESLint + Prettier

[Unreleased]: https://github.com/VZagl/pet-ai.todo-app/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/VZagl/pet-ai.todo-app/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/VZagl/pet-ai.todo-app/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/VZagl/pet-ai.todo-app/releases/tag/v1.0.0
