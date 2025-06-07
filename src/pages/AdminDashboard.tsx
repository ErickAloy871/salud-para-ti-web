
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import PerfilUsuario from "@/components/PerfilUsuario";
import GestionClientes from "@/components/GestionClientes";
import GestionRoles from "@/components/GestionRoles";
import ContratacionSeguros from "@/components/ContratacionSeguros";
import { 
  Users, 
  UserCheck, 
  FileText, 
  BarChart3, 
  LogOut,
  ChevronRight
} from "lucide-react";

type MenuOption = 
  | "dashboard" 
  | "clientes" 
  | "roles" 
  | "contratacion" 
  | "reportes";

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState<MenuOption>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  const menuItems = [
    { id: "dashboard" as const, label: "Dashboard", icon: BarChart3 },
    { id: "clientes" as const, label: "Gestión de Clientes", icon: Users },
    { id: "roles" as const, label: "Gestión de Roles", icon: UserCheck },
    { id: "contratacion" as const, label: "Solicitudes de Contacto", icon: FileText },
    { id: "reportes" as const, label: "Reportes", icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case "clientes":
        return <GestionClientes />;
      case "roles":
        return <GestionRoles />;
      case "contratacion":
        return <ContratacionSeguros />;
      case "reportes":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-salus-blue">Reportes</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">Módulo de reportes en desarrollo...</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-salus-gray">Dashboard Administrativo</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+15% desde el mes pasado</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contratos Mes</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">+8% desde el mes pasado</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ingresos Mes</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231</div>
                  <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                  <CardDescription>Últimas acciones en el sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary">Nuevo</Badge>
                      <span className="text-sm">Cliente Juan Pérez registrado</span>
                      <span className="text-xs text-muted-foreground ml-auto">Hace 2h</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">Actualizado</Badge>
                      <span className="text-sm">Contrato #123 actualizado</span>
                      <span className="text-xs text-muted-foreground ml-auto">Hace 4h</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="destructive">Cancelado</Badge>
                      <span className="text-sm">Contrato #456 cancelado</span>
                      <span className="text-xs text-muted-foreground ml-auto">Hace 6h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Accesos Rápidos</CardTitle>
                  <CardDescription>Funciones más utilizadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => setActiveMenu("clientes")}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Clientes
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => setActiveMenu("contratacion")}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Solicitudes
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => setActiveMenu("roles")}
                    >
                      <UserCheck className="mr-2 h-4 w-4" />
                      Roles
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => setActiveMenu("reportes")}
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Reportes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarProvider open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <div className="flex h-screen w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="border-b border-gray-200 p-2">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png" 
                alt="SALUS" 
                className="h-8 w-auto"
              />
              <div>
                <h2 className="text-lg font-semibold text-salus-blue">SALUS</h2>
                <p className="text-xs text-gray-500">Panel Admin</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Gestión</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={activeMenu === item.id}
                        onClick={() => setActiveMenu(item.id)}
                        className="w-full justify-start"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                        {activeMenu === item.id && (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-gray-200 p-4">
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => setActiveMenu("reportes")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Reportes
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1">
          <div className="flex flex-col h-full">
            <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold text-gray-900">
                  {menuItems.find(item => item.id === activeMenu)?.label || "Dashboard"}
                </h1>
              </div>
              
              <PerfilUsuario 
                usuario={{
                  nombre: "Admin",
                  apellido: "Sistema", 
                  email: "admin@salus.com",
                  rol: "Administrador",
                  ultimoAcceso: "2024-01-15"
                }}
                onCerrarSesion={handleLogout}
              />
            </header>
            
            <main className="flex-1 overflow-auto">
              {renderContent()}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
