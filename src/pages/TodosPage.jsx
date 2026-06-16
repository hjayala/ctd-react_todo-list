import { useEffect, useReducer } from 'react';
import { useSearchParams } from 'react-router';
import TodoForm from '../features/Todos/TodoForm';
import TodoList from '../features/Todos/TodoList/TodoList';
import SortBy from '../shared/SortBy';
import FilterInput from '../shared/FilterInput';
import StatusFilter from '../shared/StatusFilter';
import useDebounce from '../utils/useDebounce';
import { useAuth } from '../contexts/AuthContext';
import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from '../reducers/todoReducer';
import styles from './TodosPage.module.css';
import controlStyles from '../shared/controls.module.css';
import { sanitizeTodoTitle } from '../utils/todoValidation';

function TodosPage() {
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const {
    todoList,
    error,
    filterError,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
  } = state;

  const statusFilter = searchParams.get('status') || 'all';
  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  const handleFilterChange = (newTerm) => {
    dispatch({ type: TODO_ACTIONS.SET_FILTER, payload: { filterTerm: newTerm } });
  };

  useEffect(() => {
    if (!token) return;

    async function fetchTodos() {
      dispatch({ type: TODO_ACTIONS.FETCH_START });
      try {
        const paramsObject = { sortBy, sortDirection };
        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }
        const params = new URLSearchParams(paramsObject);

        const response = await fetch(`/api/tasks?${params}`, {
          headers: { 'X-CSRF-TOKEN': token },
          credentials: 'include',
        });
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        dispatch({
          type: TODO_ACTIONS.FETCH_SUCCESS,
          payload: { todos: data.tasks },
        });
      } catch (err) {
        const isFilterError =
          debouncedFilterTerm ||
          sortBy !== 'creationDate' ||
          sortDirection !== 'desc';
        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: {
            message: isFilterError
              ? `Error filtering/sorting todos: ${err.message}`
              : `Error fetching todos: ${err.message}`,
            isFilterError,
          },
        });
      }
    }

    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  async function addTodo(todoTitle) {
    const cleanTitle = sanitizeTodoTitle(todoTitle);
    const tempId = Date.now();
    const newTodo = { id: tempId, title: cleanTitle, isCompleted: false, isPending: true };
    dispatch({ type: TODO_ACTIONS.ADD_TODO_START, payload: { newTodo } });
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({ title: cleanTitle, isCompleted: false }),
      });
      if (!response.ok) throw new Error('Failed to add todo');
      const savedTodo = await response.json();
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: { tempId, savedTodo },
      });
    } catch (err) {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: { tempId, message: err.message },
      });
    }
  }

  async function toggleTodo(id) {
    const originalTodo = todoList.find(todo => todo.id === id);
    dispatch({ type: TODO_ACTIONS.COMPLETE_TODO_START, payload: { id } });
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({ isCompleted: !originalTodo.isCompleted }),
      });
      if (!response.ok) throw new Error('Failed to update todo');
      dispatch({ type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS });
    } catch (err) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: { id, originalTodo, message: err.message },
      });
    }
  }

  async function updateTodo(editedTodo) {
    const cleanTitle = sanitizeTodoTitle(editedTodo.title);
    const sanitizedTodo = { ...editedTodo, title: cleanTitle };
    const originalTodo = todoList.find(todo => todo.id === sanitizedTodo.id);
    dispatch({ type: TODO_ACTIONS.UPDATE_TODO_START, payload: { editedTodo: sanitizedTodo } });
    try {
      const response = await fetch(`/api/tasks/${sanitizedTodo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          title: sanitizedTodo.title,
          isCompleted: sanitizedTodo.isCompleted,
        }),
      });
      if (!response.ok) throw new Error('Failed to update todo');
      dispatch({ type: TODO_ACTIONS.UPDATE_TODO_SUCCESS });
    } catch (err) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: { originalTodo, message: err.message },
      });
    }
  }

  return (
    <div className={styles.page}>
      {error && (
        <div className={styles.errorBox}>
          <p>{error}</p>
          <button
            type="button"
            onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}
            className={styles.errorButton}
          >
            Clear Error
          </button>
        </div>
      )}
      {filterError && (
        <div className={styles.errorBox}>
          <p>{filterError}</p>
          <button
            type="button"
            onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_FILTER_ERROR })}
            className={styles.errorButton}
          >
            Clear Filter Error
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTERS })}
            className={styles.errorButton}
          >
            Reset Filters
          </button>
        </div>
      )}
      {isTodoListLoading && <p className={styles.loading}>Loading todos...</p>}
      <div className={controlStyles.controlsBar}>
        <SortBy
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortByChange={(newSortBy) =>
            dispatch({
              type: TODO_ACTIONS.SET_SORT,
              payload: { sortBy: newSortBy, sortDirection },
            })
          }
          onSortDirectionChange={(newDirection) =>
            dispatch({
              type: TODO_ACTIONS.SET_SORT,
              payload: { sortBy, sortDirection: newDirection },
            })
          }
        />
        <StatusFilter />
        <FilterInput filterTerm={filterTerm} onFilterChange={handleFilterChange} />
      </div>
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={toggleTodo}
        onUpdateTodo={updateTodo}
        dataVersion={dataVersion}
        statusFilter={statusFilter}
      />
    </div>
  );
}

export default TodosPage;