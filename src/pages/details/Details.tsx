import {useParams} from 'react-router-dom';
import {hook} from '../../api/client';

const Details = () => {
  const {symbol} = useParams<{symbol: string}>();

  const {data, isLoading} = hook.useStockDetails(symbol);

  console.log(data);
  if (isLoading) {
    return 'Loading details';
  }

  return <pre>{JSON.stringify(data, null, 3)}</pre>;
};

export default Details;
