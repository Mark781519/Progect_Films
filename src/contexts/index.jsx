import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserContextProvider } from "contexts/UserContext";
import { FilmsContextProvider } from "contexts/FilmContext";

export const queryConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
};

export const queryClient = new QueryClient(queryConfig);

function AppProviders({ children }) {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <FilmsContextProvider>{children}</FilmsContextProvider>
        </UserContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Router>
  );
}

export { AppProviders };
