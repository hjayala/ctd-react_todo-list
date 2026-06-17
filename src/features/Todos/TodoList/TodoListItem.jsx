import { useState } from 'react';
import TextInputWithLabel from '../../../shared/TextInputWithLabel';
import {
  isValidTodoTitle,
  MAX_TODO_LENGTH,
} from '../../../utils/todoValidation';
import styles from './TodoListItem.module.css';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo, onDeleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  const isTooLong = workingTitle.trim().length > MAX_TODO_LENGTH;

  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }

  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }

  function handleUpdate(event) {
    if (!isEditing) return;
    event.preventDefault();
    if (!isValidTodoTitle(workingTitle)) return;
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  }

  function handleDelete() {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDeleteTodo(todo.id);
    }
  }

  return (
    <li className={styles.item}>
      <form onSubmit={handleUpdate} className={styles.form}>
        {isEditing ? (
          <>
            <div className={styles.editGroup}>
              <TextInputWithLabel
                elementId={`edit-${todo.id}`}
                value={workingTitle}
                onChange={handleEdit}
                maxLength={MAX_TODO_LENGTH}
              />
              {isTooLong && (
                <p className={styles.fieldError}>
                  Title must be {MAX_TODO_LENGTH} characters or fewer.
                </p>
              )}
            </div>
            <div className={styles.editButtons}>
              <button
                type="button"
                onClick={handleCancel}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                disabled={!isValidTodoTitle(workingTitle)}
                className={styles.updateButton}
              >
                Update
              </button>
            </div>
          </>
        ) : (
          <>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
                disabled={todo.isPending}
                className={styles.checkbox}
              />
              <span className={styles.checkboxBox}></span>
            </label>
            <span
              className={`${styles.title} ${
                todo.isCompleted ? styles.titleCompleted : ''
              }`}
              onClick={() => setIsEditing(true)}
            >
              {todo.title}
            </span>
            <button
              type="button"
              onClick={handleDelete}
              className={styles.deleteButton}
              disabled={todo.isPending}
              aria-label="Delete todo"
            >
              Delete
            </button>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;