import { Toaster } from "react-hot-toast";
import Controller from "./components/Controller";
import { GolfProvider } from "./hooks/useGolf";

function App() {
  return (
    <GolfProvider>
      <Toaster />
      <Controller />
    </GolfProvider>
  );
}

export default App;
