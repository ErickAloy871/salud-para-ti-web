import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCog,
  Lock,
  Users,
  ClipboardList,
  Stethoscope,
  BarChart2,
  LogOut,
  Menu,
  X
} from "lucide-react";

const AdminDashboard = () => {
  const [view, setView] = useState("roles");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    if (
      usuario.tipo !== "admin" &&
      usuario.tipo !== "administrador"
    ) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
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
          <span className="text-lg font-bold">SALUS ADMIN</span>
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
              <h1 className="text-xl font-bold tracking-tight">SALUS ADMIN</h1>
            </div>

            <nav className="flex flex-col gap-3 w-full">
              {navItem("roles", <UserCog className="w-5 h-5" />, "Gestion de roles")}
              {navItem("accesos", <Lock className="w-5 h-5" />, "Gestion de accesos")}
              {navItem("clientes", <Users className="w-5 h-5" />, "Gestion de clientes")}
              {navItem("seguros", <ClipboardList className="w-5 h-5" />, "Contratacion de seguros")}
              {navItem("reembolsos", <Stethoscope className="w-5 h-5" />, "Revisión de reembolsos")}
              {navItem("reportes", <BarChart2 className="w-5 h-5" />, "Reportes")}
            </nav>
          </div>

          <div className="mt-6 w-full flex justify-center">
            <button
              onClick={handleLogout}
              className="w-full max-w-[200px] flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-red-100 text-salus-gray hover:bg-red-500 hover:text-white font-medium transition shadow-md hover:shadow-lg"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar sesion</span>
            </button>
          </div>
        </aside>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-xl font-semibold text-salus-gray">Panel del Administrador</h2>
          <div className="text-sm text-salus-gray-light">Bienvenido</div>
        </header>

        <section className="p-4 sm:p-6">
          {view === "roles" && <p className="text-salus-gray">Aquí va la gestión de roles.</p>}
          {view === "accesos" && <p className="text-salus-gray">Aquí va la gestión de accesos.</p>}
          {view === "clientes" && <p className="text-salus-gray">Aquí va la gestión de clientes.</p>}
          {view === "seguros" && <p className="text-salus-gray">Aquí va la contratación de seguros.</p>}
          {view === "reembolsos" && <p className="text-salus-gray">Aquí va la revisión de reembolsos.</p>}
          {view === "reportes" && <p className="text-salus-gray">Aquí van los reportes.</p>}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
