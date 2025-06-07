
import { useState } from "react";
import {
  ClipboardList,
  Stethoscope,
  CreditCard,
  LogOut,
  Menu,
  X,
  Heart,
  Shield
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PerfilUsuario from "@/components/PerfilUsuario";
import FormularioReembolso from "@/components/FormularioReembolso";
import TablaPagos from "@/components/TablaPagos";

interface Seguro {
  id: string;
  tipo: 'Vida' | 'Salud';
  nombre: string;
  fechaContrato: string;
  estado: 'activo' | 'pendiente' | 'vencido';
  cobertura: string;
}

const segurosMockData: Seguro[] = [
  {
    id: "SEG001",
    tipo: 'Vida',
    nombre: "Seguro de Vida Premium",
    fechaContrato: "2024-01-10",
    estado: 'activo',
    cobertura: "$100,000"
  },
  {
    id: "SEG002", 
    tipo: 'Salud',
    nombre: "Seguro de Salud Familiar",
    fechaContrato: "2024-01-15",
    estado: 'activo',
    cobertura: "Cobertura completa"
  }
];

const ClienteDashboard = () => {
  const [view, setView] = useState("seguros");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCerrarSesion = () => {
    console.log("Cerrando sesión...");
    // Aquí iría la lógica de logout
  };

  const navItem = (
    id: string,
    icon: JSX.Element,
    label: string
  ) => (
    <button
      onClick={() => {
        setView(id);
        setSidebarOpen(false);
      }}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl shadow-md transition-all duration-200 hover:shadow-xl hover:bg-white hover:text-salus-blue ${
        view === id
          ? "bg-white text-salus-blue font-semibold shadow-xl"
          : "bg-salus-blue/80 text-white"
      }`}
    >
      {icon}
      <span className="text-sm md:text-base">{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-100">
      {/* Topbar for mobile */}
      <div className="sm:hidden bg-salus-blue text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png"
            alt="Logo"
            className="h-8"
          />
          <span className="text-lg font-bold">SALUS CLIENTE</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      {(sidebarOpen || window.innerWidth >= 640) && (
        <aside className="bg-salus-blue w-full sm:w-64 p-6 shadow-2xl flex flex-col justify-between text-white rounded-r-3xl transition-all duration-300">
          <div>
            <div className="hidden sm:flex items-center gap-2 mb-6">
              <img
                src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png"
                alt="Logo"
                className="h-10"
              />
              <h1 className="text-xl font-bold tracking-tight">SALUS CLIENTE</h1>
            </div>

            <nav className="flex flex-col gap-3 w-full">
              {navItem("seguros", <ClipboardList className="w-5 h-5" />, "Mis seguros")}
              {navItem("reembolsos", <Stethoscope className="w-5 h-5" />, "Solicitar reembolso")}
              {navItem("pagos", <CreditCard className="w-5 h-5" />, "Pagos y vencimientos")}
            </nav>
          </div>

          <div className="mt-6 w-full flex justify-center">
            <button
              onClick={handleCerrarSesion}
              className="w-full max-w-[200px] flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-red-100 text-salus-gray hover:bg-red-500 hover:text-white font-medium transition shadow-md hover:shadow-lg"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </aside>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-xl font-semibold text-salus-gray">Panel del Cliente</h2>
          <PerfilUsuario
            usuario={{
              nombre: "Juan",
              apellido: "Pérez",
              email: "juan.perez@email.com",
              rol: "Cliente",
              ultimoAcceso: "2024-01-15"
            }}
            onCerrarSesion={handleCerrarSesion}
          />
        </header>

        <section className="p-4 sm:p-6">
          {view === "seguros" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mis Seguros Contratados</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {segurosMockData.map((seguro) => (
                    <Card key={seguro.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            {seguro.tipo === 'Vida' ? (
                              <Heart className="h-5 w-5 text-red-500" />
                            ) : (
                              <Shield className="h-5 w-5 text-blue-500" />
                            )}
                            Seguro de {seguro.tipo}
                          </CardTitle>
                          <Badge 
                            variant={seguro.estado === 'activo' ? 'default' : 'destructive'}
                          >
                            {seguro.estado}
                          </Badge>
                        </div>
                        <CardDescription>{seguro.nombre}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">ID del Seguro:</span>
                            <span className="font-medium">{seguro.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Fecha de Contrato:</span>
                            <span className="font-medium">{seguro.fechaContrato}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cobertura:</span>
                            <span className="font-medium">{seguro.cobertura}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {view === "reembolsos" && (
            <div className="max-w-2xl mx-auto">
              <FormularioReembolso />
            </div>
          )}
          
          {view === "pagos" && (
            <div>
              <TablaPagos />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ClienteDashboard;
