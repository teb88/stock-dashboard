import {useState} from 'react';

interface PaginationOptions {
  initialPage: number;
  rowsPerPage: number;
}

function usePaginate<T>(
  data: Array<T> = [],
  options: PaginationOptions = {initialPage: 1, rowsPerPage: 30}
) {
  const {initialPage, rowsPerPage: initialRowsPerPage} = options;

  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const maxPages = Math.ceil(data.length / rowsPerPage);

  const rangeStart = (page - 1) * rowsPerPage;
  const rangeEnd = page * rowsPerPage;
  const paginatedData = data.slice(rangeStart, rangeEnd);

  return [
    paginatedData,
    {
      maxPages,
      setPage,
      rowsPerPage,
      page,
      range: [rangeStart, rangeEnd],
      setRowsPerPage,
    },
  ] as const;
}

export default usePaginate;
