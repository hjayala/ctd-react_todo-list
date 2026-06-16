import DOMPurify from 'dompurify';

export const MAX_TODO_LENGTH = 200;

export function isValidTodoTitle(title) {
  const trimmed = title.trim();
  return trimmed.length > 0 && trimmed.length <= MAX_TODO_LENGTH;
}

// Strip all HTML and attributes — todo titles are plain text only
export function sanitizeTodoTitle(title) {
  return DOMPurify.sanitize(title.trim(), {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}