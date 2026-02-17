# Task Archive: Редактирование текста задачи

## Metadata

- **Task ID:** edit-task-001
- **Complexity:** Level 2 — Simple Enhancement
- **Type:** Feature Enhancement (inline edit)
- **Date Completed:** 2026-02-17
- **Branch:** `feat/inline-edit-todo-item`
- **Status:** COMPLETED & ARCHIVED

## Summary

Реализовано inline-редактирование текста задачи в компоненте TodoItem. Единственный способ входа — кнопка редактирования (иконка карандаша) слева от кнопки удаления. Валидация: пустая строка и MAX_TODO_LENGTH. Enter — сохранить, Escape — отменить. Кнопки «Сохранить» (✓) и «Отмена» (×) с иконками и цветным фоном ($color-success, $color-primary). После выхода из режима редактирования кнопки редактирования и удаления остаются в разметке с `disabled` 400 ms — без layout shift. 15 тестов TodoItem проходят, сборка успешна.

## Requirements Addressed

- **Inline редактирование:** ✅ Кнопка редактирования (слева от удаления) — единственный способ входа
- **Валидация:** ✅ Пустая строка, MAX_TODO_LENGTH (как в TodoInput)
- **Явная кнопка «Отмена» + Escape:** ✅ Кнопка × и Escape отменяют без сохранения
- **Режим редактирования:** ✅ Скрыты кнопки edit/delete, показаны Save (✓) и Cancel (×) — иконки
- **Без layout shift:** ✅ Кнопки всегда в DOM, меняется только `disabled` с задержкой 400 ms
- **Стили кнопок:** ✅ Фон $color-success (Save), $color-primary (Cancel), иконки $color-on-primary
- **i18n:** ✅ ariaEdit, ariaSave, ariaCancel, errorEmpty, errorMaxLength (ru/en/uk)

## Implementation Details

### Design Decisions

- **disabled вместо show/hide** — кнопки edit/delete всегда в разметке; при выходе из edit — `disabled` на 400 ms, затем `enabled`. Устраняет layout shift.
- **edit-wrapper с flex: 1 0 auto** — input не сжимается до 0 при пустом тексте; input с `width: 100%`, `box-sizing: border-box`.
- **Базовый класс todo-item\_\_btn** — модификаторы `--save`, `--cancel`, `--edit`, `--delete` устраняют дублирование стилей.
- **BEM: todo-item\_\_content--editing** — модификатор на элементе, который визуально меняется; подсветка $color-bg-hover.

### Key Files Modified

| Файл                                        | Изменения                                                                           |
| ------------------------------------------- | ----------------------------------------------------------------------------------- |
| `src/components/TodoItem/TodoItem.tsx`      | Логика isEditing, editValue, actionButtonsEnabled, handleSave, handleCancel, кнопки |
| `src/components/TodoItem/TodoItem.scss`     | Стили input, кнопок (--save, --cancel, --edit, --delete), --editing                 |
| `src/components/TodoItem/TodoItem.test.tsx` | 12 тестов inline-редактирования                                                     |
| `src/assets/check.svg`                      | Создан — иконка галочки                                                             |
| `src/assets/close.svg`                      | Создан — иконка крестика                                                            |
| `src/assets/edit.svg`                       | Создан — иконка карандаша                                                           |
| `src/locales/ru/translation.json`           | todoItem: ariaEdit, ariaSave, ariaCancel, errorEmpty, errorMaxLength                |
| `src/locales/en/translation.json`           | todoItem: ariaEdit, ariaSave, ariaCancel, errorEmpty, errorMaxLength                |
| `src/locales/uk/translation.json`           | todoItem: ariaEdit, ariaSave, ariaCancel, errorEmpty, errorMaxLength                |

### Challenges & Mitigations

- **Layout shift** — actionButtonsEnabled + setTimeout 400 ms; кнопки с disabled={!actionButtonsEnabled}; cleanup в useEffect.
- **Input сжимается до 0** — edit-wrapper с flex: 1 0 auto, edit-actions снаружи.
- **Escape всплывает** — e.stopPropagation() в onKeyDown при Escape.
- **Двойной клик Save/Cancel** — задержка disabled предотвращает повторное нажатие.

### Post-implementation Refinements

- edit-wrapper с flex: 1 0 auto для корректной ширины input
- Базовый класс todo-item\_\_btn с модификаторами
- todo-item\_\_content--editing с $color-bg-hover для подсветки режима
- BEM: модификатор на \_\_content, а не на родителе

## Testing Performed

- **Unit TodoItem:** 15 тестов (12 новых для inline-edit): вход по кнопке, Enter/Escape, Save/Cancel, валидация пустой строки, задержка 400 ms для action buttons, двойной клик по тексту не переводит в edit
- **Билд:** `pnpm build` — успешно
- **Тесты:** `pnpm test` — все проходят

## Lessons Learned

1. **disabled вместо show/hide** — для элементов, временно скрываемых без сдвига layout, паттерн disabled + задержка предпочтительнее; упрощает тесты (fake timers).
2. **flex: 1 0 auto для input-wrapper** — при input в flex-контейнере гарантирует, что input занимает доступное пространство и не сжимается до 0.
3. **BEM-модификатор на том элементе, который стилизуется** — при подсветке родительского блока модификатор на элементе с визуальным изменением.
4. **Post-implementation refinements** — секция в tasks.md полезна для фиксации доработок после BUILD.
5. **Escape** — e.stopPropagation() в вложенных компонентах предотвращает всплытие к модалкам.

## Constants

- `ACTION_BUTTONS_DELAY_MS = 400` — задержка перед показом кнопок edit/delete после выхода из режима редактирования

## References

- [`memory-bank/reflection/reflection-edit-task-001.md`](../reflection/reflection-edit-task-001.md) — рефлексия
- [`memory-bank/tasks.md`](../tasks.md) — план задачи
- **Связано с:** todo-app-001
