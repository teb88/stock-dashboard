import './App.css';
import '@fontsource/inter';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import Dashboard from './pages/dashboard/Dashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}

export default App;
