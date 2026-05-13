import './App.css';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';
import { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(todoTitle) {
    const newTodo = { id: Date.now(), title: todoTitle, isCompleted: false };
    setTodoList(previous => [newTodo, ...previous]);
  }

  function completeTodo(id) {
    const updatedList = todoList.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });
    setTodoList(updatedList);
  }

  function updateTodo(editedTodo) {
    const updatedTodos = todoList.map(todo =>
      todo.id === editedTodo.id ? { ...editedTodo } : todo
    );
    setTodoList(updatedTodos);
  }

  return (
    <>
      <div>
        <h1>Hector Ayala's Todos</h1>
        <TodoForm onAddTodo={addTodo} />
        <TodoList
          todoList={todoList}
          onCompleteTodo={completeTodo}
          onUpdateTodo={updateTodo}
        />
      </div>
    </>
  );
}

export default App;