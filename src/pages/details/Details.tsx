import {useParams} from 'react-router-dom';
import {hook} from '../../api/client';
import DetailsHeader from './components/DetailsHeader';

const Details = () => {
  const {symbol} = useParams<{symbol: string}>();

  const {data, isLoading} = hook.useStockDetails(symbol);

  console.log(data);
  if (isLoading) {
    return 'Loading details';
  }

  if (!data) {
    return 'error acquiring data';
  }

  return (
    <section>
      <DetailsHeader {...data[0]} />
    </section>
  );
};

export default Details;
