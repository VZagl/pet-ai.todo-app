# Memory Bank: Tasks

## Current Task

**Task ID:** i18n-002  
**Название:** Украинская локализация (uk)  
**Уровень:** Level 2 — Simple Enhancement  
**Ветка:** `feat/i18n-002-ukrainian-localization`  
**Источник:** [`memory-bank/backlog.md`](backlog.md) (Internationalization)

### Design Decision (инициализация)

**LanguageSwitcher — динамический подход:**

- Каждый файл локализации содержит только **один** ключ `language.name` — название языка на родном языке
- LanguageSwitcher строит список из `supportedLngs` (i18n config), для каждого кода вызывает `t('language.name', { lng: code })`
- При добавлении нового языка — достаточно создать файл и обновить config; компонент подхватывает автоматически

---

## Implementation Plan (PLAN mode)

### Description

Добавление украинской локали (uk) в приложение pet.todo. Расширение существующей i18n-инфраструктуры: новый файл переводов, обновление конфига, рефакторинг LanguageSwitcher на динамический подход.

### Complexity

- **Level:** 2 — Simple Enhancement
- **Type:** Internationalization (i18n)

### Technology Stack

- **Framework:** React 19
- **i18n:** i18next, react-i18next, i18next-browser-languagedetector (без изменений)
- **Плюрализация:** Intl.PluralRules API (встроена в i18next) — украинский использует one/few/many как русский

### Technology Validation Checkpoints

- [x] i18next и react-i18next уже установлены и работают
- [x] Плюрализация uk: Intl.PluralRules поддерживает украинский (one, few, many)
- [x] Новые зависимости не требуются
- [x] Тестовый билд после изменений

### Status

- [x] Initialization complete
- [x] Planning complete
- [x] Technology validation complete (проверка при BUILD)
- [x] Implementation
- [x] Reflection complete
- [ ] Archiving

### Reflection Highlights

- **What Went Well:** Динамический LanguageSwitcher из supportedLngs + language.name; плюрализация uk без доп. настройки; план из 5 шагов выполнен без итераций.
- **Challenges:** Фильтрация cimode в supportedLngs; сортировка кириллицы; украинские формы плюрализации.
- **Lessons Learned:** Паттерн «config + language.name» масштабируется; design decision на инициализации достаточен для Level 2.
- **Next Steps:** /archive для финализации.

### Implementation Plan

#### Шаг 1: Добавить `language.name` в ru и en

- **Файл:** `src/locales/ru/translation.json`
  - Добавить в объект `language`: `"name": "Русский"`
- **Файл:** `src/locales/en/translation.json`
  - Добавить в объект `language`: `"name": "English"`

#### Шаг 2: Создать украинскую локаль

- **Файл:** `src/locales/uk/translation.json` (создать)
  - Полный перевод всех ключей по образцу ru/en
  - `language.name`: `"Українська"`
  - Плюрализация: `task_one`, `task_few`, `task_many`; `left_one`, `left_few`, `left_many`; `completed_one`, `completed_few`, `completed_many`
  - Украинские формы: задача/задачі/задач, залишилась/залишилось/залишилось, завершена/завершено/завершено

#### Шаг 3: Обновить конфиг i18n

- **Файл:** `src/i18n/config.ts`
  - Импорт: `import uk from '../locales/uk/translation.json'`
  - resources: добавить `uk: { translation: uk }`
  - supportedLngs: `['ru', 'en', 'uk']`

#### Шаг 4: Рефакторинг LanguageSwitcher

- **Файл:** `src/components/LanguageSwitcher/LanguageSwitcher.tsx`
  - Удалить константу `LANGUAGES`
  - Получать список из `i18n.options.supportedLngs` (фильтровать 'cimode' если есть)
  - Для каждого кода: `t('language.name', { lng: code })` — название на родном языке
  - Сортировка: `localeCompare(a, b)` — алфавитный порядок по UTF-8 (поддержка кириллицы)
  - Сохранить `data-testid={`language-option-${code}`}` для тестов

#### Шаг 5: Обновить документацию и тесты

- **Файл:** `docs/project/i18n-guidelines.md`
  - Добавить uk в структуру локалей
  - Добавить примечание о плюрализации uk (one/few/many)
- **Файл:** `src/components/LanguageSwitcher/LanguageSwitcher.test.tsx`
  - Тест «открывает dropdown»: добавить проверку `language-option-uk` (или обобщить: проверять количество опций ≥ 3)
  - Сохранить проверку переключения на en

### Affected Components

| Компонент / Файл                  | Изменения                            |
| --------------------------------- | ------------------------------------ |
| `src/locales/ru/translation.json` | +language.name                       |
| `src/locales/en/translation.json` | +language.name                       |
| `src/locales/uk/translation.json` | Создать                              |
| `src/i18n/config.ts`              | +uk в resources, supportedLngs       |
| `LanguageSwitcher.tsx`            | Динамический список из supportedLngs |
| `LanguageSwitcher.test.tsx`       | Адаптация под 3 языка                |
| `docs/project/i18n-guidelines.md` | +uk                                  |

### Dependencies

- Нет внешних зависимостей
- Предусловие: i18n-001 завершена ✅

### Challenges & Mitigations

| Вызов                                  | Митигация                                                             |
| -------------------------------------- | --------------------------------------------------------------------- |
| supportedLngs может содержать 'cimode' | Фильтровать: `supportedLngs.filter(l => l !== 'cimode')`              |
| Сортировка кириллицы (ru, uk, en)      | `localeCompare(a, b)` без указания локали — нативная сортировка UTF-8 |
| Тесты завязаны на ru/en                | Добавить проверку uk или обобщить на «все supportedLngs отображаются» |

### Creative Phases Required

- Нет (Level 2, design decision уже принят)

### Чеклист (для BUILD)

- [x] Добавить `language.name` в ru и en (`"Русский"`, `"English"`)
- [x] Создать `src/locales/uk/translation.json` — украинские переводы + `language.name: "Українська"`
- [x] Обновить конфиг i18n: resources, `supportedLngs: ['ru', 'en', 'uk']`
- [x] Настроить плюрализацию для uk (task_one, task_few, task_many)
- [x] Рефакторинг LanguageSwitcher: динамический список из `supportedLngs`, `t('language.name', { lng })`, сортировка UTF-8
- [x] Обновить i18n-guidelines.md
- [x] Адаптировать тесты LanguageSwitcher

---

## Last Completed Task

**Task ID:** i18n-001  
**Название:** Мультиязычность (i18n) — Русский и Английский  
**Дата:** 2026-02-16  
**Статус:** ✅ COMPLETED & ARCHIVED  
**Запись:** [`memory-bank/completed-tasks/2026/01/i18n-001_2026-02-16.md`](completed-tasks/2026/01/i18n-001_2026-02-16.md)  
**Архив:** [`memory-bank/archive/archive-i18n-001.md`](archive/archive-i18n-001.md)  
**Рефлексия:** [`memory-bank/reflection/reflection-i18n-001.md`](reflection/reflection-i18n-001.md)

**Следующий шаг:** `/van` для инициализации новой задачи.
