import { useRef, useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import {
  isValidTodoTitle,
  MAX_TODO_LENGTH,
} from '../../utils/todoValidation';
import styles from './TodoForm.module.css';

function TodoForm({ onAddTodo }) {
  const inputRef = useRef();
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  const isTooLong = workingTodoTitle.trim().length > MAX_TODO_LENGTH;

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (isValidTodoTitle(workingTodoTitle)) {
      onAddTodo(workingTodoTitle);
      setWorkingTodoTitle('');
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleAddTodo} className={styles.form}>
      <div className={styles.inputGroup}>
        <TextInputWithLabel
          elementId="todoTitle"
          labelText="Todo"
          ref={inputRef}
          value={workingTodoTitle}
          onChange={(event) => setWorkingTodoTitle(event.target.value)}
          maxLength={MAX_TODO_LENGTH}
        />
        {isTooLong && (
          <p className={styles.fieldError}>
            Title must be {MAX_TODO_LENGTH} characters or fewer.
          </p>
        )}
      </div>
      <button
        type="submit"
        className={styles.addButton}
        disabled={!isValidTodoTitle(workingTodoTitle)}
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;