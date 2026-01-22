# Правила работы с Git

Git — основа рабочего процесса разработки. Следование этим практикам обеспечивает чистую, читаемую историю, минимизирует конфликты и позволяет быстро и надёжно доставлять изменения.

## 1. Стратегия ветвления: Feature-Branch Workflow

Используется **feature-branch workflow** с короткоживущими ветками. Вся разработка ведётся в отдельных ветках, никогда напрямую в `main` или `develop`.

- **`main` ветка**: Всегда готова к продакшену. Разрешены только мерджи из release-веток или сквошенных feature-веток. Защищена.
- **`develop` ветка**: Интегрирует завершённые фичи. Защищена.
- **Feature-ветки**: Создаются из `develop`, короткоживущие, для одной фичи или исправления бага. Мерджатся в `develop` через Pull Requests (PRs).

**Примечание**: Если в проекте нет ветки `develop`, используйте `main` как базовую ветку для feature-веток.

### Правило: Именование веток

Именуйте ветки понятно и последовательно, привязывая к тикету или фиче.

❌ **ПЛОХО**:

```bash
git checkout -b my-feature
git checkout -b fix
```

✅ **ХОРОШО**:

```bash
# Для новой фичи (например, тикет FEAT-123)
git checkout -b feat/FEAT-123-add-user-profile

# Для исправления бага (например, тикет BUG-456)
git checkout -b fix/BUG-456-auth-redirect-loop

# Для рефакторинга
git checkout -b refactor/improve-logging-middleware
```

## 2. Сообщения коммитов

Правила оформления сообщений коммитов находятся в `docs/common/git-commit-description.md`. Использовать их при генерации описания коммита и формировать сообщение на основе реальных изменений в staged файлах.

### Правило: Атомарные коммиты

Каждый коммит должен представлять одно логическое изменение.

❌ **ПЛОХО**:

```bash
git commit -m "Исправил баг и добавил новую фичу"
```

✅ **ХОРОШО**:

```bash
# Первый коммит для исправления
# Создать файл .git-commit-msg.txt в корне проекта (UTF-8 без BOM):
# fix(auth): исправить обработку expired токена
#
# - корректно обрабатывать истёкшие токены и перенаправлять на страницу входа
# - добавить логирование для отладки
git commit -F .git-commit-msg.txt
# Удалить файл после успешного коммита:
# rm .git-commit-msg.txt  # или del .git-commit-msg.txt в Windows

# Второй коммит для фичи
# Создать файл .git-commit-msg.txt в корне проекта (UTF-8 без BOM):
# feat(profile): добавить просмотр профиля пользователя
#
# - добавить новую страницу для просмотра и редактирования профиля
# - обновить роутинг для нового маршрута
git commit -F .git-commit-msg.txt
# Удалить файл после успешного коммита
```

## 3. Управление историей: Rebase вместо Merge (на feature-ветках)

Поддерживайте линейную, чистую историю на feature-ветках перед мерджем в `develop`. Используйте `git rebase -i` для сквоша, переупорядочивания или редактирования коммитов.

### Правило: Очистка локальной истории перед PR

Перед пушем feature-ветки для Pull Request, сделайте rebase на последнюю `develop` и сквошьте связанные коммиты в логические единицы.

❌ **ПЛОХО**:

```bash
# На ветке feature/my-feature
git pull origin develop # Создаёт merge-коммит
git push origin feature/my-feature # Пушит грязную историю
```

✅ **ХОРОШО**:

```bash
# На ветке feature/my-feature
git fetch origin
git rebase -i origin/develop # Интерактивная очистка коммитов
# ... завершить rebase, сквошить WIP коммиты ...
git push --force-with-lease origin feature/my-feature # Force push после rebase
```

**Важно**: Force push только в свои собственные feature-ветки, которые ещё не замерджены или не используются другими. Никогда не делайте force push в `main` или `develop`.

### Правило: Мердж feature-веток с `--no-ff` и Conventional Commits

