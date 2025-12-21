import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01";
import CustomFooter from "./components/ui/customFooter";
// import PriceSimulatorPage from "./pages/PriceSimulatorPage";
// import QuotePrintPage from "./pages/QuotePrintPage";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="print:hidden">
        <Navbar01 />
      </div>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicos" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          {/* <Route
            path="/simulador"
            element={
              <div className="container mx-auto px-4 py-10">
                <PriceSimulatorPage />
              </div>
            }
          /> */}
          <Route path="/contactos" element={<ContactPage />} />
          {/* <Route path="/orcamento" element={<QuotePrintPage />} /> */}
        </Routes>
      </main>
      <div className="print:hidden">
        <CustomFooter />
      </div>
    </div>
  );
}

export default App;
