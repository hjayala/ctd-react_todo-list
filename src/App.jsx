import './App.css'

function App() {

  const todoList = 
  [
    {id:1, title: "Complete Scrimba React course"},
    {id:2, title: "Take notes on Discrete Math"},
    {id:3, title: "Review Data Structures"},
  ]

  return (
    <div>
      <h1>Hector Ayala's Todos</h1>
      
      <ul>
        {todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  )
}

export default App
