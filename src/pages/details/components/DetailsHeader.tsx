import React from 'react';
import {StockInfo} from '../../../models/responses';
import {Box, Sheet, Typography} from '@mui/joy';

// type DetailsHeaderProps = Pick<StockInfo, ''>

const DetailsHeader: React.FC<StockInfo> = ({
  symbol,
  currency,
  country,
  name,
  type,
}) => {
  return (
    <Sheet
      component="section"
      variant="outlined"
      sx={{display: 'flex', boxShadow: 'sm', borderRadius: 'md', p: 1}}
    >
      <Typography level="h1" fontSize={50} sx={{mr: 1, alignSelf: 'end'}}>
        {symbol}
      </Typography>
      <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2}}>
        <div>
          <Typography fontWeight="bold" level="body-xs">
            Nombre:
          </Typography>
          <Typography level="body-sm">{name}</Typography>
        </div>
        <div>
          <Typography fontWeight="bold" level="body-xs">
            Pais:
          </Typography>
          <Typography level="body-sm">{country}</Typography>
        </div>
        <div>
          <Typography fontWeight="bold" level="body-xs">
            Moneda:
          </Typography>
          <Typography level="body-sm">{currency}</Typography>
        </div>
        <div>
          <Typography fontWeight="bold" level="body-xs">
            Tipo:
          </Typography>
          <Typography level="body-sm">{type}</Typography>
        </div>
      </Box>
    </Sheet>
  );
};

export default DetailsHeader;
