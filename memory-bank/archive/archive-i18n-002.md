# Task Archive: Украинская локализация (uk)

## Metadata

- **Task ID:** i18n-002
- **Complexity:** Level 2 — Simple Enhancement
- **Type:** Internationalization (i18n)
- **Date Completed:** 2026-02-16
- **Branch:** `feat/i18n-002-ukrainian-localization`
- **Status:** COMPLETED & ARCHIVED

## Summary

Добавлена украинская локаль (uk) в приложение pet.todo: создан `src/locales/uk/translation.json` с полными переводами и плюрализацией (one/few/many), обновлён конфиг i18n, LanguageSwitcher переведён на динамический список из `supportedLngs` с ключом `language.name`. При добавлении нового языка достаточно создать файл переводов и обновить config — компонент подхватывает изменения автоматически.

## Requirements Addressed

- **language.name в ru и en:** ✅ Добавлены ключи «Русский» и «English»
- **Украинская локаль:** ✅ `src/locales/uk/translation.json` — полный перевод всех ключей
- **Плюрализация uk:** ✅ task_one/few/many, left_one/few/many, completed_one/few/many (Intl.PluralRules)
- **Конфиг i18n:** ✅ resources, `supportedLngs: ['ru', 'en', 'uk']`
- **LanguageSwitcher:** ✅ Динамический список из supportedLngs, `t('language.name', { lng })`, сортировка UTF-8
- **Документация:** ✅ i18n-guidelines.md — добавлен uk, примечание о плюрализации
- **Тесты:** ✅ LanguageSwitcher — проверка `language-option-uk`

## Implementation Details

### Design Decision (инициализация)

**LanguageSwitcher — динамический подход:** каждый файл локализации содержит только `language.name`; список строится из `supportedLngs`; при добавлении нового языка — новый файл + обновление config.

### Key Files Modified

| Файл                                                        | Изменения                            |
| ----------------------------------------------------------- | ------------------------------------ |
| `src/locales/ru/translation.json`                           | +language.name                       |
| `src/locales/en/translation.json`                           | +language.name                       |
| `src/locales/uk/translation.json`                           | Создан (переводы + плюрализация)     |
| `src/i18n/config.ts`                                        | +uk в resources, supportedLngs       |
| `src/components/LanguageSwitcher/LanguageSwitcher.tsx`      | Динамический список из supportedLngs |
| `src/components/LanguageSwitcher/LanguageSwitcher.test.tsx` | Проверка language-option-uk          |
| `docs/project/i18n-guidelines.md`                           | +uk, примечание о плюрализации       |

### Challenges & Mitigations

- **cimode в supportedLngs:** фильтр `filter(l => l !== 'cimode')` с type guard
- **Сортировка кириллицы:** `localeCompare` по `t('language.name', { lng })` — естественный порядок
- **Украинские формы плюрализации:** задача/задачі/задач, залишилась/залишилось, завершена/завершено

## Testing Performed

- **Unit LanguageSwitcher:** тест «открывает dropdown» — проверка `language-option-uk`
- **Билд:** `pnpm build` — успешно
- **Тесты:** `pnpm test` — все проходят

## Lessons Learned

1. **Паттерн «config + language.name»** — масштабируется: добавление языка = новый файл + одна строка в config.
2. **i18next supportedLngs** — учитывать возможное наличие `cimode` в dev/test; фильтрация обязательна.
3. **localeCompare** — для мультиязычных списков (латиница + кириллица) даёт предсказуемый результат.
4. **Design decision на инициализации** — для Level 2 достаточно одного обоснованного решения; creative phase не требовалась.

## Future Considerations

- При добавлении de, pl и др. — следовать тому же паттерну; LanguageSwitcher уже готов.
- Для славянских языков — проверять Intl.PluralRules (не все используют one/few/many).
- E2E: опциональная проверка `document.documentElement.lang` при переключении.

## References

- [`memory-bank/reflection/reflection-i18n-002.md`](../reflection/reflection-i18n-002.md) — рефлексия
- [`memory-bank/tasks.md`](../tasks.md) — план задачи
- [`docs/project/i18n-guidelines.md`](../../docs/project/i18n-guidelines.md) — правила i18n
