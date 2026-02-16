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

### Чеклист (для BUILD)

- [ ] Добавить `language.name` в ru и en (`"Русский"`, `"English"`)
- [ ] Создать `src/locales/uk/translation.json` — украинские переводы + `language.name: "Українська"`
- [ ] Обновить конфиг i18n: resources, `supportedLngs: ['ru', 'en', 'uk']`
- [ ] Настроить плюрализацию для uk (task_one, task_few, task_many)
- [ ] Рефакторинг LanguageSwitcher: динамический список из `supportedLngs`, `t('language.name', { lng })`, сортировка UTF-8

### Следующий шаг

`/plan` для детального планирования (Level 2 → PLAN mode)

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
