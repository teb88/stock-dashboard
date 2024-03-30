import {Box, Sheet, Typography} from '@mui/joy';
import React from 'react';

import {HeaderDetails} from '../../../models/generic';

interface DetailsHeaderProps extends HeaderDetails {}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  currencies,
  countries,
  names,
  types,
}) => {
  return (
    <Sheet
      component="section"
      variant="outlined"
      sx={{display: 'flex', boxShadow: 'sm', borderRadius: 'md', p: 1, mb: 2}}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          columnGap: 2,
          width: '100%',
        }}
      >
        <Box sx={{gridColumn: '1 / 4'}}>
          <Typography fontWeight="bold" level="body-xs">
            Nombre/s:
          </Typography>
          <Typography level="body-sm" sx={{fontSize: 12}}>
            {names.join(' •	 ')}
          </Typography>
        </Box>
        <Box>
          <Typography fontWeight="bold" level="body-xs">
            Pais:
          </Typography>
          {countries.map((country) => (
            <Typography key={country} level="body-sm" sx={{fontSize: 12}}>
              {country}
            </Typography>
          ))}
        </Box>
        <Box>
          <Typography fontWeight="bold" level="body-xs">
            Moneda:
          </Typography>
          <Typography level="body-sm" sx={{fontSize: 12}}>
            {currencies.join(', ')}
          </Typography>
        </Box>
        <Box>
          <Typography fontWeight="bold" level="body-xs">
            Tipo:
          </Typography>
          {types.map((type) => (
            <Typography key={type} level="body-sm" sx={{fontSize: 12}}>
              {type}
            </Typography>
          ))}
        </Box>
      </Box>
    </Sheet>
  );
};

export default DetailsHeader;
