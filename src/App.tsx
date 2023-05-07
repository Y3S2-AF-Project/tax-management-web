import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import MainRoutes from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Notifications />
        <ModalsProvider>
          <div className="App">
            <MainRoutes />
          </div>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
