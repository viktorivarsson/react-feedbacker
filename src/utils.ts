export type Optional<T> = T | null | undefined;

export const generateId = () =>
  Math.random()
    .toString(36)
    .substr(2, 18);

export const getTimeDifferenceInMs = (aDate: Date, bDate: Date) =>
  aDate.getTime() - bDate.getTime();

export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const warn = (message: string) => console.warn(`Warning: ${message}`);
