# rules-naming-conflicts-002

- **Название:** Разрешить конфликты правил именования (Конфликт #2 и #3)
- **Дата создания:** 2026-01-29
- **Дата завершения:** 2026-01-29
- **Уровень сложности:** Level 2–3 — Enhancement / Consistency
- **Тип:** Refactoring

## Задание

Противоречие между `docs/common/naming-conventions.md` и кодовой базой:

- Файлы в camelCase вместо kebab-case
- Интерфейсы в PascalCase вместо i_camelCase

## Результат

- Конфликт #3: интерфейсы переименованы в `i_camelCase` (`i_todo`, `i_todoState`, `i_*Props`)
- Конфликт #2: обычные файлы переименованы в `kebab-case` (`use-filter`, `use-todos`, `use-local-storage`, `todo-helpers`)
- Обновлены все импорты и ссылки на типы по проекту
- Проверка конфигов на жёстко заданные пути; тесты и сборка проходят локально
- Файлов изменено: 19
- Регрессий: 0

## Ссылки

- **Архив:** memory-bank/archive/archive-rules-naming-conflicts-002.md
- **Рефлексия:** memory-bank/reflection/reflection-rules-naming-conflicts-002.md
- **Ветка:** —
- **Коммит:** 1973034
