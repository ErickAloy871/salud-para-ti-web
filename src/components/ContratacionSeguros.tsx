import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";

type FormData = {
  nombres: string;
  apellidos: string;
  cedula: string;
  email: string;
  telefono: string;
  direccion: string;
  tipoSeguro: string;
  planSeguro: string;
  coberturaAdicional: string;
  observaciones: string;
};

const ContratacionSeguros = () => {
  const [formData, setFormData] = useState<FormData>({
    nombres: '',
    apellidos: '',
    cedula: '',
    email: '',
    telefono: '',
    direccion: '',
    tipoSeguro: '',
    planSeguro: '',
    coberturaAdicional: '',
    observaciones: '',
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Validación especial para teléfono
    if (name === 'telefono') {
      // Solo permitir números y máximo 10 dígitos
      const numbersOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numbersOnly }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTipoSeguroChange = (value: string) => {
    setFormData(prev => ({ ...prev, tipoSeguro: value }));
  };

  const handlePlanSeguroChange = (value: string) => {
    setFormData(prev => ({ ...prev, planSeguro: value }));
  };

  const handleCoberturaAdicionalChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, coberturaAdicional: e.target.value }));
  };

  const handleObservacionesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, observaciones: e.target.value }));
  };

  const handleSubmit = (e: React.Event) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.nombres || !formData.apellidos || !formData.cedula || !formData.email || !formData.telefono || !formData.tipoSeguro) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      });
      return;
    }

    // Validar teléfono (máximo 10 dígitos)
    if (formData.telefono.length > 10 || !/^\d+$/.test(formData.telefono)) {
      toast({
        title: "Error",
        description: "El teléfono debe tener máximo 10 dígitos y solo números",
        variant: "destructive",
      });
      return;
    }

    console.log('Formulario de Contratación:', formData);
    toast({
      title: "Contratación exitosa",
      description: "La contratación del seguro se ha registrado correctamente",
    });

    // Resetear el formulario
    setFormData({
      nombres: '',
      apellidos: '',
      cedula: '',
      email: '',
      telefono: '',
      direccion: '',
      tipoSeguro: '',
      planSeguro: '',
      coberturaAdicional: '',
      observaciones: '',
    });
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Contratación de Seguro
          </CardTitle>
          <CardDescription>
            Ingrese la información del nuevo cliente y los detalles del seguro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombres">Nombres</Label>
                <Input
                  id="nombres"
                  name="nombres"
                  type="text"
                  value={formData.nombres}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="apellidos">Apellidos</Label>
                <Input
                  id="apellidos"
                  name="apellidos"
                  type="text"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cedula">Cédula</Label>
              <Input
                id="cedula"
                name="cedula"
                type="text"
                value={formData.cedula}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                name="telefono"
                type="text"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="Máximo 10 dígitos"
                maxLength={10}
                required
              />
            </div>

            <div>
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                name="direccion"
                type="text"
                value={formData.direccion}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="tipoSeguro">Tipo de Seguro</Label>
              <Select value={formData.tipoSeguro} onValueChange={handleTipoSeguroChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el tipo de seguro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Salud">Salud</SelectItem>
                  <SelectItem value="Vida">Vida</SelectItem>
                </SelectContent>
              </Select>
            </div>
                       <div>
              <Label htmlFor="coberturaAdicional">Cobertura Adicional</Label>
              <Textarea
                id="coberturaAdicional"
                name="coberturaAdicional"
                placeholder="Ingrese detalles de cobertura adicional"
                value={formData.coberturaAdicional}
                onChange={handleCoberturaAdicionalChange}
              />
            </div>

            <div>
              <Label htmlFor="observaciones">Observaciones</Label>
              <Textarea
                id="observaciones"
                name="observaciones"
                placeholder="Ingrese observaciones adicionales"
                value={formData.observaciones}
                onChange={handleObservacionesChange}
              />
            </div>

            <Button type="submit" className="bg-salus-blue hover:bg-salus-blue/90">
              Contratar Seguro
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContratacionSeguros;
