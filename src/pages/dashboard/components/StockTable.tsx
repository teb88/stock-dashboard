import {Box, Link, Sheet, Table} from '@mui/joy';
import React, {Suspense, useState} from 'react';
import {Link as RouterLink, useSearchParams} from 'react-router-dom';

import {hook} from '../../../api/client';
import LoadingIndicator from '../../../components/LoadingIndicator';
import usePaginate from '../../../hooks/usePaginate';
import useSearch from '../../../hooks/useSearch';
import TableFilter from './TableFilter';
import TablePaginator from './TablePaginator';

const StockTable: React.FC = () => {
  const [searchParams] = useSearchParams();
  const {data: rawData, isLoading} = hook.useMarketList(
    searchParams.get('exchange')
  );
  const [searchProperty, setSearchProperty] = useState<'name' | 'symbol'>(
    'name'
  );

  const [filteredData, {filter, setFilter}] = useSearch(
    rawData,
    searchProperty
  );
  const [data, {setPage, maxPages, page, range, setRowsPerPage, rowsPerPage}] =
    usePaginate(filteredData);

  const handleSetFilter = (filter: string) => {
    setFilter(filter);
    setPage(1);
  };

  if (isLoading) {
    return <LoadingIndicator />;
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

  const handleChangeSearchProperty = (val: string) => {
    setSearchProperty(val as typeof searchProperty);
    setPage(1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Sheet
        variant="outlined"
        sx={{width: '100%', boxShadow: 'sm', borderRadius: 'sm', mb: 3, p: 2}}
      >
        <TableFilter
          placeholder="Buscar por..."
          textFilter={filter}
          setTextFilter={handleSetFilter}
          onChangeFilterOption={handleChangeSearchProperty}
          selectedFilterOption={searchProperty}
          filterOptions={[
            {key: 'name', label: 'Nombre'},
            {key: 'symbol', label: 'Símbolo'},
          ]}
        />
      </Sheet>
      <Sheet
        variant="outlined"
        sx={{
          width: '100%',
          boxShadow: 'sm',
          borderRadius: 'sm',
          flexGrow: 1,
          overflowY: 'auto',
        }}
      >
        <Table stickyHeader stickyFooter stripe="odd">
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
                  <td>
                    <Link
                      component={RouterLink}
                      to={`details/${stockInfo.symbol}`}
                    >
                      {stockInfo.symbol}
                    </Link>
                  </td>
                  <td>{stockInfo.name}</td>
                  <td>{stockInfo.currency}</td>
                  <td>{stockInfo.type}</td>
                </tr>
              ))}
            </tbody>
          </Suspense>
          <tfoot>
            <tr>
              <td colSpan={4}>
                <TablePaginator
                  maxPages={maxPages}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  range={range}
                  onChangePage={setPage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  totalRows={filteredData!.length}
                />
              </td>
            </tr>
          </tfoot>
        </Table>
      </Sheet>
    </Box>
  );
};

export default StockTable;
