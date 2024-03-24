import {useDeferredValue, useMemo, useState} from 'react';

function useSearch<T>(data: Array<T> | undefined = [], property: keyof T) {
  const [filter, setFilter] = useState('');
  const deferredFilter = useDeferredValue(filter);

  const filteredData = useMemo(
    () =>
      data.filter((item) =>
        (item[property] as string)
          .toLowerCase()
          .includes(deferredFilter.toLowerCase())
      ),
    [data, property, deferredFilter]
  );

  return [filteredData, {setFilter, filter}] as const;
}

export default useSearch;
