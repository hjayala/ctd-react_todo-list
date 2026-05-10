import './App.css'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import { useState } from 'react'

function App() {
  const [todoList, setTodoList] = useState([])

  function addTodo(todoTitle) {
    const newTodo = { id: Date.now(), title: todoTitle, isCompleted: false }
    setTodoList(previous => [newTodo, ...previous])
  }

  function completeTodo(id) {
    const updatedList = todoList.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true }
      }
      return todo
    })
    setTodoList(updatedList)
  }

  return (
    <>
      <div>
        <h1>Hector Ayala's Todos</h1>
        <TodoForm onAddTodo={addTodo} />
        <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
      </div>
    </>
  )
}

export default App