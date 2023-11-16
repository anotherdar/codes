export const search = (value: string, query: string) => {
  return value
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLocaleLowerCase()
    .includes(query.trim().toLowerCase());
};
