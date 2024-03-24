import {Sheet, Table} from '@mui/joy';
import React, {Suspense, useState} from 'react';
import {hook} from '../../../api/client';
import usePaginate from '../../../hooks/usePaginate';
import TablePaginator from './TablePaginator';
import useSearch from '../../../hooks/useSearch';
import TableFilter from './TableFilter';

const StockTable: React.FC<{}> = () => {
  const {data: rawData, isLoading} = hook.useMarketList();
  const [searchProperty, setSearchProperty] = useState<'name' | 'symbol'>(
    'name'
  );

  const [filteredData, {filter, setFilter}] = useSearch(
    rawData,
    searchProperty
  );
  const [data, {setPage, maxPages, page, range, setRowsPerPage, rowsPerPage}] =
    usePaginate(filteredData);

  if (isLoading) {
    return 'Loading';
  }

  if (!data) {
    return 'NO DATA';
  }

  const handleChangeRowsPerPage = (_: unknown, rowsPerPage: number | null) => {
    if (typeof rowsPerPage === 'number') {
      setRowsPerPage(rowsPerPage);
      setPage(1);
    }
  };

  return (
    <>
      <Sheet
        variant="outlined"
        sx={{width: '100%', boxShadow: 'sm', borderRadius: 'sm', mb: 3, p: 2}}
      >
        <TableFilter
          textFilter={filter}
          setTextFilter={setFilter}
          onChangeFilterOption={(val) =>
            setSearchProperty(val as 'name' | 'symbol')
          }
          selectedFilterOption={searchProperty}
          filterOptions={[
            {key: 'name', label: 'Name'},
            {key: 'symbol', label: 'Symbol'},
          ]}
        />
      </Sheet>
      <Sheet
        variant="outlined"
        sx={{width: '100%', boxShadow: 'sm', borderRadius: 'sm'}}
      >
        <Table>
          <thead>
            <tr>
              <th>Simbolo</th>
              <th>Nombre</th>
              <th>Moneda</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <Suspense fallback={'Loading'}>
            <tbody>
              {data.map((stockInfo) => (
                <tr key={`${stockInfo.symbol}_${stockInfo.mic_code}`}>
                  <td>{stockInfo.symbol}</td>
                  <td>{stockInfo.name}</td>
                  <td>{stockInfo.currency}</td>
                  <td>{stockInfo.type}</td>
                </tr>
              ))}
            </tbody>
          </Suspense>
        </Table>
        <TablePaginator
          maxPages={maxPages}
          page={page}
          rowsPerPage={rowsPerPage}
          range={range}
          onChangePage={setPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          totalRows={filteredData!.length}
        />
      </Sheet>
    </>
  );
};

export default StockTable;
