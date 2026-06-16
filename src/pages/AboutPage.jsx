import styles from './AboutPage.module.css';

function AboutPage() {
  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>About This App</h2>
      <p className={styles.intro}>
        This is a todo list application built as part of the React Course of
        Code The Dream. It lets you create, complete, edit, sort, and filter
        tasks that persist to a backend API.
      </p>

      <h3 className={styles.sectionHeading}>Features</h3>
      <ul className={styles.list}>
        <li>Create, edit, and complete todos</li>
        <li>Sort by creation date or title</li>
        <li>Search and filter todos</li>
        <li>User authentication with protected routes</li>
      </ul>

      <h3 className={styles.sectionHeading}>Technologies Used</h3>
      <ul className={styles.list}>
        <li>React</li>
        <li>React Router</li>
        <li>Vite</li>
      </ul>
    </div>
  );
}

export default AboutPage;