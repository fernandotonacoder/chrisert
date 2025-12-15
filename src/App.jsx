import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01";
import Hero from "./components/ui/hero";
import CustomFooter from "./components/ui/customFooter";
import PriceSimulatorPage from "./pages/PriceSimulatorPage";
import QuotePrintPage from "./pages/QuotePrintPage";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="print:hidden">
        <Navbar01 />
      </div>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route
            path="/simulador"
            element={
              <div className="container mx-auto px-4 py-10">
                <PriceSimulatorPage />
              </div>
            }
          />
          <Route path="/orcamento" element={<QuotePrintPage />} />
        </Routes>
      </main>
      <div className="print:hidden">
        <CustomFooter />
      </div>
    </div>
  );
}

export default App;
