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

export function PriceTable({
  quantities,
  onQuantityChange,
  onRemoveService,
  readOnly = false,
}) {
  const calculateSubtotal = (price, quantity) => {
    return price * (quantity || 0);
  };

  const selectedServices = SERVICES.filter(
    (service) => quantities[service.id] !== undefined
  );

  const total = selectedServices.reduce((acc, service) => {
    return acc + calculateSubtotal(service.price, quantities[service.id]);
  }, 0);

  if (selectedServices.length === 0 && !readOnly) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhum serviço adicionado. Selecione serviços abaixo para começar.
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table>
        <TableCaption>
          * Os valores apresentados são meramente indicativos e não constituem
          um orçamento final. Aos valores acresce IVA à taxa legal em vigor.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[200px]">Serviço</TableHead>
            <TableHead className="whitespace-nowrap">Preço Unitário</TableHead>
            <TableHead className="min-w-[120px]">
              Área ({SERVICES[0].unit})
            </TableHead>
            <TableHead className="text-right whitespace-nowrap">
              Subtotal
            </TableHead>
            {!readOnly && <TableHead className="w-[50px]"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedServices.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium">{service.name}</TableCell>
              <TableCell className="whitespace-nowrap">
                {service.price.toFixed(2)}€ / {service.unit}
              </TableCell>
              <TableCell>
                {readOnly ? (
                  <span className="px-3 py-2">
                    {quantities[service.id] || 0}
                  </span>
                ) : (
                  <Input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={quantities[service.id] || ""}
                    onChange={(e) =>
                      onQuantityChange(
                        service.id,
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-24"
                  />
                )}
              </TableCell>
              <TableCell className="text-right whitespace-nowrap">
                {calculateSubtotal(
                  service.price,
                  quantities[service.id]
                ).toFixed(2)}
                €
              </TableCell>
              {!readOnly && (
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => onRemoveService(service.id)}
                  >
                    ×
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={!readOnly ? 4 : 3} className="font-bold">
              Total Estimado
            </TableCell>
            <TableCell
              className="text-right font-bold text-lg"
              colSpan={!readOnly ? 2 : 1}
            >
              {total.toFixed(2)}€
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
