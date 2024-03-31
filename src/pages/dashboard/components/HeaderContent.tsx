import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import {Typography} from '@mui/joy';

import ExchangePicker from './ExchangePicker';

const HeaderContent = () => {
  return (
    <>
      <Typography
        level="h1"
        fontSize={14}
        sx={{color: 'inherit', flexShrink: 0}}
      >
        <CurrencyExchangeIcon sx={{verticalAlign: 'sub', mx: 1}} />
        Listado de acciones
      </Typography>
      <ExchangePicker defaultExchange="NYSE" />
    </>
  );
};

export default HeaderContent;
