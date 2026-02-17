import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useTranslation } from 'react-i18next';
import { useTodoContext } from '../../hooks/use-todo-context';
import type { i_todo } from '../../types/todo';
import { SortableTodoItem } from '../SortableTodoItem/SortableTodoItem';
import './TodoList.scss';

interface i_todoListProps {
	/** Массив задач для отображения */
	todos: i_todo[];
}

/**
 * Компонент списка задач
 * Отображает список TodoItem или сообщение о пустом списке.
 * Поддерживает перетаскивание для изменения порядка.
 */
export const TodoList = ({ todos }: i_todoListProps) => {
	const { t } = useTranslation();
	const { reorderTodos } = useTodoContext();

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = todos.findIndex((todo) => todo.id === active.id);
		const newIndex = todos.findIndex((todo) => todo.id === over.id);
		if (oldIndex === -1 || newIndex === -1) return;

		const reordered = arrayMove(todos, oldIndex, newIndex);
		reorderTodos(reordered);
	};

	if (todos.length === 0) {
		return (
			<div className='todo-list-empty' data-testid='todo-list-empty'>
				<p className='todo-list-empty__message'>{t('todoList.empty')}</p>
			</div>
		);
	}

	const todoIds = todos.map((todo) => todo.id);

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={todoIds} strategy={verticalListSortingStrategy}>
				<ul className='todo-list'>
					{todos.map((todo) => (
						<SortableTodoItem key={todo.id} todo={todo} />
					))}
				</ul>
			</SortableContext>
		</DndContext>
	);
};
