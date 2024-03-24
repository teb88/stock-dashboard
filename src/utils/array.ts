export function sort<T>(
  arr: T[],
  property: keyof T,
  direction: 'asc' | 'desc' = 'asc'
) {
  const sorted = [...arr].sort((a, b) => {
    const valueA = a[property];
    const valueB = b[property];

    if (direction === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  return sorted;
}
