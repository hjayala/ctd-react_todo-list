import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div>
      <h2>404: Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <ul>
        <li>
          <Link to="/todos">Go to Todos</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
}

export default NotFoundPage;