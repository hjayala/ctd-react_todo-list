import { useAuth } from '../contexts/AuthContext';
import Logoff from '../features/Logoff';
import Navigation from './Navigation';
import styles from './Header.module.css';

function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Todo List</h1>
      <div className={styles.headerRight}>
        <Navigation />
        {isAuthenticated && <Logoff />}
      </div>
    </header>
  );
}

export default Header;