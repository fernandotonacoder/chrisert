import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/data/services";
import { PriceTable } from "@/components/ui/PriceTable";

export default function PriceSimulatorPage() {
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedQuantities = localStorage.getItem("priceSimulatorQuantities");
    if (savedQuantities) {
      try {
        setQuantities(JSON.parse(savedQuantities));
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(quantities).length > 0) {
      localStorage.setItem(
        "priceSimulatorQuantities",
        JSON.stringify(quantities)
      );
    }
  }, [quantities]);

  const availableServices = SERVICES.filter(
    (service) => quantities[service.id] === undefined
  );

  const handleAddService = (serviceId) => {
    if (serviceId) {
      setQuantities((prev) => ({
        ...prev,
        [serviceId]: 0,
      }));
    }
  };

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleRemoveService = (id) => {
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[id];
      return newQuantities;
    });
  };

  const handleClear = () => {
    setQuantities({});
    localStorage.removeItem("priceSimulatorQuantities");
  };

  const handleGenerateQuote = () => {
    const filteredQuantities = Object.fromEntries(
      Object.entries(quantities).filter(([_, quantity]) => quantity > 0)
    );
    navigate("/orcamento", { state: { quantities: filteredQuantities } });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Simulador de preços
        </h1>
        <p className="text-muted-foreground">
          Selecione os serviços e as quantidades desejadas para obter uma
          estimativa.
        </p>
      </div>

      {availableServices.length > 0 && (
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">
            Adicionar serviço
          </label>
          <select
            value=""
            onChange={(e) => handleAddService(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Selecione um serviço...</option>
            {availableServices.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} - {service.price.toFixed(2)}€ / {service.unit}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="border rounded-md overflow-x-auto">
        <PriceTable
          quantities={quantities}
          onQuantityChange={handleQuantityChange}
          onRemoveService={handleRemoveService}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={handleClear}>
          Limpar
        </Button>
        <Button
          onClick={handleGenerateQuote}
          disabled={Object.keys(quantities).length === 0}
        >
          Gerar Orçamento
        </Button>
      </div>
    </div>
  );
}
