import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SERVICES } from "@/data/services";

export function PriceTable({ quantities, onQuantityChange, readOnly = false }) {
  const calculateSubtotal = (price, quantity) => {
    return price * (quantity || 0);
  };

  const total = SERVICES.reduce((acc, service) => {
    return acc + calculateSubtotal(service.price, quantities[service.id]);
  }, 0);

  return (
    <Table>
      <TableCaption>
        * Os valores apresentados são meramente indicativos e não constituem um
        orçamento final. Aos valores acresce IVA à taxa legal em vigor.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[200px]">Serviço</TableHead>
          <TableHead className="whitespace-nowrap">Preço Unitário</TableHead>
          <TableHead className="min-w-[120px]">Área ({SERVICES[0].unit})</TableHead>
          <TableHead className="text-right whitespace-nowrap">Subtotal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {SERVICES.map((service) => (
          <TableRow key={service.id}>
            <TableCell className="font-medium">{service.name}</TableCell>
            <TableCell>{service.price.toFixed(2)}€ / {service.unit}</TableCell>
            <TableCell>
              {readOnly ? (
                <span className="px-3 py-2">{quantities[service.id] || 0}</span>
              ) : (
                <Input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={quantities[service.id] || ""}
                  onChange={(e) =>
                    onQuantityChange(service.id, parseFloat(e.target.value) || 0)
                  }
                  className="w-24"
                />
              )}
            </TableCell>
            <TableCell className="text-right">
              {calculateSubtotal(service.price, quantities[service.id]).toFixed(
                2
              )}
              €
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="font-bold">
            Total Estimado
          </TableCell>
          <TableCell className="text-right font-bold text-lg">
            {total.toFixed(2)}€
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default function PriceSimulator() {
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  // Carregar dados do localStorage quando o componente monta
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

  // Guardar no localStorage sempre que quantities muda
  useEffect(() => {
    if (Object.keys(quantities).length > 0) {
      localStorage.setItem("priceSimulatorQuantities", JSON.stringify(quantities));
    }
  }, [quantities]);

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleClear = () => {
    setQuantities({});
    localStorage.removeItem("priceSimulatorQuantities");
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

      <div className="border rounded-md overflow-x-auto">
        <PriceTable
          quantities={quantities}
          onQuantityChange={handleQuantityChange}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={handleClear}>
          Limpar
        </Button>
        <Button onClick={() => navigate("/quote", { state: { quantities } })}>
          Gerar Orçamento
        </Button>
      </div>
    </div>
  );
}
