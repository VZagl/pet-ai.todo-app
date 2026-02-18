import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gripIcon from '../../assets/grip.svg';
import type { i_todo } from '../../types/todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface i_sortableTodoItemProps {
	/** Объект задачи */
	todo: i_todo;
}

/**
 * Обёртка TodoItem с поддержкой перетаскивания.
 * Grip (⋮⋮) слева от чекбокса — единственная зона для инициации drag.
 */
export function SortableTodoItem({ todo }: i_sortableTodoItemProps) {
	const { t } = useTranslation();
	const [isEditing, setIsEditing] = useState(false);

	const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
		useSortable({
			id: todo.id,
			disabled: isEditing,
		});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const onEditModeChange = useCallback((editing: boolean) => {
		setIsEditing(editing);
	}, []);

	const grip = (
		<span
			ref={setActivatorNodeRef}
			className='todo-item__grip'
			{...attributes}
			{...listeners}
			aria-label={t('todoItem.ariaGrip', { text: todo.text })}
			data-testid='todo-item-grip'
		>
			<img src={gripIcon} alt='' aria-hidden />
		</span>
	);

	return (
		<li ref={setNodeRef} style={style} className='todo-list__sortable-item'>
			<TodoItem
				todo={todo}
				onEditModeChange={onEditModeChange}
				isDragging={isDragging}
				grip={grip}
				as='div'
			/>
		</li>
	);
}
