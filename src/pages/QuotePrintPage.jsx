import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PriceTable } from "@/components/ui/PriceTable";

export default function QuotePrintPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const quantities = location.state?.quantities || {};

  const currentDate = new Date().toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Chrisert</h1>
            <p className="text-sm text-muted-foreground">
              Aplicações de capoto, barramento, pintura e remodelações
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium">Simulação de Orçamento</p>
            <p className="text-sm text-muted-foreground">{currentDate}</p>
          </div>
        </div>
      </div>

      <div className="border rounded-md mb-8 overflow-x-auto">
        <PriceTable quantities={quantities} readOnly={true} />
      </div>

      <div className="mt-12">
        <p className="text-xs text-center text-muted-foreground">
          Este documento é uma simulação e não serve como fatura. Os preços podem
          sofrer alterações sem aviso prévio.
        </p>
      </div>

      <div className="flex justify-end gap-4 mt-8 print:hidden">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Voltar
        </Button>
        <Button onClick={() => window.print()}>Imprimir</Button>
      </div>
    </div>
  );
}
