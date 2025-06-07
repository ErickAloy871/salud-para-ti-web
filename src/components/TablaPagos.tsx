
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Pago {
  id: string;
  idUsuario: string;
  fechaPago: string;
  monto: number;
  estado: 'pendiente' | 'pagado';
  comprobante?: string;
}

const pagosMockData: Pago[] = [
  {
    id: "PAG001",
    idUsuario: "USR001",
    fechaPago: "2024-01-15",
    monto: 150.00,
    estado: 'pendiente'
  },
  {
    id: "PAG002", 
    idUsuario: "USR001",
    fechaPago: "2024-02-15",
    monto: 150.00,
    estado: 'pendiente'
  },
  {
    id: "PAG003",
    idUsuario: "USR001", 
    fechaPago: "2024-03-15",
    monto: 150.00,
    estado: 'pagado',
    comprobante: 'comprobante_pag003.pdf'
  }
];

const TablaPagos = () => {
  const { toast } = useToast();
  const [pagos, setPagos] = useState<Pago[]>(pagosMockData);

  const handleFileUpload = (pagoId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPagos(pagos.map(pago => 
        pago.id === pagoId 
          ? { ...pago, estado: 'pagado' as const, comprobante: file.name }
          : pago
      ));
      
      toast({
        title: "Comprobante subido",
        description: `Comprobante para el pago ${pagoId} ha sido registrado exitosamente.`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pagos y Vencimientos</CardTitle>
        <CardDescription>
          Gestione sus pagos pendientes y suba comprobantes
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
                    <Badge 
                      variant={pago.estado === 'pagado' ? 'default' : 'destructive'}
                    >
                      {pago.estado === 'pagado' ? 'Pagado' : 'Pendiente'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {pago.estado === 'pagado' ? (
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-green-600">
                          {pago.comprobante}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <label 
                          htmlFor={`file-${pago.id}`} 
                          className="cursor-pointer"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center"
                            asChild
                          >
                            <span>
                              <Upload className="h-4 w-4 mr-2" />
                              Subir Comprobante
                            </span>
                          </Button>
                        </label>
                        <input
                          id={`file-${pago.id}`}
                          type="file"
                          className="sr-only"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={(e) => handleFileUpload(pago.id, e)}
                        />
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TablaPagos;
