
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

interface Pago {
  id: string;
  idUsuario: string;
  fechaPago: string;
  monto: number;
  estado: 'pagado';
  comprobante: string;
}

const pagosMockData: Pago[] = [
  {
    id: "PAG001",
    idUsuario: "USR001",
    fechaPago: "2024-01-15",
    monto: 69.00,
    estado: 'pagado',
    comprobante: 'comprobante_pag001.pdf'
  },
  {
    id: "PAG002", 
    idUsuario: "USR001",
    fechaPago: "2024-02-15",
    monto: 120.00,
    estado: 'pagado',
    comprobante: 'comprobante_pag002.pdf'
  },
  {
    id: "PAG003",
    idUsuario: "USR001", 
    fechaPago: "2024-03-15",
    monto: 69.00,
    estado: 'pagado',
    comprobante: 'comprobante_pag003.pdf'
  }
];

const TablaPagos = () => {
  const [pagos] = useState<Pago[]>(pagosMockData);

  const handlePagar = () => {
    console.log("Redirigiendo a formulario de pago...");
    // Aquí iría la lógica para abrir el formulario de pago
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pagos Realizados</h2>
          <p className="text-gray-600">Historial de pagos completados</p>
        </div>
        <Button onClick={handlePagar} className="bg-salus-blue hover:bg-salus-blue/90">
          Pagar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Pagos</CardTitle>
          <CardDescription>
            Pagos completados y comprobantes subidos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Pago</TableHead>
                  <TableHead>ID Usuario</TableHead>
                  <TableHead>Fecha de Pago</TableHead>
                  <TableHead>Monto (USD)</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Comprobante</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagos.map((pago) => (
                  <TableRow key={pago.id}>
                    <TableCell className="font-medium">{pago.id}</TableCell>
                    <TableCell>{pago.idUsuario}</TableCell>
                    <TableCell>{pago.fechaPago}</TableCell>
                    <TableCell>${pago.monto.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="default">
                        Pagado
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-green-600">
                          {pago.comprobante}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TablaPagos;
