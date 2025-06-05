
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactSchema = z.object({
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
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactForm = z.infer<typeof contactSchema>;

const AsesorPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      cedula: "",
      telefono: "",
      email: "",
      mensaje: "",
    },
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Datos del formulario:", data);
    
    toast({
      title: "Solicitud enviada",
      description: "Un asesor se comunicará contigo pronto.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png" 
                alt="SALUS" 
                className="h-12 w-auto"
              />
              <span className="text-salus-blue font-semibold text-lg">SALUS ASEGURADORA</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-salus-gray">
              Habla con Nuestros Asesores
            </h1>
            <p className="text-salus-gray-light text-lg md:text-xl max-w-2xl mx-auto">
              Nuestros expertos están listos para ayudarte a encontrar el plan perfecto para ti
            </p>
          </div>
        </div>

        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Formulario de contacto */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-salus-gray">
                  Solicita una Consulta Gratuita
                </h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>

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

                    <FormField
                      control={form.control}
                      name="mensaje"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensaje</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Cuéntanos qué tipo de seguro te interesa o cualquier pregunta que tengas..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-salus-blue hover:bg-salus-blue-dark text-white py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Solicitar Consulta"}
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Información de contacto */}
              <div className="space-y-8">
                <div className="bg-salus-blue text-white rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5" />
                      <span>+57 (1) 234-5678</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5" />
                      <span>info@salusaseguradora.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5" />
                      <span>Carrera 7 #123-45, Bogotá, Colombia</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5" />
                      <span>Lunes a Viernes: 8:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-4 text-salus-gray">¿Qué puedes esperar?</h3>
                  <ul className="space-y-3 text-salus-gray-light">
                    <li>• Consulta gratuita sin compromiso</li>
                    <li>• Asesoría personalizada para tus necesidades</li>
                    <li>• Comparación de planes disponibles</li>
                    <li>• Respuesta en menos de 24 horas</li>
                    <li>• Atención de expertos en seguros</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AsesorPage;
