import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import MainRoutes from "./routes";
import { Footer } from "./layout";

function App() {
  return (
    <MantineProvider>
      <Notifications />
      <ModalsProvider>
        <div className="App">
          <MainRoutes />
          <Footer />
        </div>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
