export const generateId = () =>
  Math.random()
    .toString(36)
    .substr(2, 18);

export const getTimeDifferenceInMs = (aDate: Date, bDate: Date) =>
  aDate.getTime() - bDate.getTime();
