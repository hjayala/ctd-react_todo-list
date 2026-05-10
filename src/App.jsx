import './App.css'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import { useState } from 'react'

const todos = [
    {id:1, title: "Complete Scrimba React course"},
    {id:2, title: "Take notes on Discrete Math"},
    {id:3, title: "Review Data Structures"},
]

function App() {
  // The underscore here lets React now setTodoList is left unused intentionally
  // I had to add it, since it kept giving me an error until then
  const [todoList, _setTodoList] = useState(todos)

  return (
    <>
      <div>
        <h1>Hector Ayala's Todos</h1>
        <TodoForm />
        <TodoList todoList={todoList} />
      </div>
    </>
  )
}

export default App
