import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './ProfilePage.module.css';

function ProfilePage() {
  const { email, token } = useAuth();
  const [todoStats, setTodoStats] = useState({ total: 0, completed: 0, active: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) return;
      try {
        setLoading(true);
        setError('');
        const options = {
          method: 'GET',
          headers: { 'X-CSRF-TOKEN': token },
          credentials: 'include',
        };
        const response = await fetch('/api/tasks', options);
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        const todos = data.tasks;
        const total = todos.length;
        const completed = todos.filter((todo) => todo.isCompleted).length;
        const active = total - completed;
        setTodoStats({ total, completed, active });
      } catch (err) {
        setError(`Error loading statistics: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchTodoStats();
  }, [token]);

  const completionPercentage =
    todoStats.total > 0
      ? Math.round((todoStats.completed / todoStats.total) * 100)
      : 0;

  return (
    <div className={styles.page}>
      <div>
        <h2 className={styles.heading}>Your Profile</h2>
      </div>
      <div className={styles.infoCard}>
        <p className={styles.infoRow}>
          <span className={styles.infoLabel}>Name: </span>
          {email}
        </p>
        <p className={styles.infoRow}>
          <span className={styles.infoLabel}>Status: </span>
          Logged in
        </p>
      </div>

      <div>
        <h3 className={styles.sectionHeading}>Todo Statistics</h3>
        {loading && <p className={styles.loading}>Loading statistics...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{todoStats.total}</div>
              <div className={styles.statLabel}>Total</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{todoStats.completed}</div>
              <div className={styles.statLabel}>Completed</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{todoStats.active}</div>
              <div className={styles.statLabel}>Active</div>
            </div>
            {todoStats.total > 0 && (
              <div className={styles.statCard}>
                <div className={styles.statValue}>{completionPercentage}%</div>
                <div className={styles.statLabel}>Completion</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;