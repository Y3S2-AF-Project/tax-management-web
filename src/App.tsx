import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import MainRoutes from "./routes";
import { Footer } from "./layout";
import './App.css'

function App() {
  return (
    <MantineProvider>
      <Notifications />
      <ModalsProvider>
        <div className="App">
          <MainRoutes />
          <div className="footer">
            <Footer />
          </div>
        </div>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
