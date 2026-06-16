import styles from './controls.module.css';

function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <div className={`${styles.field} ${styles.searchField}`}>
      <label htmlFor="filterInput" className={styles.label}>
        Search todos
      </label>
      <input
        id="filterInput"
        type="text"
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Search by title..."
        className={styles.searchInput}
      />
    </div>
  );
}

export default FilterInput;