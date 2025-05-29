import { useState } from "react";
import {
  Shield,
  UserCog,
  Lock,
  FileText,
  LogOut,
  Users,
  ClipboardList,
  Stethoscope,
  BarChart2
} from "lucide-react";

const AdminDashboard = () => {
  const [view, setView] = useState("roles");

  const navItem = (
    id: string,
    icon: JSX.Element,
    label: string
  ) => (
    <button
      onClick={() => setView(id)}
      className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white hover:text-salus-blue transition ${
        view === id ? "bg-white text-salus-blue font-semibold" : ""
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-salus-blue text-white w-64 p-6 shadow-lg flex flex-col">
        <div className="flex items-center mb-8 space-x-3">
          <img
            src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png"
            alt="Logo"
            className="h-10"
          />
          <h1 className="text-xl font-bold tracking-tight">SALUS ADMIN</h1>
        </div>

        <nav className="space-y-3">
          {navItem("roles", <UserCog className="w-5 h-5" />, "Gestion de roles")}
          {navItem("accesos", <Lock className="w-5 h-5" />, "Gestion de accesos")}
          {navItem("clientes", <Users className="w-5 h-5" />, "Gestion de clientes")}
          {navItem("seguros", <ClipboardList className="w-5 h-5" />, "Contratacion de seguros")}
          {navItem("reembolsos", <Stethoscope className="w-5 h-5" />, "Reembolsos")}
          {navItem("reportes", <BarChart2 className="w-5 h-5" />, "Reportes")}
        </nav>

        {/* Boton Cerrar Sesion */}
        <div className="mt-auto flex justify-center">
          <button
            className="w-full max-w-[200px] flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-red-100 text-salus-gray hover:bg-red-500 hover:text-white font-medium transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesion</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-salus-gray">Panel del Administrador</h2>
          <div className="text-sm text-salus-gray-light">Bienvenido, Administrador</div>
        </header>

        <section className="p-6">
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
