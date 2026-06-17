import styles from './controls.module.css';

function SortBy({ sortBy, sortDirection, onSortByChange, onSortDirectionChange }) {
  return (
    <div className={styles.fieldGroup}>
      <div className={styles.field}>
        <label htmlFor="sortBy" className={styles.label}>
          Sort by
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className={styles.select}
        >
          <option value="createdAt">Creation Date</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="sortDirection" className={styles.label}>
          Order
        </label>
        <select
          id="sortDirection"
          value={sortDirection}
          onChange={(e) => onSortDirectionChange(e.target.value)}
          className={styles.select}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
}

export default SortBy;