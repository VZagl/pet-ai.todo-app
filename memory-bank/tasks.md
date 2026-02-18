# Memory Bank: Tasks

## Current Task

**Task ID:** testing-fixes-001  
**Название:** Исправить падающие тесты  
**Ветка:** `fix/testing-fixes-001-i18n-in-tests`  
**Уровень:** Level 1 — Quick Bug Fix  
**Источник:** [`memory-bank/backlog.md`](backlog.md)

### Описание

53 падающих теста в 4 файлах из‑за несоответствия языка i18n. Тесты ожидают русские строки, а LanguageDetector в jsdom может выбрать `en`.

### Чеклист

- [ ] Добавить `await i18n.changeLanguage('ru')` в `TodoInput.test.tsx`
- [ ] Добавить `await i18n.changeLanguage('ru')` в `TodoFooter.test.tsx`
- [ ] Добавить `await i18n.changeLanguage('ru')` в `TodoFilter.test.tsx`
- [ ] Добавить `await i18n.changeLanguage('ru')` в `TodoApp.test.tsx`
- [ ] Запустить `pnpm test --run` и убедиться, что все тесты проходят

### Затронутые файлы

- `src/components/TodoInput/TodoInput.test.tsx`
- `src/components/TodoFooter/TodoFooter.test.tsx`
- `src/components/TodoFilter/TodoFilter.test.tsx`
- `src/components/TodoApp/TodoApp.test.tsx`

---

## Last Completed Task

**Task ID:** theming-001  
**Название:** Двухслойная система тематизации (Color Scheme + Theme Variants)  
**Дата:** 2026-02-18  
**Статус:** ✅ COMPLETED & ARCHIVED  
**Архив:** [`memory-bank/archive/archive-theming-001.md`](archive/archive-theming-001.md)  
**Рефлексия:** [`memory-bank/reflection/reflection-theming-001.md`](reflection/reflection-theming-001.md)

**Completed:** [`memory-bank/completed-tasks/2026/01/theming-001_2026-02-18.md`](completed-tasks/2026/01/theming-001_2026-02-18.md)
