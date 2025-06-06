import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, Clock, CheckCircle, X, Plus, Trash2 } from "lucide-react";

const beneficiarioSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  relacion: z.string().min(1, "Selecciona la relación familiar"),
  porcentaje: z.number().min(1, "El porcentaje debe ser mayor a 0").max(100, "El porcentaje no puede ser mayor a 100"),
  cedula: z.string().min(8, "La cédula debe tener al menos 8 dígitos").regex(/^\d+$/, "La cédula solo debe contener números"),
  fechaNacimiento: z.string().min(1, "La fecha de nacimiento es requerida"),
});

const contratacionSchema = z.object({
  tipoSeguro: z.string().min(1, "Selecciona un tipo de seguro"),
  nombres: z.string().min(2, "Los nombres deben tener al menos 2 caracteres"),
  apellidos: z.string().min(2, "Los apellidos deben tener al menos 2 caracteres"),
  cedula: z.string()
    .min(8, "La cédula debe tener al menos 8 dígitos")
    .max(10, "La cédula no puede tener más de 10 dígitos")
    .regex(/^\d+$/, "La cédula solo debe contener números"),
  telefono: z.string()
    .min(10, "El teléfono debe tener 10 dígitos")
    .max(10, "El teléfono debe tener 10 dígitos")
    .regex(/^3\d{9}$/, "El teléfono debe empezar con 3 y tener 10 dígitos"),
  email: z.string().email("Email inválido"),
  fechaNacimiento: z.string().min(1, "La fecha de nacimiento es requerida"),
  genero: z.string().min(1, "Selecciona el género"),
  estadoCivil: z.string().min(1, "Selecciona el estado civil"),
  direccion: z.string().min(10, "La dirección debe tener al menos 10 caracteres"),
  ciudad: z.string().min(2, "La ciudad es requerida"),
  beneficiarios: z.string().optional(),
  observaciones: z.string().optional(),
});

type ContratacionForm = z.infer<typeof contratacionSchema>;
type Beneficiario = z.infer<typeof beneficiarioSchema>;

interface Solicitud {
  id: string;
  fecha: string;
  cliente: string;
  tipoSeguro: string;
  estado: "pendiente" | "aprobada" | "rechazada";
  valor: string;
}

