export const isEmpty = <T>(arr: T[]): boolean =>
  Array.isArray(arr) && !arr.length;
