import { Link } from 'react-router';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.code}>404</p>
      <h2>Page Not Found</h2>
      <p className={styles.message}>
        The page you're looking for doesn't exist.
      </p>
      <ul className={styles.links}>
        <li>
          <Link to="/todos" className={styles.link}>
            Go to Todos
          </Link>
        </li>
        <li>
          <Link to="/about" className={styles.link}>
            About
          </Link>
        </li>
        <li>
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NotFoundPage;