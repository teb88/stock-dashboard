import {Cancel, ExpandMore} from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Input,
  Link,
  Modal,
  ModalClose,
  ModalDialog,
  Table,
} from '@mui/joy';
import React, {useEffect, useState} from 'react';
import {Link as ReactRouterLink, useSearchParams} from 'react-router-dom';

import {hook} from '../../../api/client';
import useSearch from '../../../hooks/useSearch';
import {Exchange} from '../../../models/responses';

interface ExchangePickerProps {
  defaultExchange: string;
}

const DEFAULT_ITEMS: Array<Exchange & {noSearch?: boolean}> = [
  {
    name: 'Todos',
    code: '',
    country: '',
    timezone: '',
    noSearch: true,
  },
];

const ExchangePicker: React.FC<ExchangePickerProps> = ({defaultExchange}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data} = hook.useExchanges();

  useEffect(() => {
    if (!searchParams.get('exchange')) {
      setSearchParams({exchange: defaultExchange});
    }
  }, [searchParams, setSearchParams, defaultExchange]);

  const [filteredData, {setFilter, filter: textFilter}] = useSearch(
    data,
    'name'
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Button
          size="sm"
          variant="plain"
          sx={{color: 'neutral.200'}}
          onClick={() => setIsModalOpen(true)}
          disabled={!data}
        >
          {searchParams.get('exchange')}
          <ExpandMore />
        </Button>
      </Box>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <Input
            sx={{mt: 3}}
            placeholder="buscar por nombre"
            onChange={(ev) => setFilter(ev.target.value)}
            value={textFilter}
            endDecorator={
              <IconButton
                onClick={() => setFilter('')}
                sx={{visibility: textFilter ? 'visible' : 'hidden'}}
              >
                <Cancel />
              </IconButton>
            }
          />
          <Box sx={{height: '100%', overflowY: 'auto'}}>
            <Table stickyHeader>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Codigo</th>
                  <th>Pais</th>
                </tr>
              </thead>
              <tbody>
                {DEFAULT_ITEMS.concat(filteredData || []).map((exchange) => (
                  <tr key={exchange.code}>
                    <td>
                      <Link
                        component={ReactRouterLink}
                        to={{
                          pathname: '',
                          search: `exchange=${exchange.name}`,
                        }}
                        onClick={() => setIsModalOpen(false)}
                      >
                        {exchange.name}
                      </Link>
                    </td>
                    <td>{exchange.code}</td>
                    <td>{exchange.country}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default ExchangePicker;