const ContratacionSeguros = () => {
  const [activeTab, setActiveTab] = useState("formulario");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [esSeguroVida, setEsSeguroVida] = useState(false);
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [nuevoBeneficiario, setNuevoBeneficiario] = useState<Partial<Beneficiario>>({
    nombre: "",
    relacion: "",
    porcentaje: 0,
    cedula: "",
    fechaNacimiento: "",
  });
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([
    {
      id: "001",
      fecha: "2024-01-15",
      cliente: "Juan Pérez García",
      tipoSeguro: "Seguro de Vida",
      estado: "pendiente",
      valor: "$420"
    },
    {
      id: "002",
      fecha: "2024-01-14",
      cliente: "María López Rodríguez",
      tipoSeguro: "Seguro de Salud",
      estado: "aprobada",
      valor: "$69"
    },
    {
      id: "003",
      fecha: "2024-01-13",
      cliente: "Carlos Hernández Villa",
      tipoSeguro: "Seguro de Vida",
      estado: "rechazada",
      valor: "$420"
    }
  ]);
  
  const { toast } = useToast();

  const form = useForm<ContratacionForm>({
    resolver: zodResolver(contratacionSchema),
    defaultValues: {
      tipoSeguro: "",
      nombres: "",
      apellidos: "",
      cedula: "",
      telefono: "",
      email: "",
      fechaNacimiento: "",
      genero: "",
      estadoCivil: "",
      direccion: "",
      ciudad: "",
      beneficiarios: "",
      observaciones: "",
    },
  });

  const handleTipoSeguroChange = (value: string) => {
    setEsSeguroVida(value === "Seguro de Vida");
    if (value !== "Seguro de Vida") {
      setBeneficiarios([]);
    }
  };

  const agregarBeneficiario = () => {
    if (!nuevoBeneficiario.nombre || !nuevoBeneficiario.relacion || !nuevoBeneficiario.porcentaje || !nuevoBeneficiario.cedula || !nuevoBeneficiario.fechaNacimiento) {
      toast({
        title: "Error",
        description: "Completa todos los campos del beneficiario",
        variant: "destructive"
      });
      return;
    }

    const totalPorcentaje = beneficiarios.reduce((sum, b) => sum + b.porcentaje, 0) + nuevoBeneficiario.porcentaje!;
    
    if (totalPorcentaje > 100) {
      toast({
        title: "Error",
        description: "El porcentaje total no puede exceder 100%",
        variant: "destructive"
      });
      return;
    }

    setBeneficiarios([...beneficiarios, nuevoBeneficiario as Beneficiario]);
    setNuevoBeneficiario({
      nombre: "",
      relacion: "",
      porcentaje: 0,
      cedula: "",
      fechaNacimiento: "",
    });

    toast({
      title: "Beneficiario agregado",
      description: "El beneficiario ha sido agregado exitosamente",
    });
  };

  const eliminarBeneficiario = (index: number) => {
    setBeneficiarios(beneficiarios.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ContratacionForm) => {
    if (esSeguroVida && beneficiarios.length === 0) {
      toast({
        title: "Error",
        description: "Debes agregar al menos un beneficiario para el Seguro de Vida",
        variant: "destructive"
      });
      return;
    }

    if (esSeguroVida) {
      const totalPorcentaje = beneficiarios.reduce((sum, b) => sum + b.porcentaje, 0);
      if (totalPorcentaje !== 100) {
        toast({
          title: "Error", 
          description: "El porcentaje total de beneficiarios debe ser exactamente 100%",
          variant: "destructive"
        });
        return;
      }
    }

    setIsSubmitting(true);
    
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Agregar nueva solicitud
    const nuevaSolicitud: Solicitud = {
      id: (solicitudes.length + 1).toString().padStart(3, '0'),
      fecha: new Date().toISOString().split('T')[0],
      cliente: `${data.nombres} ${data.apellidos}`,
      tipoSeguro: data.tipoSeguro,
      estado: "pendiente",
      valor: data.tipoSeguro === "Seguro de Vida" ? "$420" : "$69"
    };
    
    setSolicitudes([nuevaSolicitud, ...solicitudes]);
    
    console.log("Datos de contratación:", data);
    if (esSeguroVida) {
      console.log("Beneficiarios:", beneficiarios);
    }
    
    toast({
      title: "Solicitud enviada",
      description: "Tu solicitud de contratación ha sido procesada exitosamente.",
    });
    
    form.reset();
    setBeneficiarios([]);
    setEsSeguroVida(false);
    setIsSubmitting(false);
    setActiveTab("solicitudes");
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return "text-yellow-600 bg-yellow-100";
      case "aprobada":
        return "text-green-600 bg-green-100";
      case "rechazada":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return <Clock className="h-4 w-4" />;
      case "aprobada":
        return <CheckCircle className="h-4 w-4" />;
      case "rechazada":
        return <X className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <img 
          src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png" 
          alt="SALUS" 
          className="h-8 w-auto"
        />
        <h2 className="text-2xl font-bold text-salus-gray">Contratación de Seguros</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="formulario">Nuevo Contrato</TabsTrigger>
          <TabsTrigger value="solicitudes">Solicitudes</TabsTrigger>
        </TabsList>

        <TabsContent value="formulario" className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-6 text-salus-gray">
              Formulario de Contratación
            </h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="tipoSeguro"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Seguro</FormLabel>
                      <Select onValueChange={(value) => {
                        field.onChange(value);
                        handleTipoSeguroChange(value);
                      }} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo de seguro" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Seguro de Vida">Seguro de Vida - $420/mes</SelectItem>
                          <SelectItem value="Seguro de Salud">Seguro de Salud - $69/mes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nombres"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombres</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingresa tus nombres" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="apellidos"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellidos</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingresa tus apellidos" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="cedula"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cédula</FormLabel>
                        <FormControl>
                          <Input placeholder="12345678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input placeholder="3123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="tu@email.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="fechaNacimiento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Nacimiento</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="genero"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Género</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="femenino">Femenino</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="estadoCivil"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado Civil</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="soltero">Soltero/a</SelectItem>
                            <SelectItem value="casado">Casado/a</SelectItem>
                            <SelectItem value="divorciado">Divorciado/a</SelectItem>
                            <SelectItem value="viudo">Viudo/a</SelectItem>
                            <SelectItem value="union_libre">Unión Libre</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="direccion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                          <Input placeholder="Carrera 10 #20-30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ciudad"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <Input placeholder="Bogotá" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="beneficiarios"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beneficiarios (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Lista los beneficiarios con nombres completos y relación familiar..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="observaciones"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observaciones (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Información adicional relevante..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Sección de Beneficiarios para Seguro de Vida */}
                {esSeguroVida && (
                  <div className="border-t pt-6 mt-6">
                    <h4 className="text-lg font-semibold mb-4 text-salus-gray">
                      Información de Beneficiarios
                    </h4>
                    
                    <div className="bg-blue-50 rounded-lg p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre Completo
                          </label>
                          <Input
                            placeholder="Nombre del beneficiario"
                            value={nuevoBeneficiario.nombre}
                            onChange={(e) => setNuevoBeneficiario({
                              ...nuevoBeneficiario,
                              nombre: e.target.value
                            })}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Relación Familiar
                          </label>
                          <Select
                            value={nuevoBeneficiario.relacion}
                            onValueChange={(value) => setNuevoBeneficiario({
                              ...nuevoBeneficiario,
                              relacion: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="conyuge">Cónyuge</SelectItem>
                              <SelectItem value="hijo">Hijo/a</SelectItem>
                              <SelectItem value="padre">Padre/Madre</SelectItem>
                              <SelectItem value="hermano">Hermano/a</SelectItem>
                              <SelectItem value="otro">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Porcentaje (%)
                          </label>
                          <Input
                            type="number"
                            min="1"
                            max="100"
                            placeholder="0"
                            value={nuevoBeneficiario.porcentaje || ""}
                            onChange={(e) => setNuevoBeneficiario({
                              ...nuevoBeneficiario,
                              porcentaje: parseInt(e.target.value) || 0
                            })}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cédula
                          </label>
                          <Input
                            placeholder="12345678"
                            value={nuevoBeneficiario.cedula}
                            onChange={(e) => setNuevoBeneficiario({
                              ...nuevoBeneficiario,
                              cedula: e.target.value
                            })}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Nacimiento
                          </label>
                          <Input
                            type="date"
                            value={nuevoBeneficiario.fechaNacimiento}
                            onChange={(e) => setNuevoBeneficiario({
                              ...nuevoBeneficiario,
                              fechaNacimiento: e.target.value
                            })}
                          />
                        </div>
                      </div>

                      <Button
                        type="button"
                        onClick={agregarBeneficiario}
                        className="w-full bg-salus-blue hover:bg-salus-blue-dark text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Beneficiario
                      </Button>
                    </div>

                    {/* Lista de beneficiarios agregados */}
                    {beneficiarios.length > 0 && (
                      <div className="mt-4">
                        <h5 className="font-medium text-gray-700 mb-2">
                          Beneficiarios Agregados ({beneficiarios.reduce((sum, b) => sum + b.porcentaje, 0)}% asignado)
                        </h5>
                        <div className="space-y-2">
                          {beneficiarios.map((beneficiario, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                              <div className="flex-1">
                                <span className="font-medium">{beneficiario.nombre}</span>
                                <span className="text-gray-500 ml-2">({beneficiario.relacion})</span>
                                <span className="text-salus-blue ml-2 font-semibold">{beneficiario.porcentaje}%</span>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => eliminarBeneficiario(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-salus-blue hover:bg-salus-blue-dark text-white py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Procesando..." : "Enviar Solicitud de Contratación"}
                </Button>
              </form>
            </Form>
          </div>
        </TabsContent>

        <TabsContent value="solicitudes" className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-salus-gray">
                Solicitudes de Contratación
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo de Seguro
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {solicitudes.map((solicitud) => (
                    <tr key={solicitud.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{solicitud.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {solicitud.fecha}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {solicitud.cliente}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {solicitud.tipoSeguro}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {solicitud.valor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(solicitud.estado)}`}>
                          {getEstadoIcon(solicitud.estado)}
                          <span className="capitalize">{solicitud.estado}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContratacionSeguros;
