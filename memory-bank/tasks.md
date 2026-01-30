# Memory Bank: Tasks

## Current Task

Заменить props drilling на Context API (задача из backlog: Architecture Improvements)

## Task ID

context-api-todo-001

## Complexity Level

Level 3 — Intermediate Feature

## Status

Инициализирована (VAN). Ветка `refactor/todo-context-api` создана. Ожидает режим PLAN для детального плана, затем BUILD.

## Source

`memory-bank/backlog.md` (строки 82–99), раздел Architecture Improvements

## Description

- Создать `TodoContext` и `TodoProvider` для управления действиями с задачами (toggleTodo, deleteTodo, updateTodo и т.д.)
- Создать хук `useTodoActions()` для доступа к действиям из контекста
- Рефакторинг компонентов:
  - `TodoApp` — обернуть в TodoProvider
  - `TodoList` — убрать пропсы onToggle, onDelete
  - `TodoItem` — убрать пропсы обработчиков; использовать useTodoActions() напрямую
- Цель: устранение props drilling, упрощение добавления новых вложенных компонентов

## Technology Stack

React 19, Context API (встроенный), TypeScript 5.9 — без новых зависимостей

## Requirements

- Файлы для создания: `src/contexts/TodoContext.tsx`, `src/hooks/useTodoActions.ts`
- Файлы для рефакторинга: `TodoApp.tsx`, `TodoList.tsx`, `TodoItem.tsx`
- Связано с: todo-app-001

---

## Implementation Plan (PLAN)

План реализации будет составлен в режиме PLAN (команда `/plan`)

---

## Technology Validation

Валидация технологий будет выполнена при планировании

---

## Challenges & Mitigations

Вызовы и решения будут документированы при планировании

---

## Checklist реализации (BUILD)

Чеклист будет создан при планировании задачи

---

## Creative Phases Required

Будет определён при планировании (Level 3 может потребовать креативную фазу по дизайну контекста)
