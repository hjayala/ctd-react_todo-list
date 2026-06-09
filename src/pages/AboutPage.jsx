function AboutPage() {
    return (
      <div>
        <h2>About This App</h2>
        <p>
          This is a todo list application built as part of the React Course of Code The Dream. It lets you create, complete, edit, sort, and filter tasks
          that persist to a backend API.
        </p>
  
        <h3>Features</h3>
        <ul>
          <li>Create, edit, and complete todos</li>
          <li>Sort by creation date or title</li>
          <li>Search and filter todos</li>
          <li>User authentication with protected routes</li>
        </ul>
  
        <h3>Technologies Used</h3>
        <ul>
          <li>React</li>
          <li>React Router</li>
          <li>Vite</li>
        </ul>
      </div>
    );
  }
  
  export default AboutPage;