import styles from './TextInputWithLabel.module.css';

function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  ref,
  value,
  maxLength,
}) {
  return (
    <>
      {labelText && (
        <label htmlFor={elementId} className={styles.label}>
          {labelText}
        </label>
      )}
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={styles.input}
      />
    </>
  );
}

export default TextInputWithLabel;