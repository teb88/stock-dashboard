import {ExpandMore} from '@mui/icons-material';
import {
  Box,
  Button,
  Link,
  Modal,
  ModalClose,
  ModalDialog,
  Table,
  Typography,
} from '@mui/joy';
import React, {useEffect, useState} from 'react';
import {Link as ReactRouterLink, useSearchParams} from 'react-router-dom';

import {hook} from '../../../api/client';
import {Exchange} from '../../../models/responses';

interface ExchangesBarProps {
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

const ExchangesBar: React.FC<ExchangesBarProps> = ({defaultExchange}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data} = hook.useExchanges();

  useEffect(() => {
    if (!searchParams.get('exchange')) {
      setSearchParams({exchange: defaultExchange});
    }
  }, [searchParams, setSearchParams, defaultExchange]);

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
          <Typography level="title-sm" component="h1">
            Mercados de Intercambio
          </Typography>
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
                {DEFAULT_ITEMS.concat(data || []).map((exchange) => (
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

export default ExchangesBar;