При мердже feature-ветки в `develop` (через PR) всегда используйте `--no-ff` для сохранения полной истории разработки. **Важно**: сообщение merge-коммита должно быть в формате Conventional Commits (`type(scope): описание`), а не просто "Merge branch '...' into develop".

Это создаёт впечатление единого изменения (как будто временная ветка была удалена), но сохраняет всю историю разработки внутри merge-коммита. После merge временная ветка может быть удалена, но вся история коммитов останется доступной в `develop`.

❌ **ПЛОХО**:

```bash
# После одобрения PR, мердж напрямую на локальной машине
git checkout develop
git merge feature/my-feature # Может fast-forward, теряя контекст ветки
# Или с автоматическим сообщением
git merge --no-ff feature/my-feature # Создаст "Merge branch 'feature/my-feature' into develop"
```

✅ **ХОРОШО**:

```bash
# После одобрения PR, на ветке develop
git checkout develop
git pull origin develop # Убедиться, что develop актуальна

# Определить тип изменения на основе коммитов в feature-ветке
# Если ветка fix/test-todolist-key-validation содержит исправление:
# Создать файл .git-commit-msg.txt в корне проекта (UTF-8 без BOM):
# fix(todolist): исправить валидацию key
#
# - исправить проверку key через console.error
# - обновить задачи для планирования исправления теста TodoList
git merge --no-ff fix/test-todolist-key-validation -F .git-commit-msg.txt
# Удалить файл после успешного merge:
# rm .git-commit-msg.txt  # или del .git-commit-msg.txt в Windows

# Если ветка feat/user-profile содержит новую фичу:
# Создать файл .git-commit-msg.txt в корне проекта (UTF-8 без BOM):
# feat(profile): добавить профиль пользователя
#
# - добавить новую страницу для просмотра и редактирования профиля
# - обновить роутинг для нового маршрута
git merge --no-ff feat/user-profile -F .git-commit-msg.txt
# Удалить файл после успешного merge

# Если ветка refactor/styles содержит рефакторинг:
# Создать файл .git-commit-msg.txt в корне проекта (UTF-8 без BOM):
# refactor(styles): мигрировать CSS на SCSS
#
# - мигрировать все CSS файлы на SCSS
# - добавить поддержку переменных и миксинов
git merge --no-ff refactor/styles -F .git-commit-msg.txt
# Удалить файл после успешного merge

git push origin develop
# После успешного push можно удалить временную ветку:
# git branch -d fix/test-todolist-key-validation
```

**Как определить тип merge-коммита:**

1. Посмотрите на коммиты в feature-ветке: `git log feature/my-feature --oneline`
2. Определите основной тип изменения (fix, feat, refactor, chore и т.д.)
3. Сформируйте сообщение merge-коммита по правилам из `docs/common/git-commit-description.md`
4. В теле merge-коммита перечислите основные изменения из всех коммитов ветки

**Результат:**

- В истории `develop` будет merge-коммит с правильным типом: `fix(todolist): исправить валидацию key`
- Вся история разработки сохранится внутри merge-коммита (можно посмотреть через `git log --graph`)
- После удаления временной ветки история останется читаемой с правильными типами коммитов

**Примечание**: Процесс PR на GitHub/GitLab должен автоматически обеспечивать это, но при ручном merge всегда указывайте сообщение в формате Conventional Commits.

## 4. Качество кода и безопасность: Git Hooks с `pre-commit`

Автоматизируйте проверки качества кода и сканирование безопасности _до_ того, как код попадёт в репозиторий. Используется фреймворк `pre-commit`.

### Правило: Установка и использование `pre-commit`

Каждый разработчик должен установить и поддерживать актуальными `pre-commit` hooks. Это предотвращает распространённые проблемы: ошибки линтинга, несогласованность форматирования и случайные коммиты секретов.

1.  **Установить `pre-commit`**:
    ```bash
    pip install pre-commit # Если используется Python
    # Или через brew, npm и т.д.
    ```
2.  **Установить hooks в репозитории**:
    ```bash
    pre-commit install
    ```
