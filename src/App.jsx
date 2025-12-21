import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="print:hidden">
        <Navbar />
      </div>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicos" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contactos" element={<ContactPage />} />
        </Routes>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}

export default App;
