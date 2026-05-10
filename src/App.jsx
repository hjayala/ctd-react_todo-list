import './App.css'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import { useState } from 'react'

function App() {
  const [todoList, setTodoList] = useState([])

  function addTodo(todoTitle) {
    const newTodo = { id: Date.now(), title: todoTitle }
    setTodoList(previous => [newTodo, ...previous])
  }

  return (
    <>
      <div>
        <h1>Hector Ayala's Todos</h1>
        <TodoForm onAddTodo={addTodo} />
        <TodoList todoList={todoList} />
      </div>
    </>
  )
}

export default App