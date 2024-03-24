import './App.css';
import '@fontsource/inter';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import StockTable from './pages/dashboard/components/StockTable';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StockTable />
    </QueryClientProvider>
  );
}

export default App;