3.  **Регулярно обновлять hooks**:
    ```bash
    pre-commit autoupdate
    ```

### Пример `.pre-commit-config.yaml` (специфично для проекта)

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-json
      - id: detect-private-key
      - id: no-commit-to-branch
        args: [--branch, main, --branch, develop] # Предотвратить прямые коммиты в защищённые ветки

  - repo: https://github.com/psf/black
    rev: 23.12.1
    hooks:
      - id: black

  - repo: https://github.com/charliermarsh/ruff-pre-commit
    rev: 'v0.1.9'
    hooks:
      - id: ruff
        args: [--fix, --exit-non-zero-on-fix]

  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        args: ['--baseline', '.secrets.baseline'] # Управление известными ложными срабатываниями
```

Эта конфигурация запустит `black` (форматтер Python), `ruff` (линтер Python) и `detect-secrets` на staged файлах, среди прочих проверок, перед разрешением коммита.

**Примечание**: Если в проекте не используется `pre-commit`, этот раздел можно пропустить, но рекомендуется настроить хотя бы базовые проверки.

## 5. Гигиена репозитория: `.gitignore` и большие файлы

Держите репозиторий чистым и сфокусированным на исходном коде.

### Правило: Использовать комплексный `.gitignore`

Исключайте сгенерированные файлы, зависимости, артефакты сборки и чувствительную информацию.

❌ **ПЛОХО**:

```
# .gitignore
*.log
```

✅ **ХОРОШО**:

```
# .gitignore
# Операционная система
.DS_Store
Thumbs.db

# Артефакты сборки
/dist/
/build/

# Зависимости
/node_modules/
/venv/
__pycache__/

# Файлы IDE
.idea/
.vscode/

# Переменные окружения и секреты
.env
*.env
config.local.js
```

### Правило: Управление большими файлами с Git LFS

Никогда не коммитьте большие бинарные файлы (изображения, видео, большие датасеты, скомпилированные исполняемые файлы) напрямую в Git. Используйте Git Large File Storage (LFS).

1.  **Установить Git LFS**: `git lfs install`
2.  **Отслеживать типы файлов**:
    ```bash
    git lfs track "*.psd"
    git lfs track "assets/*.mp4"
    ```
3.  **Добавить в `.gitattributes`**: Эта команда обновит `.gitattributes`, который должен быть закоммичен.
4.  **Добавлять и коммитить файлы как обычно**:
    ```bash
    git add .gitattributes
    git add my_large_file.psd
    # Создать файл .git-commit-msg.txt в корне проекта (UTF-8 без BOM):
    # chore(assets): добавить большой PSD файл через LFS
    git commit -F .git-commit-msg.txt
    # Удалить файл после успешного коммита
    ```

## 6. Разрешение конфликтов: Проактивно и аккуратно

Конфликты мерджа неизбежны. Разрешайте их аккуратно и проактивно.

### Правило: Часто делать Pull

Часто подтягивайте изменения из `develop` (или вашей базовой ветки), чтобы минимизировать область потенциальных конфликтов.

```bash
git checkout feature/my-feature
git pull origin develop --rebase # Rebase вашей ветки на develop, чтобы избежать merge-коммитов
```

### Правило: Разрешать конфликты вручную

Используйте инструмент мерджа вашей IDE или `git mergetool` для разрешения конфликтов. Понимайте каждое изменение.

❌ **ПЛОХО**:

```bash
git merge develop --no-edit -X theirs # Слепо брать "их" изменения
```

✅ **ХОРОШО**:

```bash
git merge develop # Git запросит разрешение конфликтов
# Откройте конфликтующие файлы в IDE, разрешите вручную
# Или используйте `git mergetool`
git add <разрешённые_файлы>
# Создать файл .git-commit-msg.txt в корне проекта (UTF-8 без BOM):
# chore: разрешить конфликты после мерджа develop в feat/my-feature
git commit -F .git-commit-msg.txt
# Удалить файл после успешного коммита
```
