import React from 'react';
import {StockInfo} from '../../../models/responses';

// type DetailsHeaderProps = Pick<StockInfo, ''>

const DetailsHeader: React.FC<StockInfo> = ({
  symbol,
  currency,
  country,
  name,
  type,
}) => {
  return <div>DetailsHeader</div>;
};

export default DetailsHeader;
